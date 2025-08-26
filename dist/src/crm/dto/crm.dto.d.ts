export declare enum LeadSource {
    WEBSITE = "WEBSITE",
    SOCIAL_MEDIA = "SOCIAL_MEDIA",
    EMAIL = "EMAIL",
    REFERRAL = "REFERRAL",
    PAID_ADS = "PAID_ADS",
    ORGANIC_SEARCH = "ORGANIC_SEARCH",
    EVENT = "EVENT",
    COLD_OUTREACH = "COLD_OUTREACH",
    OTHER = "OTHER"
}
export declare enum LeadStatus {
    NEW = "NEW",
    CONTACTED = "CONTACTED",
    QUALIFIED = "QUALIFIED",
    PROPOSAL_SENT = "PROPOSAL_SENT",
    NEGOTIATION = "NEGOTIATION",
    CLOSED_WON = "CLOSED_WON",
    CLOSED_LOST = "CLOSED_LOST",
    DISQUALIFIED = "DISQUALIFIED"
}
export declare enum DealStage {
    PROSPECT = "PROSPECT",
    QUALIFICATION = "QUALIFICATION",
    PROPOSAL = "PROPOSAL",
    NEGOTIATION = "NEGOTIATION",
    CLOSED_WON = "CLOSED_WON",
    CLOSED_LOST = "CLOSED_LOST"
}
export declare enum ActivityType {
    CALL = "CALL",
    EMAIL = "EMAIL",
    MEETING = "MEETING",
    PROPOSAL = "PROPOSAL",
    FOLLOW_UP = "FOLLOW_UP",
    DEMO = "DEMO",
    NEGOTIATION = "NEGOTIATION",
    CLOSE = "CLOSE"
}
export declare class CreateLeadDto {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    position?: string;
    source: LeadSource;
    notes?: string;
    assignedTo?: string;
    clientId?: string;
}
export declare class UpdateLeadDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    position?: string;
    source?: LeadSource;
    status?: LeadStatus;
    score?: number;
    notes?: string;
    assignedTo?: string;
    clientId?: string;
}
export declare class CreateContactDto {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    position?: string;
    tags?: string[];
    notes?: string;
}
export declare class UpdateContactDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    position?: string;
    tags?: string[];
    notes?: string;
}
export declare class CreateDealDto {
    title: string;
    description?: string;
    value?: number;
    stage: DealStage;
    probability?: number;
    leadId?: string;
    assignedTo?: string;
    clientId?: string;
    expectedClose?: string;
}
export declare class UpdateDealDto {
    title?: string;
    description?: string;
    value?: number;
    stage?: DealStage;
    probability?: number;
    leadId?: string;
    assignedTo?: string;
    clientId?: string;
    expectedClose?: string;
    closedAt?: string;
}
export declare class CreateActivityDto {
    leadId: string;
    type: ActivityType;
    title: string;
    notes?: string;
    scheduled?: string;
    completed?: string;
}
export declare class UpdateActivityDto {
    type?: ActivityType;
    title?: string;
    notes?: string;
    scheduled?: string;
    completed?: string;
}
