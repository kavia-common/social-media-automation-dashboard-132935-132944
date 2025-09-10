import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AiService } from '../../shared/ai.service';
import { DataService } from '../../shared/data.service';
import { Platform } from '../../shared/models';
import { ModalComponent } from '../../shared/ui/modal.component';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalComponent],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent {
  private ai = inject(AiService);
  private data = inject(DataService);

  prompt = '';
  caption = '';
  imageUrl = '';
  scheduleDate = this.formatLocalDateTime(new Date(Date.now() + 3600 * 1000));
  selected: Record<Platform, boolean> = { facebook: true, instagram: true, youtube: false, twitter: false };

  isGenerating = false;
  confirmOpen = false;

  platforms: { id: Platform; label: string; icon: string }[] = [
    { id: 'facebook', label: 'Facebook', icon: '📘' },
    { id: 'instagram', label: 'Instagram', icon: '📸' },
    { id: 'youtube', label: 'YouTube', icon: '▶️' },
    { id: 'twitter', label: 'Twitter/X', icon: '🐦' },
  ];

  selectedPlatforms = computed<Platform[]>(() => (Object.keys(this.selected) as Platform[]).filter(p => this.selected[p]));

  getSelectedBindingKey(p: Platform): keyof typeof this.selected {
    return p;
  }

  // PUBLIC_INTERFACE
  async generate() {
    this.isGenerating = true;
    try {
      const [cap, img] = await Promise.all([
        this.ai.generateCaption(this.prompt, 'fun', ['marketing', 'social']),
        this.ai.generateImage(this.prompt || 'social automator')
      ]);
      this.caption = cap;
      this.imageUrl = img;
    } finally {
      this.isGenerating = false;
    }
  }

  // PUBLIC_INTERFACE
  schedule() {
    const iso = new Date(this.scheduleDate).toISOString();
    const post = this.data.createOrUpdatePost({
      caption: this.caption,
      imageUrl: this.imageUrl,
      platforms: this.selectedPlatforms(),
      scheduledAt: iso,
      status: 'scheduled'
    });
    this.confirmOpen = true;
    return post;
  }

  private formatLocalDateTime(d: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}
