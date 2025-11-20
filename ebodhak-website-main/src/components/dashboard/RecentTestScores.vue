<script setup lang="ts">
interface TestScore {
  id: number
  testName: string
  score: number
  totalQuestions: number
  correctAnswers: number
  date: string
  subject: string
}

defineProps<{
  scores: TestScore[]
}>()

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600'
  if (score >= 75) return 'text-blue-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

const getScoreBgColor = (score: number) => {
  if (score >= 90) return 'bg-green-100'
  if (score >= 75) return 'bg-blue-100'
  if (score >= 60) return 'bg-yellow-100'
  return 'bg-red-100'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6">
    <h3 class="text-xl font-bold text-gray-900 mb-6">Recent Test Scores</h3>
    
    <div class="space-y-4">
      <div
        v-for="test in scores"
        :key="test.id"
        class="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition"
      >
        <div class="flex-1">
          <h4 class="font-semibold text-gray-900 mb-1">{{ test.testName }}</h4>
          <div class="flex items-center gap-3 text-sm text-gray-600">
            <span class="flex items-center gap-1">
              <font-awesome-icon :icon="['fas', 'book']" class="text-primary-500" />
              {{ test.subject }}
            </span>
            <span class="flex items-center gap-1">
              <font-awesome-icon :icon="['fas', 'calendar']" class="text-primary-500" />
              {{ formatDate(test.date) }}
            </span>
          </div>
        </div>
        
        <div class="text-right">
          <div :class="['text-3xl font-bold mb-1', getScoreColor(test.score)]">
            {{ test.score }}%
          </div>
          <div :class="['text-xs font-semibold px-3 py-1 rounded-full', getScoreBgColor(test.score), getScoreColor(test.score)]">
            {{ test.correctAnswers }}/{{ test.totalQuestions }}
          </div>
        </div>
      </div>
    </div>

    <RouterLink
      to="/mock-tests"
      class="block w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold text-center transition"
    >
      View All Tests
    </RouterLink>
  </div>
</template>