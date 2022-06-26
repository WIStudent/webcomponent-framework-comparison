import {watch} from 'vue';
import getWebcomponentHost from './getWebcomponentHostComposable';

export default (name: string, method: Function) => {
  const host = getWebcomponentHost();
  watch(host, host => {
    console.log('host', host);
    if (host === null) return;
    // @ts-expect-error
    host[name] = method;
  }, {immediate: true});
};
