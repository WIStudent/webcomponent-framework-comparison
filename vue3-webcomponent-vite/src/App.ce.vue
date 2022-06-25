<template>
  <div class="mdc-card">
  <div
    ref="primaryAction"
    class="mdc-card__primary-action"
    tabindex="0"
  >
    <div class="my-card__media mdc-card__media mdc-card__media--16-9" :style="mediaStyle"></div>
    <div class="mdc-card__ripple"></div>
  </div>

  <div class="my-card__counter mdc-typography--body1">
    Counter: {{count}}
  </div>

  <div class="mdc-card__actions">
    <button
      ref="increaseBtn"
      class="mdc-button mdc-card__action mdc-card__action--button"
      @click="increase"
    >
      <div class="mdc-button__ripple"></div>
      <span class="mdc-button__label">Increase</span>
    </button>
    <button
      ref="decreaseBtn"
      class="mdc-button mdc-card__action mdc-card__action--button"
      @click="decrease"
    >
      <div class="mdc-button__ripple"></div>
      <span class="mdc-button__label">Decrease</span>
    </button>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { MDCRipple } from '@material/ripple';
import logo from './assets/logo.png';


export default defineComponent({
  setup() {
    const count = ref(0);
    const primaryAction = ref<HTMLDivElement|null>(null);
    const increaseBtn = ref<HTMLButtonElement|null>(null);
    const decreaseBtn = ref<HTMLButtonElement|null>(null);

    const mediaStyle = ref({
      'background-image': `url(${logo})`
    });

    const increase = () => {
      count.value = count.value + 1;
    };

    const decrease = () => {
      count.value = count.value - 1;
    };

    onMounted(() => {
      if(primaryAction.value) MDCRipple.attachTo(primaryAction.value);
      if(increaseBtn.value) MDCRipple.attachTo(increaseBtn.value);
      if(decreaseBtn.value) MDCRipple.attachTo(decreaseBtn.value);
    });

    return {mediaStyle, count, increase, decrease, primaryAction, increaseBtn, decreaseBtn};
  }
});
</script>

<style lang="scss">
@use "@material/card";
@use "@material/button/styles";
@use "@material/typography/mdc-typography";

@include card.core-styles;

.my-card__media {
  background-size: contain;
}
.my-card__counter {
  margin: 16px 16px 0 16px;
}
</style>
