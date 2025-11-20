<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import DashboardStats from '@/components/dashboard/DashboardStats.vue'
import EnrolledCourses from '@/components/dashboard/EnrolledCourses.vue'
import UpcomingClasses from '@/components/dashboard/UpcomingClasses.vue'
import RecentActivity from '@/components/dashboard/RecentActivity.vue'
import {
  mockDashboardStats,
  mockEnrolledCourses,
  mockUpcomingClasses,
  mockRecentActivity,
  mockAnnouncements,
} from '@/services/mockData'

const stats = ref(mockDashboardStats)
const enrolledCourses = ref(mockEnrolledCourses)
const upcomingClasses = ref(mockUpcomingClasses)
const recentActivity = ref(mockRecentActivity)
const announcements = ref(mockAnnouncements)

// Mock student name
const studentName = 'Rajesh'
</script>

<template>
  <div class="dashboard-page bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2">Welcome back, {{ studentName }}! 👋</h1>
            <p class="text-primary-100 text-lg">Ready to continue your learning journey?</p>
          </div>
          <div class="flex gap-3">
            <RouterLink
              to="/courses"
              class="bg-white text-primary-600 hover:bg-primary-50 py-3 px-6 rounded-xl font-semibold transition"
            >
              Browse Courses
            </RouterLink>
            <RouterLink
              to="/mock-tests"
              class="bg-primary-700 hover:bg-primary-800 text-white py-3 px-6 rounded-xl font-semibold transition"
            >
              Take a Test
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- Stats Grid -->
        <DashboardStats :stats="stats" class="mb-12" />

        <!-- Announcements -->
        <div v-if="announcements.filter(a => !a.isRead).length > 0" class="mb-12">
          <div
            v-for="announcement in announcements.filter(a => !a.isRead)"
            :key="announcement.id"
            :class="[
              'rounded-2xl p-6 border-l-4 flex items-start gap-4 mb-4',
              announcement.type === 'success' ? 'bg-green-50 border-green-500' : '',
              announcement.type === 'warning' ? 'bg-yellow-50 border-yellow-500' : '',
              announcement.type === 'info' ? 'bg-blue-50 border-blue-500' : '',
            ]"
          >
            <div
              :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                announcement.type === 'success' ? 'bg-green-100 text-green-600' : '',
                announcement.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : '',
                announcement.type === 'info' ? 'bg-blue-100 text-blue-600' : '',
              ]"
            >
              <font-awesome-icon
                :icon="[
                  'fas',
                  announcement.type === 'success' ? 'check-circle' : announcement.type === 'warning' ? 'exclamation-triangle' : 'info-circle',
                ]"
              />
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-gray-900 mb-1">{{ announcement.title }}</h4>
              <p class="text-gray-700">{{ announcement.message }}</p>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <font-awesome-icon :icon="['fas', 'times']" />
            </button>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Column -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Enrolled Courses -->
            <div>
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-900">My Courses</h2>
                <RouterLink
                  to="/my-courses"
                  class="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
                >
                  View All
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </RouterLink>
              </div>
              <EnrolledCourses :courses="enrolledCourses.slice(0, 2)" />
            </div>

            <!-- Upcoming Classes -->
            <div>
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Upcoming Classes</h2>
                <RouterLink
                  to="/live-classes"
                  class="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
                >
                  View Schedule
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </RouterLink>
              </div>
              <UpcomingClasses :classes="upcomingClasses" />
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-8">
            <!-- Quick Actions -->
            <div class="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <RouterLink
                  to="/courses"
                  class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
                >
                  <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition">
                    <font-awesome-icon :icon="['fas', 'book-open']" class="text-blue-600" />
                  </div>
                  <span class="font-semibold text-gray-900">Browse Courses</span>
                </RouterLink>
                <RouterLink
                  to="/mock-tests"
                  class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
                >
                  <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition">
                    <font-awesome-icon :icon="['fas', 'clipboard-list']" class="text-purple-600" />
                  </div>
                  <span class="font-semibold text-gray-900">Take Mock Test</span>
                </RouterLink>
                <RouterLink
                  to="/live-classes"
                  class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
                >
                  <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition">
                    <font-awesome-icon :icon="['fas', 'video']" class="text-green-600" />
                  </div>
                  <span class="font-semibold text-gray-900">Join Live Class</span>
                </RouterLink>
                <RouterLink
                  to="/blog"
                  class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
                >
                  <div class="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition">
                    <font-awesome-icon :icon="['fas', 'newspaper']" class="text-orange-600" />
                  </div>
                  <span class="font-semibold text-gray-900">Read Blog</span>
                </RouterLink>
              </div>
            </div>

            <!-- Recent Activity -->
            <RecentActivity :activities="recentActivity" />

            <!-- Study Streak Card -->
            <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'fire']" class="text-2xl" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold">{{ stats.studyStreak }} Days</h3>
                  <p class="text-orange-100">Study Streak</p>
                </div>
              </div>
              <p class="text-sm text-orange-100 mb-4">
                You're on fire! Keep up the great work and maintain your streak.
              </p>
              <div class="flex gap-2">
                <div
                  v-for="day in 7"
                  :key="day"
                  :class="[
                    'flex-1 h-2 rounded-full',
                    day <= stats.studyStreak % 7 || stats.studyStreak >= 7 ? 'bg-white' : 'bg-white/30',
                  ]"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>