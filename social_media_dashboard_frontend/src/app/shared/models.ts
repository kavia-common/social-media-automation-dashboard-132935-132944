export type Platform = 'facebook' | 'instagram' | 'youtube' | 'twitter';

export interface ConnectedAccount {
  id: string;
  platform: Platform;
  username: string;
  connectedAt: string; // ISO date
  status: 'connected' | 'error';
}

export interface ScheduledPost {
  id: string;
  platforms: Platform[];
  caption: string;
  imageUrl?: string;
  scheduledAt: string; // ISO datetime
  status: 'scheduled' | 'posted' | 'failed' | 'draft';
  createdAt: string;
  updatedAt: string;
  performance?: {
    impressions?: number;
    clicks?: number;
    likes?: number;
    comments?: number;
    shares?: number;
  };
}

export interface AnalyticsSummary {
  totalImpressions: number;
  totalEngagements: number;
  topPlatform: Platform;
  postsThisMonth: number;
  followers: {
    facebook: number;
    instagram: number;
    youtube: number;
    twitter: number;
  }
}
