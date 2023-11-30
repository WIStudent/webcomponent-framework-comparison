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
import { defineComponent, ref, onMounted, PropType, toRefs } from 'vue'
import { MDCRipple } from '@material/ripple';
import logo from './assets/logo.png';
import addMethodToWebComponent from './addMethodToWebComponentComposable';
import getWebcomponentHostComposable from './getWebcomponentHostComposable';


export default defineComponent({
  props: {
    count: {
      type: Number as PropType<number>,
      required: false,
      default: 0
    }
  },
  emits: ['count-changed'],
  setup(props, {emit}) {
    const {count} = toRefs(props);

    const primaryAction = ref<HTMLDivElement|null>(null);
    const increaseBtn = ref<HTMLButtonElement|null>(null);
    const decreaseBtn = ref<HTMLButtonElement|null>(null);

    const mediaStyle = ref({
      'background-image': `url(${logo})`
    });

    const host = getWebcomponentHostComposable();

    const increase = () => {
      if (host.value) {
        // @ts-expect-error Too lazy to type this right now
        host.value.count = count.value + 1;
        emit('count-changed');
      }
    };

    const decrease = () => {
      if (host.value) {
        // @ts-expect-error Too lazy to type this right now
        host.value.count = count.value - 1;
        emit('count-changed');
      }
    };

    addMethodToWebComponent('increase', increase);
    addMethodToWebComponent('decrease', decrease);

    onMounted(() => {
      if(primaryAction.value) MDCRipple.attachTo(primaryAction.value);
      if(increaseBtn.value) MDCRipple.attachTo(increaseBtn.value);
      if(decreaseBtn.value) MDCRipple.attachTo(decreaseBtn.value);
    });

    return {mediaStyle, increase, decrease, primaryAction, increaseBtn, decreaseBtn};
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
