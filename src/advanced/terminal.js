import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-terminal>
 *
 * macOS-style terminal window with animated typing support.
 *
 * @prop {String}  title        - Window title (default: 'Terminal')
 * @prop {Number}  typing-speed - Typing animation speed in ms (default: 50)
 * @prop {Boolean} animated     - Enable typing animation
 *
 * @slot default - Terminal lines (<claude-terminal-line>)
 */
export class ClaudeTerminal extends ClaudeBaseElement {
  static properties = {
    title: { type: String },
    'typing-speed': { type: Number, attribute: 'typing-speed' },
    animated: { type: Boolean },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
      }

      .terminal {
        background: var(--claude-bg-primary);
        border: 1px solid var(--claude-border);
        border-radius: var(--claude-radius-md);
        overflow: hidden;
      }

      .chrome {
        display: flex;
        align-items: center;
        padding: var(--claude-space-3) var(--claude-space-4);
        background: var(--claude-bg-elevated);
        border-bottom: 1px solid var(--claude-border);
        position: relative;
      }

      .dots {
        display: flex;
        gap: var(--claude-space-2);
      }

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }

      .dot-red { background: #FF5F56; }
      .dot-yellow { background: #FFBD2E; }
      .dot-green { background: #27C93F; }

      .chrome-title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-xs);
        color: var(--claude-text-tertiary);
      }

      .body {
        padding: var(--claude-space-4);
        font-family: var(--claude-font-mono);
        font-size: var(--claude-font-size-sm);
        line-height: var(--claude-line-height-relaxed);
        min-height: 60px;
      }
    `,
  ];

  constructor() {
    super();
    this.title = 'Terminal';
    this['typing-speed'] = 50;
    this.animated = false;
  }

  render() {
    return html`
      <div class="terminal" part="terminal">
        <div class="chrome">
          <div class="dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <span class="chrome-title">${this.title}</span>
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('claude-terminal', ClaudeTerminal);

/**
 * <claude-terminal-line>
 *
 * A single line in the terminal. Can be a command or output.
 *
 * @prop {String}  prompt - Prompt character (e.g. '$')
 * @prop {String}  type   - 'command' or 'output'
 * @prop {Boolean} cursor - Show blinking cursor
 *
 * @slot default - Line text content
 */
export class ClaudeTerminalLine extends ClaudeBaseElement {
  static properties = {
    prompt: { type: String },
    type: { type: String, reflect: true },
    cursor: { type: Boolean, reflect: true },
    _displayText: { type: String, state: true },
    _animating: { type: Boolean, state: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
        font-family: var(--claude-font-mono);
        font-size: var(--claude-font-size-sm);
        line-height: var(--claude-line-height-relaxed);
      }

      .line {
        display: flex;
        gap: var(--claude-space-2);
        white-space: pre-wrap;
        word-break: break-all;
      }

      .prompt {
        color: var(--claude-accent);
        flex-shrink: 0;
        user-select: none;
      }

      .content {
        color: var(--claude-text-primary);
      }

      :host([type="output"]) .content {
        color: var(--claude-text-secondary);
      }

      .cursor {
        display: inline-block;
        animation: blink 1s step-end infinite;
        color: var(--claude-accent);
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      .hidden-slot {
        display: none;
      }
    `,
  ];

  constructor() {
    super();
    this.prompt = '';
    this.type = 'command';
    this.cursor = false;
    this._displayText = '';
    this._animating = false;
    this._fullText = '';
    this._animationTimer = null;
  }

  connectedCallback() {
    super.connectedCallback();
    requestAnimationFrame(() => {
      this._fullText = this.textContent?.trim() || '';
      const terminal = this.closest('claude-terminal');
      if (terminal?.animated && this.type === 'command') {
        this._startAnimation(terminal['typing-speed'] || 50);
      } else {
        this._displayText = this._fullText;
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._animationTimer) {
      clearInterval(this._animationTimer);
      this._animationTimer = null;
    }
  }

  _startAnimation(speed) {
    this._animating = true;
    this._displayText = '';
    let index = 0;
    this._animationTimer = setInterval(() => {
      if (index < this._fullText.length) {
        this._displayText = this._fullText.slice(0, index + 1);
        index++;
      } else {
        clearInterval(this._animationTimer);
        this._animationTimer = null;
        this._animating = false;
      }
    }, speed);
  }

  render() {
    return html`
      <div class="line" part="line">
        ${this.prompt ? html`<span class="prompt">${this.prompt}</span>` : null}
        <span class="content">${this._displayText}${this.cursor || this._animating ? html`<span class="cursor">|</span>` : null}</span>
      </div>
      <div class="hidden-slot"><slot></slot></div>
    `;
  }
}

customElements.define('claude-terminal-line', ClaudeTerminalLine);
