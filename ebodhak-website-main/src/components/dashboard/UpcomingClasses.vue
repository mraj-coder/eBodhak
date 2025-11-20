<script setup lang="ts">
import type { UpcomingClass } from '@/types/dashboard'

defineProps<{
  classes: UpcomingClass[]
}>()

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const getTimeUntil = (dateString: string) => {
  const now = new Date()
  const classTime = new Date(dateString)
  const diff = classTime.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 24) {
    return `in ${Math.floor(hours / 24)} days`
  } else if (hours > 0) {
    return `in ${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `in ${minutes}m`
  }
  return 'Starting soon'
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="classItem in classes"
      :key="classItem.id"
      class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all p-6"
    >
      <div class="flex items-start gap-4">
        <!-- Instructor Image -->
        <img
          :src="classItem.instructorImage"
          :alt="classItem.instructor"
          class="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
        />

        <!-- Class Details -->
        <div class="flex-1">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h4 class="text-lg font-bold text-gray-900 mb-1">{{ classItem.title }}</h4>
              <p class="text-sm text-gray-600">{{ classItem.instructor }}</p>
            </div>
            <span
              v-if="classItem.isLive"
              class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse"
            >
              <span class="w-2 h-2 bg-white rounded-full"></span>
              LIVE
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <span class="flex items-center gap-1.5">
              <font-awesome-icon :icon="['fas', 'book']" class="text-primary-500" />
              {{ classItem.courseName }}
            </span>
            <span class="flex items-center gap-1.5">
              <font-awesome-icon :icon="['fas', 'calendar']" class="text-primary-500" />
              {{ formatDate(classItem.startTime) }}
            </span>
            <span class="flex items-center gap-1.5">
              <font-awesome-icon :icon="['fas', 'clock']" class="text-primary-500" />
              {{ formatTime(classItem.startTime) }} ({{ classItem.duration }} min)
            </span>
          </div>

          <div class="flex items-center gap-3">
            <a
              :href="classItem.meetingLink"
              target="_blank"
              class="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-xl font-semibold transition flex items-center gap-2"
            >
              <font-awesome-icon :icon="['fas', 'video']" />
              {{ classItem.isLive ? 'Join Now' : 'Set Reminder' }}
            </a>
            <span class="text-sm text-gray-500 font-medium">
              {{ getTimeUntil(classItem.startTime) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="classes.length === 0" class="text-center py-8 bg-gray-50 rounded-2xl">
      <font-awesome-icon :icon="['fas', 'calendar-times']" class="text-4xl text-gray-300 mb-3" />
      <p class="text-gray-600">No upcoming classes scheduled</p>
    </div>
  </div>
</template>