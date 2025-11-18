<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  title: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: 'We are working hard to bring you this feature. Stay tuned!',
})
</script>

<template>
  <div class="coming-soon-page">
    <section class="min-h-screen bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center py-20">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto">
          <div class="text-8xl mb-8">🚀</div>
          <h1 class="text-4xl md:text-6xl font-bold mb-6">{{ title }}</h1>
          <p class="text-xl md:text-2xl text-primary-100 mb-12">
            {{ description }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink
              to="/"
              class="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Go to Home
            </RouterLink>
            <RouterLink
              to="/courses"
              class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-600 transition"
            >
              Browse Courses
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>