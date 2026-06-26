import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-sidebar>
 *
 * Collapsible sidebar navigation container.
 *
 * @prop {Boolean} collapsed - Shrinks sidebar to icon-only width
 * @prop {String}  width     - Custom width (default: '260px')
 *
 * @slot header  - Content at the top of the sidebar
 * @slot default - Sidebar items and groups
 */
export class ClaudeSidebar extends ClaudeBaseElement {
  static properties = {
    collapsed: { type: Boolean, reflect: true },
    width: { type: String },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
        height: 100%;
      }

      .sidebar {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--claude-bg-secondary);
        border-right: 1px solid var(--claude-border);
        transition: width var(--claude-transition-normal);
        overflow: hidden;
      }

      .header {
        padding: var(--claude-space-4);
        border-bottom: 1px solid var(--claude-border);
      }

      .content {
        flex: 1;
        overflow-y: auto;
        padding: var(--claude-space-2);
      }
    `,
  ];

  constructor() {
    super();
    this.collapsed = false;
    this.width = '260px';
  }

  render() {
    const w = this.collapsed ? '60px' : this.width;
    return html`
      <nav class="sidebar" style="width: ${w}" part="sidebar">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </nav>
    `;
  }
}

customElements.define('claude-sidebar', ClaudeSidebar);

/**
 * <claude-sidebar-item>
 *
 * Individual navigation item inside a sidebar.
 *
 * @prop {Boolean} active - Active/selected state
 * @prop {String}  icon   - Icon name for claude-icon
 *
 * @slot default - Item label text
 */
export class ClaudeSidebarItem extends ClaudeBaseElement {
  static properties = {
    active: { type: Boolean, reflect: true },
    icon: { type: String },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
      }

      .item {
        display: flex;
        align-items: center;
        gap: var(--claude-space-3);
        padding: var(--claude-space-2) var(--claude-space-3);
        border-radius: var(--claude-radius-sm);
        cursor: pointer;
        transition: all var(--claude-transition-fast);
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-sm);
        color: var(--claude-text-secondary);
        text-decoration: none;
        user-select: none;
      }

      .item:hover {
        background: var(--claude-bg-hover);
      }

      :host([active]) .item {
        background: var(--claude-accent-subtle);
        color: var(--claude-accent);
      }

      .icon {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
      }

      .label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ];

  constructor() {
    super();
    this.active = false;
    this.icon = '';
  }

  render() {
    return html`
      <div class="item" part="item">
        ${this.icon
          ? html`<span class="icon"><claude-icon name="${this.icon}" size="sm"></claude-icon></span>`
          : null}
        <span class="label"><slot></slot></span>
      </div>
    `;
  }
}

customElements.define('claude-sidebar-item', ClaudeSidebarItem);

/**
 * <claude-sidebar-group>
 *
 * Collapsible group of sidebar items with a label header.
 *
 * @prop {String} label - Group section header text
 *
 * @slot default - Sidebar items within this group
 */
export class ClaudeSidebarGroup extends ClaudeBaseElement {
  static properties = {
    label: { type: String },
    _open: { type: Boolean, state: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
        margin-top: var(--claude-space-2);
      }

      .group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--claude-space-2) var(--claude-space-3);
        cursor: pointer;
        user-select: none;
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-xs);
        font-weight: var(--claude-font-weight-semibold);
        color: var(--claude-text-tertiary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .group-header:hover {
        color: var(--claude-text-secondary);
      }

      .chevron {
        display: inline-flex;
        transition: transform var(--claude-transition-fast);
      }

      .chevron.open {
        transform: rotate(90deg);
      }

      .group-content {
        overflow: hidden;
      }

      .group-content.closed {
        display: none;
      }
    `,
  ];

  constructor() {
    super();
    this.label = '';
    this._open = true;
  }

  _toggle() {
    this._open = !this._open;
  }

  render() {
    return html`
      <div part="group">
        <div class="group-header" @click=${this._toggle}>
          <span>${this.label}</span>
          <span class="chevron ${this._open ? 'open' : ''}">
            <claude-icon name="chevron-right" size="sm"></claude-icon>
          </span>
        </div>
        <div class="group-content ${this._open ? '' : 'closed'}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('claude-sidebar-group', ClaudeSidebarGroup);
