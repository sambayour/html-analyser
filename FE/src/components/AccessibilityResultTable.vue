<template>
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

    <div v-if="analysisResult.issues.length" class="mt-4">
      <h3 class="text-lg font-semibold mb-3">Detected Accessibility Issues</h3>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2 text-left">Severity</th>
            <th class="border border-gray-300 p-2 text-left">Type</th>
            <th class="border border-gray-300 p-2 text-left w-1/8">Element</th>
            <th class="border border-gray-300 p-2 text-left w-1/2">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(issue, index) in analysisResult.issues" :key="index"
            :class="getSeverityRowClasses(issue.severity)">
            <td class="border border-gray-300 p-2">
              <span class="px-2 py-1 rounded text-xs font-bold uppercase inline-block"
                :class="getSeverityBadgeClasses(issue.severity)">
                {{ issue.severity }}
              </span>
            </td>
            <td class="border border-gray-300 p-2">{{ issue.type }}</td>
            <td class="border border-gray-300 p-2 w-1/4">
              <pre v-if="issue.element" class="text-xs bg-gray-50 p-1 overflow-x-auto max-w-xs truncate">
                {{ issue.element }}
              </pre>
            </td>
            <td class="border border-gray-300 p-2 w-1/2">{{ issue.message }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="text-green-600 font-medium">
      No accessibility issues detected! 🎉
    </p>
  </div>
</template>

<script setup lang="ts">
import { AccessibilityAnalysis, ColorClass, ScoreDescription, SeverityEnum } from '../types'

const props = defineProps<{
  analysisResult: AccessibilityAnalysis
}>()

const getScoreColor = (score: number) => {
  if (score >= 90) return ColorClass.TextGreen
  if (score >= 70) return ColorClass.TextYellow
  return ColorClass.TextRed
}

const getScoreDescription = (score: number) => {
  if (score >= 90) return ScoreDescription.Excellent
  if (score >= 70) return ScoreDescription.NeedsImprovement
  return ScoreDescription.SignificantBarriers
}


const getSeverityRowClasses = (severity: SeverityEnum) => {
  switch (severity) {
    case SeverityEnum.High: return 'bg-red-50 hover:bg-red-100'
    case SeverityEnum.Medium: return 'bg-yellow-50 hover:bg-yellow-100'
    case SeverityEnum.Low: return 'bg-blue-50 hover:bg-blue-100'
    default: return ''
  }
}

const getSeverityBadgeClasses = (severity: SeverityEnum) => {
  switch (severity) {
    case SeverityEnum.High: return ColorClass.BgRedDark
    case SeverityEnum.Medium: return ColorClass.BgYellowDark
    case SeverityEnum.Low: return ColorClass.BgBlueDark
    default: return ''
  }
}

</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AccessibilityResultTable',
})
</script>

<style scoped>
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