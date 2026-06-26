import { LitElement, css, unsafeCSS } from 'lit';
import tokenStyles from '../tokens/tokens.css?inline';

/**
 * ClaudeBaseElement
 *
 * Base class for every component in the Claude Design System.
 * Automatically injects design-token CSS custom properties into
 * each component's Shadow DOM so that tokens are always available.
 */
export class ClaudeBaseElement extends LitElement {
  static styles = [css`${unsafeCSS(tokenStyles)}`];
}
