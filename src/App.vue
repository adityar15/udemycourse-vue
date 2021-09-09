<template>
 <component :is="layout"></component>
</template>

<script>
import {ref, watch, defineAsyncComponent} from 'vue'
import {useRoute} from 'vue-router'


const Guest = defineAsyncComponent(()=>import(/*webpackChunkName: "guest"*/ '@/views/layouts/Guest.vue'))
const Authenticated = defineAsyncComponent(()=>import(/*webpackChunkName: "Authenticated"*/ '@/views/layouts/Authenticated.vue'))
export default {
  components:{
    Guest,
    Authenticated
  },
  setup() {
    const layout = ref('')
    const route = useRoute()

    watch(route, (to)=>{
      if(to.meta.layout)
      {
        layout.value = to.meta.layout
      }
    })

    return{
      layout
    }
  },
}
</script>
