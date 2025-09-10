import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';
import { ScheduledPost } from '../../shared/models';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  private data = inject(DataService);
  posts = this.data.posts;

  editing: Record<string, boolean> = {};

  // PUBLIC_INTERFACE
  toggleEdit(p: ScheduledPost) {
    this.editing[p.id] = !this.editing[p.id];
  }

  // PUBLIC_INTERFACE
  save(p: ScheduledPost) {
    this.data.createOrUpdatePost({ id: p.id, caption: p.caption, imageUrl: p.imageUrl });
    this.editing[p.id] = false;
  }

  // PUBLIC_INTERFACE
  delete(id: string) {
    this.data.deletePost(id);
  }

  // PUBLIC_INTERFACE
  markPosted(id: string) {
    this.data.markPosted(id);
  }
}
