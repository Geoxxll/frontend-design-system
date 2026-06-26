import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-avatar>
 *
 * Circular avatar with image or initials fallback.
 *
 * @prop {String} src      - Image URL
 * @prop {String} initials - Fallback initials (1–2 chars)
 * @prop {String} size     - sm (32px) | md (40px) | lg (56px) (default: md)
 */
export class ClaudeAvatar extends ClaudeBaseElement {
  static properties = {
    src: { type: String },
    initials: { type: String },
    size: { type: String, reflect: true },
    _imgFailed: { type: Boolean, state: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: inline-flex;
      }

      .avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        font-family: var(--claude-font-sans);
        font-weight: var(--claude-font-weight-semibold);
        background: var(--claude-accent-subtle);
        color: var(--claude-accent);
      }

      /* ── Sizes ── */
      .avatar {
        width: 40px;
        height: 40px;
        font-size: var(--claude-font-size-sm);
      }

      :host([size="sm"]) .avatar {
        width: 32px;
        height: 32px;
        font-size: var(--claude-font-size-xs);
      }

      :host([size="lg"]) .avatar {
        width: 56px;
        height: 56px;
        font-size: var(--claude-font-size-lg);
      }

      /* ── Image ── */
      .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* ── Initials ── */
      .initials {
        user-select: none;
        text-transform: uppercase;
        line-height: 1;
      }
    `,
  ];

  constructor() {
    super();
    this.src = '';
    this.initials = '';
    this.size = 'md';
    this._imgFailed = false;
  }

  willUpdate(changedProps) {
    if (changedProps.has('src')) {
      this._imgFailed = false;
    }
  }

  _handleImgError() {
    this._imgFailed = true;
  }

  _renderContent() {
    if (this.src && !this._imgFailed) {
      return html`
        <img
          src=${this.src}
          alt=${this.initials || 'Avatar'}
          @error=${this._handleImgError}
        />
      `;
    }
    return html`<span class="initials">${this.initials}</span>`;
  }

  render() {
    return html`
      <div class="avatar" part="avatar" aria-label=${this.initials || 'Avatar'}>
        ${this._renderContent()}
      </div>
    `;
  }
}

customElements.define('claude-avatar', ClaudeAvatar);
