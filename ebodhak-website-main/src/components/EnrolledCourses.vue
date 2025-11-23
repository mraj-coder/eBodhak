<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface EnrolledCourse {
  id: number
  courseId: number
  courseName: string
  courseImage: string
  category: string
  progress: number
  totalLessons: number
  completedLessons: number
  lastAccessed: string
  instructor: string
  status: 'in-progress' | 'completed' | 'not-started'
  certificateUrl?: string
  rating: number
}

defineProps<{
  courses: EnrolledCourse[]
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString()
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'in-progress':
      return 'bg-blue-100 text-blue-800'
    case 'not-started':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completed'
    case 'in-progress':
      return 'In Progress'
    case 'not-started':
      return 'Not Started'
    default:
      return status
  }
}
</script>

<template>
  <div class="enrolled-courses">
    <div v-if="courses.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">No courses found</p>
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="course in courses"
        :key="course.id"
        class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
      >
        <!-- Course Image -->
        <div class="relative h-48 overflow-hidden">
          <img
            :src="course.courseImage"
            :alt="course.courseName"
            class="w-full h-full object-cover"
          />
          <div class="absolute top-3 right-3">
            <span :class="['px-3 py-1 rounded-full text-xs font-medium', getStatusColor(course.status)]">
              {{ getStatusText(course.status) }}
            </span>
          </div>
        </div>

        <!-- Course Content -->
        <div class="p-6">
          <div class="mb-3">
            <span class="text-xs font-medium text-primary-600 uppercase tracking-wide">
              {{ course.category }}
            </span>
          </div>

          <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {{ course.courseName }}
          </h3>

          <p class="text-sm text-gray-600 mb-4">
            by {{ course.instructor }}
          </p>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700">Progress</span>
              <span class="text-sm font-bold text-primary-600">{{ course.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-primary-600 h-2 rounded-full transition-all"
                :style="{ width: `${course.progress}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ course.completedLessons }} of {{ course.totalLessons }} lessons completed
            </p>
          </div>

          <!-- Last Accessed -->
          <p class="text-xs text-gray-500 mb-4">
            Last accessed: {{ formatDate(course.lastAccessed) }}
          </p>

          <!-- Actions -->
          <div class="flex gap-2">
            <RouterLink
              v-if="course.status !== 'completed'"
              :to="`/courses/${course.courseId}`"
              class="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              Continue Learning
            </RouterLink>
            <RouterLink
              v-else
              :to="`/courses/${course.courseId}`"
              class="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Review Course
            </RouterLink>
            <a
              v-if="course.certificateUrl"
              :href="course.certificateUrl"
              target="_blank"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              Certificate
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>