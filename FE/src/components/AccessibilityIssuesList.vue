<template>
  <div class="mt-6">
    <h3 class="text-lg font-semibold mb-4">Detected Issues</h3>
    <div v-for="(issue, index) in issues" :key="index" class="mb-3 p-3 rounded border"
      :class="getSeverityClasses(issue.severity)">
      <div class="flex items-center mb-2">
        <span class="mr-2 px-2 py-1 rounded text-xs font-bold uppercase"
          :class="getSeverityBadgeClasses(issue.severity)">
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
</template>

<script setup lang="ts">
import { AccessibilityIssue, ColorClass, SeverityEnum } from '../types'

const props = defineProps<{
  issues: AccessibilityIssue[]
}>()


const getSeverityClasses = (level: SeverityEnum) => {
  switch (level) {
    case SeverityEnum.High: return ColorClass.BgRedLight
    case SeverityEnum.Medium: return ColorClass.BgYellowLight
    case SeverityEnum.Low: return ColorClass.BgBlueLight
    default: return ''
  }
}

const getSeverityBadgeClasses = (level: SeverityEnum) => {
  switch (level) {
    case SeverityEnum.High: return 'bg-red-500 text-white'
    case SeverityEnum.Medium: return 'bg-yellow-500 text-white'
    case SeverityEnum.Low: return 'bg-blue-500 text-white'
    default: return ''
  }
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AccessibilityIssuesList',
})
</script>