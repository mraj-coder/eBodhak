<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface RecommendedCourse {
  id: number
  name: string
  image: string
  category: string
  instructor: string
  rating: number
  students: number
  price: number
}

defineProps<{
  courses: RecommendedCourse[]
}>()
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-gray-900">Recommended for You</h3>
      <RouterLink
        to="/courses"
        class="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1"
      >
        View All
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </RouterLink>
    </div>
    
    <div class="space-y-4">
      <RouterLink
        v-for="course in courses"
        :key="course.id"
        :to="`/courses/${course.id}`"
        class="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition group"
      >
        <img
          :src="course.image"
          :alt="course.name"
          class="w-24 h-24 rounded-lg object-cover flex-shrink-0"
        />
        
        <div class="flex-1 min-w-0">
          <span class="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
            {{ course.category }}
          </span>
          <h4 class="font-bold text-gray-900 mt-2 mb-1 group-hover:text-primary-600 transition line-clamp-2">
            {{ course.name }}
          </h4>
          <p class="text-sm text-gray-600 mb-2">{{ course.instructor }}</p>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3 text-xs text-gray-600">
              <span class="flex items-center gap-1">
                <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-500" />
                {{ course.rating }}
              </span>
              <span class="flex items-center gap-1">
                <font-awesome-icon :icon="['fas', 'users']" class="text-primary-500" />
                {{ course.students.toLocaleString() }}
              </span>
            </div>
            <span class="font-bold text-primary-600">₹{{ course.price.toLocaleString() }}</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>