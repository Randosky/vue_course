import { createApp } from 'vue'
import App from './App.vue'
import components from "@/UI"
import router from './router'
import store from './store'
import { createPinia } from 'pinia';

// Глобальная регистрация компонентов
// создали в UI index.ts, в нем всё импортировали и экспортировали, и в app добавили

const app = createApp(App);
components.forEach(comp => {app.component(comp.name, comp)})

// createApp(App).use(router).mount('#app')
app.use(store).use(router).use(createPinia()).mount('#app')