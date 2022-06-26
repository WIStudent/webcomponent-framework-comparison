import { html, css, LitElement, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import materialStyles from './materialStyles.scss';
import logo from './logo.svg';
import { MDCRipple } from '@material/ripple';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {

  static styles = css`
    ${unsafeCSS(materialStyles)}

    .my-card__media {
      background-image: url(${unsafeCSS(logo)});
      background-size: contain;
    }

    .my-card__counter {
      margin: 16px 16px 0 16px;
    }
  `

  #primaryAction: Ref<HTMLDivElement> = createRef();
  #increaseBtn: Ref<HTMLButtonElement> = createRef();
  #decreaseBtn: Ref<HTMLButtonElement> = createRef();


  @property({ type: Number })
  count = 0

  increase() {
    this.count++;
  }

  decrease() {
    this.count--;
  }

  render() {
    return html`
      <div class="mdc-card">
      <div
        ${ref(this.#primaryAction)}
        class="mdc-card__primary-action"
        tabindex="0"
      >
        <div class="my-card__media mdc-card__media mdc-card__media--16-9"></div>
        <div class="mdc-card__ripple"></div>
      </div>

      <div class="my-card__counter mdc-typography--body1">
        Counter: ${this.count}
      </div>

      <div class="mdc-card__actions">
        <button
          ${ref(this.#increaseBtn)}
          class="mdc-button mdc-card__action mdc-card__action--button"
          @click=${this.increase}
        >
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Increase</span>
        </button>
        <button
          ${ref(this.#decreaseBtn)}
          class="mdc-button mdc-card__action mdc-card__action--button"
          @click=${this.decrease}
        >
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Decrease</span>
        </button>
      </div>
    </div>
    `
  }

  protected firstUpdated(): void {
    if (this.#primaryAction.value) MDCRipple.attachTo(this.#primaryAction.value);
    if (this.#increaseBtn.value) MDCRipple.attachTo(this.#increaseBtn.value);
    if (this.#decreaseBtn.value) MDCRipple.attachTo(this.#decreaseBtn.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
