<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface CourseCardProps {
  id: string
  title: string
  description: string
  instructor: string
  price: number
  rating: number
  reviewCount: number
  duration: string
  studentCount: number
  thumbnail: string
  category: string
  level: string
}

const props = defineProps<CourseCardProps>()
const router = useRouter()

const formattedPrice = computed(() => `Rs. ${props.price.toLocaleString()}`)

const navigateToCourse = () => {
  router.push(`/courses/${props.id}`)
}
</script>

<template>
  <div
    @click="navigateToCourse"
    class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer group overflow-hidden"
  >
    <div class="relative h-48 overflow-hidden bg-gray-100">
      <img
        :src="thumbnail"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div
        class="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary-600"
      >
        {{ level }}
      </div>
    </div>
    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
          {{ category }}
        </span>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
        {{ title }}
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
      <div class="flex items-center gap-2 mb-4 text-sm text-gray-600">
        <font-awesome-icon :icon="['fas', 'users']" class="text-primary-500" />
        <span>{{ studentCount.toLocaleString() }} students</span>
      </div>
      <div class="flex items-center justify-between pt-4 border-t border-gray-200">
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