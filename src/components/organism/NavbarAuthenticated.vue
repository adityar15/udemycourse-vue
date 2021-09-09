<template>
    <Navbar>
        <template v-slot:menuitems>
            <NavbarItem text="Logout" to="/" :userouterlink="false" @click="logout" /> 
            <div id='usericon'></div>
        </template>
    </Navbar>
</template>

<script>
import {defineAsyncComponent, onMounted, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {getAuth, signOut} from 'firebase/auth'
import {userinitial} from 'adi-userinitials'
import  Navbar from '@/components/molecules/Navbar.vue'
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
        const email = computed(()=>store.getters['user/getEmail']) 

        onMounted(()=>{
            console.log(email)
        userinitial({
                root: '#usericon',
                height: '50px',
                width: '50px',
                backGround: 'blue',
                fontColor: 'white',
                name: "Aditya",
            }
        )})

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