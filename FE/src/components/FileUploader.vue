<template>
    <div class="border-2 border-dashed p-10 text-center transition-colors duration-300 border-gray-300"
        @click="triggerFileInput">
        <input type="file" ref="fileInput" @change="handleFileUpload" accept=".html" class="hidden" />
        <p class="text-gray-600">
            {{ isLoading ? 'Processing...' : uploadText }}
        </p>
        <div v-if="isLoading" class="mt-2">
            <div class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
    uploadText?: string
}>(), {
    uploadText: 'Upload an HTML file here to analyze its accessibility.'
})

const emit = defineEmits<{
    (e: 'file-uploaded', file: File): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isLoading = ref(false)

const handleFileUpload = (e: Event) => {
    const input = e.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
        emitFileUpload(input.files[0])
        input.value = '';
    }
}

const triggerFileInput = () => {
    // fileInput.value?.click()
}

const emitFileUpload = (file: File) => {
    emit('file-uploaded', file)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FileUploader',
})
</script>
