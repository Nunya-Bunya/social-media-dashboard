import React from 'react';
import { GeneratedCampaignPlan } from '../../types/campaigns';
interface AiCampaignGeneratorProps {
    tenantId: string;
    onCampaignGenerated: (campaign: GeneratedCampaignPlan) => void;
    onClose: () => void;
}
declare const AiCampaignGenerator: React.FC<AiCampaignGeneratorProps>;
export default AiCampaignGenerator;
