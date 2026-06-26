import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-tab>
 *
 * A single tab panel. Must be used inside <claude-tabs>.
 *
 * @prop {String}  label  - Tab button text
 * @prop {Boolean} active - Whether this tab is active
 *
 * @slot default - Tab panel content
 */
export class ClaudeTab extends ClaudeBaseElement {
  static properties = {
    label: { type: String, reflect: true },
    active: { type: Boolean, reflect: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: none;
        font-family: var(--claude-font-sans);
        color: var(--claude-text-primary);
      }

      :host([active]) {
        display: block;
      }
    `,
  ];

  constructor() {
    super();
    this.label = '';
    this.active = false;
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('claude-tab', ClaudeTab);

/**
 * <claude-tabs>
 *
 * Tab container that manages tab buttons and content panels.
 * Renders a tab bar from each child <claude-tab>'s `label` prop.
 *
 * @fires claude-tab-change - { index: number, label: string }
 *
 * @slot default - <claude-tab> elements
 */
export class ClaudeTabs extends ClaudeBaseElement {
  static properties = {
    _activeIndex: { state: true },
    _tabs: { state: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
        font-family: var(--claude-font-sans);
      }

      /* ── Tab bar ── */
      .tab-bar {
        display: flex;
        border-bottom: 1px solid var(--claude-border);
        position: relative;
        gap: 0;
      }

      .tab-btn {
        position: relative;
        background: none;
        border: none;
        padding: var(--claude-space-3) var(--claude-space-5);
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-md);
        font-weight: var(--claude-font-weight-medium);
        color: var(--claude-text-secondary);
        cursor: pointer;
        transition: color var(--claude-transition-fast);
        white-space: nowrap;
      }

      .tab-btn:hover {
        color: var(--claude-text-primary);
      }

      .tab-btn[aria-selected="true"] {
        color: var(--claude-accent);
      }

      /* ── Sliding indicator ── */
      .indicator {
        position: absolute;
        bottom: -1px;
        height: 3px;
        background: var(--claude-accent);
        border-radius: 3px 3px 0 0;
        transition: left var(--claude-transition-normal),
                    width var(--claude-transition-normal);
      }

      /* ── Panel area ── */
      .panels {
        padding-top: var(--claude-space-4);
      }
    `,
  ];

  constructor() {
    super();
    this._activeIndex = 0;
    this._tabs = [];
    this._indicatorLeft = 0;
    this._indicatorWidth = 0;
  }

  firstUpdated() {
    this._syncTabs();
    this.updateComplete.then(() => this._updateIndicator());
  }

  _handleSlotChange() {
    this._syncTabs();
    this.updateComplete.then(() => this._updateIndicator());
  }

  _syncTabs() {
    const slot = this.shadowRoot.querySelector('slot:not([name])');
    if (!slot) return;
    const tabs = slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName === 'CLAUDE-TAB');

    this._tabs = tabs;

    // Find the initially active tab
    const activeIdx = tabs.findIndex((t) => t.active);
    if (activeIdx >= 0) {
      this._activeIndex = activeIdx;
    }

    // Sync active state to children
    tabs.forEach((tab, i) => {
      tab.active = i === this._activeIndex;
    });
  }

  _selectTab(index) {
    if (index === this._activeIndex) return;
    this._activeIndex = index;

    // Update child tabs
    this._tabs.forEach((tab, i) => {
      tab.active = i === index;
    });

    this.dispatchEvent(
      new CustomEvent('claude-tab-change', {
        bubbles: true,
        composed: true,
        detail: {
          index,
          label: this._tabs[index]?.label || '',
        },
      })
    );

    this.updateComplete.then(() => this._updateIndicator());
  }

  _updateIndicator() {
    const buttons = this.shadowRoot.querySelectorAll('.tab-btn');
    const activeBtn = buttons[this._activeIndex];
    if (!activeBtn) return;

    this._indicatorLeft = activeBtn.offsetLeft;
    this._indicatorWidth = activeBtn.offsetWidth;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="tab-bar" role="tablist" part="tab-bar">
        ${this._tabs.map(
          (tab, i) => html`
            <button
              class="tab-btn"
              role="tab"
              aria-selected=${i === this._activeIndex ? 'true' : 'false'}
              tabindex=${i === this._activeIndex ? '0' : '-1'}
              @click=${() => this._selectTab(i)}
            >
              ${tab.label}
            </button>
          `
        )}
        <div
          class="indicator"
          style="left: ${this._indicatorLeft}px; width: ${this._indicatorWidth}px;"
        ></div>
      </div>
      <div class="panels" part="panels">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}

customElements.define('claude-tabs', ClaudeTabs);
