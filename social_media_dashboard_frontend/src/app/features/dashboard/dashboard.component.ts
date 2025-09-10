import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private data = inject(DataService);
  analytics = this.data.analytics;
  posts = this.data.posts;
  upcoming = computed(() => this.posts().filter(p => p.status === 'scheduled').slice(0, 5));
  recent = computed(() => this.posts().slice(0, 5));
}
