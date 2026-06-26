import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-badge>
 *
 * Pill-shaped status badge.
 *
 * @prop {String}  variant - default | info | success | warning | error (default: default)
 * @prop {String}  size    - sm | md (default: md)
 * @prop {Boolean} dot     - Show a colored dot before text
 *
 * @slot default - Badge text
 */
export class ClaudeBadge extends ClaudeBaseElement {
  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    dot: { type: Boolean, reflect: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border-radius: var(--claude-radius-full);
        font-family: var(--claude-font-sans);
        font-weight: var(--claude-font-weight-medium);
        line-height: var(--claude-line-height-tight);
        white-space: nowrap;
      }

      /* ── Sizes ── */
      :host([size="sm"]) .badge,
      .badge.size-sm {
        padding: 2px 8px;
        font-size: var(--claude-font-size-xs);
      }

      .badge {
        padding: 4px 12px;
        font-size: var(--claude-font-size-sm);
      }

      /* ── Variant: default ── */
      .badge {
        background: var(--claude-bg-hover);
        color: var(--claude-text-secondary);
      }

      /* ── Variant: info ── */
      :host([variant="info"]) .badge {
        background: rgba(96, 165, 250, 0.12);
        color: var(--claude-info);
      }

      /* ── Variant: success ── */
      :host([variant="success"]) .badge {
        background: rgba(52, 211, 153, 0.12);
        color: var(--claude-success);
      }

      /* ── Variant: warning ── */
      :host([variant="warning"]) .badge {
        background: rgba(251, 191, 36, 0.12);
        color: var(--claude-warning);
      }

      /* ── Variant: error ── */
      :host([variant="error"]) .badge {
        background: rgba(248, 113, 113, 0.12);
        color: var(--claude-error);
      }

      /* ── Dot indicator ── */
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
        background: currentColor;
      }
    `,
  ];

  constructor() {
    super();
    this.variant = 'default';
    this.size = 'md';
    this.dot = false;
  }

  render() {
    return html`
      <span class="badge" part="badge">
        ${this.dot ? html`<span class="dot" aria-hidden="true"></span>` : null}
        <slot></slot>
      </span>
    `;
  }
}

customElements.define('claude-badge', ClaudeBadge);
