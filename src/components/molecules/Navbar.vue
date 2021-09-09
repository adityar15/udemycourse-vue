<template>
    <header :class="{expand:showMenu}" class="navbar">
        <div class="icons-set">
            <Logo />
            <button class="hamburger" @click="expand">
                <div class="lines"></div>
                <div class="lines"></div>
                <div class="lines"></div>
            </button>
        </div>
        <ul class="menu">
            <slot name="menuitems" />
        </ul>
    </header>
</template>
<script>
import {defineAsyncComponent,ref, watch} from 'vue'
import {useRoute} from 'vue-router'
const Logo = defineAsyncComponent(()=>import(/*webpackChunkName:"logo"*/ '@/components/atoms/Logo.vue'))
export default {
    components: {
        Logo
    },
    setup()
    {
        const showMenu = ref(false)
        watch(useRoute(), ()=>{
            showMenu.value = false
        })
        function expand()
        {
            showMenu.value = !showMenu.value
        }
        return{
            expand, showMenu
        }
    }
}
</script>

<style scoped>
.icons-set {
    @apply w-full md:w-2/12 grid grid-rows-1 grid-cols-2 place-items-center
    gap-40 md:gap-0 mt-[10%] md:mt-0;
}
.hamburger {
    @apply block md:hidden;
}
.lines{
    @apply h-[5px] mt-[5px] w-[40px] bg-gray-50; 
}
.menu{
@apply flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 space-x-0 
md:space-x-5 md:mt-0 mt-[100px] md:mx-9 mx-4;
}
</style>