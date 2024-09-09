import { createApp } from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import Avue from './index';
import '../styles/index.scss';

const app = createApp(App);
app.use(ElementPlus);
app.use(Avue);
app.mount('#app');
