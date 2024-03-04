import './assets/main.scss'
import '@fontsource/source-serif-pro/400.css';
import '@fontsource/source-serif-pro/900.css';

import { createApp } from 'vue'
import App from './App.vue'

import Toast, { type PluginOptions, POSITION } from "vue-toastification";


const app = createApp(App)

const options: PluginOptions = {
  position: POSITION.TOP_CENTER,
  transition: "Vue-Toastification__slideBlurred",
};
app.use(Toast, options);

app.mount('#app');