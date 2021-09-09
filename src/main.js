import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
import {createHead} from '@vueuse/head'


const head = createHead()
import { initializeApp } from "firebase/app";

const Title = defineAsyncComponent(()=>import(/*webpackChunkName:"title"*/ '@/components/atoms/Title.vue'))
initializeApp({
  // you firbase config
  });

createApp(App).use(store).use(router).use(head).component('Title', Title).mount('#app')
