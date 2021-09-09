<template>
    <div class="map" ref="map">

    </div>
</template>

<script>
import axios from 'axios'
import {reactive,watch, toRefs, ref} from 'vue'
import { Loader } from "@googlemaps/js-api-loader"

export default {
    props: {
        address:String
    },
    emits:['error'],
    setup(props, {emit}) {
        const position = reactive({
            lat: 0.0,
            lng: 0.0
        })

        const addressRef = toRefs(props).address
        const map = ref(null)

        watch(addressRef, (newVal)=>{

            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newVal}&key=${process.env.VUE_APP_GOOGLE_MAP_KEY}`)
            .then(res=>{
                const results = res.data.results[0]
                if(results.geometry) {
                    position.lat = 
                    results.geometry.location.lat
                    position.lng = 
                    results.geometry.location.lng
                    renderMap()
                }
                else{
                    emit('error', "Location not found")
                }
            })


        })
    

        async function renderMap()
        {
            const loader = new Loader({
                apiKey: process.env.VUE_APP_GOOGLE_MAP_KEY,
                version: "weekly",
            });

            // console.log(map.value)
            
            const google = await loader.load()
            const generatedMap = new google.maps.Map(map.value, {
                    center: position,
                    zoom: 8,
            });
          
            const marker = new google.maps.Marker({
                position: {lat: position.lat, lng:position.lng},
                generatedMap,
                title: addressRef.value,
            });
            
            marker.setMap(generatedMap);
        }

        return{
            position,
            map
        }
      
    },
}
</script>

<style scoped>
.map{
 @apply h-[500px] w-[500px];
}
</style>