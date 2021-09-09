<template>
  <div class="page-wrapper">
    <Title title="Find IP" class="center" />
    <Prompt :type="type" :message="prompt" v-if="prompt" />
    
    <div class="search-wrapper">
        <Input v-model="ip" type="search" name="ip" placeholder="Enter IP" class="search-input" />
        <Button class="secondary-button" @click="searchIP">Find Location</Button>
    </div>

   <ul v-if="ipdetails.hasOwnProperty('city')">
       <ListItem> Location : {{ipdetails.city}}, {{ipdetails.country}} </ListItem>  
       <ListItem> IP Address : {{ip}} </ListItem> 
   </ul>

  <GoogleMaps :address="ipdetails.city +'+'+ipdetails.country" @error="showErrorMessage" />
  </div>
</template>

<script>
// @ is an alias to /src
import {useHead} from '@vueuse/head'
import axios from 'axios'
import {defineAsyncComponent, ref} from 'vue'
const Prompt =  defineAsyncComponent(() =>
  import(/*webpackChunkName:"Prompt"*/ "@/components/atoms/Prompt.vue")
);
const Input =  defineAsyncComponent(() =>
  import(/*webpackChunkName:"Input"*/ "@/components/atoms/Input.vue")
);

const Button =  defineAsyncComponent(() =>
  import(/*webpackChunkName:"Button"*/ "@/components/atoms/Button.vue")
);

const ListItem =  defineAsyncComponent(() =>
  import(/*webpackChunkName:"ListItem"*/ "@/components/atoms/ListItem.vue")
);

const GoogleMaps =  defineAsyncComponent(() =>
  import(/*webpackChunkName:"GoogleMaps"*/ "@/components/atoms/GoogleMaps.vue")
);

export default {
  name: "Home",
  components: {
    Prompt,
    Input,
    Button,
    ListItem,
    GoogleMaps
  },
  setup() {

      useHead({
      // Can be static or computed
      title: "Find IP",
      meta: [
        {
          name: `description`,
          content: "Find ip address details"
        },
      ],
    })

      const ip = ref('')
      const prompt = ref(''), type=ref(''), ipdetails=ref({})
      function searchIP()
      {
         
        if(ipIsValid())
        {
            type.value = ""
            prompt.value = ""
            axios.get(`${process.env.VUE_APP_BASE_URL}/${ip.value}/json`)
            .then(res => {
                ipdetails.value = res.data
                if(res.data.reason)
                    {
                        prompt.value = ipdetails.value.reason
                        type.value = "success"
                    }
            })
        }
        else{
            type.value = "error"
            prompt.value = "Incorrect IP address"
        }
      }  

      function ipIsValid()
      {
          let ipArray = ip.value.split('.'),
          arrayLength = ipArray.length
          
          if(arrayLength != 4)
            return false

          let flag = false
          for(var i=0; i<arrayLength; i++)
          { 
              
              let isNumber = ipArray[i].match(/^[0-9]+$/)
              if(!isNumber)
                return false
              else if(parseInt(ipArray[i])>255 || parseInt(ipArray[i]) < 0)
                return false
              else
                flag = true
          }
          return flag
      }  

      function showErrorMessage(message)
      {
        type.value = "error"
        prompt.value = message
      }

      return {
          ip, prompt, type, searchIP, ipdetails, showErrorMessage
      }
  }

};
</script>

<style scoped>
.page-wrapper {
  @apply w-full md:w-1/2 md:mx-auto p-4 space-y-3;
}
.center {
  @apply text-center;
}
.search-wrapper{
    @apply w-full flex justify-between items-center flex-wrap space-y-4 md:space-y-0; 
}
.search-input{
    @apply md:w-3/4 w-full;
}
</style>
