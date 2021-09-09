<template>
    <Navbar>
        <template v-slot:menuitems>
            <NavbarItem text="Logout" to="/" :userouterlink="false" @click="logout" /> 
        </template>
    </Navbar>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {getAuth, signOut} from 'firebase/auth'
const Navbar = defineAsyncComponent(()=>import(/*webpackChunkName:"navbar"*/ '@/components/molecules/Navbar.vue'))
const NavbarItem = defineAsyncComponent(()=>import(/*webpackChunkName:"navbaritem"*/ '@/components/molecules/NavItem.vue'))
export default {
    components: {
        Navbar,
        NavbarItem
    },
    setup()
    {
        const store = useStore()
        const router = useRouter()
        const auth = getAuth()
        function logout(){
           signOut(auth).then(() => {
                localStorage.removeItem('user')
                store.commit('user/resetUserValues')
                router.replace('/')
            }).catch((error) => {
                console.log(error)
            });
        }

        return{
            logout
        }
    }
}
</script>