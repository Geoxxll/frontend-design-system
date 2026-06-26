import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-card>
 *
 * Container card with optional header/footer and elevation levels.
 *
 * @prop {String}  elevation   - 0 | 1 | 2 | 3 (default: 1)
 * @prop {Boolean} interactive - Adds hover lift effect
 * @prop {String}  padding     - none | sm | md | lg (default: md)
 *
 * @slot header  - Card header area (border-bottom)
 * @slot default - Card body content
 * @slot footer  - Card footer area (border-top)
 */
export class ClaudeCard extends ClaudeBaseElement {
  static properties = {
    elevation: { type: String, reflect: true },
    interactive: { type: Boolean, reflect: true },
    padding: { type: String, reflect: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
      }

      .card {
        background: var(--claude-bg-elevated);
        border: 1px solid var(--claude-border);
        border-radius: var(--claude-radius-md);
        overflow: hidden;
        transition: all var(--claude-transition-normal);
      }

      /* ── Elevation ── */
      :host([elevation="0"]) .card {
        box-shadow: none;
      }

      .card {
        box-shadow: var(--claude-shadow-sm);
      }

      :host([elevation="2"]) .card {
        box-shadow: var(--claude-shadow-md);
      }

      :host([elevation="3"]) .card {
        box-shadow: var(--claude-shadow-lg);
      }

      /* ── Interactive ── */
      :host([interactive]) .card {
        cursor: pointer;
      }

      :host([interactive]) .card:hover {
        transform: translateY(-2px);
        box-shadow: var(--claude-shadow-md);
      }

      :host([interactive][elevation="2"]) .card:hover {
        box-shadow: var(--claude-shadow-lg);
      }

      :host([interactive][elevation="3"]) .card:hover {
        box-shadow: var(--claude-shadow-lg);
      }

      /* ── Padding: body ── */
      .body {
        padding: var(--claude-space-5);
      }

      :host([padding="none"]) .body {
        padding: 0;
      }

      :host([padding="sm"]) .body {
        padding: var(--claude-space-3);
      }

      :host([padding="lg"]) .body {
        padding: var(--claude-space-8);
      }

      /* ── Header ── */
      .header {
        padding: var(--claude-space-4) var(--claude-space-5);
        border-bottom: 1px solid var(--claude-border);
      }

      :host([padding="none"]) .header {
        padding: var(--claude-space-4) 0;
      }

      :host([padding="sm"]) .header {
        padding: var(--claude-space-3);
      }

      :host([padding="lg"]) .header {
        padding: var(--claude-space-5) var(--claude-space-8);
      }

      /* ── Footer ── */
      .footer {
        padding: var(--claude-space-4) var(--claude-space-5);
        border-top: 1px solid var(--claude-border);
      }

      :host([padding="none"]) .footer {
        padding: var(--claude-space-4) 0;
      }

      :host([padding="sm"]) .footer {
        padding: var(--claude-space-3);
      }

      :host([padding="lg"]) .footer {
        padding: var(--claude-space-5) var(--claude-space-8);
      }

      /* Hide empty header/footer slots */
      .header,
      .footer {
        display: none;
      }

      .header.has-content,
      .footer.has-content {
        display: block;
      }
    `,
  ];

  constructor() {
    super();
    this.elevation = '1';
    this.interactive = false;
    this.padding = 'md';
    this._hasHeader = false;
    this._hasFooter = false;
  }

  _handleHeaderSlotChange(e) {
    const nodes = e.target.assignedNodes({ flatten: true });
    this._hasHeader = nodes.length > 0;
    this.requestUpdate();
  }

  _handleFooterSlotChange(e) {
    const nodes = e.target.assignedNodes({ flatten: true });
    this._hasFooter = nodes.length > 0;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="card" part="card">
        <div class="header ${this._hasHeader ? 'has-content' : ''}">
          <slot name="header" @slotchange=${this._handleHeaderSlotChange}></slot>
        </div>
        <div class="body" part="body">
          <slot></slot>
        </div>
        <div class="footer ${this._hasFooter ? 'has-content' : ''}">
          <slot name="footer" @slotchange=${this._handleFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('claude-card', ClaudeCard);
