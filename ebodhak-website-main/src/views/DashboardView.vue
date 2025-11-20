<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import DashboardStats from '@/components/dashboard/DashboardStats.vue'
import EnrolledCourses from '@/components/dashboard/EnrolledCourses.vue'
import UpcomingClasses from '@/components/dashboard/UpcomingClasses.vue'
import RecentActivity from '@/components/dashboard/RecentActivity.vue'
import RecentTestScores from '@/components/dashboard/RecentTestScores.vue'
import RecommendedCourses from '@/components/dashboard/RecommendedCourses.vue'
import AchievementBadges from '@/components/dashboard/AchievementBadges.vue'
import LearningGoals from '@/components/dashboard/LearningGoals.vue'
import WeeklyActivity from '@/components/dashboard/WeeklyActivity.vue'
import PersonalizedInsights from '@/components/dashboard/PersonalizedInsights.vue'
import {
  mockDashboardStats,
  mockEnrolledCourses,
  mockUpcomingClasses,
  mockRecentActivity,
  mockAnnouncements,
  mockRecentTestScores,
  mockRecommendedCourses,
  mockAchievements,
  mockLearningGoals,
  mockWeeklyActivity,
  mockPersonalizedInsights,
} from '@/services/mockData'

const stats = ref(mockDashboardStats)
const enrolledCourses = ref(mockEnrolledCourses)
const upcomingClasses = ref(mockUpcomingClasses)
const recentActivity = ref(mockRecentActivity)
const announcements = ref(mockAnnouncements)
const recentTestScores = ref(mockRecentTestScores)
const recommendedCourses = ref(mockRecommendedCourses)
const achievements = ref(mockAchievements)
const learningGoals = ref(mockLearningGoals)
const weeklyActivity = ref(mockWeeklyActivity)
const personalizedInsights = ref(mockPersonalizedInsights)

// Mock student name
const studentName = 'Rajesh'

// Get current time greeting
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}
</script>

<template>
  <div class="dashboard-page bg-gray-50 min-h-screen">
    <!-- Hero Section with Premium Design -->
    <section class="relative bg-gradient-to-br from-primary-500 via-primary-600 to-blue-600 text-white py-16 overflow-hidden">
      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="flex items-center justify-between flex-wrap gap-6">
          <div class="flex-1">
            <p class="text-primary-100 text-lg mb-2">{{ getGreeting() }}</p>
            <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-100">
              Welcome back, {{ studentName }}! 👋
            </h1>
            <p class="text-primary-100 text-xl mb-6">Ready to continue your learning journey?</p>
            
            <!-- Quick Stats -->
            <div class="flex flex-wrap gap-6">
              <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'fire']" class="text-xl" />
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ stats.studyStreak }}</div>
                  <div class="text-sm text-primary-100">Day Streak</div>
                </div>
              </div>
              
              <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'chart-line']" class="text-xl" />
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ stats.averageScore }}%</div>
                  <div class="text-sm text-primary-100">Avg Score</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3">
            <RouterLink
              to="/courses"
              class="bg-white text-primary-600 hover:bg-primary-50 py-3 px-6 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg"
            >
              <font-awesome-icon :icon="['fas', 'book']" class="mr-2" />
              Browse Courses
            </RouterLink>
            <RouterLink
              to="/mock-tests"
              class="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 px-6 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg"
            >
              <font-awesome-icon :icon="['fas', 'clipboard-list']" class="mr-2" />
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

        <!-- AI Insights Banner -->
        <PersonalizedInsights :insights="personalizedInsights" class="mb-12" />

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Column -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Weekly Activity Chart -->
            <WeeklyActivity :week-data="weeklyActivity" />

            <!-- Learning Goals -->
            <LearningGoals :goals="learningGoals" />
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
            <!-- Achievements -->
            <AchievementBadges :achievements="achievements" />

            <!-- Recent Test Scores -->
            <RecentTestScores :scores="recentTestScores" />

            <!-- Recommended Courses -->
            <RecommendedCourses :courses="recommendedCourses" />

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