<template>
    <div class="flex justify-center items-center">
        <span v-if="text" class="text-gray-900">{{ text }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    text?: string
}>()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LoadingSpinner'
})
</script>