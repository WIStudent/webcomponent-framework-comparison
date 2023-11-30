<script lang="ts">
  import { onMount } from 'svelte';
  import { MDCRipple } from '@material/ripple';
  import logo from './assets/svelte.png';
  import css from './App.scss?inline';

  let primaryAction: HTMLDivElement;
  let increaseBtn: HTMLButtonElement;
  let decreaseBtn: HTMLButtonElement;

  export let count = 0;

  export function increase() {
    count += 1;
  }

  export function decrease() {
    count -= 1;
  }

  onMount(() => {
    MDCRipple.attachTo(primaryAction);
    MDCRipple.attachTo(increaseBtn);
    MDCRipple.attachTo(decreaseBtn);
  });
</script>

<svelte:options customElement="my-card"/>

<svelte:element this="style">{@html css}</svelte:element>
<div class="mdc-card">
  <div
    bind:this={primaryAction}
    class="mdc-card__primary-action"
    tabindex="0"
  >
    <div class="my-card__media mdc-card__media mdc-card__media--16-9" style="background-image: url({logo});"></div>
    <div class="mdc-card__ripple"></div>
  </div>

  <div class="my-card__counter mdc-typography--body1">
    Counter: {count}
  </div>

  <div class="mdc-card__actions">
    <button
      bind:this={increaseBtn}
      class="mdc-button mdc-card__action mdc-card__action--button"
      on:click={increase}
    >
      <div class="mdc-button__ripple"></div>
      <span class="mdc-button__label">Increase</span>
    </button>
    <button
      bind:this={decreaseBtn}
      class="mdc-button mdc-card__action mdc-card__action--button"
      on:click={decrease}
    >
      <div class="mdc-button__ripple"></div>
      <span class="mdc-button__label">Decrease</span>
    </button>
  </div>
</div>


<style>
  :host .my-card__media {
    background-size: contain;
  }
  :host .my-card__counter {
    margin: 16px 16px 0 16px;
  }
</style>
