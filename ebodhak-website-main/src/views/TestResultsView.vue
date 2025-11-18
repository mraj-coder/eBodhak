<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const score = computed(() => parseInt(route.query.score as string) || 0)
const testId = route.params.id as string

const performanceLevel = computed(() => {
  if (score.value >= 90) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
  if (score.value >= 75) return { text: 'Very Good', color: 'text-blue-600', bg: 'bg-blue-100' }
  if (score.value >= 60) return { text: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' }
  if (score.value >= 40) return { text: 'Average', color: 'text-orange-600', bg: 'bg-orange-100' }
  return { text: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' }
})

const stats = [
  { label: 'Total Questions', value: '100', icon: 'clipboard-list' },
  { label: 'Correct Answers', value: score.value.toString(), icon: 'check-circle' },
  { label: 'Wrong Answers', value: (100 - score.value).toString(), icon: 'times-circle' },
  { label: 'Time Taken', value: '1h 45m', icon: 'clock' },
]

const recommendations = computed(() => {
  if (score.value >= 75) {
    return [
      'Great job! Keep practicing to maintain your performance',
      'Try advanced level tests to challenge yourself',
      'Review the questions you got wrong to perfect your knowledge',
    ]
  } else if (score.value >= 50) {
    return [
      'Good effort! Focus on your weak areas',
      'Review the course materials for better understanding',
      'Practice more mock tests to improve your score',
    ]
  } else {
    return [
      'Don\'t worry! Everyone starts somewhere',
      'Review the fundamentals and course materials',
      'Take your time to understand each concept',
      'Practice regularly to see improvement',
    ]
  }
})
</script>

<template>
  <div class="test-results-page bg-gray-50 min-h-screen py-12">
    <div class="container mx-auto px-4 max-w-5xl">
      <!-- Results Header -->
      <div class="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 text-center mb-8">
        <div class="text-6xl mb-6">
          {{ score >= 75 ? '🎉' : score >= 50 ? '👍' : '📚' }}
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Test Completed!</h1>
        <p class="text-xl text-gray-600 mb-8">Here's how you performed</p>
        
        <div class="max-w-md mx-auto mb-8">
          <div class="relative">
            <svg class="w-48 h-48 mx-auto" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                stroke-width="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                :stroke="score >= 75 ? '#10b981' : score >= 50 ? '#3b82f6' : '#f59e0b'"
                stroke-width="10"
                :stroke-dasharray="`${score * 2.827} 282.7`"
                stroke-linecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div>
                <div class="text-5xl font-bold text-gray-900">{{ score }}%</div>
                <div :class="['text-sm font-semibold mt-1', performanceLevel.color]">
                  {{ performanceLevel.text }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div :class="['inline-block px-6 py-3 rounded-full font-bold text-lg', performanceLevel.bg, performanceLevel.color]">
          {{ performanceLevel.text }} Performance
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white rounded-2xl p-6 border border-gray-200 text-center"
        >
          <font-awesome-icon :icon="['fas', stat.icon]" class="text-3xl text-primary-500 mb-3" />
          <div class="text-3xl font-bold text-gray-900 mb-2">{{ stat.value }}</div>
          <div class="text-sm text-gray-600">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Recommendations -->
      <div class="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <font-awesome-icon :icon="['fas', 'lightbulb']" class="text-yellow-500" />
          Recommendations
        </h2>
        <ul class="space-y-3">
          <li
            v-for="(recommendation, index) in recommendations"
            :key="index"
            class="flex items-start gap-3 text-gray-700"
          >
            <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500 mt-1" />
            <span>{{ recommendation }}</span>
          </li>
        </ul>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink
          :to="`/mock-tests/test/${testId}`"
          class="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 text-center"
        >
          <font-awesome-icon :icon="['fas', 'redo']" class="mr-2" />
          Retake Test
        </RouterLink>
        <RouterLink
          to="/mock-tests"
          class="bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 px-8 py-4 rounded-xl font-bold text-lg transition text-center"
        >
          <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
          All Tests
        </RouterLink>
        <RouterLink
          to="/courses"
          class="bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 px-8 py-4 rounded-xl font-bold text-lg transition text-center"
        >
          <font-awesome-icon :icon="['fas', 'book']" class="mr-2" />
          Browse Courses
        </RouterLink>
      </div>
    </div>
  </div>
</template>