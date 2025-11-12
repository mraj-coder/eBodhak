<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = computed(() => route.params.id as string)

const activeTab = ref('overview')
const expandedModules = ref<Set<number>>(new Set())

const course = {
  id: courseId.value,
  title: 'IOE Entrance Preparation - Complete Course',
  subtitle: 'Master Physics, Chemistry, Mathematics, and English for IOE Entrance',
  instructor: {
    name: 'Abhishek Jha',
    title: 'PhD in Engineering Education',
    experience: '15+ years',
    students: '12,000+',
    rating: 4.9,
    courses: 8,
    bio: 'Abhishek Jha is a renowned educator with over 15 years of experience in engineering entrance preparation. He has helped thousands of students achieve their dreams of getting into top engineering colleges.',
  },
  price: 4999,
  originalPrice: 7999,
  rating: 4.8,
  reviewCount: 245,
  studentCount: 3200,
  duration: '120 hours',
  level: 'Intermediate',
  language: 'English & Nepali',
  lastUpdated: 'January 2025',
  thumbnail: 'https://images.unsplash.com/photo-1581092335331-5e00ac65e934?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGJsdWVwcmludCUyMHRlY2huaWNhbCUyMGdlYXJzfGVufDB8MHx8Ymx1ZXwxNzYyNDA3MTM4fDA&ixlib=rb-4.1.0&q=85',
  highlights: [
    '120+ hours of HD video lectures',
    '5000+ practice questions',
    '50+ mock tests',
    'Live doubt clearing sessions',
    'Study materials & PDFs',
    'Lifetime access',
    'Certificate of completion',
    'Mobile app access',
  ],
  whatYouLearn: [
    'Complete Physics syllabus for IOE entrance',
    'Advanced Chemistry concepts and problem solving',
    'Mathematics from basics to advanced level',
    'English grammar and comprehension',
    'Time management and exam strategies',
    'Previous year question analysis',
  ],
  requirements: [
    'Basic understanding of 10+2 level science',
    'Dedication to study 2-3 hours daily',
    'Computer or mobile device with internet',
  ],
  curriculum: [
    {
      module: 'Physics',
      lessons: 45,
      duration: '35 hours',
      topics: [
        { title: 'Mechanics', duration: '8 hours', lessons: 12 },
        { title: 'Thermodynamics', duration: '6 hours', lessons: 9 },
        { title: 'Electromagnetism', duration: '10 hours', lessons: 14 },
        { title: 'Optics', duration: '6 hours', lessons: 8 },
        { title: 'Modern Physics', duration: '5 hours', lessons: 7 },
      ],
    },
    {
      module: 'Chemistry',
      lessons: 40,
      duration: '30 hours',
      topics: [
        { title: 'Physical Chemistry', duration: '10 hours', lessons: 12 },
        { title: 'Organic Chemistry', duration: '12 hours', lessons: 15 },
        { title: 'Inorganic Chemistry', duration: '8 hours', lessons: 13 },
      ],
    },
    {
      module: 'Mathematics',
      lessons: 50,
      duration: '40 hours',
      topics: [
        { title: 'Algebra', duration: '12 hours', lessons: 15 },
        { title: 'Trigonometry', duration: '10 hours', lessons: 12 },
        { title: 'Calculus', duration: '12 hours', lessons: 16 },
        { title: 'Coordinate Geometry', duration: '6 hours', lessons: 7 },
      ],
    },
    {
      module: 'English',
      lessons: 20,
      duration: '15 hours',
      topics: [
        { title: 'Grammar', duration: '6 hours', lessons: 8 },
        { title: 'Comprehension', duration: '5 hours', lessons: 7 },
        { title: 'Vocabulary', duration: '4 hours', lessons: 5 },
      ],
    },
  ],
}

const reviews = [
  {
    id: 1,
    name: 'Abhishek Jha',
    rating: 5,
    date: 'December 2024',
    comment:
      'Excellent course! The explanations are crystal clear and the practice questions are very helpful. I secured rank 5 in IOE entrance thanks to this course.',
  },
  {
    id: 2,
    name: 'Abhishek Jha',
    rating: 5,
    date: 'November 2024',
    comment:
      'Abhishek jha is an amazing instructor. The course structure is perfect and covers everything needed for IOE entrance. Highly recommended!',
  },
  {
    id: 3,
    name: 'Abhishek jha',
    rating: 4,
    date: 'October 2024',
    comment:
      'Great content and well organized. The mock tests are very similar to actual exam. Would have loved more live sessions though.',
  },
]

const relatedCourses = [
  {
    id: '2',
    title: 'Advanced Physics for Engineering',
    price: 3499,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1656337426914-5e5ba162d606?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwc2NpZW5jZSUyMG1pY3Jvc2NvcGUlMjByZXNlYXJjaHxlbnwwfDB8fHRlYWx8MTc2MjQwNzEzN3ww&ixlib=rb-4.1.0&q=85',
  },
  {
    id: '3',
    title: 'Mathematics Mastery Course',
    price: 2999,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1656337426914-5e5ba162d606?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwc2NpZW5jZSUyMG1pY3Jvc2NvcGUlMjByZXNlYXJjaHxlbnwwfDB8fHRlYWx8MTc2MjQwNzEzN3ww&ixlib=rb-4.1.0&q=85',
  },
]

const toggleModule = (index: number) => {
  if (expandedModules.value.has(index)) {
    expandedModules.value.delete(index)
  } else {
    expandedModules.value.add(index)
  }
}
</script>

<template>
  <div class="course-detail">
    <!-- Hero Section -->
    <section class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="mb-4">
              <span class="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {{ course.level }}
              </span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ course.title }}</h1>
            <p class="text-xl text-gray-300 mb-6">{{ course.subtitle }}</p>
            <div class="flex flex-wrap items-center gap-6 mb-6">
              <div class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
                <span class="font-semibold">{{ course.rating }}</span>
                <span class="text-gray-400">({{ course.reviewCount }} reviews)</span>
              </div>
              <div class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'users']" class="text-primary-400" />
                <span>{{ course.studentCount.toLocaleString() }} students</span>
              </div>
              <div class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'clock']" class="text-primary-400" />
                <span>{{ course.duration }}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Instructor"
                class="w-12 h-12 rounded-full"
              />
              <div>
                <p class="font-semibold">{{ course.instructor.name }}</p>
                <p class="text-sm text-gray-400">{{ course.instructor.title }}</p>
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
                  v-for="(item, index) in course.whatYouLearn"
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
                  v-for="(highlight, index) in course.highlights"
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
                  v-for="(req, index) in course.requirements"
                  :key="index"
                  class="flex items-start gap-3 text-gray-700"
                >
                  <span class="text-primary-500">•</span>
                  <span>{{ req }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Curriculum Tab -->
          <div v-if="activeTab === 'curriculum'">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
            <div class="space-y-4">
              <div
                v-for="(module, index) in course.curriculum"
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
                  <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ course.instructor.name }}</h2>
                  <p class="text-gray-600 mb-4">{{ course.instructor.title }}</p>
                  <div class="flex flex-wrap gap-6 text-sm">
                    <div class="flex items-center gap-2">
                      <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
                      <span class="font-semibold">{{ course.instructor.rating }}</span>
                      <span class="text-gray-600">Rating</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <font-awesome-icon :icon="['fas', 'users']" class="text-primary-500" />
                      <span class="font-semibold">{{ course.instructor.students }}</span>
                      <span class="text-gray-600">Students</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <font-awesome-icon :icon="['fas', 'book']" class="text-primary-500" />
                      <span class="font-semibold">{{ course.instructor.courses }}</span>
                      <span class="text-gray-600">Courses</span>
                    </div>
                  </div>
                </div>
              </div>
              <p class="text-gray-700 leading-relaxed">{{ course.instructor.bio }}</p>
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
                :src="course.thumbnail"
                alt="Course thumbnail"
                class="w-full h-48 object-cover rounded-xl mb-6"
              />
              <div class="mb-6">
                <div class="flex items-baseline gap-3 mb-2">
                  <span class="text-3xl font-bold text-gray-900">Rs. {{ course.price.toLocaleString() }}</span>
                  <span class="text-lg text-gray-500 line-through">Rs. {{ course.originalPrice.toLocaleString() }}</span>
                </div>
                <span class="text-sm text-green-600 font-semibold">Save Rs. {{ (course.originalPrice - course.price).toLocaleString() }}</span>
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

      <!-- Related Courses -->
      <section class="mt-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Related Courses</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="relatedCourse in relatedCourses"
            :key="relatedCourse.id"
            class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition cursor-pointer"
          >
            <img
              :src="relatedCourse.thumbnail"
              alt="Course thumbnail"
              class="w-full h-48 object-cover rounded-t-2xl"
            />
            <div class="p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-3">{{ relatedCourse.title }}</h3>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1">
                  <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
                  <span class="font-semibold">{{ relatedCourse.rating }}</span>
                </div>
                <span class="text-xl font-bold text-gray-900">Rs. {{ relatedCourse.price.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>