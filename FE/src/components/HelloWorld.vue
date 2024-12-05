<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">HTML Accessibility Analyzer</h1>

    <div class="bg-white shadow-md rounded-lg p-6 mb-6" @dragover.prevent="dragOver" @dragleave.prevent="dragLeave"
      @drop.prevent="dropFile">
      <input type="file" ref="fileInput" @change="handleFileUpload" accept=".html" class="hidden" />

      <div :class="[
        'border-2 border-dashed p-10 text-center transition-colors duration-300',
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      ]" @click="$refs.fileInput.click()">
        <p class="text-gray-600">
          Upload an HTML file here to analyze its accessibility.
        </p>
      </div>
    </div>

    <div v-if="analysisResult" class="bg-white shadow-md rounded-lg p-6">
      <div class="flex items-center mb-4">
        <div class="radial-progress mr-4 text-xl font-bold" :class="getScoreColor(analysisResult.score)"
          :style="`--value:${analysisResult.score}; --size:3rem;`">
          {{ analysisResult.score }}
        </div>
        <div>
          <h2 class="text-xl font-semibold">Accessibility Score</h2>
          <p class="text-gray-600">{{ getScoreDescription(analysisResult.score) }}</p>
        </div>
      </div>

      <div v-if="analysisResult.issues.length" class="mt-6">
        <h3 class="text-lg font-semibold mb-4">Detected Issues</h3>
        <div v-for="(issue, index) in analysisResult.issues" :key="index" class="mb-3 p-3 rounded border" :class="{
          'bg-red-50 border-red-200': issue.severity === 'high',
          'bg-yellow-50 border-yellow-200': issue.severity === 'medium',
          'bg-blue-50 border-blue-200': issue.severity === 'low'
        }">
          <div class="flex items-center mb-2">
            <span class="mr-2 px-2 py-1 rounded text-xs font-bold uppercase" :class="{
              'bg-red-500 text-white': issue.severity === 'high',
              'bg-yellow-500 text-white': issue.severity === 'medium',
              'bg-blue-500 text-white': issue.severity === 'low'
            }">
              {{ issue.severity }}
            </span>
            <span class="font-medium">{{ issue.type }}</span>
          </div>
          <p>{{ issue.message }}</p>
          <pre v-if="issue.element" class="text-xs bg-gray-100 p-2 mt-2 overflow-x-auto">
            {{ issue.element }}
          </pre>
        </div>
      </div>
      <p v-else class="text-green-600 font-medium">
        No accessibility issues detected! 🎉
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const analysisResult = ref<any>(null)

const API_URL = 'http://localhost:3200'

const dragOver = (e: DragEvent) => {
  isDragging.value = true
  e.preventDefault()
}

const dragLeave = (e: DragEvent) => {
  isDragging.value = false
  e.preventDefault()
}

const dropFile = (e: DragEvent) => {
  isDragging.value = false
  e.preventDefault()

  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    uploadFile(files[0])
  }
}

const handleFileUpload = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    uploadFile(input.files[0])
  }
}

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(`${API_URL}/analyze`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    analysisResult.value = response.data
  } catch (error) {
    console.error('Upload error:', error)
    alert('Failed to analyze file. Please try again.')
  }
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-500'
  if (score >= 70) return 'text-yellow-500'
  return 'text-red-500'
}

const getScoreDescription = (score: number) => {
  if (score >= 90) return 'Excellent Accessibility'
  if (score >= 70) return 'Needs Improvement'
  return 'Significant Accessibility Barriers'
}
</script>

<style>
.radial-progress {
  --size: 3rem;
  --thickness: 4px;
  width: var(--size);
  height: var(--size);
  display: inline-grid;
  place-content: center;
  background:
    radial-gradient(closest-side, white 80%, transparent 80% 100%),
    conic-gradient(currentColor calc(var(--value, 0) * 1%), lightgray calc(var(--value, 0) * 1%));
  border-radius: 50%;
  color: green;
}
</style>