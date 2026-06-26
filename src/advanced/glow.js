import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

const SIZE_MAP = {
  subtle: 200,
  medium: 400,
  strong: 600,
};

const BLUR_MAP = {
  subtle: 80,
  medium: 100,
  strong: 120,
};

const POSITION_MAP = {
  'top-left': { top: '0', left: '0', transform: 'translate(-50%, -50%)' },
  'top-right': { top: '0', right: '0', transform: 'translate(50%, -50%)' },
  'bottom-left': { bottom: '0', left: '0', transform: 'translate(-50%, 50%)' },
  'bottom-right': { bottom: '0', right: '0', transform: 'translate(50%, 50%)' },
  center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
};

/**
 * <claude-glow>
 *
 * Decorative glowing radial gradient element for visual flair.
 *
 * @prop {String}  position  - Placement: top-left, top-right, bottom-left, bottom-right, center (default: top-right)
 * @prop {String}  intensity - Size/blur: subtle, medium, strong (default: medium)
 * @prop {Boolean} animated  - Enable pulse animation
 */
export class ClaudeGlow extends ClaudeBaseElement {
  static properties = {
    position: { type: String, reflect: true },
    intensity: { type: String, reflect: true },
    animated: { type: Boolean, reflect: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        position: absolute;
        pointer-events: none;
        z-index: 0;
      }

      .glow {
        border-radius: 50%;
        background: radial-gradient(circle, var(--claude-accent) 0%, transparent 70%);
        opacity: 0.3;
      }

      .glow.animated {
        animation: pulse 4s infinite ease-in-out;
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 0.3;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.45;
        }
      }
    `,
  ];

  constructor() {
    super();
    this.position = 'top-right';
    this.intensity = 'medium';
    this.animated = false;
  }

  render() {
    const size = SIZE_MAP[this.intensity] || SIZE_MAP.medium;
    const blur = BLUR_MAP[this.intensity] || BLUR_MAP.medium;
    const pos = POSITION_MAP[this.position] || POSITION_MAP['top-right'];

    const hostStyle = Object.entries(pos)
      .filter(([k]) => k !== 'transform')
      .map(([k, v]) => `${k}: ${v}`)
      .join('; ');

    return html`
      <style>
        :host {
          ${hostStyle};
        }
      </style>
      <div
        class="glow ${this.animated ? 'animated' : ''}"
        style="width: ${size}px; height: ${size}px; filter: blur(${blur}px); transform: ${pos.transform};"
        aria-hidden="true"
        part="glow"
      ></div>
    `;
  }
}

customElements.define('claude-glow', ClaudeGlow);
