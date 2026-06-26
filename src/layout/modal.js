import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-modal>
 *
 * Dialog overlay with backdrop, focus trap, and open/close animation.
 *
 * @prop {Boolean} open     - Whether the modal is visible
 * @prop {String}  size     - sm (400px) | md (560px) | lg (720px) (default: md)
 * @prop {Boolean} closable - Show close button and allow backdrop close (default: true)
 *
 * @slot title   - Modal title
 * @slot default - Modal body content
 * @slot actions - Modal footer actions (buttons, etc.)
 *
 * @fires claude-close - Dispatched when the modal requests to close
 */
export class ClaudeModal extends ClaudeBaseElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    closable: { type: Boolean, reflect: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: contents;
      }

      /* ── Backdrop ── */
      .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--claude-transition-normal),
                    visibility var(--claude-transition-normal);
      }

      :host([open]) .backdrop {
        opacity: 1;
        visibility: visible;
      }

      /* ── Panel ── */
      .panel {
        background: var(--claude-bg-elevated);
        border-radius: var(--claude-radius-lg);
        box-shadow: var(--claude-shadow-lg);
        max-height: 80vh;
        overflow-y: auto;
        width: 90vw;
        position: relative;
        transform: scale(0.95);
        opacity: 0;
        transition: transform var(--claude-transition-normal),
                    opacity var(--claude-transition-normal);
      }

      :host([open]) .panel {
        transform: scale(1);
        opacity: 1;
      }

      /* ── Sizes ── */
      .panel {
        max-width: 560px;
      }

      :host([size="sm"]) .panel {
        max-width: 400px;
      }

      :host([size="lg"]) .panel {
        max-width: 720px;
      }

      /* ── Header ── */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--claude-space-5) var(--claude-space-6);
        border-bottom: 1px solid var(--claude-border);
      }

      .title {
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-lg);
        font-weight: var(--claude-font-weight-semibold);
        color: var(--claude-text-primary);
        margin: 0;
        flex: 1;
        min-width: 0;
      }

      /* ── Close button ── */
      .close-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        color: var(--claude-text-secondary);
        border-radius: var(--claude-radius-sm);
        cursor: pointer;
        flex-shrink: 0;
        margin-left: var(--claude-space-3);
        font-size: var(--claude-font-size-lg);
        line-height: 1;
        transition: background var(--claude-transition-fast),
                    color var(--claude-transition-fast);
      }

      .close-btn:hover {
        background: var(--claude-bg-hover);
        color: var(--claude-text-primary);
      }

      /* ── Body ── */
      .body {
        padding: var(--claude-space-5) var(--claude-space-6);
        font-family: var(--claude-font-sans);
        color: var(--claude-text-primary);
      }

      /* ── Actions ── */
      .actions {
        padding: var(--claude-space-4) var(--claude-space-6);
        border-top: 1px solid var(--claude-border);
        display: none;
      }

      .actions.has-content {
        display: flex;
        justify-content: flex-end;
        gap: var(--claude-space-3);
      }
    `,
  ];

  constructor() {
    super();
    this.open = false;
    this.size = 'md';
    this.closable = true;
    this._hasActions = false;

    // Bind event handlers
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  updated(changedProperties) {
    if (changedProperties.has('open') && this.open) {
      // Focus first focusable element when opened
      this.updateComplete.then(() => this._trapFocus());
    }
  }

  _handleKeyDown(e) {
    if (!this.open) return;

    if (e.key === 'Escape' && this.closable) {
      this._requestClose();
      return;
    }

    if (e.key === 'Tab') {
      this._handleTabKey(e);
    }
  }

  _handleTabKey(e) {
    const focusable = this._getFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (this.shadowRoot.activeElement === first || document.activeElement === this) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (this.shadowRoot.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  _getFocusableElements() {
    const selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const shadowFocusable = [...this.shadowRoot.querySelectorAll(selectors)];
    return shadowFocusable;
  }

  _trapFocus() {
    const focusable = this._getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }

  _handleBackdropClick(e) {
    if (e.target === e.currentTarget && this.closable) {
      this._requestClose();
    }
  }

  _requestClose() {
    this.dispatchEvent(
      new CustomEvent('claude-close', {
        bubbles: true,
        composed: true,
      })
    );
    this.open = false;
  }

  _handleActionsSlotChange(e) {
    const nodes = e.target.assignedNodes({ flatten: true });
    this._hasActions = nodes.length > 0;
    this.requestUpdate();
  }

  render() {
    return html`
      <div
        class="backdrop"
        @click=${this._handleBackdropClick}
        aria-hidden=${!this.open}
      >
        <div
          class="panel"
          role="dialog"
          aria-modal="true"
          part="panel"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="header">
            <div class="title">
              <slot name="title"></slot>
            </div>
            ${this.closable
              ? html`
                  <button
                    class="close-btn"
                    @click=${this._requestClose}
                    aria-label="Close"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                      <line x1="4" y1="4" x2="12" y2="12"></line>
                      <line x1="12" y1="4" x2="4" y2="12"></line>
                    </svg>
                  </button>
                `
              : null}
          </div>
          <div class="body" part="body">
            <slot></slot>
          </div>
          <div class="actions ${this._hasActions ? 'has-content' : ''}">
            <slot name="actions" @slotchange=${this._handleActionsSlotChange}></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('claude-modal', ClaudeModal);
