import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-skeleton>
 *
 * Placeholder loading skeleton with shimmer animation.
 *
 * @prop {String} variant - line | circle | rect (default: line)
 * @prop {String} width   - CSS width (default: 100%)
 * @prop {String} height  - CSS height (default: 16px)
 */
export class ClaudeSkeleton extends ClaudeBaseElement {
  static properties = {
    variant: { type: String, reflect: true },
    width: { type: String },
    height: { type: String },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
      }

      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }

      .skeleton {
        position: relative;
        overflow: hidden;
        background: var(--claude-bg-secondary);
        border-radius: var(--claude-radius-sm);
      }

      .skeleton::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.06) 50%,
          transparent 100%
        );
        animation: shimmer 1.5s ease-in-out infinite;
      }

      /* ── Variant: circle ── */
      :host([variant="circle"]) .skeleton {
        border-radius: 50%;
      }

      /* ── Variant: line ── */
      :host(:not([variant])) .skeleton,
      :host([variant="line"]) .skeleton {
        border-radius: var(--claude-radius-sm);
      }
    `,
  ];

  constructor() {
    super();
    this.variant = 'line';
    this.width = '100%';
    this.height = '16px';
  }

  render() {
    const w = this.variant === 'circle' ? this.height : this.width;
    return html`
      <div
        class="skeleton"
        part="skeleton"
        role="presentation"
        aria-label="Loading"
        style="width: ${w}; height: ${this.height};"
      ></div>
    `;
  }
}

customElements.define('claude-skeleton', ClaudeSkeleton);
