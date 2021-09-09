<template>
    <Navbar>
        <template v-slot:menuitems>
           <NavbarItem to="/" text="Login" />
           <NavbarItem to="/register" text="Register" />
        </template>
    </Navbar>
</template>

<script>
import {defineAsyncComponent} from 'vue'
const Navbar = defineAsyncComponent(()=>import(/*webpackChunkName:"navbar"*/ '@/components/molecules/Navbar.vue'))
const NavbarItem = defineAsyncComponent(()=>import(/*webpackChunkName:"navbaritem"*/ '@/components/molecules/NavItem.vue'))
export default {
    components: {
        Navbar,
        NavbarItem
    }
}
</script>