import { html, css, nothing } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-input>
 *
 * Styled text input with label, helper text, and error state.
 *
 * @prop {String} type - 'text' | 'email' | 'password' | 'number' | 'search' (default: 'text')
 * @prop {String} label - Label text displayed above the input
 * @prop {String} placeholder - Placeholder text
 * @prop {String} value - Current input value
 * @prop {String} error - Error message (activates error styling)
 * @prop {Boolean} disabled - Disables the input
 * @prop {String} helper - Helper text displayed below the input
 *
 * @fires claude-input - On input, detail: { value }
 * @fires claude-change - On change, detail: { value }
 */
export class ClaudeInput extends ClaudeBaseElement {
  static properties = {
    type: { type: String, reflect: true },
    label: { type: String },
    placeholder: { type: String },
    value: { type: String },
    error: { type: String },
    disabled: { type: Boolean, reflect: true },
    helper: { type: String },
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

      input {
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
      }

      input::placeholder {
        color: var(--claude-text-tertiary);
      }

      input:focus {
        border-color: var(--claude-accent);
        box-shadow: var(--claude-shadow-glow);
      }

      input:disabled {
        cursor: not-allowed;
      }

      :host([disabled]) input {
        pointer-events: none;
      }

      .error input,
      .error input:focus {
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
    this.type = 'text';
    this.label = '';
    this.placeholder = '';
    this.value = '';
    this.error = '';
    this.disabled = false;
    this.helper = '';
  }

  _handleInput(e) {
    this.value = e.target.value;
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

  render() {
    const hasError = Boolean(this.error);
    return html`
      <div class="wrapper ${hasError ? 'error' : ''}">
        ${this.label
          ? html`<label>${this.label}</label>`
          : nothing}
        <input
          .type=${this.type}
          .value=${this.value}
          .placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        ${hasError
          ? html`<p class="error-text">${this.error}</p>`
          : this.helper
            ? html`<p class="helper-text">${this.helper}</p>`
            : nothing}
      </div>
    `;
  }
}

customElements.define('claude-input', ClaudeInput);
