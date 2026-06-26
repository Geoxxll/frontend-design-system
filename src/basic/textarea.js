import { html, css, nothing } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-textarea>
 *
 * Styled multi-line text area with label, helper text, error state,
 * and optional auto-resize behavior.
 *
 * @prop {String} label - Label text displayed above the textarea
 * @prop {String} placeholder - Placeholder text
 * @prop {String} value - Current textarea value
 * @prop {String} error - Error message (activates error styling)
 * @prop {Boolean} disabled - Disables the textarea
 * @prop {String} helper - Helper text displayed below the textarea
 * @prop {Number} rows - Number of visible rows (default: 3)
 * @prop {String} resize - CSS resize behavior: 'none' | 'vertical' | 'both' (default: 'vertical')
 * @prop {Boolean} auto-resize - Automatically grow/shrink to fit content
 *
 * @fires claude-input - On input, detail: { value }
 * @fires claude-change - On change, detail: { value }
 */
export class ClaudeTextarea extends ClaudeBaseElement {
  static properties = {
    label: { type: String },
    placeholder: { type: String },
    value: { type: String },
    error: { type: String },
    disabled: { type: Boolean, reflect: true },
    helper: { type: String },
    rows: { type: Number },
    resize: { type: String },
    autoResize: { type: Boolean, attribute: 'auto-resize' },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
        font-family: var(--claude-font-sans);
      }

      :host([disabled]) {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--claude-space-1);
      }

      label {
        font-size: var(--claude-font-size-sm);
        color: var(--claude-text-secondary);
        font-weight: var(--claude-font-weight-medium);
      }

      textarea {
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-md);
        color: var(--claude-text-primary);
        background: var(--claude-bg-elevated);
        border: 1px solid var(--claude-border);
        border-radius: var(--claude-radius-md);
        padding: var(--claude-space-3);
        outline: none;
        transition: border-color var(--claude-transition-fast),
                    box-shadow var(--claude-transition-fast);
        width: 100%;
        box-sizing: border-box;
        line-height: var(--claude-line-height-normal);
      }

      textarea::placeholder {
        color: var(--claude-text-tertiary);
      }

      textarea:focus {
        border-color: var(--claude-accent);
        box-shadow: var(--claude-shadow-glow);
      }

      textarea:disabled {
        cursor: not-allowed;
      }

      :host([disabled]) textarea {
        pointer-events: none;
      }

      .error textarea,
      .error textarea:focus {
        border-color: var(--claude-error);
        box-shadow: 0 0 20px rgba(248, 113, 113, 0.2);
      }

      .helper-text {
        font-size: var(--claude-font-size-xs);
        color: var(--claude-text-tertiary);
        margin: 0;
      }

      .error-text {
        font-size: var(--claude-font-size-xs);
        color: var(--claude-error);
        margin: 0;
      }
    `,
  ];

  constructor() {
    super();
    this.label = '';
    this.placeholder = '';
    this.value = '';
    this.error = '';
    this.disabled = false;
    this.helper = '';
    this.rows = 3;
    this.resize = 'vertical';
    this.autoResize = false;
  }

  _handleInput(e) {
    this.value = e.target.value;

    if (this.autoResize) {
      this._autoResizeTextarea(e.target);
    }

    this.dispatchEvent(
      new CustomEvent('claude-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _handleChange(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent('claude-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _autoResizeTextarea(textarea) {
    // Reset height to auto so that shrinking works when content is deleted
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  render() {
    const hasError = Boolean(this.error);
    const resizeValue = this.autoResize ? 'none' : this.resize;

    return html`
      <div class="wrapper ${hasError ? 'error' : ''}">
        ${this.label
          ? html`<label>${this.label}</label>`
          : nothing}
        <textarea
          .value=${this.value}
          .placeholder=${this.placeholder}
          .rows=${this.rows}
          ?disabled=${this.disabled}
          style="resize: ${resizeValue}"
          @input=${this._handleInput}
          @change=${this._handleChange}
        ></textarea>
        ${hasError
          ? html`<p class="error-text">${this.error}</p>`
          : this.helper
            ? html`<p class="helper-text">${this.helper}</p>`
            : nothing}
      </div>
    `;
  }
}

customElements.define('claude-textarea', ClaudeTextarea);
