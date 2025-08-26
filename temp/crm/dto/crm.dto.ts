import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum, IsNumber, IsDateString, IsArray } from 'class-validator';

export enum LeadSource {
  WEBSITE = 'WEBSITE',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  EMAIL = 'EMAIL',
  REFERRAL = 'REFERRAL',
  PAID_ADS = 'PAID_ADS',
  ORGANIC_SEARCH = 'ORGANIC_SEARCH',
  EVENT = 'EVENT',
  COLD_OUTREACH = 'COLD_OUTREACH',
  OTHER = 'OTHER',
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL_SENT = 'PROPOSAL_SENT',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST',
  DISQUALIFIED = 'DISQUALIFIED',
}

export enum DealStage {
  PROSPECT = 'PROSPECT',
  QUALIFICATION = 'QUALIFICATION',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST',
}

export enum ActivityType {
  CALL = 'CALL',
  EMAIL = 'EMAIL',
  MEETING = 'MEETING',
  PROPOSAL = 'PROPOSAL',
  FOLLOW_UP = 'FOLLOW_UP',
  DEMO = 'DEMO',
  NEGOTIATION = 'NEGOTIATION',
  CLOSE = 'CLOSE',
}

// Lead DTOs
export class CreateLeadDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ enum: LeadSource })
  @IsEnum(LeadSource)
  source: LeadSource;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  clientId?: string;
}

export class UpdateLeadDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ enum: LeadSource, required: false })
  @IsOptional()
  @IsEnum(LeadSource)
  source?: LeadSource;

  @ApiProperty({ enum: LeadStatus, required: false })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  clientId?: string;
}

// Contact DTOs
export class CreateContactDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateContactDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

// Deal DTOs
export class CreateDealDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty({ enum: DealStage })
  @IsEnum(DealStage)
  stage: DealStage;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  probability?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  leadId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  clientId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  expectedClose?: string;
}

export class UpdateDealDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty({ enum: DealStage, required: false })
  @IsOptional()
  @IsEnum(DealStage)
  stage?: DealStage;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  probability?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  leadId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  clientId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  expectedClose?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  closedAt?: string;
}

// Activity DTOs
export class CreateActivityDto {
  @ApiProperty()
  @IsString()
  leadId: string;

  @ApiProperty({ enum: ActivityType })
  @IsEnum(ActivityType)
  type: ActivityType;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  scheduled?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  completed?: string;
}

export class UpdateActivityDto {
  @ApiProperty({ enum: ActivityType, required: false })
  @IsOptional()
  @IsEnum(ActivityType)
  type?: ActivityType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  scheduled?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  completed?: string;
}
