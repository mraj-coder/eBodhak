<script setup lang="ts">
import { ref, computed } from 'vue'
import TestCard from '../components/common/TestCard.vue'

const selectedCategory = ref('All')
const selectedDifficulty = ref('All')

const categories = ['All', 'IOE', 'MBBS', 'MBA', 'BBA', 'IT', 'Banking']
const difficulties = ['All', 'Easy', 'Medium', 'Hard']

const tests = [
  {
    id: '1',
    title: 'IOE Entrance Mock Test - Set 1',
    category: 'IOE',
    questionCount: 100,
    duration: 120,
    difficulty: 'Medium' as const,
    attempts: 1250,
    bestScore: 85,
  },
  {
    id: '2',
    title: 'MBBS Entrance Practice Test',
    category: 'MBBS',
    questionCount: 120,
    duration: 150,
    difficulty: 'Hard' as const,
    attempts: 980,
    bestScore: 78,
  },
  {
    id: '3',
    title: 'MBA Entrance Mock - Quantitative',
    category: 'MBA',
    questionCount: 50,
    duration: 60,
    difficulty: 'Medium' as const,
    attempts: 750,
    bestScore: 92,
  },
  {
    id: '4',
    title: 'Physics Quick Test',
    category: 'IOE',
    questionCount: 30,
    duration: 30,
    difficulty: 'Easy' as const,
    attempts: 2100,
    bestScore: 88,
  },
  {
    id: '5',
    title: 'Full Stack Developer Assessment',
    category: 'IT',
    questionCount: 80,
    duration: 90,
    difficulty: 'Hard' as const,
    attempts: 650,
    bestScore: 75,
  },
  {
    id: '6',
    title: 'Banking Service Commission Mock',
    category: 'Banking',
    questionCount: 100,
    duration: 120,
    difficulty: 'Medium' as const,
    attempts: 890,
    bestScore: 81,
  },
]

const leaderboard = [
  { rank: 1, name: 'Sanjay Adhikari', score: 98, tests: 45 },
  { rank: 2, name: 'Priya Shrestha', score: 96, tests: 52 },
  { rank: 3, name: 'Ramesh Karki', score: 95, tests: 38 },
  { rank: 4, name: 'Anita Gurung', score: 94, tests: 41 },
  { rank: 5, name: 'Bijay Thapa', score: 93, tests: 36 },
]

const filteredTests = computed(() => {
  return tests.filter((test) => {
    const matchesCategory = selectedCategory.value === 'All' || test.category === selectedCategory.value
    const matchesDifficulty = selectedDifficulty.value === 'All' || test.difficulty === selectedDifficulty.value
    return matchesCategory && matchesDifficulty
  })
})
</script>

<template>
  <div class="mock-tests-page">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Practice Mock Tests</h1>
          <p class="text-xl text-primary-100 mb-8">
            Test your knowledge with our comprehensive mock exams and track your progress
          </p>
          <div class="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div class="text-4xl font-bold mb-2">10,000+</div>
              <div class="text-primary-100">Questions</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">500+</div>
              <div class="text-primary-100">Mock Tests</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">15,000+</div>
              <div class="text-primary-100">Test Takers</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-4 py-12">
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 border border-gray-200 sticky top-4">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Filters</h2>

            <!-- Category Filter -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-900 mb-3">Exam Type</h3>
              <div class="space-y-2">
                <label
                  v-for="category in categories"
                  :key="category"
                  class="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    v-model="selectedCategory"
                    type="radio"
                    :value="category"
                    class="accent-green-600 focus:ring-offset-2 focus:ring-green-300"
                  />
                  <span class="text-gray-700">{{ category }}</span>
                </label>
              </div>
            </div>

            <!-- Difficulty Filter -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-900 mb-3">Difficulty</h3>
              <div class="space-y-2">
                <label
                  v-for="difficulty in difficulties"
                  :key="difficulty"
                  class="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    v-model="selectedDifficulty"
                    type="radio"
                    :value="difficulty"
                    class="accent-green-600 focus:ring-offset-2 focus:ring-green-300"
                  />
                  <span class="text-gray-700">{{ difficulty }}</span>
                </label>
              </div>
            </div>

            <button
              @click="
                () => {
                  selectedCategory = 'All'
                  selectedDifficulty = 'All'
                }
              "
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold transition"
            >
              Clear Filters
            </button>
          </div>

          <!-- Leaderboard -->
          <div class="bg-white rounded-2xl p-6 border border-gray-200 mt-6">
            <div class="flex items-center gap-2 mb-6">
              <font-awesome-icon :icon="['fas', 'trophy']" class="text-yellow-500 text-xl" />
              <h2 class="text-xl font-bold text-gray-900">Top Performers</h2>
            </div>
            <div class="space-y-4">
              <div
                v-for="entry in leaderboard"
                :key="entry.rank"
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                    entry.rank === 1
                      ? 'bg-yellow-100 text-yellow-700'
                      : entry.rank === 2
                        ? 'bg-gray-200 text-gray-700'
                        : entry.rank === 3
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-primary-100 text-primary-700',
                  ]"
                >
                  {{ entry.rank }}
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-gray-900 text-sm">{{ entry.name }}</p>
                  <p class="text-xs text-gray-600">{{ entry.tests }} tests</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-primary-600">{{ entry.score }}%</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Stats Cards -->
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-2xl p-6 border border-gray-200">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'clipboard-list']" class="text-primary-600 text-xl" />
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-900">24</p>
                  <p class="text-sm text-gray-600">Tests Taken</p>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-2xl p-6 border border-gray-200">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'chart-line']" class="text-green-600 text-xl" />
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-900">82%</p>
                  <p class="text-sm text-gray-600">Average Score</p>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-2xl p-6 border border-gray-200">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'trophy']" class="text-yellow-600 text-xl" />
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-900">#156</p>
                  <p class="text-sm text-gray-600">Your Rank</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Test Grid -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Available Tests</h2>
            <p class="text-gray-600">{{ filteredTests.length }} tests found</p>
          </div>

          <div v-if="filteredTests.length > 0" class="grid md:grid-cols-2 gap-6">
            <TestCard v-for="test in filteredTests" :key="test.id" v-bind="test" />
          </div>

          <div v-else class="text-center py-20">
            <font-awesome-icon :icon="['fas', 'clipboard-list']" class="text-6xl text-gray-300 mb-4" />
            <h3 class="text-2xl font-bold text-gray-900 mb-2">No tests found</h3>
            <p class="text-gray-600 mb-6">Try adjusting your filters</p>
            <button
              @click="
                () => {
                  selectedCategory = 'All'
                  selectedDifficulty = 'All'
                }
              "
              class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>