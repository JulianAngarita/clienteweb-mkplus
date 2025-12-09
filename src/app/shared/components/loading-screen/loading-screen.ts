import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(isVisible()) {
      <div class="loading-overlay">
        <div class="loading-content text-center">
          <div class="spinner-border text-dark mb-3" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          <p class="fw-semibold mb-0">{{ message() }}</p>
        </div>
      </div>
    }
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      inset: 0;
      background: rgba(255, 255, 255, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      backdrop-filter: blur(2px);
    }

    .loading-content {
      background: #fff;
      padding: 2rem 3rem;
      border: 1px solid #eee;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      border-radius: 0;
      transition: all 0.3s ease;
    }

    .spinner-border {
      width: 3rem;
      height: 3rem;
    }
  `]
})
export class LoadingScreenComponent {
  private _message = signal('Cargando...');
  @Input() set messageInput(value: string) {
    this._message.set(value);
  }
  message = computed(() => this._message());

  private _loading = signal(false);
  @Input() set loading(value: boolean) {
    this._loading.set(value);
  }
  isVisible = computed(() => this._loading());
}
