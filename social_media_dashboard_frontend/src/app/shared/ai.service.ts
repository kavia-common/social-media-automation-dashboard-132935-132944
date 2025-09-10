import { Injectable } from '@angular/core';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class AiService {
  /** Generate a caption given a brief prompt and optional tone/hashtags. */
  // PUBLIC_INTERFACE
  async generateCaption(prompt: string, tone: 'casual' | 'professional' | 'fun' = 'casual', hashtags: string[] = []): Promise<string> {
    const base = prompt.trim() || 'Engaging social post';
    const toneMap = {
      casual: 'Let’s talk!',
      professional: 'Insight:',
      fun: '🎉 Fun fact:',
    } as const;
    const suffix = hashtags.length ? ` ${hashtags.map(h => h.startsWith('#') ? h : `#${h}`).join(' ')}` : '';
    return `${toneMap[tone]} ${base}. ${this.randomCTA()}${suffix}`;
  }

  /** Generate an image URL (placeholder for real AI image generation). */
  // PUBLIC_INTERFACE
  async generateImage(prompt: string): Promise<string> {
    const seed = encodeURIComponent(prompt || 'social-automation');
    // Using picsum as a lightweight placeholder
    return `https://picsum.photos/seed/${seed}/${600}/${400}`;
  }

  private randomCTA() {
    const ctas = [
      ' Tap to learn more.',
      ' What do you think?',
      ' Share your thoughts below.',
      ' Join us on this journey!',
      ' Save for later.',
    ];
    return ctas[Math.floor(Math.random() * ctas.length)];
  }
}
