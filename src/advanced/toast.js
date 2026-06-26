import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

const VARIANT_COLORS = {
  default: 'var(--claude-text-tertiary)',
  success: 'var(--claude-success)',
  warning: 'var(--claude-warning)',
  error: 'var(--claude-error)',
};

/**
 * <claude-toaster>
 *
 * Toast notification container with JS API for showing messages.
 *
 * @prop {String} position - 'top-right', 'top-left', 'bottom-right', 'bottom-left' (default: 'bottom-right')
 * @prop {Number} max      - Maximum visible toasts (default: 5)
 *
 * @method show({ message, variant, duration }) - Show a toast notification
 */
export class ClaudeToaster extends ClaudeBaseElement {
  static properties = {
    position: { type: String, reflect: true },
    max: { type: Number },
    _toasts: { type: Array, state: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        position: fixed;
        z-index: 10000;
        pointer-events: none;
      }

      :host([position="top-right"]),
      :host(:not([position])) {
        /* default bottom-right handled below */
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: var(--claude-space-2);
        pointer-events: none;
        position: fixed;
        max-width: 400px;
        width: 100%;
      }

      /* Position variants */
      .container.top-right {
        top: var(--claude-space-4);
        right: var(--claude-space-4);
        align-items: flex-end;
      }

      .container.top-left {
        top: var(--claude-space-4);
        left: var(--claude-space-4);
        align-items: flex-start;
      }

      .container.bottom-right {
        bottom: var(--claude-space-4);
        right: var(--claude-space-4);
        align-items: flex-end;
      }

      .container.bottom-left {
        bottom: var(--claude-space-4);
        left: var(--claude-space-4);
        align-items: flex-start;
      }

      .toast {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--claude-space-3);
        background: var(--claude-bg-elevated);
        box-shadow: var(--claude-shadow-md);
        border-radius: var(--claude-radius-md);
        padding: var(--claude-space-3) var(--claude-space-4);
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-sm);
        color: var(--claude-text-primary);
        pointer-events: auto;
        animation: slideIn var(--claude-transition-normal) ease forwards;
        max-width: 400px;
        width: auto;
      }

      .toast.dismissing {
        animation: slideOut var(--claude-transition-fast) ease forwards;
      }

      .toast-message {
        flex: 1;
      }

      .close-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        color: var(--claude-text-tertiary);
        cursor: pointer;
        padding: 2px;
        border-radius: var(--claude-radius-sm);
        transition: color var(--claude-transition-fast);
        flex-shrink: 0;
      }

      .close-btn:hover {
        color: var(--claude-text-primary);
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }
    `,
  ];

  constructor() {
    super();
    this.position = 'bottom-right';
    this.max = 5;
    this._toasts = [];
    this._idCounter = 0;
  }

  /**
   * Show a toast notification.
   * @param {Object} options
   * @param {string} options.message - Toast message text
   * @param {string} [options.variant='default'] - default | success | warning | error
   * @param {number} [options.duration=4000] - Auto-dismiss in ms. 0 = persistent.
   */
  show({ message, variant = 'default', duration = 4000 } = {}) {
    const id = ++this._idCounter;
    const borderColor = VARIANT_COLORS[variant] || VARIANT_COLORS.default;

    const toast = { id, message, variant, borderColor, dismissing: false };
    this._toasts = [...this._toasts, toast];

    // Enforce max
    while (this._toasts.length > this.max) {
      this._dismiss(this._toasts[0].id);
    }

    // Auto-dismiss
    if (duration > 0) {
      setTimeout(() => this._dismiss(id), duration);
    }

    return id;
  }

  _dismiss(id) {
    const toast = this._toasts.find((t) => t.id === id);
    if (!toast || toast.dismissing) return;

    // Mark as dismissing for animation
    this._toasts = this._toasts.map((t) =>
      t.id === id ? { ...t, dismissing: true } : t
    );

    // Remove after animation
    setTimeout(() => {
      this._toasts = this._toasts.filter((t) => t.id !== id);
    }, 150);
  }

  render() {
    const pos = this.position || 'bottom-right';

    return html`
      <div class="container ${pos}" part="container">
        ${this._toasts.map(
          (toast) => html`
            <div
              class="toast ${toast.dismissing ? 'dismissing' : ''}"
              style="border-left: 3px solid ${toast.borderColor}"
              part="toast"
            >
              <span class="toast-message">${toast.message}</span>
              <button class="close-btn" @click=${() => this._dismiss(toast.id)} aria-label="Close">
                <claude-icon name="close" size="sm"></claude-icon>
              </button>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('claude-toaster', ClaudeToaster);
