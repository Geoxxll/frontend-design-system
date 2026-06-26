import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-tag>
 *
 * Compact label, optionally removable.
 *
 * @prop {Boolean} removable - Show a close (x) button
 * @prop {String}  variant   - default | accent (default: default)
 *
 * @slot default - Tag text
 * @fires claude-remove - Dispatched when the remove button is clicked
 */
export class ClaudeTag extends ClaudeBaseElement {
  static properties = {
    removable: { type: Boolean, reflect: true },
    variant: { type: String, reflect: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
      }

      .tag {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: var(--claude-radius-sm);
        border: 1px solid var(--claude-border);
        background: var(--claude-bg-secondary);
        color: var(--claude-text-primary);
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-sm);
        font-weight: var(--claude-font-weight-medium);
        line-height: var(--claude-line-height-tight);
        white-space: nowrap;
      }

      /* ── Variant: accent ── */
      :host([variant="accent"]) .tag {
        background: var(--claude-accent-subtle);
        color: var(--claude-accent);
        border-color: transparent;
      }

      /* ── Remove button ── */
      .remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        margin-left: 2px;
        width: 16px;
        height: 16px;
        border-radius: var(--claude-radius-sm);
        opacity: 0.6;
        transition: all var(--claude-transition-fast);
        font-size: 14px;
        line-height: 1;
      }

      .remove:hover {
        opacity: 1;
        background: var(--claude-bg-hover);
      }

      .remove svg {
        width: 12px;
        height: 12px;
      }
    `,
  ];

  constructor() {
    super();
    this.removable = false;
    this.variant = 'default';
  }

  _handleRemove() {
    this.dispatchEvent(
      new CustomEvent('claude-remove', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <span class="tag" part="tag">
        <slot></slot>
        ${this.removable
          ? html`
              <button
                class="remove"
                aria-label="Remove"
                @click=${this._handleRemove}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            `
          : null}
      </span>
    `;
  }
}

customElements.define('claude-tag', ClaudeTag);
