<template>
    <h1 class="title" v-bind="$attrs">
        {{title}}
    </h1>
</template>

<script>
export default {
   props: {
       title:String
   }
}
</script>

<style scoped>
.title{
    @apply p-1 text-xl md:text-3xl text-gray-900 dark:text-gray-50 font-bold;
}
</style>