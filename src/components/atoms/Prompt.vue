<template>
    <div :class="type" v-bind="$attrs">
        {{message}}
    </div>
</template>

<script>
export default {
    props:{
        type:{
            type: String,
            validator(value) {
                return ['success', 'error'].includes(value)
            }
        },
        message:String
    }
}
</script>

<style scoped>
.success{
    @apply text-green-500 font-medium;
}
.error{
    @apply text-red-500 font-medium;
}
</style>