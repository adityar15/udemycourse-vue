<template>
    <label :for="inputVar" v-bind="$attrs" class="label"><slot /></label>
</template>

<script>
export default {
    props:{
        inputVar:String
    }
}
</script>

<style scoped>
.label{
    @apply text-gray-800 dark:text-gray-50 text-lg md:text-xl;
}

</style>
