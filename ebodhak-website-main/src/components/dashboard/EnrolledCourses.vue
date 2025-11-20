<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { EnrolledCourse } from '@/types/dashboard'

defineProps<{
  courses: EnrolledCourse[]
}>()

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-700'
    case 'in-progress':
      return 'bg-blue-100 text-blue-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completed'
    case 'in-progress':
      return 'In Progress'
    default:
      return 'Not Started'
  }
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="course in courses"
      :key="course.id"
      class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all overflow-hidden"
    >
      <div class="flex flex-col md:flex-row">
        <!-- Course Image -->
        <div class="md:w-48 h-48 md:h-auto flex-shrink-0">
          <img
            :src="course.courseImage"
            :alt="course.courseName"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Course Details -->
        <div class="flex-1 p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ course.courseName }}</h3>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <span class="font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {{ course.category }}
                </span>
                <span class="flex items-center gap-1">
                  <font-awesome-icon :icon="['fas', 'user']" class="text-gray-400" />
                  {{ course.instructor }}
                </span>
              </div>
            </div>
            <span :class="['px-3 py-1 rounded-full text-sm font-semibold', getStatusColor(course.status)]">
              {{ getStatusText(course.status) }}
            </span>
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Progress</span>
              <span class="text-sm font-bold text-primary-600">{{ course.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full transition-all"
                :style="{ width: `${course.progress}%` }"
              ></div>
            </div>
            <div class="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>{{ course.completedLessons }}/{{ course.totalLessons }} lessons</span>
              <span v-if="course.rating" class="flex items-center gap-1">
                <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-500" />
                {{ course.rating }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <RouterLink
              :to="`/courses/${course.courseId}`"
              class="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2.5 px-4 rounded-xl font-semibold text-center transition"
            >
              {{ course.status === 'completed' ? 'Review Course' : 'Continue Learning' }}
            </RouterLink>
            <button
              v-if="course.status === 'completed' && course.certificateUrl"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-semibold transition flex items-center gap-2"
            >
              <font-awesome-icon :icon="['fas', 'download']" />
              Certificate
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="courses.length === 0" class="text-center py-12">
      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <font-awesome-icon :icon="['fas', 'book-open']" class="text-3xl text-gray-400" />
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">No Enrolled Courses</h3>
      <p class="text-gray-600 mb-6">Start your learning journey by enrolling in a course</p>
      <RouterLink
        to="/courses"
        class="inline-block bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold transition"
      >
        Browse Courses
      </RouterLink>
    </div>
  </div>
</template>