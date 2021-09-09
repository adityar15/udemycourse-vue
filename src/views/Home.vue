<template>
  <div class="form-wrapper">
    <Title title="Login" class="center" />
    <Prompt type="error" v-if="loginError" :message="loginError" />
    <Form type="Login" @onsubmit="login" />
  </div>
</template>

<script>
// @ is an alias to /src

import Form from "@/components/organism/Form.vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {ref, defineAsyncComponent} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

import { useHead } from '@vueuse/head'

const Prompt =  defineAsyncComponent(() =>
  import(/*webpackChunkName:"Prompt"*/ "@/components/atoms/Prompt.vue")
);
export default {
  name: "Home",
  components: {
    Form,
    Prompt
  },
  setup() {

          useHead({
      // Can be static or computed
      title: "Login",
      meta: [
        {
          name: `description`,
          content: "Login page for udemy vue app test"
        },
      ],
    })

    const loginError = ref('')
    const router = useRouter(),
    store = useStore()

    function login(user) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const authenticatedUser = userCredential.user;
          const userPayload = {
            email: authenticatedUser.email,
            uid: authenticatedUser.uid
          }
          localStorage.setItem('user', JSON.stringify(userPayload))
          store.commit('user/setUserValues', userPayload)
          router.replace('/findip')
        })
        .catch((error) => {
          console.log(error)
          loginError.value = "You need to register first as you don't seem to be registered"
        });
     





    }
    return {
      login,
      loginError
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
