import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * Basic regex-based syntax highlighting.
 * Tokenizes code into spans with class names for styling.
 */
function highlightCode(code, language) {
  // Escape HTML first
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments: // ...
  escaped = escaped.replace(
    /(\/\/.*)/gm,
    '<span class="comment">$1</span>'
  );

  // Strings: '...' "..." `...`
  escaped = escaped.replace(
    /(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|`[^`]*?`|"[^"]*?"|'[^']*?')/g,
    '<span class="string">$1</span>'
  );

  // Numbers
  escaped = escaped.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="number">$1</span>'
  );

  // Keywords (JS-centric)
  const keywords = [
    'const', 'let', 'var', 'function', 'return', 'if', 'else',
    'for', 'while', 'import', 'export', 'from', 'class', 'new',
    'this', 'async', 'await', 'true', 'false', 'null', 'undefined',
  ];
  const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  escaped = escaped.replace(kwRegex, '<span class="keyword">$1</span>');

  return escaped;
}

/**
 * <claude-code>
 *
 * Syntax-highlighted code block with optional line numbers and copy button.
 *
 * @prop {String}  language     - Language name (e.g. 'javascript')
 * @prop {Boolean} line-numbers - Show line number gutter
 * @prop {Boolean} copyable     - Show copy-to-clipboard button (default: true)
 * @prop {String}  title        - Optional title in the top bar
 *
 * @slot default - Code text content
 */
export class ClaudeCode extends ClaudeBaseElement {
  static properties = {
    language: { type: String },
    'line-numbers': { type: Boolean, reflect: true, attribute: 'line-numbers' },
    copyable: { type: Boolean },
    title: { type: String },
    _copied: { type: Boolean, state: true },
    _code: { type: String, state: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
      }

      .code-block {
        background: var(--claude-bg-secondary);
        border: 1px solid var(--claude-border);
        border-radius: var(--claude-radius-md);
        overflow: hidden;
      }

      .top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--claude-space-2) var(--claude-space-4);
        border-bottom: 1px solid var(--claude-border);
        background: var(--claude-bg-elevated);
      }

      .top-bar-left {
        display: flex;
        align-items: center;
        gap: var(--claude-space-3);
      }

      .title {
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-sm);
        font-weight: var(--claude-font-weight-medium);
        color: var(--claude-text-primary);
      }

      .language-badge {
        font-family: var(--claude-font-mono);
        font-size: var(--claude-font-size-xs);
        color: var(--claude-text-tertiary);
      }

      .copy-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--claude-space-1);
        padding: var(--claude-space-1) var(--claude-space-2);
        background: transparent;
        border: 1px solid var(--claude-border);
        border-radius: var(--claude-radius-sm);
        color: var(--claude-text-tertiary);
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-xs);
        cursor: pointer;
        transition: all var(--claude-transition-fast);
      }

      .copy-btn:hover {
        background: var(--claude-bg-hover);
        color: var(--claude-text-secondary);
      }

      .copy-btn.copied {
        color: var(--claude-success);
        border-color: var(--claude-success);
      }

      .code-body {
        display: flex;
        overflow-x: auto;
      }

      .line-numbers {
        flex-shrink: 0;
        padding: var(--claude-space-4);
        padding-right: 0;
        text-align: right;
        user-select: none;
        color: var(--claude-text-tertiary);
        font-family: var(--claude-font-mono);
        font-size: var(--claude-font-size-sm);
        line-height: var(--claude-line-height-relaxed);
      }

      .line-numbers span {
        display: block;
      }

      pre {
        flex: 1;
        margin: 0;
        padding: var(--claude-space-4);
        font-family: var(--claude-font-mono);
        font-size: var(--claude-font-size-sm);
        line-height: var(--claude-line-height-relaxed);
        color: var(--claude-text-primary);
        overflow-x: auto;
        white-space: pre;
      }

      /* Syntax highlighting */
      .keyword { color: var(--claude-accent); }
      .string { color: var(--claude-success); }
      .comment { color: var(--claude-text-tertiary); font-style: italic; }
      .number { color: var(--claude-info); }

      /* Hidden slot to capture text content */
      .source {
        display: none;
      }
    `,
  ];

  constructor() {
    super();
    this.language = '';
    this['line-numbers'] = false;
    this.copyable = true;
    this.title = '';
    this._copied = false;
    this._code = '';
  }

  connectedCallback() {
    super.connectedCallback();
    // Grab text content from light DOM
    this._extractCode();
  }

  _extractCode() {
    // Use a microtask to let slotted content settle
    requestAnimationFrame(() => {
      const text = this.textContent?.trim() || '';
      if (text !== this._code) {
        this._code = text;
      }
    });
  }

  updated(changedProps) {
    super.updated(changedProps);
    // Re-extract code if slot content might have changed
    this._extractCode();
  }

  async _copy() {
    try {
      await navigator.clipboard.writeText(this._code);
      this._copied = true;
      setTimeout(() => {
        this._copied = false;
      }, 1500);
    } catch (e) {
      // Fallback: ignore clipboard errors
    }
  }

  render() {
    const lines = this._code.split('\n');
    const highlighted = highlightCode(this._code, this.language);
    const showTopBar = this.title || this.language || this.copyable;

    return html`
      <div class="code-block" part="code-block">
        ${showTopBar
          ? html`
            <div class="top-bar">
              <div class="top-bar-left">
                ${this.title ? html`<span class="title">${this.title}</span>` : null}
                ${this.language ? html`<span class="language-badge">${this.language}</span>` : null}
              </div>
              ${this.copyable
                ? html`
                  <button class="copy-btn ${this._copied ? 'copied' : ''}" @click=${this._copy}>
                    <claude-icon name="${this._copied ? 'check' : 'copy'}" size="sm"></claude-icon>
                    ${this._copied ? 'Copied' : 'Copy'}
                  </button>
                `
                : null}
            </div>
          `
          : null}
        <div class="code-body">
          ${this['line-numbers']
            ? html`
              <div class="line-numbers" aria-hidden="true">
                ${lines.map((_, i) => html`<span>${i + 1}</span>`)}
              </div>
            `
            : null}
          <pre part="pre"><code .innerHTML=${highlighted}></code></pre>
        </div>
      </div>
      <div class="source"><slot></slot></div>
    `;
  }
}

customElements.define('claude-code', ClaudeCode);
