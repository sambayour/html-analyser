<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">HTML Accessibility Analyzer</h1>

    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <FileUploader @file-uploaded="handleFileUpload" />

      <LoadingSpinner v-if="isLoading" text="Analyzing... please wait."
        class="text-green-600 h-12 w-12 border-t-green-500" />
    </div>

    <AccessibilityResultTable v-if="analysisResult && !isLoading" :analysis-result="analysisResult" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileUploader from '../components/FileUploader.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import AccessibilityResultTable from '../components/AccessibilityResultTable.vue'
import AccessibilityService from '../services/AccessibilityService'
import { AccessibilityAnalysis } from '../types'

const analysisResult = ref<AccessibilityAnalysis | null>(null)
const isLoading = ref(false)

const handleFileUpload = async (file: File) => {
  analysisResult.value = null

  isLoading.value = true

  try {

    const result = await Promise.all([
      AccessibilityService.analyzeFile(file),
      new Promise(resolve => setTimeout(resolve, 1000))
    ])

    analysisResult.value = result[0]
  } catch (error) {
    alert('Failed to analyze file. Please try again.')
  } finally {
    isLoading.value = false
  }
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AccessibilityAnalyzer',
})
</script>