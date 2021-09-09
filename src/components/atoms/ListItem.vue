<template>
    <li class='list-item' v-bind="$attrs">
        <slot />
    </li>
</template>

<style scoped>
.list-item {
    @apply text-lg md:text-xl text-gray-800 dark:text-gray-50;
    }
</style>