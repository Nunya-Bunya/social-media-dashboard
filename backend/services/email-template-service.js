const { supabase } = require('../config');

class EmailTemplateService {
    
    /**
     * Get email templates with filtering and pagination
     */
    static async getEmailTemplates({ business_id, template_type, category, is_active, page = 1, limit = 20 }) {
        try {
            let query = supabase
                .from('email_templates')
                .select('*')
                .eq('business_id', business_id)
                .order('created_at', { ascending: false });

            // Apply filters
            if (template_type) {
                query = query.eq('template_type', template_type);
            }
            
            if (category) {
                query = query.eq('category', category);
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
            console.error('Error in getEmailTemplates:', error);
            throw error;
        }
    }

    /**
     * Get a specific email template by ID
     */
    static async getEmailTemplateById(id) {
        try {
            const { data, error } = await supabase
                .from('email_templates')
                .select('*')
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
            console.error('Error in getEmailTemplateById:', error);
            throw error;
        }
    }

    /**
     * Create a new email template
     */
    static async createEmailTemplate(templateData) {
        try {
            // Validate required fields
            if (!templateData.name) {
                throw new Error('Template name is required');
            }

            // Set default values
            const template = {
                ...templateData,
                is_active: templateData.is_active !== undefined ? templateData.is_active : true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('email_templates')
                .insert([template])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in createEmailTemplate:', error);
            throw error;
        }
    }

    /**
     * Update an existing email template
     */
    static async updateEmailTemplate(id, updateData) {
        try {
            // Validate the template exists
            const existing = await this.getEmailTemplateById(id);
            if (!existing) {
                throw new Error('Email template not found');
            }

            const updatePayload = {
                ...updateData,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('email_templates')
                .update(updatePayload)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in updateEmailTemplate:', error);
            throw error;
        }
    }

    /**
     * Delete an email template
     */
    static async deleteEmailTemplate(id) {
        try {
            // Check if template exists
            const existing = await this.getEmailTemplateById(id);
            if (!existing) {
                throw new Error('Email template not found');
            }

            // Check if template is being used by campaigns
            const { data: campaignsUsingTemplate } = await supabase
                .from('email_campaigns')
                .select('id')
                .eq('template_id', id)
                .limit(1);

            if (campaignsUsingTemplate && campaignsUsingTemplate.length > 0) {
                throw new Error('Cannot delete template that is being used by campaigns. Consider deactivating instead.');
            }

            const { error } = await supabase
                .from('email_templates')
                .delete()
                .eq('id', id);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error in deleteEmailTemplate:', error);
            throw error;
        }
    }

    /**
     * Duplicate a template
     */
    static async duplicateTemplate(templateId, newName) {
        try {
            const originalTemplate = await this.getEmailTemplateById(templateId);
            if (!originalTemplate) {
                throw new Error('Original template not found');
            }

            // Create new template
            const newTemplate = {
                name: newName,
                subject_line: originalTemplate.subject_line,
                html_content: originalTemplate.html_content,
                text_content: originalTemplate.text_content,
                template_type: originalTemplate.template_type,
                category: originalTemplate.category,
                business_id: originalTemplate.business_id,
                variables: originalTemplate.variables,
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('email_templates')
                .insert([newTemplate])
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error in duplicateTemplate:', error);
            throw error;
        }
    }

    /**
     * Get template preview with sample data
     */
    static async getTemplatePreview(templateId, sampleData = {}) {
        try {
            const template = await this.getEmailTemplateById(templateId);
            if (!template) {
                throw new Error('Email template not found');
            }

            // Replace variables in content with sample data
            const previewHtml = this.replaceTemplateVariables(template.html_content, sampleData);
            const previewText = this.replaceTemplateVariables(template.text_content, sampleData);
            const previewSubject = this.replaceTemplateVariables(template.subject_line, sampleData);

            return {
                ...template,
                preview_html: previewHtml,
                preview_text: previewText,
                preview_subject: previewSubject,
                sample_data: sampleData
            };
        } catch (error) {
            console.error('Error in getTemplatePreview:', error);
            throw error;
        }
    }

    /**
     * Replace template variables with actual values
     */
    static replaceTemplateVariables(content, variables) {
        if (!content) return content;

        let processedContent = content;

        // Replace {{variable}} syntax
        Object.entries(variables).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'gi');
            processedContent = processedContent.replace(regex, value || '');
        });

        // Replace common default variables
        const defaultVariables = {
            '{{first_name}}': variables.first_name || 'John',
            '{{last_name}}': variables.last_name || 'Doe',
            '{{email}}': variables.email || 'john.doe@example.com',
            '{{company}}': variables.company || 'Company Name',
            '{{unsubscribe_link}}': '#unsubscribe',
            '{{web_version}}': '#web-version'
        };

        Object.entries(defaultVariables).forEach(([placeholder, value]) => {
            processedContent = processedContent.replace(new RegExp(placeholder, 'gi'), value);
        });

        return processedContent;
    }

    /**
     * Get template variables from content
     */
    static extractTemplateVariables(content) {
        if (!content) return [];

        const variableRegex = /{{([^}]+)}}/g;
        const variables = new Set();
        let match;

        while ((match = variableRegex.exec(content)) !== null) {
            variables.add(match[1]);
        }

        return Array.from(variables);
    }

    /**
     * Validate template content
     */
    static validateTemplateContent(templateData) {
        const errors = [];

        if (!templateData.name || templateData.name.trim().length === 0) {
            errors.push('Template name is required');
        }

        if (!templateData.subject_line || templateData.subject_line.trim().length === 0) {
            errors.push('Subject line is required');
        }

        if (!templateData.html_content || templateData.html_content.trim().length === 0) {
            errors.push('HTML content is required');
        }

        // Check for required unsubscribe link
        if (templateData.html_content && !templateData.html_content.includes('unsubscribe')) {
            errors.push('HTML content must include an unsubscribe link');
        }

        // Check for valid HTML structure
        if (templateData.html_content) {
            if (!templateData.html_content.includes('<html') && !templateData.html_content.includes('<body')) {
                errors.push('HTML content should include proper HTML structure');
            }
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Get template categories
     */
    static getTemplateCategories() {
        return [
            'newsletter',
            'announcement',
            'promotion',
            'welcome',
            'follow-up',
            'reminder',
            'event',
            'product',
            'service',
            'custom'
        ];
    }

    /**
     * Get template types
     */
    static getTemplateTypes() {
        return [
            'marketing',
            'transactional',
            'informational',
            'promotional',
            'educational',
            'newsletter'
        ];
    }

    /**
     * Search templates
     */
    static async searchTemplates(searchTerm, filters = {}) {
        try {
            let query = supabase
                .from('email_templates')
                .select('*');

            // Apply search term
            if (searchTerm) {
                query = query.or(`
                    name.ilike.%${searchTerm}%,
                    subject_line.ilike.%${searchTerm}%,
                    html_content.ilike.%${searchTerm}%
                `);
            }

            // Apply filters
            if (filters.business_id) {
                query = query.eq('business_id', filters.business_id);
            }
            
            if (filters.template_type) {
                query = query.eq('template_type', filters.template_type);
            }
            
            if (filters.category) {
                query = query.eq('category', filters.category);
            }
            
            if (filters.is_active !== undefined) {
                query = query.eq('is_active', filters.is_active);
            }

            const { data, error } = await query
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Error in searchTemplates:', error);
            throw error;
        }
    }

    /**
     * Get template usage statistics
     */
    static async getTemplateUsageStats(templateId) {
        try {
            // Get campaigns using this template
            const { data: campaigns, error: campaignsError } = await supabase
                .from('email_campaigns')
                .select('id, name, status, created_at')
                .eq('template_id', templateId);

            if (campaignsError) throw campaignsError;

            // Get send statistics
            const { data: sends, error: sendsError } = await supabase
                .from('email_sends')
                .select('delivery_status, open_status, click_status')
                .in('campaign_id', campaigns.map(c => c.id));

            if (sendsError) throw sendsError;

            // Calculate statistics
            const stats = {
                campaigns_using: campaigns.length,
                total_sends: sends.length,
                delivery_stats: this.countByField(sends, 'delivery_status'),
                open_stats: this.countByField(sends, 'open_status'),
                click_stats: this.countByField(sends, 'click_status'),
                campaigns: campaigns.map(c => ({
                    id: c.id,
                    name: c.name,
                    status: c.status,
                    created_at: c.created_at
                }))
            };

            return stats;
        } catch (error) {
            console.error('Error in getTemplateUsageStats:', error);
            throw error;
        }
    }

    /**
     * Get template analytics
     */
    static async getTemplateAnalytics(businessId) {
        try {
            // Get all templates for the business
            const { data: templates, error } = await supabase
                .from('email_templates')
                .select('id, name, template_type, category, is_active, created_at');

            if (error) throw error;

            if (!templates || templates.length === 0) {
                return {
                    total_templates: 0,
                    by_type: {},
                    by_category: {},
                    active_templates: 0,
                    recent_templates: []
                };
            }

            // Calculate analytics
            const analytics = {
                total_templates: templates.length,
                by_type: this.countByField(templates, 'template_type'),
                by_category: this.countByField(templates, 'category'),
                active_templates: templates.filter(t => t.is_active).length,
                recent_templates: templates
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 5)
                    .map(t => ({
                        id: t.id,
                        name: t.name,
                        type: t.template_type,
                        category: t.category,
                        created_at: t.created_at
                    }))
            };

            return analytics;
        } catch (error) {
            console.error('Error in getTemplateAnalytics:', error);
            throw error;
        }
    }

    /**
     * Helper method to count by field
     */
    static countByField(data, field) {
        if (!data) return {};
        
        return data.reduce((acc, item) => {
            const value = item[field] || 'unknown';
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Create default templates for a business
     */
    static async createDefaultTemplates(businessId) {
        try {
            const defaultTemplates = [
                {
                    name: 'Welcome Email',
                    subject_line: 'Welcome to {{company}}!',
                    template_type: 'welcome',
                    category: 'transactional',
                    html_content: this.getDefaultWelcomeTemplate(),
                    text_content: this.getDefaultWelcomeTextTemplate(),
                    variables: ['first_name', 'last_name', 'company'],
                    business_id: businessId
                },
                {
                    name: 'Newsletter Template',
                    subject_line: '{{company}} Newsletter - {{date}}',
                    template_type: 'newsletter',
                    category: 'marketing',
                    html_content: this.getDefaultNewsletterTemplate(),
                    text_content: this.getDefaultNewsletterTextTemplate(),
                    variables: ['first_name', 'company', 'date'],
                    business_id: businessId
                },
                {
                    name: 'Promotional Email',
                    subject_line: 'Special Offer from {{company}}',
                    template_type: 'promotion',
                    category: 'promotional',
                    html_content: this.getDefaultPromotionalTemplate(),
                    text_content: this.getDefaultPromotionalTextTemplate(),
                    variables: ['first_name', 'company', 'offer_code'],
                    business_id: businessId
                }
            ];

            const createdTemplates = [];

            for (const template of defaultTemplates) {
                try {
                    const created = await this.createEmailTemplate(template);
                    createdTemplates.push(created);
                } catch (error) {
                    console.error(`Error creating default template ${template.name}:`, error);
                }
            }

            return createdTemplates;
        } catch (error) {
            console.error('Error in createDefaultTemplates:', error);
            throw error;
        }
    }

    /**
     * Get default welcome template HTML
     */
    static getDefaultWelcomeTemplate() {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to {{company}}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="padding: 40px; text-align: center;">
                            <h1 style="color: #333333; margin-bottom: 20px;">Welcome to {{company}}!</h1>
                            <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                                Hi {{first_name}},<br><br>
                                Thank you for joining us! We're excited to have you as part of our community.
                            </p>
                            <div style="background-color: #007bff; padding: 15px 30px; border-radius: 5px; display: inline-block;">
                                <a href="#" style="color: #ffffff; text-decoration: none; font-weight: bold;">Get Started</a>
                            </div>
                            <p style="color: #999999; font-size: 14px; margin-top: 30px;">
                                If you have any questions, feel free to <a href="#" style="color: #007bff;">contact us</a>.
                            </p>
                        </td>
                    </tr>
                </table>
                <p style="color: #999999; font-size: 12px; margin-top: 20px;">
                    <a href="{{unsubscribe_link}}" style="color: #999999;">Unsubscribe</a> | 
                    <a href="{{web_version}}" style="color: #999999;">View in browser</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }

    /**
     * Get default welcome template text
     */
    static getDefaultWelcomeTextTemplate() {
        return `Welcome to {{company}}!

Hi {{first_name}},

Thank you for joining us! We're excited to have you as part of our community.

Get Started: [URL]

If you have any questions, feel free to contact us.

To unsubscribe, visit: {{unsubscribe_link}}`;
    }

    /**
     * Get default newsletter template HTML
     */
    static getDefaultNewsletterTemplate() {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{company}} Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="padding: 40px;">
                            <h1 style="color: #333333; margin-bottom: 20px;">{{company}} Newsletter</h1>
                            <p style="color: #666666; font-size: 16px; line-height: 1.6;">
                                Hi {{first_name}},<br><br>
                                Here's what's happening this week at {{company}}.
                            </p>
                            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
                            <h2 style="color: #333333;">Latest Updates</h2>
                            <p style="color: #666666; font-size: 16px; line-height: 1.6;">
                                [Your newsletter content goes here]
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="#" style="background-color: #007bff; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Read More</a>
                            </div>
                        </td>
                    </tr>
                </table>
                <p style="color: #999999; font-size: 12px; margin-top: 20px;">
                    <a href="{{unsubscribe_link}}" style="color: #999999;">Unsubscribe</a> | 
                    <a href="{{web_version}}" style="color: #999999;">View in browser</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }

    /**
     * Get default newsletter template text
     */
    static getDefaultNewsletterTextTemplate() {
        return `{{company}} Newsletter

Hi {{first_name}},

Here's what's happening this week at {{company}}.

Latest Updates
[Your newsletter content goes here]

Read More: [URL]

To unsubscribe, visit: {{unsubscribe_link}}`;
    }

    /**
     * Get default promotional template HTML
     */
    static getDefaultPromotionalTemplate() {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Special Offer from {{company}}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="padding: 40px; text-align: center;">
                            <h1 style="color: #333333; margin-bottom: 20px;">Special Offer!</h1>
                            <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                                Hi {{first_name}},<br><br>
                                We have a special offer just for you!
                            </p>
                            <div style="background-color: #28a745; padding: 20px; border-radius: 8px; margin: 30px 0;">
                                <h2 style="color: #ffffff; margin: 0;">Use Code: {{offer_code}}</h2>
                                <p style="color: #ffffff; margin: 10px 0 0 0;">Limited time offer!</p>
                            </div>
                            <div style="background-color: #007bff; padding: 15px 30px; border-radius: 5px; display: inline-block;">
                                <a href="#" style="color: #ffffff; text-decoration: none; font-weight: bold;">Claim Offer</a>
                            </div>
                        </td>
                    </tr>
                </table>
                <p style="color: #999999; font-size: 12px; margin-top: 20px;">
                    <a href="{{unsubscribe_link}}" style="color: #999999;">Unsubscribe</a> | 
                    <a href="{{web_version}}" style="color: #999999;">View in browser</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`;
    }

    /**
     * Get default promotional template text
     */
    static getDefaultPromotionalTextTemplate() {
        return `Special Offer from {{company}}!

Hi {{first_name}},

We have a special offer just for you!

Use Code: {{offer_code}}
Limited time offer!

Claim Offer: [URL]

To unsubscribe, visit: {{unsubscribe_link}}`;
    }
}

module.exports = EmailTemplateService;
