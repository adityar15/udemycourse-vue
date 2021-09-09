<template>
    <div class="form-group">
        <slot />
    </div>
</template>

<style scoped>
.form-group {
    @apply grid grid-cols-1 gap-2;
}
</style>