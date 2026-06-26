import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-tooltip>
 *
 * Tooltip that wraps slotted content and shows text on hover/focus.
 *
 * @prop {String} text     - Tooltip text to display
 * @prop {String} position - top | bottom | left | right (default: top)
 *
 * @slot default - Trigger content
 */
export class ClaudeTooltip extends ClaudeBaseElement {
  static properties = {
    text: { type: String },
    position: { type: String, reflect: true },
    _visible: { type: Boolean, state: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger {
        display: inline-block;
      }

      .tooltip {
        position: absolute;
        z-index: 1000;
        background: var(--claude-bg-elevated);
        color: var(--claude-text-primary);
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-xs);
        line-height: var(--claude-line-height-normal);
        padding: var(--claude-space-2) var(--claude-space-3);
        border-radius: var(--claude-radius-sm);
        box-shadow: var(--claude-shadow-md);
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--claude-transition-fast);
      }

      .tooltip.visible {
        opacity: 1;
      }

      /* ── Arrow ── */
      .tooltip::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--claude-bg-elevated);
        transform: rotate(45deg);
      }

      /* ── Position: top (default) ── */
      :host([position="top"]) .tooltip,
      :host(:not([position])) .tooltip {
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      }

      :host([position="top"]) .tooltip::after,
      :host(:not([position])) .tooltip::after {
        bottom: -4px;
        left: 50%;
        margin-left: -4px;
      }

      /* ── Position: bottom ── */
      :host([position="bottom"]) .tooltip {
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      }

      :host([position="bottom"]) .tooltip::after {
        top: -4px;
        left: 50%;
        margin-left: -4px;
      }

      /* ── Position: left ── */
      :host([position="left"]) .tooltip {
        right: calc(100% + 8px);
        top: 50%;
        transform: translateY(-50%);
      }

      :host([position="left"]) .tooltip::after {
        right: -4px;
        top: 50%;
        margin-top: -4px;
      }

      /* ── Position: right ── */
      :host([position="right"]) .tooltip {
        left: calc(100% + 8px);
        top: 50%;
        transform: translateY(-50%);
      }

      :host([position="right"]) .tooltip::after {
        left: -4px;
        top: 50%;
        margin-top: -4px;
      }
    `,
  ];

  constructor() {
    super();
    this.text = '';
    this.position = 'top';
    this._visible = false;
    this._showTimeout = null;
  }

  _show() {
    this._showTimeout = setTimeout(() => {
      this._visible = true;
    }, 200);
  }

  _hide() {
    clearTimeout(this._showTimeout);
    this._visible = false;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._showTimeout);
  }

  render() {
    return html`
      <div
        class="trigger"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focusin=${this._show}
        @focusout=${this._hide}
      >
        <slot></slot>
      </div>
      ${this.text
        ? html`
            <div
              class="tooltip ${this._visible ? 'visible' : ''}"
              role="tooltip"
              aria-hidden=${!this._visible}
            >
              ${this.text}
            </div>
          `
        : null}
    `;
  }
}

customElements.define('claude-tooltip', ClaudeTooltip);
