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
    <section class="min-h-screen bg-hero-pattern text-white flex items-center justify-center py-20">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto">
          <div class="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
            <font-awesome-icon :icon="['fas', 'rocket']" class="text-6xl text-white" />
          </div>
          <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down text-shadow-lg">{{ title }}</h1>
          <p class="text-xl md:text-2xl mb-12 animate-fade-in-up animation-delay-200 text-shadow-md">
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