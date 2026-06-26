import { html, css, svg } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * Internal map of icon names to SVG path data.
 * Paths are Lucide/Feather-style: 24x24 viewBox, stroke-based.
 */
const ICON_MAP = {
  copy: [
    'M9 2H5a2 2 0 0 0-2 2v4',
    'M9 2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z',
    'M13 14h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z',
  ],
  check: ['M20 6L9 17l-5-5'],
  close: ['M18 6L6 18', 'M6 6l12 12'],
  'chevron-down': ['M6 9l6 6 6-6'],
  'chevron-right': ['M9 18l6-6-6-6'],
  search: ['M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'M21 21l-4.35-4.35'],
  sun: [
    'M12 1v2',
    'M12 21v2',
    'M4.22 4.22l1.42 1.42',
    'M18.36 18.36l1.42 1.42',
    'M1 12h2',
    'M21 12h2',
    'M4.22 19.78l1.42-1.42',
    'M18.36 5.64l1.42-1.42',
    'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  ],
  moon: ['M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'],
  terminal: ['M4 17l6-6-6-6', 'M12 19h8'],
  code: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  menu: ['M3 12h18', 'M3 6h18', 'M3 18h18'],
  'external-link': [
    'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
    'M15 3h6v6',
    'M10 14L21 3',
  ],
  loading: [
    'M12 2v4',
    'M12 18v4',
    'M4.93 4.93l2.83 2.83',
    'M16.24 16.24l2.83 2.83',
    'M2 12h4',
    'M18 12h4',
    'M4.93 19.07l2.83-2.83',
    'M16.24 7.76l2.83-2.83',
  ],
};

const SIZE_MAP = {
  sm: 16,
  md: 20,
  lg: 24,
};

/**
 * <claude-icon>
 *
 * Inline SVG icon component using a built-in icon map.
 *
 * @prop {String} name  - Icon name from ICON_MAP
 * @prop {String} size  - sm | md | lg (default: md)
 */
export class ClaudeIcon extends ClaudeBaseElement {
  static properties = {
    name: { type: String },
    size: { type: String },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        line-height: 0;
      }

      svg {
        display: block;
      }

      :host([name="loading"]) svg {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
  ];

  constructor() {
    super();
    this.name = '';
    this.size = 'md';
  }

  render() {
    const paths = ICON_MAP[this.name];
    if (!paths) return html``;

    const px = SIZE_MAP[this.size] ?? SIZE_MAP.md;

    return html`
      <svg
        width="${px}"
        height="${px}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        ${paths.map((d) => svg`<path d="${d}"></path>`)}
      </svg>
    `;
  }
}

customElements.define('claude-icon', ClaudeIcon);
