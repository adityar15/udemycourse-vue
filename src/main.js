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
    apiKey: "AIzaSyAN1kiXNbSPIi_lGu6z85hg4OvvfnFNM7M",
    authDomain: "vue-course-c6ed3.firebaseapp.com",
    projectId: "vue-course-c6ed3",
    storageBucket: "vue-course-c6ed3.appspot.com",
    messagingSenderId: "741597903366",
    appId: "1:741597903366:web:082bf24a0e238074bea187"
  });

createApp(App).use(store).use(router).use(head).component('Title', Title).mount('#app')
