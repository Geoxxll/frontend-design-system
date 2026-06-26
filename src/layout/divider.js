import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-divider>
 *
 * Horizontal divider, optionally with centered text.
 *
 * @prop {String} text    - Optional label text
 * @prop {String} spacing - sm | md | lg (default: md)
 */
export class ClaudeDivider extends ClaudeBaseElement {
  static properties = {
    text: { type: String },
    spacing: { type: String, reflect: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      /* ── Plain divider ── */
      hr {
        border: none;
        border-top: 1px solid var(--claude-border);
        margin: 0;
      }

      /* ── Spacing variants ── */
      :host([spacing="sm"]) hr,
      :host([spacing="sm"]) .text-divider {
        margin-top: var(--claude-space-4);
        margin-bottom: var(--claude-space-4);
      }

      hr,
      .text-divider {
        margin-top: var(--claude-space-6);
        margin-bottom: var(--claude-space-6);
      }

      :host([spacing="lg"]) hr,
      :host([spacing="lg"]) .text-divider {
        margin-top: var(--claude-space-10);
        margin-bottom: var(--claude-space-10);
      }

      /* ── Text divider ── */
      .text-divider {
        display: flex;
        align-items: center;
        gap: var(--claude-space-3);
      }

      .line {
        flex: 1;
        height: 1px;
        background: var(--claude-border);
      }

      .label {
        color: var(--claude-text-tertiary);
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-xs);
        line-height: var(--claude-line-height-normal);
        white-space: nowrap;
        flex-shrink: 0;
      }
    `,
  ];

  constructor() {
    super();
    this.text = '';
    this.spacing = 'md';
  }

  render() {
    if (this.text) {
      return html`
        <div class="text-divider" role="separator" part="divider">
          <span class="line"></span>
          <span class="label">${this.text}</span>
          <span class="line"></span>
        </div>
      `;
    }
    return html`<hr part="divider" />`;
  }
}

customElements.define('claude-divider', ClaudeDivider);
