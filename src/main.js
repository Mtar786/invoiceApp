import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

// Create the Vue application and mount it to #app.
const app = createApp(App);

// Install the Vuex store so all components can access global state.
app.use(store);

// Mount the application.
app.mount('#app');