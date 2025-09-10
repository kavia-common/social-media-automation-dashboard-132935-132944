import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';
import { ScheduledPost } from '../../shared/models';

interface CalendarDay {
  date: Date;
  posts: ScheduledPost[];
  inMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  private data = inject(DataService);
  posts = this.data.posts;

  today = new Date();
  current = signal(new Date(this.today.getFullYear(), this.today.getMonth(), 1));

  // PUBLIC_INTERFACE
  prev() {
    const d = this.current();
    this.current.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  // PUBLIC_INTERFACE
  next() {
    const d = this.current();
    this.current.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  grid = computed<CalendarDay[]>(() => {
    const start = new Date(this.current().getFullYear(), this.current().getMonth(), 1);
    const end = new Date(this.current().getFullYear(), this.current().getMonth() + 1, 0);
    const days: CalendarDay[] = [];

    const startOffset = (start.getDay() + 6) % 7; // make Monday=0
    for (let i = 0; i < startOffset; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() - (startOffset - i));
      days.push({ date: d, posts: [], inMonth: false });
    }

    for (let d = 1; d <= end.getDate(); d++) {
      const day = new Date(this.current().getFullYear(), this.current().getMonth(), d);
      days.push({ date: day, posts: [], inMonth: true });
    }

    while (days.length % 7 !== 0) {
      const last = days[days.length - 1].date;
      const d = new Date(last);
      d.setDate(d.getDate() + 1);
      days.push({ date: d, posts: [], inMonth: false });
    }

    const posts = this.posts();
    const map = new Map<string, ScheduledPost[]>();
    for (const p of posts) {
      const key = new Date(p.scheduledAt).toDateString();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    return days.map(day => ({ ...day, posts: map.get(day.date.toDateString()) ?? [] }));
  });
}
