import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-button>
 *
 * Multi-variant button component.
 *
 * @prop {String}  variant    - primary | secondary | ghost | danger (default: primary)
 * @prop {String}  size       - sm | md | lg (default: md)
 * @prop {Boolean} disabled   - Disabled state
 * @prop {Boolean} loading    - Shows spinner & disables interaction
 * @prop {Boolean} full-width - Stretches to 100% width
 *
 * @slot default  - Button label text
 * @slot prefix   - Icon before text
 * @slot suffix   - Icon after text
 */
export class ClaudeButton extends ClaudeBaseElement {
  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    loading: { type: Boolean, reflect: true },
    'full-width': { type: Boolean, reflect: true, attribute: 'full-width' },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: inline-block;
      }

      :host([full-width]) {
        display: block;
      }

      :host([full-width]) button {
        width: 100%;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: 2px solid transparent;
        border-radius: var(--claude-radius-md);
        font-family: var(--claude-font-sans);
        font-weight: var(--claude-font-weight-medium);
        line-height: var(--claude-line-height-tight);
        cursor: pointer;
        transition: all var(--claude-transition-fast);
        position: relative;
        white-space: nowrap;
        text-decoration: none;
        -webkit-appearance: none;
        appearance: none;
      }

      /* ── Sizes ── */
      :host([size="sm"]) button,
      button.size-sm {
        padding: 6px 12px;
        font-size: var(--claude-font-size-sm);
      }

      button {
        padding: 8px 16px;
        font-size: var(--claude-font-size-md);
      }

      :host([size="lg"]) button,
      button.size-lg {
        padding: 12px 24px;
        font-size: var(--claude-font-size-lg);
      }

      /* ── Variant: Primary ── */
      button {
        background: var(--claude-accent);
        color: #fff;
        border-color: var(--claude-accent);
      }

      button:hover {
        background: var(--claude-accent-hover);
        border-color: var(--claude-accent-hover);
      }

      /* ── Variant: Secondary ── */
      :host([variant="secondary"]) button {
        background: transparent;
        color: var(--claude-accent);
        border-color: var(--claude-accent);
      }

      :host([variant="secondary"]) button:hover {
        background: var(--claude-accent-subtle);
      }

      /* ── Variant: Ghost ── */
      :host([variant="ghost"]) button {
        background: transparent;
        color: var(--claude-text-secondary);
        border-color: transparent;
      }

      :host([variant="ghost"]) button:hover {
        background: var(--claude-bg-hover);
      }

      /* ── Variant: Danger ── */
      :host([variant="danger"]) button {
        background: var(--claude-error);
        color: #fff;
        border-color: var(--claude-error);
      }

      :host([variant="danger"]) button:hover {
        opacity: 0.9;
      }

      /* ── Disabled ── */
      :host([disabled]) button,
      :host([loading]) button {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* ── Loading spinner ── */
      .spinner {
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* ── Slots ── */
      ::slotted([slot="prefix"]),
      ::slotted([slot="suffix"]) {
        display: inline-flex;
        align-items: center;
      }
    `,
  ];

  constructor() {
    super();
    this.variant = 'primary';
    this.size = 'md';
    this.disabled = false;
    this.loading = false;
    this['full-width'] = false;
  }

  render() {
    return html`
      <button
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading ? 'true' : 'false'}
        part="button"
      >
        ${this.loading
          ? html`<span class="spinner" aria-hidden="true"></span>`
          : html`<slot name="prefix"></slot>`}
        <slot></slot>
        <slot name="suffix"></slot>
      </button>
    `;
  }
}

customElements.define('claude-button', ClaudeButton);
