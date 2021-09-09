<template>
  <div class="form-wrapper">
    <Prompt v-if="success" type="success" :message="success" />
    <Title title="Register" class="center" />
    <Form type="Register" @onsubmit="register" />
  </div>
</template>

<script>
// @ is an alias to /src
import { defineAsyncComponent, ref } from "vue";
import Form from "@/components/organism/Form.vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useHead } from '@vueuse/head'

const Prompt = defineAsyncComponent(() =>
  import(/*webpackChunkName:"Prompt"*/ "@/components/atoms/Prompt.vue")
);

export default {
  name: "Home",
  components: {
    Form,
    Prompt,
  },
  setup() {

        useHead({
      // Can be static or computed
      title: "Register",
      meta: [
        {
          name: `description`,
          content: "Login page for udemy vue app test"
        },
      ],
    })


    const success = ref("");
    function register(user) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const registeredUser = userCredential.user;
          console.log("registered user", registeredUser)
          success.value = "You are registered successfully";
          // ...
        })
        .catch((error) => {
            console.log(error)
          // ..
        });
    }
    return {
      register,
      success,
    };
  },
};
</script>

<style scoped>
.form-wrapper {
  @apply w-full md:w-1/4 md:mx-auto;
}
.center {
  @apply text-center;
}
</style>
