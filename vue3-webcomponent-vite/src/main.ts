
import { defineCustomElement } from 'vue';
import App from './App.ce.vue'

customElements.define('my-app', defineCustomElement(App));
