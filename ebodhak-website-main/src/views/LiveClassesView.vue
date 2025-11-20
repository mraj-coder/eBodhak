<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockLiveClasses } from '@/services/mockData'

const classes = ref(mockLiveClasses)
const selectedCategory = ref('all')
const viewMode = ref<'calendar' | 'list'>('list')

const categories = ['all', 'Medical', 'Engineering', 'IT & Cloud', 'Management']

const filteredClasses = computed(() => {
  if (selectedCategory.value === 'all') {
    return classes.value
  }
  return classes.value.filter(c => c.category === selectedCategory.value)
})

const upcomingClasses = computed(() => 
  filteredClasses.value.filter(c => c.status === 'upcoming')
)

const liveClasses = computed(() => 
  filteredClasses.value.filter(c => c.status === 'live')
)

const recordedClasses = computed(() => 
  filteredClasses.value.filter(c => c.status === 'completed' && c.isRecorded)
)

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="live-classes-page bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Live Classes</h1>
        <p class="text-xl text-primary-100 max-w-3xl mb-8">
          Join interactive live sessions with expert instructors and learn in real-time
        </p>
        
        <div class="flex flex-wrap gap-4">
          <div class="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <font-awesome-icon :icon="['fas', 'video']" class="text-2xl" />
              </div>
              <div>
                <h3 class="text-2xl font-bold">{{ upcomingClasses.length }}</h3>
                <p class="text-primary-100">Upcoming Classes</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h3 class="text-2xl font-bold">{{ liveClasses.length }}</h3>
                <p class="text-primary-100">Live Now</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <font-awesome-icon :icon="['fas', 'play-circle']" class="text-2xl" />
              </div>
              <div>
                <h3 class="text-2xl font-bold">{{ recordedClasses.length }}</h3>
                <p class="text-primary-100">Recorded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters and View Toggle -->
    <section class="py-8 bg-white border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <!-- Category Filters -->
          <div class="flex flex-wrap gap-3">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-4 py-2 rounded-xl font-semibold transition',
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              {{ category === 'all' ? 'All Categories' : category }}
            </button>
          </div>

          <!-- View Toggle -->
          <div class="flex gap-2 bg-gray-100 rounded-xl p-1">
            <button
              @click="viewMode = 'list'"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition',
                viewMode === 'list' ? 'bg-white text-gray-900 shadow' : 'text-gray-600',
              ]"
            >
              <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
              List
            </button>
            <button
              @click="viewMode = 'calendar'"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition',
                viewMode === 'calendar' ? 'bg-white text-gray-900 shadow' : 'text-gray-600',
              ]"
            >
              <font-awesome-icon :icon="['fas', 'calendar']" class="mr-2" />
              Calendar
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- Live Now Section -->
        <div v-if="liveClasses.length > 0" class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            Live Now
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="classItem in liveClasses"
              :key="classItem.id"
              class="bg-white rounded-2xl border-2 border-red-500 shadow-lg p-6"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 w-fit mb-3">
                    <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    LIVE NOW
                  </span>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ classItem.title }}</h3>
                  <p class="text-gray-600 mb-3">{{ classItem.description }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3 mb-4">
                <img
                  :src="classItem.instructorImage"
                  :alt="classItem.instructor"
                  class="w-12 h-12 rounded-full border-2 border-primary-200"
                />
                <div>
                  <p class="font-semibold text-gray-900">{{ classItem.instructor }}</p>
                  <p class="text-sm text-gray-600">{{ classItem.subject }}</p>
                </div>
              </div>

              <div class="flex items-center justify-between mb-4 text-sm text-gray-600">
                <span class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'users']" class="text-primary-500" />
                  {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }} joined
                </span>
                <span class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'clock']" class="text-primary-500" />
                  {{ classItem.duration }} min
                </span>
              </div>

              <div class="flex gap-3">
                <a
                  :href="classItem.meetingLink"
                  target="_blank"
                  class="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold text-center transition"
                >
                  Join Live Class
                </a>
                <button class="bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 px-4 rounded-xl font-bold transition">
                  <font-awesome-icon :icon="['fas', 'question-circle']" />
                </button>
              </div>
              
              <!-- Q&A Section -->
              <div class="mt-4 pt-4 border-t border-gray-200">
                <button class="text-sm text-gray-600 hover:text-primary-600 font-semibold flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'comments']" />
                  Ask a Question
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Classes -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Upcoming Classes</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="classItem in upcomingClasses"
              :key="classItem.id"
              class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all p-6"
            >
              <div class="flex items-start justify-between mb-4">
                <span class="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {{ classItem.category }}
                </span>
                <span v-if="classItem.isRecorded" class="text-xs text-gray-500 flex items-center gap-1">
                  <font-awesome-icon :icon="['fas', 'circle']" class="text-red-500" />
                  Recording
                </span>
              </div>

              <h3 class="text-lg font-bold text-gray-900 mb-2">{{ classItem.title }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ classItem.description }}</p>

              <div class="flex items-center gap-3 mb-4">
                <img
                  :src="classItem.instructorImage"
                  :alt="classItem.instructor"
                  class="w-10 h-10 rounded-full"
                />
                <div>
                  <p class="font-semibold text-gray-900 text-sm">{{ classItem.instructor }}</p>
                  <p class="text-xs text-gray-600">{{ classItem.subject }}</p>
                </div>
              </div>

              <div class="space-y-2 mb-4 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'calendar']" class="text-primary-500" />
                  {{ formatDate(classItem.startTime) }}
                </div>
                <div class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'clock']" class="text-primary-500" />
                  {{ formatTime(classItem.startTime) }} - {{ formatTime(classItem.endTime) }}
                </div>
                <div class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'users']" class="text-primary-500" />
                  {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }} registered
                </div>
              </div>

              <div class="flex gap-3">
                <button class="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2.5 rounded-xl font-semibold transition">
                  Set Reminder
                </button>
                <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 rounded-xl font-semibold transition">
                  <font-awesome-icon :icon="['fas', 'question-circle']" />
                </button>
              </div>
              
              <!-- Q&A Preview -->
              <div class="mt-4 pt-4 border-t border-gray-100">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'comments']" class="text-primary-500" />
                    Q&A Available
                  </span>
                  <span class="text-primary-600 font-semibold hover:text-primary-700 cursor-pointer">
                    View Questions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recorded Classes -->
        <div v-if="recordedClasses.length > 0">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Recorded Classes</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="classItem in recordedClasses"
              :key="classItem.id"
              class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all overflow-hidden"
            >
              <div class="relative h-48 bg-gray-900">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'play']" class="text-white text-2xl ml-1" />
                  </div>
                </div>
                <div class="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {{ classItem.duration }} min
                </div>
              </div>
              
              <div class="p-6">
                <span class="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {{ classItem.category }}
                </span>
                <h3 class="text-lg font-bold text-gray-900 mt-3 mb-2">{{ classItem.title }}</h3>
                <p class="text-sm text-gray-600 mb-4">{{ classItem.instructor }}</p>
                
                <a
                  :href="classItem.recordingUrl"
                  target="_blank"
                  class="block w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl font-semibold text-center transition"
                >
                  Watch Recording
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredClasses.length === 0" class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <font-awesome-icon :icon="['fas', 'video']" class="text-5xl text-gray-300" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">No classes found</h3>
          <p class="text-gray-600">Try selecting a different category</p>
        </div>
      </div>
    </section>
  </div>
</template>