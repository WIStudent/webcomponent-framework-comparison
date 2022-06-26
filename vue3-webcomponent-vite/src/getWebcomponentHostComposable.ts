import { computed, ComputedRef, ref, getCurrentInstance, onMounted } from "vue";

export default (): ComputedRef<Element|null> => {
  const host = ref<Element|null>(null);

  onMounted(() => {
    const rootNode = getCurrentInstance()?.vnode.el?.getRootNode();
    host.value = rootNode && rootNode instanceof ShadowRoot
      ? rootNode.host
      : null;
  })

  return computed(() => host.value);
};
