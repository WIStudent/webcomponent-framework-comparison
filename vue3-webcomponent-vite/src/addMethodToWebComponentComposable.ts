import {onMounted, Ref} from 'vue';

export default (name: string, method: Function, element: Ref<null|HTMLElement>) => {
  onMounted(() => {
    if(element.value === null) return;
    const rootNode = element.value.getRootNode();
    if(!(rootNode instanceof ShadowRoot)) return;
    const host = rootNode.host;
    // @ts-expect-error
    host[name] = method;
  });
};
