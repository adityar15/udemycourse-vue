<template>
    <ListItem class="nav-item" v-bind="$attrs"> 
        <router-link v-if="userouterlink" :to="to"> {{text}} </router-link>
        <div v-else>{{text}}</div>
    </ListItem>
</template>

<script>
import {defineAsyncComponent} from 'vue'
const ListItem = defineAsyncComponent(()=>import(/*webpackChunkName:"Listitem"*/ '@/components/atoms/ListItem.vue'))
export default {
  components:{
      ListItem
  },
  inheritAttrs:false,
   props: {
       to: String,
       text: String,
       userouterlink: {
           type: Boolean,
           default: true
       }
   }
}
</script>

<style scoped>
*{
    @apply text-gray-50 text-3xl cursor-pointer;
}

</style>
