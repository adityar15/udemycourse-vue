<template>
  <div>
    <NavbarGuest />
    <MainWrapper>
      <template v-slot:routerview>
        <router-view></router-view>
      </template>
    </MainWrapper>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
const NavbarGuest = defineAsyncComponent(() =>
  import(/*webpackChunkName:"navbar"*/ "@/components/organism/NavbarGuest.vue")
);
const MainWrapper = defineAsyncComponent(() =>
  import(
    /*webpackChunkName:"MainWrapper"*/ "@/components/organism/MainWrapper.vue"
  )
);

export default {
  components: {
    NavbarGuest,
    MainWrapper,
  },
};
</script>

<style scoped>
.mainwrapper {
  @apply h-[70vh] flex bg-white dark:bg-gray-900 overflow-auto;
}
.page {
  @apply m-auto w-full;
}
</style>
