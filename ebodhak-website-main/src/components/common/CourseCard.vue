<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Course } from '@/types/course'

interface CourseCardProps {
  course: Course
}

const props = defineProps<CourseCardProps>()
const router = useRouter()

// Calculate price based on duration (adjust this logic as needed)
const price = computed(() => (props.course.duration_months || 6) * 1000)
const formattedPrice = computed(() => `Rs. ${price.value.toLocaleString()}`)

// Format duration
const duration = computed(() => `${props.course.duration_months || 6} months`)

// Capitalize difficulty level
const level = computed(() => {
  if (!props.course.difficulty_level) return 'Intermediate'
  const levelMap: Record<string, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }
  return levelMap[props.course.difficulty_level] || props.course.difficulty_level
})

// Default values for fields not in API
const description = computed(() => props.course.description || `Comprehensive preparation course for ${props.course.name}`)
const category = computed(() => props.course.category?.name || 'General')
const thumbnail = computed(() => props.course.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop')
const totalChapters = computed(() => props.course.total_chapters || 30)
const questionsCount = computed(() => props.course.questions_count || 1000)

// Mock data for fields not in API
const rating = 4.5
const reviewCount = 100
const studentCount = computed(() => Math.floor(Math.random() * 5000) + 500)
const instructor = 'Expert Instructor'

const navigateToCourse = () => {
  router.push(`/courses/${props.course.id}`)
}
</script>

<template>
  <div
    @click="navigateToCourse"
    class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer group overflow-hidden flex flex-col h-full"
  >
    <div class="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
      <img
        :src="thumbnail"
        :alt="course.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        @error="(e) => ((e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop')"
      />
      <div
        class="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary-600"
      >
        {{ level }}
      </div>
    </div>
    <div class="p-6 flex flex-col flex-grow">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
          {{ category }}
        </span>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
        {{ course.name }}
      </h3>
      <p class="text-gray-600 mb-4 line-clamp-2">{{ description }}</p>
      <div class="flex items-center gap-2 mb-4 text-sm text-gray-600">
        <font-awesome-icon :icon="['fas', 'user-graduate']" class="text-primary-500" />
        <span>{{ instructor }}</span>
      </div>
      <div class="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div class="flex items-center gap-1">
          <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
          <span class="font-semibold text-gray-900">{{ rating }}</span>
          <span>({{ reviewCount }})</span>
        </div>
        <div class="flex items-center gap-1">
          <font-awesome-icon :icon="['fas', 'clock']" class="text-primary-500" />
          <span>{{ duration }}</span>
        </div>
      </div>
      <div class="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div class="flex items-center gap-1">
          <font-awesome-icon :icon="['fas', 'book']" class="text-primary-500" />
          <span>{{ totalChapters }} chapters</span>
        </div>
        <div class="flex items-center gap-1">
          <font-awesome-icon :icon="['fas', 'question-circle']" class="text-primary-500" />
          <span>{{ questionsCount }} questions</span>
        </div>
      </div>
      <div class="flex items-center gap-2 mb-4 text-sm text-gray-600">
        <font-awesome-icon :icon="['fas', 'users']" class="text-primary-500" />
        <span>{{ studentCount.toLocaleString() }} students</span>
      </div>
      <div class="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
        <span class="text-2xl font-bold text-gray-900">{{ formattedPrice }}</span>
        <button
          class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Enroll Now
        </button>
      </div>
    </div>
  </div>
</template>