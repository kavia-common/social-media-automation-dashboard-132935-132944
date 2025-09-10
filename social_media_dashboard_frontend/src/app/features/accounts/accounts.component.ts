import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';
import { Platform } from '../../shared/models';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  private data = inject(DataService);
  accounts = this.data.accounts;

  username = '';
  platform: Platform = 'facebook';

  platforms: { id: Platform; label: string; icon: string }[] = [
    { id: 'facebook', label: 'Facebook', icon: '📘' },
    { id: 'instagram', label: 'Instagram', icon: '📸' },
    { id: 'youtube', label: 'YouTube', icon: '▶️' },
    { id: 'twitter', label: 'Twitter/X', icon: '🐦' },
  ];

  // PUBLIC_INTERFACE
  connect() {
    if (!this.username.trim()) return;
    this.data.connectAccount(this.platform, this.username.trim());
    this.username = '';
  }

  // PUBLIC_INTERFACE
  disconnect(id: string) {
    this.data.disconnectAccount(id);
  }
}
