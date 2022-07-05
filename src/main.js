import './index.css';
import App from './App.vue';
import { createApp } from 'vue';
import { vfmPlugin } from 'vue-final-modal';
import ModalPC from './components/ModalPC';

const app = createApp(App);
app.component('ModalPC', ModalPC);

app.use(vfmPlugin).mount('#app');
