<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCourse, useCourses } from '@/composables/useCourses'
import CourseCard from '@/components/common/CourseCard.vue'

const route = useRoute()
const courseId = computed(() => parseInt(route.params.id as string))

const { course, loading, error, fetchCourse } = useCourse()
const { courses: allCourses, fetchCourses } = useCourses()

const activeTab = ref('overview')
const expandedModules = ref<Set<number>>(new Set())

// Computed properties based on API data
const price = computed(() => (course.value ? (course.value.duration_months || 6) * 1000 : 0))
const originalPrice = computed(() => price.value * 1.6)
const level = computed(() => {
  if (!course.value || !course.value.difficulty_level) return 'Intermediate'
  const levelMap: Record<string, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }
  return levelMap[course.value.difficulty_level] || course.value.difficulty_level
})

// Mock data for fields not in API
const instructor = {
  name: 'Expert Instructor',
  title: 'PhD in Education',
  experience: '15+ years',
  students: '12,000+',
  rating: 4.9,
  courses: 8,
  bio: 'An experienced educator dedicated to helping students achieve their academic goals.',
}

const rating = 4.5
const reviewCount = 100
const studentCount = 1500
const duration = computed(() => (course.value ? `${(course.value.duration_months || 6) * 30} hours` : ''))
const language = 'English & Nepali'
const lastUpdated = 'January 2025'

const highlights = computed(() => [
  `${course.value?.duration_months || 0} months of comprehensive content`,
  `${course.value?.questions_count || 0}+ practice questions`,
  `${course.value?.total_chapters || 0}+ chapters`,
  'Live doubt clearing sessions',
  'Study materials & PDFs',
  'Lifetime access',
  'Certificate of completion',
  'Mobile app access',
])

const whatYouLearn = computed(() => [
  `Complete ${course.value?.category?.name || 'course'} syllabus`,
  'Advanced concepts and problem solving',
  'Exam strategies and time management',
  'Previous year question analysis',
  'Practical applications and examples',
  'Expert guidance and support',
])

const requirements = [
  'Basic understanding of the subject',
  'Dedication to study regularly',
  'Computer or mobile device with internet',
]

// Mock curriculum data
const curriculum = computed(() => [
  {
    module: course.value?.category?.name || 'Module 1',
    lessons: Math.floor((course.value?.total_chapters || 20) / 4),
    duration: `${Math.floor((course.value?.duration_months || 3) * 7.5)} hours`,
    topics: [
      { title: 'Introduction', duration: '2 hours', lessons: 3 },
      { title: 'Core Concepts', duration: '4 hours', lessons: 5 },
      { title: 'Advanced Topics', duration: '3 hours', lessons: 4 },
    ],
  },
])

const reviews = [
  {
    id: 1,
    name: 'Student Name',
    rating: 5,
    date: 'December 2024',
    comment: 'Excellent course! Very helpful and well-structured.',
  },
  {
    id: 2,
    name: 'Another Student',
    rating: 5,
    date: 'November 2024',
    comment: 'Great content and amazing instructor. Highly recommended!',
  },
]

const relatedCourses = computed(() => {
  if (!course.value) return []
  
  return allCourses.value
    .filter(c => 
      c.id !== course.value?.id && 
      c.category?.id === course.value?.category?.id
    )
    .slice(0, 3)
})

const toggleModule = (index: number) => {
  if (expandedModules.value.has(index)) {
    expandedModules.value.delete(index)
  } else {
    expandedModules.value.add(index)
  }
}

onMounted(() => {
  fetchCourse(courseId.value)
  fetchCourses()
})
</script>

<template>
  <div class="course-detail">
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600">Loading course details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <font-awesome-icon :icon="['fas', 'exclamation-circle']" class="text-6xl text-red-500 mb-4" />
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Error Loading Course</h3>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button
          @click="fetchCourse(courseId)"
          class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Course Content -->
    <div v-else-if="course">
      <!-- Hero Section -->
      <section class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <div class="mb-4">
                <span class="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {{ level }}
                </span>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ course.name }}</h1>
              <p class="text-xl text-gray-300 mb-6">{{ course.description }}</p>
              <div class="flex flex-wrap items-center gap-6 mb-6">
                <div class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
                  <span class="font-semibold">{{ rating }}</span>
                  <span class="text-gray-400">({{ reviewCount }} reviews)</span>
                </div>
                <div class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'users']" class="text-primary-400" />
                  <span>{{ studentCount.toLocaleString() }} students</span>
                </div>
                <div class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'clock']" class="text-primary-400" />
                  <span>{{ duration }}</span>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Instructor"
                  class="w-12 h-12 rounded-full"
                />
                <div>
                  <p class="font-semibold">{{ instructor.name }}</p>
                  <p class="text-sm text-gray-400">{{ instructor.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container mx-auto px-4 py-8">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Tabs -->
            <div class="border-b border-gray-200 mb-8">
              <div class="flex gap-8">
                <button
                  @click="activeTab = 'overview'"
                  :class="[
                    'pb-4 font-semibold transition',
                    activeTab === 'overview'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900',
                  ]"
                >
                  Overview
                </button>
                <button
                  @click="activeTab = 'curriculum'"
                  :class="[
                    'pb-4 font-semibold transition',
                    activeTab === 'curriculum'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900',
                  ]"
                >
                  Curriculum
                </button>
                <button
                  @click="activeTab = 'instructor'"
                  :class="[
                    'pb-4 font-semibold transition',
                    activeTab === 'instructor'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900',
                  ]"
                >
                  Instructor
                </button>
                <button
                  @click="activeTab = 'reviews'"
                  :class="[
                    'pb-4 font-semibold transition',
                    activeTab === 'reviews'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900',
                  ]"
                >
                  Reviews
                </button>
              </div>
            </div>

            <!-- Overview Tab -->
            <div v-if="activeTab === 'overview'">
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
                <div class="grid md:grid-cols-2 gap-4">
                  <div
                    v-for="(item, index) in whatYouLearn"
                    :key="index"
                    class="flex items-start gap-3"
                  >
                    <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500 mt-1" />
                    <span class="text-gray-700">{{ item }}</span>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Course Highlights</h2>
                <div class="grid md:grid-cols-2 gap-4">
                  <div
                    v-for="(highlight, index) in highlights"
                    :key="index"
                    class="flex items-center gap-3 bg-primary-50 p-4 rounded-lg"
                  >
                    <font-awesome-icon :icon="['fas', 'circle-check']" class="text-primary-500" />
                    <span class="text-gray-900 font-medium">{{ highlight }}</span>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <ul class="space-y-2">
                  <li
                    v-for="(req, index) in requirements"
                    :key="index"
                    class="flex items-start gap-3 text-gray-700"
                  >
                    <span class="text-primary-500">•</span>
                    <span>{{ req }}</span>
                  </li>
                </ul>
              </div>

              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Course Details</h2>
                <div class="bg-gray-50 rounded-xl p-6 space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Category:</span>
                    <span class="font-semibold text-gray-900">{{ course.category?.name || 'General' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Total Chapters:</span>
                    <span class="font-semibold text-gray-900">{{ course.total_chapters }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Practice Questions:</span>
                    <span class="font-semibold text-gray-900">{{ course.questions_count }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Subjects:</span>
                    <span class="font-semibold text-gray-900">{{ course.subjects_count }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Duration:</span>
                    <span class="font-semibold text-gray-900">{{ course.duration_months }} months</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Curriculum Tab -->
            <div v-if="activeTab === 'curriculum'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
              <div class="space-y-4">
                <div
                  v-for="(module, index) in curriculum"
                  :key="index"
                  class="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    @click="toggleModule(index)"
                    class="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
                  >
                    <div class="flex items-center gap-4">
                      <font-awesome-icon
                        :icon="['fas', expandedModules.has(index) ? 'chevron-up' : 'chevron-down']"
                        class="text-primary-500"
                      />
                      <div class="text-left">
                        <h3 class="text-lg font-bold text-gray-900">{{ module.module }}</h3>
                        <p class="text-sm text-gray-600">
                          {{ module.lessons }} lessons • {{ module.duration }}
                        </p>
                      </div>
                    </div>
                  </button>
                  <div v-if="expandedModules.has(index)" class="bg-gray-50 p-6 border-t border-gray-200">
                    <div class="space-y-3">
                      <div
                        v-for="(topic, topicIndex) in module.topics"
                        :key="topicIndex"
                        class="flex items-center justify-between p-3 bg-white rounded-lg"
                      >
                        <div class="flex items-center gap-3">
                          <font-awesome-icon :icon="['fas', 'play']" class="text-primary-500 text-sm" />
                          <span class="text-gray-900">{{ topic.title }}</span>
                        </div>
                        <div class="flex items-center gap-4 text-sm text-gray-600">
                          <span>{{ topic.lessons }} lessons</span>
                          <span>{{ topic.duration }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Instructor Tab -->
            <div v-if="activeTab === 'instructor'">
              <div class="bg-white rounded-2xl border border-gray-200 p-8">
                <div class="flex items-start gap-6 mb-6">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Instructor"
                    class="w-24 h-24 rounded-full"
                  />
                  <div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ instructor.name }}</h2>
                    <p class="text-gray-600 mb-4">{{ instructor.title }}</p>
                    <div class="flex flex-wrap gap-6 text-sm">
                      <div class="flex items-center gap-2">
                        <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
                        <span class="font-semibold">{{ instructor.rating }}</span>
                        <span class="text-gray-600">Rating</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <font-awesome-icon :icon="['fas', 'users']" class="text-primary-500" />
                        <span class="font-semibold">{{ instructor.students }}</span>
                        <span class="text-gray-600">Students</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <font-awesome-icon :icon="['fas', 'book']" class="text-primary-500" />
                        <span class="font-semibold">{{ instructor.courses }}</span>
                        <span class="text-gray-600">Courses</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="text-gray-700 leading-relaxed">{{ instructor.bio }}</p>
              </div>
            </div>

            <!-- Reviews Tab -->
            <div v-if="activeTab === 'reviews'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>
              <div class="space-y-6">
                <div
                  v-for="review in reviews"
                  :key="review.id"
                  class="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <h3 class="font-bold text-gray-900">{{ review.name }}</h3>
                      <p class="text-sm text-gray-600">{{ review.date }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <font-awesome-icon
                        v-for="n in 5"
                        :key="n"
                        :icon="['fas', 'star']"
                        :class="n <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                      />
                    </div>
                  </div>
                  <p class="text-gray-700">{{ review.comment }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar - Enrollment Card -->
          <div class="lg:col-span-1">
            <div class="sticky top-4">
              <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                <img
                  :src="course.image_url"
                  :alt="course.name"
                  class="w-full h-48 object-cover rounded-xl mb-6"
                  @error="(e) => ((e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Course+Image')"
                />
                <div class="mb-6">
                  <div class="flex items-baseline gap-3 mb-2">
                    <span class="text-3xl font-bold text-gray-900">Rs. {{ price.toLocaleString() }}</span>
                    <span class="text-lg text-gray-500 line-through">Rs. {{ originalPrice.toLocaleString() }}</span>
                  </div>
                  <span class="text-sm text-green-600 font-semibold">Save Rs. {{ (originalPrice - price).toLocaleString() }}</span>
                </div>
                <button
                  class="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 mb-4"
                >
                  Enroll Now
                </button>
                <button
                  class="w-full border-2 border-gray-300 hover:border-primary-500 text-gray-700 hover:text-primary-600 py-3 rounded-xl font-semibold transition mb-6"
                >
                  Add to Wishlist
                </button>
                <div class="space-y-3 text-sm">
                  <div class="flex items-center gap-3 text-gray-700">
                    <font-awesome-icon :icon="['fas', 'infinity']" class="text-primary-500" />
                    <span>Lifetime access</span>
                  </div>
                  <div class="flex items-center gap-3 text-gray-700">
                    <font-awesome-icon :icon="['fas', 'mobile-alt']" class="text-primary-500" />
                    <span>Mobile & desktop access</span>
                  </div>
                  <div class="flex items-center gap-3 text-gray-700">
                    <font-awesome-icon :icon="['fas', 'certificate']" class="text-primary-500" />
                    <span>Certificate of completion</span>
                  </div>
                  <div class="flex items-center gap-3 text-gray-700">
                    <font-awesome-icon :icon="['fas', 'headset']" class="text-primary-500" />
                    <span>24/7 support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Courses Section -->
      <section v-if="relatedCourses.length > 0" class="py-12 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Related Courses</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard v-for="relatedCourse in relatedCourses" :key="relatedCourse.id" :course="relatedCourse" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>