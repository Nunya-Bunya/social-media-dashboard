const { supabase } = require('../config');
const { v4: uuidv4 } = require('uuid');

class AutomatedWorkflowService {
    
    /**
     * Get workflows with filtering and pagination
     */
    static async getWorkflows({ business_id, workflow_type, trigger_type, is_active, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('automated_workflows')
                .select(`
                    *,
                    workflow_executions(
                        id, execution_id, status, started_at, completed_at
                    )
                `)
                .eq('business_id', business_id)
                .order('created_at', { ascending: false });

            // Apply filters
            if (workflow_type) {
                query = query.eq('workflow_type', workflow_type);
            }
            
            if (trigger_type) {
                query = query.eq('trigger_type', trigger_type);
            }
            
            if (is_active !== undefined) {
                query = query.eq('is_active', is_active);
            }

            // Apply pagination
            const offset = (page - 1) * limit;
            query = query.range(offset, offset + limit - 1);

            const { data, error } = await query;

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in getWorkflows:', error);
            throw error;
        }
    }

    /**
     * Get a specific workflow by ID
     */
    static async getWorkflowById(id) {
        try {
            const { data, error } = await supabase
                .from('automated_workflows')
                .select(`
                    *,
                    workflow_executions(
                        id, execution_id, status, started_at, completed_at, 
                        execution_data, step_results, error_details
                    )
                `)
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return null; // Not found
                }
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in getWorkflowById:', error);
            throw error;
        }
    }

    /**
     * Create a new workflow
     */
    static async createWorkflow(workflowData) {
        try {
            // Validate required fields
            if (!workflowData.name) {
                throw new Error('Workflow name is required');
            }

            if (!workflowData.workflow_steps || !Array.isArray(workflowData.workflow_steps)) {
                throw new Error('Workflow steps are required and must be an array');
            }

            // Set default values
            const workflow = {
                ...workflowData,
                is_active: workflowData.is_active !== undefined ? workflowData.is_active : true,
                execution_count: 0,
                success_rate: 100.00,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('automated_workflows')
                .insert([workflow])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in createWorkflow:', error);
            throw error;
        }
    }

    /**
     * Update an existing workflow
     */
    static async updateWorkflow(id, updateData) {
        try {
            // Validate the workflow exists
            const existing = await this.getWorkflowById(id);
            if (!existing) {
                throw new Error('Workflow not found');
            }

            const updatePayload = {
                ...updateData,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('automated_workflows')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateWorkflow:', error);
            throw error;
        }
    }

    /**
     * Delete a workflow
     */
    static async deleteWorkflow(id) {
        try {
            // Check if workflow exists
            const existing = await this.getWorkflowById(id);
            if (!existing) {
                throw new Error('Workflow not found');
            }

            // Check if workflow has executions
            if (existing.workflow_executions && existing.workflow_executions.length > 0) {
                throw new Error('Cannot delete workflow with execution history. Consider deactivating instead.');
            }

            const { error } = await supabase
                .from('automated_workflows')
                .delete()
                .eq('id', id);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error in deleteWorkflow:', error);
            throw error;
        }
    }

    /**
     * Execute a workflow
     */
    static async executeWorkflow(workflowId, executionData = {}) {
        try {
            // Get workflow details
            const workflow = await this.getWorkflowById(workflowId);
            if (!workflow) {
                throw new Error('Workflow not found');
            }

            if (!workflow.is_active) {
                throw new Error('Workflow is not active');
            }

            // Create execution record
            const executionId = uuidv4();
            const execution = {
                workflow_id: workflowId,
                execution_id: executionId,
                status: 'running',
                started_at: new Date().toISOString(),
                execution_data: executionData,
                step_results: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data: savedExecution, error: saveError } = await supabase
                .from('workflow_executions')
                .insert([execution])
                .select()
                .single();

            if (saveError) {
                throw new Error(`Database error: ${saveError.message}`);
            }

            // Execute workflow steps asynchronously
            this.executeWorkflowSteps(workflow, savedExecution, executionData);

            return savedExecution;
        } catch (error) {
            console.error('Error in executeWorkflow:', error);
            throw error;
        }
    }

    /**
     * Execute workflow steps
     */
    static async executeWorkflowSteps(workflow, execution, executionData) {
        try {
            const stepResults = [];
            let currentData = { ...executionData };

            // Execute each step in sequence
            for (let i = 0; i < workflow.workflow_steps.length; i++) {
                const step = workflow.workflow_steps[i];
                
                try {
                    console.log(`Executing workflow step ${i + 1}: ${step.action}`);
                    
                    // Execute the step
                    const stepResult = await this.executeWorkflowStep(step, currentData);
                    
                    // Update current data with step result
                    currentData = { ...currentData, ...stepResult.output };
                    
                    // Record step result
                    stepResults.push({
                        step_index: i,
                        step_name: step.name || `Step ${i + 1}`,
                        action: step.action,
                        status: 'completed',
                        result: stepResult,
                        execution_time: stepResult.execution_time,
                        timestamp: new Date().toISOString()
                    });

                    // Check if step has conditional logic
                    if (step.conditions && !this.evaluateStepConditions(step.conditions, stepResult)) {
                        console.log(`Step ${i + 1} conditions not met, stopping execution`);
                        break;
                    }

                } catch (stepError) {
                    console.error(`Error executing workflow step ${i + 1}:`, stepError);
                    
                    stepResults.push({
                        step_index: i,
                        step_name: step.name || `Step ${i + 1}`,
                        action: step.action,
                        status: 'failed',
                        error: stepError.message,
                        timestamp: new Date().toISOString()
                    });

                    // Update execution status to failed
                    await this.updateExecutionStatus(execution.id, 'failed', stepError.message, stepResults);
                    return;
                }
            }

            // Update execution status to completed
            await this.updateExecutionStatus(execution.id, 'completed', null, stepResults);
            
            // Update workflow success rate
            await this.updateWorkflowSuccessRate(workflow.id);

        } catch (error) {
            console.error('Error executing workflow steps:', error);
            await this.updateExecutionStatus(execution.id, 'failed', error.message, []);
        }
    }

    /**
     * Execute a single workflow step
     */
    static async executeWorkflowStep(step, stepData) {
        const startTime = Date.now();
        
        try {
            let result = null;

            switch (step.action) {
                case 'send_email':
                    result = await this.executeEmailStep(step, stepData);
                    break;
                case 'create_post':
                    result = await this.executeCreatePostStep(step, stepData);
                    break;
                case 'update_metric':
                    result = await this.executeUpdateMetricStep(step, stepData);
                    break;
                case 'send_notification':
                    result = await this.executeNotificationStep(step, stepData);
                    break;
                case 'data_analysis':
                    result = await this.executeDataAnalysisStep(step, stepData);
                    break;
                case 'api_call':
                    result = await this.executeApiCallStep(step, stepData);
                    break;
                case 'delay':
                    result = await this.executeDelayStep(step, stepData);
                    break;
                case 'conditional_branch':
                    result = await this.executeConditionalBranchStep(step, stepData);
                    break;
                default:
                    throw new Error(`Unknown workflow action: ${step.action}`);
            }

            const executionTime = Date.now() - startTime;
            
            return {
                ...result,
                execution_time: executionTime,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            const executionTime = Date.now() - startTime;
            throw new Error(`Step execution failed: ${error.message}`);
        }
    }

    /**
     * Execute email step
     */
    static async executeEmailStep(step, stepData) {
        try {
            // This would integrate with your email service
            const { recipients, subject, template, variables } = step.config;
            
            // Replace variables in template
            const processedTemplate = this.processTemplate(template, variables, stepData);
            
            // Send email (placeholder implementation)
            console.log(`Sending email to ${recipients}: ${subject}`);
            
            return {
                success: true,
                output: {
                    email_sent: true,
                    recipients: recipients,
                    subject: subject,
                    message_id: `email_${Date.now()}`
                }
            };
        } catch (error) {
            throw new Error(`Email step failed: ${error.message}`);
        }
    }

    /**
     * Execute create post step
     */
    static async executeCreatePostStep(step, stepData) {
        try {
            const { content, platform, schedule_time } = step.config;
            
            // Process content with variables
            const processedContent = this.processTemplate(content, step.config.variables || {}, stepData);
            
            // Create post (placeholder implementation)
            console.log(`Creating post for ${platform}: ${processedContent.substring(0, 100)}...`);
            
            return {
                success: true,
                output: {
                    post_created: true,
                    platform: platform,
                    content: processedContent,
                    post_id: `post_${Date.now()}`
                }
            };
        } catch (error) {
            throw new Error(`Create post step failed: ${error.message}`);
        }
    }

    /**
     * Execute update metric step
     */
    static async executeUpdateMetricStep(step, stepData) {
        try {
            const { metric_name, value, operation } = step.config;
            
            // Update metric (placeholder implementation)
            console.log(`Updating metric ${metric_name}: ${operation} ${value}`);
            
            return {
                success: true,
                output: {
                    metric_updated: true,
                    metric_name: metric_name,
                    new_value: value,
                    operation: operation
                }
            };
        } catch (error) {
            throw new Error(`Update metric step failed: ${error.message}`);
        }
    }

    /**
     * Execute notification step
     */
    static async executeNotificationStep(step, stepData) {
        try {
            const { message, recipients, notification_type } = step.config;
            
            // Process message with variables
            const processedMessage = this.processTemplate(message, step.config.variables || {}, stepData);
            
            // Send notification (placeholder implementation)
            console.log(`Sending ${notification_type} notification: ${processedMessage}`);
            
            return {
                success: true,
                output: {
                    notification_sent: true,
                    type: notification_type,
                    message: processedMessage,
                    recipients: recipients
                }
            };
        } catch (error) {
            throw new Error(`Notification step failed: ${error.message}`);
        }
    }

    /**
     * Execute data analysis step
     */
    static async executeDataAnalysisStep(step, stepData) {
        try {
            const { analysis_type, data_source, parameters } = step.config;
            
            // Perform data analysis (placeholder implementation)
            console.log(`Performing ${analysis_type} analysis on ${data_source}`);
            
            // Mock analysis result
            const analysisResult = {
                type: analysis_type,
                data_source: data_source,
                result: `Analysis completed for ${analysis_type}`,
                insights: [`Insight 1 from ${analysis_type}`, `Insight 2 from ${analysis_type}`]
            };
            
            return {
                success: true,
                output: {
                    analysis_completed: true,
                    analysis_result: analysisResult
                }
            };
        } catch (error) {
            throw new Error(`Data analysis step failed: ${error.message}`);
        }
    }

    /**
     * Execute API call step
     */
    static async executeApiCallStep(step, stepData) {
        try {
            const { url, method, headers, body, response_mapping } = step.config;
            
            // Make API call (placeholder implementation)
            console.log(`Making ${method} API call to ${url}`);
            
            // Mock API response
            const apiResponse = {
                status: 200,
                data: { message: 'API call successful', timestamp: new Date().toISOString() }
            };
            
            return {
                success: true,
                output: {
                    api_call_successful: true,
                    response: apiResponse,
                    mapped_data: this.mapApiResponse(apiResponse, response_mapping)
                }
            };
        } catch (error) {
            throw new Error(`API call step failed: ${error.message}`);
        }
    }

    /**
     * Execute delay step
     */
    static async executeDelayStep(step, stepData) {
        try {
            const { duration, unit } = step.config;
            
            // Convert to milliseconds
            const delayMs = this.convertDurationToMs(duration, unit);
            
            console.log(`Delaying workflow execution for ${duration} ${unit}`);
            
            // Wait for the specified duration
            await new Promise(resolve => setTimeout(resolve, delayMs));
            
            return {
                success: true,
                output: {
                    delay_completed: true,
                    duration: duration,
                    unit: unit
                }
            };
        } catch (error) {
            throw new Error(`Delay step failed: ${error.message}`);
        }
    }

    /**
     * Execute conditional branch step
     */
    static async executeConditionalBranchStep(step, stepData) {
        try {
            const { condition, true_branch, false_branch } = step.config;
            
            // Evaluate condition
            const conditionResult = this.evaluateCondition(condition, stepData);
            
            console.log(`Conditional branch: ${condition} = ${conditionResult}`);
            
            return {
                success: true,
                output: {
                    condition_evaluated: true,
                    condition_result: conditionResult,
                    branch_taken: conditionResult ? 'true' : 'false'
                }
            };
        } catch (error) {
            throw new Error(`Conditional branch step failed: ${error.message}`);
        }
    }

    /**
     * Get workflow executions
     */
    static async getWorkflowExecutions(workflowId, { status, page = 1, limit = 20 } = {}) {
        try {
            let query = supabase
                .from('workflow_executions')
                .select('*')
                .eq('workflow_id', workflowId)
                .order('started_at', { ascending: false });

            // Apply filters
            if (status) {
                query = query.eq('status', status);
            }

            // Apply pagination
            const offset = (page - 1) * limit;
            query = query.range(offset, offset + limit - 1);

            const { data, error } = await query;

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in getWorkflowExecutions:', error);
            throw error;
        }
    }

    /**
     * Update execution status
     */
    static async updateExecutionStatus(executionId, status, errorDetails = null, stepResults = []) {
        try {
            const updateData = {
                status,
                updated_at: new Date().toISOString()
            };

            if (status === 'completed') {
                updateData.completed_at = new Date().toISOString();
            }

            if (errorDetails) {
                updateData.error_details = errorDetails;
            }

            if (stepResults.length > 0) {
                updateData.step_results = stepResults;
            }

            const { error } = await supabase
                .from('workflow_executions')
                .update(updateData)
                .eq('id', executionId);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error updating execution status:', error);
            throw error;
        }
    }

    /**
     * Update workflow success rate
     */
    static async updateWorkflowSuccessRate(workflowId) {
        try {
            // Get recent executions
            const { data: executions, error } = await supabase
                .from('workflow_executions')
                .select('status')
                .eq('workflow_id', workflowId)
                .gte('started_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()); // Last 30 days

            if (error) throw error;

            if (executions && executions.length > 0) {
                const successful = executions.filter(e => e.status === 'completed').length;
                const successRate = Math.round((successful / executions.length) * 10000) / 100; // 2 decimal places

                // Update workflow
                const { error: updateError } = await supabase
                    .from('automated_workflows')
                    .update({ 
                        success_rate: successRate,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', workflowId);

                if (updateError) throw updateError;
            }
        } catch (error) {
            console.error('Error updating workflow success rate:', error);
            // Don't throw error as this is not critical
        }
    }

    // ========================================
    // HELPER METHODS
    // ========================================

    /**
     * Process template with variables
     */
    static processTemplate(template, variables, stepData) {
        let processed = template;

        // Replace {{variable}} syntax
        Object.entries(variables).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'gi');
            processed = processed.replace(regex, value || '');
        });

        // Replace step data variables
        Object.entries(stepData).forEach(([key, value]) => {
            const regex = new RegExp(`{{step.${key}}}`, 'gi');
            processed = processed.replace(regex, value || '');
        });

        return processed;
    }

    /**
     * Evaluate step conditions
     */
    static evaluateStepConditions(conditions, stepResult) {
        if (!conditions) return true;

        // Simple condition evaluation
        // In a real implementation, this would be more sophisticated
        return conditions.every(condition => {
            const { field, operator, value } = condition;
            
            switch (operator) {
                case 'equals':
                    return stepResult[field] === value;
                case 'not_equals':
                    return stepResult[field] !== value;
                case 'greater_than':
                    return stepResult[field] > value;
                case 'less_than':
                    return stepResult[field] < value;
                case 'contains':
                    return String(stepResult[field]).includes(value);
                default:
                    return true;
            }
        });
    }

    /**
     * Evaluate condition
     */
    static evaluateCondition(condition, stepData) {
        const { field, operator, value } = condition;
        
        switch (operator) {
            case 'equals':
                return stepData[field] === value;
            case 'not_equals':
                return stepData[field] !== value;
            case 'greater_than':
                return stepData[field] > value;
            case 'less_than':
                return stepData[field] < value;
            case 'contains':
                return String(stepData[field]).includes(value);
            case 'exists':
                return stepData[field] !== undefined && stepData[field] !== null;
            case 'not_exists':
                return stepData[field] === undefined || stepData[field] === null;
            default:
                return false;
        }
    }

    /**
     * Map API response
     */
    static mapApiResponse(response, mapping) {
        if (!mapping) return response.data;

        const mapped = {};
        Object.entries(mapping).forEach(([key, path]) => {
            mapped[key] = this.getNestedValue(response.data, path);
        });

        return mapped;
    }

    /**
     * Get nested value from object
     */
    static getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    /**
     * Convert duration to milliseconds
     */
    static convertDurationToMs(duration, unit) {
        const multipliers = {
            'seconds': 1000,
            'minutes': 60 * 1000,
            'hours': 60 * 60 * 1000,
            'days': 24 * 60 * 60 * 1000
        };

        return duration * (multipliers[unit] || 1000);
    }

    /**
     * Get workflow types
     */
    static getWorkflowTypes() {
        return [
            'content_automation',
            'reporting',
            'engagement',
            'optimization',
            'data_processing',
            'notification',
            'integration',
            'custom'
        ];
    }

    /**
     * Get trigger types
     */
    static getTriggerTypes() {
        return [
            'scheduled',
            'event_based',
            'threshold_based',
            'manual',
            'webhook',
            'api_call'
        ];
    }

    /**
     * Get execution frequencies
     */
    static getExecutionFrequencies() {
        return [
            'on_demand',
            'daily',
            'weekly',
            'monthly',
            'quarterly',
            'yearly',
            'custom'
        ];
    }

    /**
     * Validate workflow configuration
     */
    static validateWorkflowConfiguration(workflowData) {
        const errors = [];

        if (!workflowData.name) {
            errors.push('Workflow name is required');
        }

        if (!workflowData.workflow_steps || !Array.isArray(workflowData.workflow_steps)) {
            errors.push('Workflow steps are required and must be an array');
        }

        if (workflowData.workflow_steps) {
            workflowData.workflow_steps.forEach((step, index) => {
                if (!step.action) {
                    errors.push(`Step ${index + 1} must have an action`);
                }
                
                if (!step.config) {
                    errors.push(`Step ${index + 1} must have configuration`);
                }
            });
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

module.exports = AutomatedWorkflowService;
