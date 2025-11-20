<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mockInstructors, mockCoursesResponse } from '@/services/mockData'

const route = useRoute()
const instructorId = computed(() => Number(route.params.id))

// Find instructor by ID
const instructor = computed(() => {
  return mockInstructors.find(i => i.id === instructorId.value) || mockInstructors[0]
})

// Mock courses taught by this instructor
const instructorCourses = ref(mockCoursesResponse.data.courses.slice(0, 3))

const activeTab = ref<'about' | 'courses' | 'reviews'>('about')
</script>

<template>
  <div class="instructor-profile-page bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <!-- Instructor Image -->
          <img
            :src="instructor.image"
            :alt="instructor.name"
            class="w-48 h-48 rounded-full object-cover border-8 border-white/20 shadow-2xl"
          />

          <!-- Instructor Info -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-4xl md:text-5xl font-bold mb-3">{{ instructor.name }}</h1>
            <p class="text-2xl text-primary-100 mb-6">{{ instructor.title }}</p>
            
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6">
              <div class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
                <span class="text-lg font-bold">{{ instructor.rating }}</span>
                <span class="text-primary-100">({{ instructor.totalReviews }} reviews)</span>
              </div>
              <div class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'users']" />
                <span class="text-lg">{{ instructor.students.toLocaleString() }} students</span>
              </div>
              <div class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'book']" />
                <span class="text-lg">{{ instructor.courses }} courses</span>
              </div>
              <div class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'briefcase']" />
                <span class="text-lg">{{ instructor.experience }}+ years</span>
              </div>
            </div>

            <!-- Social Links -->
            <div class="flex gap-3 justify-center md:justify-start">
              <a
                v-if="instructor.socialLinks.linkedin"
                :href="instructor.socialLinks.linkedin"
                target="_blank"
                class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition"
              >
                <font-awesome-icon :icon="['fab', 'linkedin']" class="text-xl" />
              </a>
              <a
                v-if="instructor.socialLinks.twitter"
                :href="instructor.socialLinks.twitter"
                target="_blank"
                class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition"
              >
                <font-awesome-icon :icon="['fab', 'twitter']" class="text-xl" />
              </a>
              <a
                v-if="instructor.socialLinks.youtube"
                :href="instructor.socialLinks.youtube"
                target="_blank"
                class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition"
              >
                <font-awesome-icon :icon="['fab', 'youtube']" class="text-xl" />
              </a>
              <button class="bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'envelope']" />
                Contact Instructor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs -->
    <section class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="container mx-auto px-4">
        <div class="flex gap-8">
          <button
            @click="activeTab = 'about'"
            :class="[
              'py-4 px-2 font-semibold border-b-2 transition',
              activeTab === 'about'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900',
            ]"
          >
            About
          </button>
          <button
            @click="activeTab = 'courses'"
            :class="[
              'py-4 px-2 font-semibold border-b-2 transition',
              activeTab === 'courses'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900',
            ]"
          >
            Courses ({{ instructor.courses }})
          </button>
          <button
            @click="activeTab = 'reviews'"
            :class="[
              'py-4 px-2 font-semibold border-b-2 transition',
              activeTab === 'reviews'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900',
            ]"
          >
            Reviews ({{ instructor.totalReviews }})
          </button>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- About Tab -->
        <div v-if="activeTab === 'about'" class="max-w-4xl mx-auto">
          <!-- Video Introduction -->
          <div v-if="instructor.videoIntro" class="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Video Introduction</h2>
            <div class="aspect-video bg-gray-900 rounded-xl overflow-hidden relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <button class="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition group">
                  <font-awesome-icon :icon="['fas', 'play']" class="text-primary-600 text-2xl ml-1 group-hover:scale-110 transition" />
                </button>
              </div>
              <img
                :src="instructor.image"
                :alt="instructor.name"
                class="w-full h-full object-cover opacity-50"
              />
            </div>
            <p class="text-gray-600 mt-4 text-center">
              Watch {{ instructor.name }}'s introduction video to learn more about their teaching approach
            </p>
          </div>

          <div class="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">About {{ instructor.name }}</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-6">{{ instructor.bio }}</p>

            <!-- Expertise -->
            <div class="mb-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">Expertise</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in instructor.expertise"
                  :key="skill"
                  class="bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-semibold"
                >
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Education -->
            <div class="mb-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">Education</h3>
              <ul class="space-y-2">
                <li
                  v-for="edu in instructor.education"
                  :key="edu"
                  class="flex items-start gap-3 text-gray-700"
                >
                  <font-awesome-icon :icon="['fas', 'graduation-cap']" class="text-primary-500 mt-1" />
                  {{ edu }}
                </li>
              </ul>
            </div>

            <!-- Certifications -->
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Certifications</h3>
              <ul class="space-y-2">
                <li
                  v-for="cert in instructor.certifications"
                  :key="cert"
                  class="flex items-start gap-3 text-gray-700"
                >
                  <font-awesome-icon :icon="['fas', 'certificate']" class="text-primary-500 mt-1" />
                  {{ cert }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Courses Tab -->
        <div v-if="activeTab === 'courses'">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RouterLink
              v-for="course in instructorCourses"
              :key="course.id"
              :to="`/courses/${course.id}`"
              class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all overflow-hidden group"
            >
              <img
                :src="course.image_url"
                :alt="course.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div class="p-6">
                <span class="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {{ course.category?.name }}
                </span>
                <h3 class="text-xl font-bold text-gray-900 mt-3 mb-2">{{ course.name }}</h3>
                <p class="text-gray-600 mb-4">{{ course.description }}</p>
                
                <div class="flex items-center justify-between text-sm text-gray-600">
                  <span class="flex items-center gap-1">
                    <font-awesome-icon :icon="['fas', 'book']" class="text-primary-500" />
                    {{ course.total_chapters }} chapters
                  </span>
                  <span class="flex items-center gap-1">
                    <font-awesome-icon :icon="['fas', 'clock']" class="text-primary-500" />
                    {{ course.duration_months }} months
                  </span>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <!-- Reviews Tab -->
        <div v-if="activeTab === 'reviews'" class="max-w-4xl mx-auto">
          <div class="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <div class="flex items-center gap-8 mb-8">
              <div class="text-center">
                <div class="text-6xl font-bold text-gray-900 mb-2">{{ instructor.rating }}</div>
                <div class="flex items-center justify-center gap-1 mb-2">
                  <font-awesome-icon
                    v-for="i in 5"
                    :key="i"
                    :icon="['fas', 'star']"
                    :class="i <= Math.floor(instructor.rating) ? 'text-yellow-500' : 'text-gray-300'"
                  />
                </div>
                <p class="text-gray-600">{{ instructor.totalReviews }} reviews</p>
              </div>
              
              <div class="flex-1">
                <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-3 mb-2">
                  <span class="text-sm font-semibold text-gray-700 w-12">{{ star }} star</span>
                  <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-yellow-500 h-2 rounded-full"
                      :style="{ width: `${star === 5 ? 80 : star === 4 ? 15 : 5}%` }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600 w-12 text-right">
                    {{ star === 5 ? 80 : star === 4 ? 15 : 5 }}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sample Reviews -->
          <div class="space-y-6">
            <div
              v-for="i in 3"
              :key="i"
              class="bg-white rounded-2xl border border-gray-200 p-6"
            >
              <div class="flex items-start gap-4 mb-4">
                <img
                  :src="`https://i.pravatar.cc/60?u=student${i}`"
                  alt="Student"
                  class="w-12 h-12 rounded-full"
                />
                <div class="flex-1">
                  <h4 class="font-bold text-gray-900">Student {{ i }}</h4>
                  <div class="flex items-center gap-2 mt-1">
                    <div class="flex gap-1">
                      <font-awesome-icon
                        v-for="j in 5"
                        :key="j"
                        :icon="['fas', 'star']"
                        class="text-yellow-500 text-sm"
                      />
                    </div>
                    <span class="text-sm text-gray-500">2 weeks ago</span>
                  </div>
                </div>
              </div>
              <p class="text-gray-700">
                Excellent instructor! The teaching methodology is very clear and easy to understand.
                Highly recommended for anyone preparing for competitive exams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>