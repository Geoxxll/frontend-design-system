import { html, css, nothing } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-toggle>
 *
 * Accessible toggle switch with label and spring animation.
 *
 * @prop {Boolean} checked - Toggle state (default: false)
 * @prop {Boolean} disabled - Disables interaction
 * @prop {String} label - Label text displayed next to the toggle
 * @prop {String} size - 'sm' | 'md' (default: 'md')
 *
 * @fires claude-change - When toggled, detail: { checked }
 */
export class ClaudeToggle extends ClaudeBaseElement {
  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    label: { type: String },
    size: { type: String, reflect: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: inline-flex;
        font-family: var(--claude-font-sans);
      }

      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }

      .toggle-wrapper {
        display: flex;
        align-items: center;
        gap: var(--claude-space-2);
        cursor: pointer;
        user-select: none;
      }

      .track {
        position: relative;
        border-radius: var(--claude-radius-full);
        background: var(--claude-bg-secondary);
        transition: background var(--claude-transition-fast);
        flex-shrink: 0;
      }

      /* md size (default) */
      :host([size="md"]) .track,
      :host(:not([size])) .track {
        width: 44px;
        height: 24px;
      }

      :host([size="md"]) .thumb,
      :host(:not([size])) .thumb {
        width: 18px;
        height: 18px;
      }

      :host([size="md"]) .thumb,
      :host(:not([size])) .thumb {
        top: 3px;
        left: 3px;
      }

      :host([size="md"][checked]) .thumb,
      :host(:not([size])[checked]) .thumb {
        transform: translateX(20px);
      }

      /* sm size */
      :host([size="sm"]) .track {
        width: 36px;
        height: 20px;
      }

      :host([size="sm"]) .thumb {
        width: 14px;
        height: 14px;
        top: 3px;
        left: 3px;
      }

      :host([size="sm"][checked]) .thumb {
        transform: translateX(16px);
      }

      /* Checked state */
      :host([checked]) .track {
        background: var(--claude-accent);
      }

      .thumb {
        position: absolute;
        background: #ffffff;
        border-radius: var(--claude-radius-full);
        transition: transform 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .label-text {
        font-size: var(--claude-font-size-sm);
        color: var(--claude-text-primary);
        line-height: var(--claude-line-height-normal);
      }

      /* Hidden checkbox for accessibility */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `,
  ];

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.label = '';
    this.size = 'md';
  }

  _handleClick() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('claude-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _handleKeydown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._handleClick();
    }
  }

  render() {
    return html`
      <div
        class="toggle-wrapper"
        role="switch"
        tabindex=${this.disabled ? -1 : 0}
        aria-checked=${this.checked ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-label=${this.label || nothing}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
      >
        <div class="track">
          <div class="thumb"></div>
        </div>
        ${this.label
          ? html`<span class="label-text">${this.label}</span>`
          : nothing}
      </div>
    `;
  }
}

customElements.define('claude-toggle', ClaudeToggle);
