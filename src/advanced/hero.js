import { html, css } from 'lit';
import { ClaudeBaseElement } from '../shared/base-element.js';

/**
 * <claude-hero>
 *
 * Hero section with title, subtitle, optional gradient backdrop, and action slot.
 *
 * @prop {String}  title    - Main heading text
 * @prop {String}  subtitle - Sub-heading text
 * @prop {Boolean} gradient - Show accent-colored radial gradient backdrop (default: true)
 * @prop {String}  align    - Text alignment: 'center' or 'left' (default: 'center')
 *
 * @slot actions - CTA buttons or links
 */
export class ClaudeHero extends ClaudeBaseElement {
  static properties = {
    title: { type: String },
    subtitle: { type: String },
    gradient: { type: Boolean },
    align: { type: String, reflect: true },
  };

  static styles = [
    ...ClaudeBaseElement.styles,
    css`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
      }

      .hero {
        position: relative;
        padding: var(--claude-space-16) var(--claude-space-6);
        z-index: 1;
      }

      :host([align="left"]) .hero {
        text-align: left;
      }

      :host(:not([align="left"])) .hero {
        text-align: center;
      }

      .gradient-bg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(232, 123, 53, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
      }

      .title {
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-3xl);
        font-weight: var(--claude-font-weight-bold);
        color: var(--claude-text-primary);
        line-height: var(--claude-line-height-tight);
        margin: 0 0 var(--claude-space-4);
      }

      .subtitle {
        font-family: var(--claude-font-sans);
        font-size: var(--claude-font-size-lg);
        color: var(--claude-text-secondary);
        line-height: var(--claude-line-height-normal);
        margin: 0 0 var(--claude-space-8);
        max-width: 640px;
      }

      :host(:not([align="left"])) .subtitle {
        margin-left: auto;
        margin-right: auto;
      }

      .actions {
        display: flex;
        gap: var(--claude-space-3);
      }

      :host(:not([align="left"])) .actions {
        justify-content: center;
      }
    `,
  ];

  constructor() {
    super();
    this.title = '';
    this.subtitle = '';
    this.gradient = true;
    this.align = 'center';
  }

  render() {
    return html`
      ${this.gradient ? html`<div class="gradient-bg" aria-hidden="true"></div>` : null}
      <div class="hero" part="hero">
        ${this.title ? html`<h1 class="title">${this.title}</h1>` : null}
        ${this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : null}
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('claude-hero', ClaudeHero);
