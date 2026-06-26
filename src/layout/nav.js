import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-nav>
 *
 * Top navigation bar with brand, center content, and actions slots.
 *
 * @slot brand   - Left-aligned brand/logo area
 * @slot default - Center-aligned navigation items
 * @slot actions - Right-aligned action buttons
 */
export class ClaudeNav extends ClaudeBaseElement {
  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
      }

      .nav {
        display: flex;
        align-items: center;
        height: 56px;
        padding: 0 var(--claude-space-4);
        background: var(--claude-bg-primary);
        border-bottom: 1px solid var(--claude-border);
        font-family: var(--claude-font-sans);
      }

      .brand {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }

      .center {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        gap: var(--claude-space-1);
      }

      .actions {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        gap: var(--claude-space-2);
      }
    `,
  ];

  render() {
    return html`
      <nav class="nav" part="nav">
        <div class="brand">
          <slot name="brand"></slot>
        </div>
        <div class="center">
          <slot></slot>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </nav>
    `;
  }
}

customElements.define('claude-nav', ClaudeNav);

/**
 * <claude-nav-item>
 *
 * Individual navigation item inside a nav bar.
 *
 * @prop {Boolean} active - Active/selected state with accent underline
 *
 * @slot default - Nav item label text
 */
export class ClaudeNavItem extends ClaudeBaseElement {
  static properties = {
    active: { type: Boolean, reflect: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: inline-flex;
      }

      .nav-item {
        display: inline-flex;
        align-items: center;
        height: 56px;
        padding: 0 var(--claude-space-3);
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-sm);
        font-weight: var(--claude-font-weight-medium);
        color: var(--claude-text-secondary);
        text-decoration: none;
        cursor: pointer;
        transition: color var(--claude-transition-fast);
        border-bottom: 2px solid transparent;
        user-select: none;
        box-sizing: border-box;
      }

      .nav-item:hover {
        color: var(--claude-text-primary);
      }

      :host([active]) .nav-item {
        color: var(--claude-accent);
        border-bottom-color: var(--claude-accent);
      }
    `,
  ];

  constructor() {
    super();
    this.active = false;
  }

  render() {
    return html`
      <span class="nav-item" part="nav-item">
        <slot></slot>
      </span>
    `;
  }
}

customElements.define('claude-nav-item', ClaudeNavItem);
