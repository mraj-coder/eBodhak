<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface FieldCardProps {
  name: string
  icon: string
  courses: number
  students: string
  category: string
  image?: string
}

const props = defineProps<FieldCardProps>()
</script>

<template>
  <RouterLink
    :to="`/courses?category=${encodeURIComponent(name)}`"
    class="group block bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
  >
    <!-- Image Container -->
    <div class="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <img 
        v-if="image"
        :src="image" 
        :alt="name"
        class="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
      />
      
      <!-- Icon Circle -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
          <font-awesome-icon :icon="['fas', icon]" class="text-4xl text-white" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
        {{ name }}
      </h3>
      
      <p class="text-gray-600 mb-4 font-medium">{{ courses }} Courses Available</p>
      
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <font-awesome-icon :icon="['fas', 'users']" class="text-primary-500" />
        <span>{{ students }} Students</span>
      </div>
    </div>
  </RouterLink>
</template>