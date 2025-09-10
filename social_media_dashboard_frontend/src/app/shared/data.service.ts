import { Injectable, signal } from '@angular/core';
import { AnalyticsSummary, ConnectedAccount, Platform, ScheduledPost } from './models';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class DataService {
  /** Holds connected social accounts */
  accounts = signal<ConnectedAccount[]>([
    { id: '1', platform: 'facebook', username: 'brand.fb', connectedAt: new Date().toISOString(), status: 'connected' },
    { id: '2', platform: 'instagram', username: 'brand.ig', connectedAt: new Date().toISOString(), status: 'connected' },
  ]);

  /** Holds posts scheduled/posted */
  posts = signal<ScheduledPost[]>([
    {
      id: 'p1',
      platforms: ['instagram', 'facebook'],
      caption: 'Welcome to our new product launch 🚀',
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://picsum.photos/seed/socauto/600/400',
    },
    {
      id: 'p2',
      platforms: ['twitter'],
      caption: 'Daily tip: consistency wins. #marketing',
      scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      status: 'posted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      performance: { impressions: 3800, likes: 120, comments: 18, shares: 22, clicks: 90 },
    }
  ]);

  /** Simple analytics summary derived from posts + mock numbers */
  analytics = signal<AnalyticsSummary>({
    totalImpressions: 125000,
    totalEngagements: 8600,
    topPlatform: 'instagram',
    postsThisMonth: 28,
    followers: { facebook: 12040, instagram: 28340, youtube: 9800, twitter: 15420 }
  });

  // PUBLIC_INTERFACE
  connectAccount(platform: Platform, username: string): ConnectedAccount {
    const acc: ConnectedAccount = {
      id: Math.random().toString(36).slice(2),
      platform,
      username,
      connectedAt: new Date().toISOString(),
      status: 'connected',
    };
    this.accounts.update(prev => [...prev, acc]);
    return acc;
  }

  // PUBLIC_INTERFACE
  disconnectAccount(id: string) {
    this.accounts.update(prev => prev.filter(a => a.id !== id));
  }

  // PUBLIC_INTERFACE
  createOrUpdatePost(post: Partial<ScheduledPost> & { id?: string }): ScheduledPost {
    if (!post.id) {
      const created: ScheduledPost = {
        id: Math.random().toString(36).slice(2),
        platforms: post.platforms ?? [],
        caption: post.caption ?? '',
        imageUrl: post.imageUrl,
        scheduledAt: post.scheduledAt ?? new Date().toISOString(),
        status: post.status ?? 'scheduled',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.posts.update(prev => [created, ...prev]);
      return created;
    } else {
      let updated: ScheduledPost | undefined;
      this.posts.update(prev =>
        prev.map(p => {
          if (p.id === post.id) {
            updated = { ...p, ...post, updatedAt: new Date().toISOString() } as ScheduledPost;
            return updated!;
          }
          return p;
        })
      );
      return updated!;
    }
  }

  // PUBLIC_INTERFACE
  deletePost(id: string) {
    this.posts.update(prev => prev.filter(p => p.id !== id));
  }

  // PUBLIC_INTERFACE
  markPosted(id: string) {
    this.posts.update(prev =>
      prev.map(p => p.id === id ? { ...p, status: 'posted', updatedAt: new Date().toISOString() } : p)
    );
  }
}
