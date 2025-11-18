<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const testId = route.params.id as string

// Mock test data
const testData = ref({
  title: 'IOE Entrance Mock Test - Set 1',
  duration: 120, // minutes
  totalQuestions: 100,
})

const currentQuestion = ref(0)
const answers = ref<Record<number, string>>({})
const timeRemaining = ref(testData.value.duration * 60) // in seconds
const isSubmitting = ref(false)

// Mock questions
const questions = ref(
  Array.from({ length: testData.value.totalQuestions }, (_, i) => ({
    id: i,
    question: `Question ${i + 1}: This is a sample question for the mock test?`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 'Option A',
  }))
)

const formattedTime = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60)
  const seconds = timeRemaining.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const progress = computed(() => {
  return Math.round((Object.keys(answers.value).length / testData.value.totalQuestions) * 100)
})

let timerInterval: number | null = null

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      submitTest()
    }
  }, 1000)
}

const selectAnswer = (answer: string) => {
  answers.value[currentQuestion.value] = answer
}

const nextQuestion = () => {
  if (currentQuestion.value < testData.value.totalQuestions - 1) {
    currentQuestion.value++
  }
}

const previousQuestion = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
  }
}

const goToQuestion = (index: number) => {
  currentQuestion.value = index
}

const submitTest = () => {
  if (confirm('Are you sure you want to submit the test?')) {
    isSubmitting.value = true
    // Calculate score
    const score = Object.entries(answers.value).filter(
      ([index, answer]) => {
        const question = questions.value[parseInt(index)]
        return question && answer === question.correctAnswer
      }
    ).length
    const percentage = Math.round((score / testData.value.totalQuestions) * 100)
    
    // Navigate to results
    router.push({
      name: 'test-results',
      params: { id: testId },
      query: { score: percentage.toString() },
    })
  }
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <div class="test-taking-page bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-gray-900">{{ testData.title }}</h1>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'clock']" class="text-primary-500" />
              <span class="text-lg font-bold" :class="timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'">
                {{ formattedTime }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'clipboard-list']" class="text-primary-500" />
              <span class="text-gray-700">{{ Object.keys(answers).length }}/{{ testData.totalQuestions }}</span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-primary-500 h-2 rounded-full transition-all"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="grid lg:grid-cols-4 gap-6">
        <!-- Question Panel -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-2xl p-8 border border-gray-200">
            <div class="mb-6">
              <span class="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                Question {{ currentQuestion + 1 }} of {{ testData.totalQuestions }}
              </span>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-8">
              {{ questions[currentQuestion]?.question }}
            </h2>

            <div class="space-y-4 mb-8">
              <div
                v-for="(option, index) in questions[currentQuestion]?.options || []"
                :key="index"
                @click="selectAnswer(option)"
                :class="[
                  'p-6 rounded-xl border-2 cursor-pointer transition',
                  answers[currentQuestion] === option
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 bg-white',
                ]"
              >
                <div class="flex items-center gap-4">
                  <div
                    :class="[
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                      answers[currentQuestion] === option
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300',
                    ]"
                  >
                    <div v-if="answers[currentQuestion] === option" class="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span class="text-gray-900 font-medium">{{ option }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                @click="previousQuestion"
                :disabled="currentQuestion === 0"
                class="px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <font-awesome-icon :icon="['fas', 'chevron-left']" class="mr-2" />
                Previous
              </button>
              <button
                v-if="currentQuestion < testData.totalQuestions - 1"
                @click="nextQuestion"
                class="px-6 py-3 rounded-lg font-semibold transition bg-primary-500 hover:bg-primary-600 text-white"
              >
                Next
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="ml-2" />
              </button>
              <button
                v-else
                @click="submitTest"
                :disabled="isSubmitting"
                class="px-6 py-3 rounded-lg font-semibold transition bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
              >
                <font-awesome-icon :icon="['fas', 'check']" class="mr-2" />
                Submit Test
              </button>
            </div>
          </div>
        </div>

        <!-- Question Navigator -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
            <h3 class="font-bold text-gray-900 mb-4">Question Navigator</h3>
            <div class="grid grid-cols-5 gap-2 mb-6">
              <button
                v-for="(q, index) in questions"
                :key="index"
                @click="goToQuestion(index)"
                :class="[
                  'w-10 h-10 rounded-lg font-semibold text-sm transition',
                  currentQuestion === index
                    ? 'bg-primary-500 text-white'
                    : answers[index]
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                {{ index + 1 }}
              </button>
            </div>
            <div class="space-y-3 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-green-100 rounded"></div>
                <span class="text-gray-600">Answered</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-gray-100 rounded"></div>
                <span class="text-gray-600">Not Answered</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-primary-500 rounded"></div>
                <span class="text-gray-600">Current</span>
              </div>
            </div>
            <button
              @click="submitTest"
              class="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>