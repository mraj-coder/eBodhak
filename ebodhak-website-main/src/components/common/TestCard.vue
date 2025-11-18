<script setup lang="ts">
import { useRouter } from 'vue-router'

interface TestCardProps {
  id: string
  title: string
  category: string
  questionCount: number
  duration: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  attempts: number
  bestScore?: number
}

const props = defineProps<TestCardProps>()
const router = useRouter()

const startTest = () => {
  router.push(`/mock-tests/test/${props.id}`)
}

const difficultyColor = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
}
</script>

<template>
  <div
    class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all transform hover:-translate-y-1 p-6 flex flex-col h-full"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-900 mb-2">{{ title }}</h3>
        <span class="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
          {{ category }}
        </span>
      </div>
      <div :class="['px-3 py-1 rounded-full text-sm font-semibold', difficultyColor[difficulty]]">
        {{ difficulty }}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6 flex-grow">
      <div class="flex items-center gap-2 text-gray-600">
        <font-awesome-icon :icon="['fas', 'clipboard-list']" class="text-primary-500" />
        <span class="text-sm">{{ questionCount }} Questions</span>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <font-awesome-icon :icon="['fas', 'clock']" class="text-primary-500" />
        <span class="text-sm">{{ duration }} mins</span>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <font-awesome-icon :icon="['fas', 'play']" class="text-primary-500" />
        <span class="text-sm">{{ attempts }} Attempts</span>
      </div>
      <div v-if="bestScore !== undefined" class="flex items-center gap-2 text-gray-600">
        <font-awesome-icon :icon="['fas', 'trophy']" class="text-yellow-500" />
        <span class="text-sm font-semibold text-gray-900">{{ bestScore }}%</span>
      </div>
    </div>

    <button
      @click="startTest"
      class="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition transform hover:scale-105 mt-auto"
    >
      <font-awesome-icon :icon="['fas', 'play']" class="mr-2" />
      Start Test
    </button>
  </div>
</template>