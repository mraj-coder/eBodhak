<script setup lang="ts">
import type { DashboardStats } from '@/types/dashboard'

defineProps<{
  stats: DashboardStats
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Total Courses -->
    <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'book-open']" class="text-2xl" />
        </div>
        <span class="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Active</span>
      </div>
      <h3 class="text-3xl font-bold mb-1">{{ stats.totalCourses }}</h3>
      <p class="text-blue-100">Enrolled Courses</p>
    </div>

    <!-- Study Streak -->
    <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'fire']" class="text-2xl" />
        </div>
        <span class="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">🔥 Hot</span>
      </div>
      <h3 class="text-3xl font-bold mb-1">{{ stats.studyStreak }} Days</h3>
      <p class="text-orange-100">Study Streak</p>
    </div>

    <!-- Hours Learned -->
    <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'clock']" class="text-2xl" />
        </div>
        <span class="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Total</span>
      </div>
      <h3 class="text-3xl font-bold mb-1">{{ stats.hoursLearned }}h</h3>
      <p class="text-purple-100">Hours Learned</p>
    </div>

    <!-- Average Score -->
    <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'chart-line']" class="text-2xl" />
        </div>
        <span class="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Avg</span>
      </div>
      <h3 class="text-3xl font-bold mb-1">{{ stats.averageScore }}%</h3>
      <p class="text-green-100">Average Score</p>
    </div>

    <!-- Tests Completed -->
    <div class="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'clipboard-check']" class="text-2xl" />
        </div>
        <span class="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Done</span>
      </div>
      <h3 class="text-3xl font-bold mb-1">{{ stats.testsCompleted }}</h3>
      <p class="text-pink-100">Tests Completed</p>
    </div>

    <!-- Completed Courses -->
    <div class="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'graduation-cap']" class="text-2xl" />
        </div>
        <span class="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">✓ Certified</span>
      </div>
      <h3 class="text-3xl font-bold mb-1">{{ stats.completedCourses }}</h3>
      <p class="text-teal-100">Completed Courses</p>
    </div>
  </div>
</template>