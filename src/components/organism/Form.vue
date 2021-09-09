<template>
  <form class="form" @submit.prevent="submitForm">
    <FormGroup>
      
        <Label input-var="email">Email</Label>
    
        <Input
          type="email"
          name="email"
          v-model="email"
          placeholder="Your email please"
        />
        <Prompt type="error" v-if="errorBag.email" :message="errorBag.email" />

    </FormGroup>
    <FormGroup>

        <Label input-var="password">Password</Label>

 
        <Input
          type="password"
          name="password"
          v-model="password"
          placeholder="Your password please"
        />
          <Prompt type="error" v-if="errorBag.password" :message="errorBag.password" />
    
    </FormGroup>
    <div class="btn-group">
      <Button class="primary-button" type="submit">{{type}}</Button>
    </div>
  </form>
</template>

<script>
import { defineAsyncComponent, ref, reactive } from "vue";
// const FormGroup = defineAsyncComponent(() =>
//   import(
//     /*webpackChunkName:"formgroup"*/ "@/components/molecules/FormGroup.vue"
//   )
// );

const Label = defineAsyncComponent(() =>
  import(/*webpackChunkName:"Label"*/ "@/components/atoms/Label.vue")
);

const Button = defineAsyncComponent(() =>
  import(/*webpackChunkName:"Button"*/ "@/components/atoms/Button.vue")
);

// const Input = defineAsyncComponent(() =>
//   import(/*webpackChunkName:"Input"*/ "@/components/atoms/Input.vue")
// );

const Prompt =  defineAsyncComponent(() =>
  import(/*webpackChunkName:"Prompt"*/ "@/components/atoms/Prompt.vue")
);
import Input from "@/components/atoms/Input.vue"
import FormGroup from "@/components/molecules/FormGroup.vue"
export default {
  components: {
    FormGroup,
    Input,
    Label,
    Button,
    Prompt
  },
  emits:['onsubmit'],
  props:{
      type: String,
      validator(value)
      {
          return ['Login', 'Register'].includes(value)
      }
  },
  setup(props, {emit}) {
    const email = ref(""),
      password = ref(""),
      errorBag = reactive({
        email: "",
        password: "",
      });

    function submitForm() {
     
      if (email.value && password.value) {
       
        emit('onsubmit', {email:email.value, password:password.value})
        //
      } else if (!email.value) {
        errorBag.email = "Please enter your email";
      } 
      else if (email.value) {
        errorBag.email = "";
      }
      else if (!password.value) {
        errorBag.password = "Please enter your password";
      }
      else if (password.value) {
        errorBag.password = "";
      }
    }

    return {
      email,
      password,
      errorBag,
      submitForm,
    };
  },
};
</script>

<style scoped>
.form {
  @apply w-full p-7 shadow rounded grid grid-cols-1 gap-3;
}
.btn-group {
  @apply text-center;
}
</style>
