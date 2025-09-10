import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/**
 * Root component providing the main application layout:
 * - Header (top bar)
 * - Sidebar navigation
 * - Content area rendering route content via RouterOutlet
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // PUBLIC_INTERFACE
  title = 'Social Media Automation Dashboard';
}
