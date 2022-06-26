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
      Counter: {{internalCount}}
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
import { defineComponent, ref, onMounted, PropType, watch, toRefs } from 'vue'
import { MDCRipple } from '@material/ripple';
import logo from './assets/logo.png';
import addMethodToWebComponent from './addMethodToWebComponentComposable';


export default defineComponent({
  props: {
    count: {
      type: Number as PropType<number>,
      required: false,
      default: 0
    }
  },
  emits: ['update:count'],
  setup(props, {emit}) {
    const {count} = toRefs(props);
    const internalCount = ref(0);

    watch(count, count => {
      internalCount.value = count;
    }, {immediate: true});

    watch(internalCount, internalCount => {
      emit('update:count', internalCount);
    });

    // Issue with prop parsing: https://github.com/vuejs/core/issues/5793
    watch(count, count => {
      console.log('count', count);
      console.log('typeof count', typeof count);
    }, {immediate: true});
   
    const primaryAction = ref<HTMLDivElement|null>(null);
    const increaseBtn = ref<HTMLButtonElement|null>(null);
    const decreaseBtn = ref<HTMLButtonElement|null>(null);

    const mediaStyle = ref({
      'background-image': `url(${logo})`
    });

    const increase = () => {
      internalCount.value = internalCount.value + 1;
    };

    const decrease = () => {
      internalCount.value = internalCount.value - 1;
    };

    addMethodToWebComponent('increase', increase);
    addMethodToWebComponent('decrease', decrease);

    onMounted(() => {
      if(primaryAction.value) MDCRipple.attachTo(primaryAction.value);
      if(increaseBtn.value) MDCRipple.attachTo(increaseBtn.value);
      if(decreaseBtn.value) MDCRipple.attachTo(decreaseBtn.value);
    });

    return {mediaStyle, internalCount, increase, decrease, primaryAction, increaseBtn, decreaseBtn};
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
