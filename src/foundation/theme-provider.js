import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-theme>
 *
 * Theme provider that sets `data-theme` on itself and uses
 * `display: contents` so it doesn't affect layout.
 *
 * @prop {String} mode - 'dark' | 'light' | 'system' (default: 'system')
 * @fires claude-theme-change - When the resolved theme changes
 */
export class ClaudeTheme extends ClaudeBaseElement {
  static properties = {
    mode: { type: String, reflect: true },
    _resolved: { type: String, state: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: contents;
      }
    `,
  ];

  constructor() {
    super();
    this.mode = 'system';
    this._resolved = 'dark';
    this._mediaQuery = null;
    this._handleMediaChange = this._handleMediaChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._syncTheme();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._detachMediaListener();
  }

  willUpdate(changed) {
    if (changed.has('mode')) {
      this._syncTheme();
    }
  }

  /**
   * Resolve the current mode and set `data-theme` attribute.
   */
  _syncTheme() {
    this._detachMediaListener();

    if (this.mode === 'system') {
      this._mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      this._mediaQuery.addEventListener('change', this._handleMediaChange);
      this._applyResolved(this._mediaQuery.matches ? 'light' : 'dark');
    } else {
      this._applyResolved(this.mode === 'light' ? 'light' : 'dark');
    }
  }

  _handleMediaChange(e) {
    this._applyResolved(e.matches ? 'light' : 'dark');
  }

  _applyResolved(theme) {
    const previous = this._resolved;
    this._resolved = theme;
    this.setAttribute('data-theme', theme);

    if (previous !== theme) {
      this.dispatchEvent(
        new CustomEvent('claude-theme-change', {
          detail: { theme },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  _detachMediaListener() {
    if (this._mediaQuery) {
      this._mediaQuery.removeEventListener('change', this._handleMediaChange);
      this._mediaQuery = null;
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('claude-theme', ClaudeTheme);
