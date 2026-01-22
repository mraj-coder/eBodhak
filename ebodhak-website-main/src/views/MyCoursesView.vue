<script setup lang="ts">
import { ref, computed } from 'vue'
import EnrolledCourses from '@/components/EnrolledCourses.vue'
import { mockEnrolledCourses } from '@/services/mockData'

const courses = ref(mockEnrolledCourses)
const viewMode = ref<'grid' | 'list'>('list')
const filterStatus = ref<'all' | 'in-progress' | 'completed' | 'not-started'>('all')

const filteredCourses = computed(() => {
  if (filterStatus.value === 'all') {
    return courses.value
  }
  return courses.value.filter(course => course.status === filterStatus.value)
})

const stats = computed(() => ({
  total: courses.value.length,
  inProgress: courses.value.filter(c => c.status === 'in-progress').length,
  completed: courses.value.filter(c => c.status === 'completed').length,
  notStarted: courses.value.filter(c => c.status === 'not-started').length,
}))
</script>

<template>
  <div class="my-courses-page bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-compact-hero-pattern text-white py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down text-shadow-lg">My Courses</h1>
        <p class="text-xl text-primary-100 max-w-3xl">
          Track your progress and continue your learning journey
        </p>
      </div>
    </section>

    <!-- Stats Overview -->
    <section class="py-8 bg-white border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <h3 class="text-3xl font-bold text-gray-900 mb-1">{{ stats.total }}</h3>
            <p class="text-gray-600">Total Courses</p>
          </div>
          <div class="text-center">
            <h3 class="text-3xl font-bold text-blue-600 mb-1">{{ stats.inProgress }}</h3>
            <p class="text-gray-600">In Progress</p>
          </div>
          <div class="text-center">
            <h3 class="text-3xl font-bold text-green-600 mb-1">{{ stats.completed }}</h3>
            <p class="text-gray-600">Completed</p>
          </div>
          <div class="text-center">
            <h3 class="text-3xl font-bold text-gray-600 mb-1">{{ stats.notStarted }}</h3>
            <p class="text-gray-600">Not Started</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- Filters and View Toggle -->
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <!-- Filter Buttons -->
          <div class="flex flex-wrap gap-3">
            <button
              @click="filterStatus = 'all'"
              :class="[
                'px-4 py-2 rounded-xl font-semibold transition',
                filterStatus === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200',
              ]"
            >
              All Courses
            </button>
            <button
              @click="filterStatus = 'in-progress'"
              :class="[
                'px-4 py-2 rounded-xl font-semibold transition',
                filterStatus === 'in-progress'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200',
              ]"
            >
              In Progress
            </button>
            <button
              @click="filterStatus = 'completed'"
              :class="[
                'px-4 py-2 rounded-xl font-semibold transition',
                filterStatus === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200',
              ]"
            >
              Completed
            </button>
            <button
              @click="filterStatus = 'not-started'"
              :class="[
                'px-4 py-2 rounded-xl font-semibold transition',
                filterStatus === 'not-started'
                  ? 'bg-gray-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200',
              ]"
            >
              Not Started
            </button>
          </div>

          <!-- View Toggle -->
          <div class="flex gap-2 bg-white rounded-xl p-1 border border-gray-200">
            <button
              @click="viewMode = 'list'"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition',
                viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100',
              ]"
            >
              <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
              List
            </button>
            <button
              @click="viewMode = 'grid'"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition',
                viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100',
              ]"
            >
              <font-awesome-icon :icon="['fas', 'th']" class="mr-2" />
              Grid
            </button>
          </div>
        </div>

        <!-- Courses List/Grid -->
        <div v-if="viewMode === 'list'">
          <EnrolledCourses :courses="filteredCourses" />
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="course in filteredCourses"
            :key="course.id"
            class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all overflow-hidden"
          >
            <img
              :src="course.courseImage"
              :alt="course.courseName"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <div class="flex items-start justify-between mb-3">
                <span class="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {{ course.category }}
                </span>
                <span
                  v-if="course.rating"
                  class="flex items-center gap-1 text-sm font-semibold text-gray-700"
                >
                  <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-500" />
                  {{ course.rating }}
                </span>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-2">{{ course.courseName }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ course.instructor }}</p>

              <!-- Progress -->
              <div class="mb-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-gray-700">Progress</span>
                  <span class="text-xs font-bold text-primary-600">{{ course.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                    :style="{ width: `${course.progress}%` }"
                  ></div>
                </div>
              </div>

              <RouterLink
                :to="`/courses/${course.courseId}`"
                class="block w-full bg-primary-500 hover:bg-primary-600 text-white py-2.5 rounded-xl font-semibold text-center transition"
              >
                Continue Learning
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCourses.length === 0" class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <font-awesome-icon :icon="['fas', 'book-open']" class="text-5xl text-gray-300" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">No courses found</h3>
          <p class="text-gray-600 mb-8">
            {{ filterStatus === 'all' ? 'Start your learning journey by enrolling in a course' : `No ${filterStatus.replace('-', ' ')} courses` }}
          </p>
          <RouterLink
            to="/courses"
            class="inline-block bg-primary-500 hover:bg-primary-600 text-white py-3 px-8 rounded-xl font-semibold transition"
          >
            Browse All Courses
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>