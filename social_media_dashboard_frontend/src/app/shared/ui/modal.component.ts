import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Simple presentational modal component.
 * Usage:
 * <ui-modal [open]="isOpen" (close)="isOpen=false" title="Create Post"> ... </ui-modal>
 */
@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="overlay" *ngIf="open" (click)="onBackdrop($event)">
    <div class="modal card" (click)="$event.stopPropagation()">
      <div class="modal-header">
        <div class="title">{{ title }}</div>
        <button class="icon-btn" (click)="close.emit()">✖</button>
      </div>
      <div class="modal-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.35);
      display: grid; place-items: center; z-index: 100;
      padding: 16px;
    }
    .modal { width: min(820px, 100%); max-height: 90vh; overflow: auto; }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
    .title { font-weight: 600; color: var(--secondary); }
    .icon-btn { border: 1px solid var(--border); background: #fff; border-radius: 8px; width: 32px; height: 32px; cursor: pointer; }
    .modal-body { padding-top: 8px; }
  `]
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();

  onBackdrop(evt: any) {
    // Prevent clicks on the overlay from propagating and close the modal
    if (evt && typeof evt.stopPropagation === 'function') {
      evt.stopPropagation();
    }
    this.close.emit();
  }
}
