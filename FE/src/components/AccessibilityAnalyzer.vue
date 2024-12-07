<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">HTML Accessibility Analyzer</h1>

    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <FileUploader @file-uploaded="handleFileUpload" />
    </div>

    <AccessibilityResultTable v-if="analysisResult" :analysis-result="analysisResult" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileUploader from '../components/FileUploader.vue'
import AccessibilityResultTable from '../components/AccessibilityResultTable.vue'
import AccessibilityService from '../services/AccessibilityService'
import { AccessibilityAnalysis } from '../types'

const analysisResult = ref<AccessibilityAnalysis | null>(null)

const handleFileUpload = async (file: File) => {
  try {
    analysisResult.value = await AccessibilityService.analyzeFile(file)
  } catch (error) {
    alert('Failed to analyze file. Please try again.')
  }
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AccessibilityAnalyzer',
})
</script>