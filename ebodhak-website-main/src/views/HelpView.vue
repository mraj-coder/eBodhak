<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import PremiumCTA from '@/components/common/PremiumCTA.vue'

const searchQuery = ref('')

const helpTopics = [
  {
    icon: 'graduation-cap',
    title: 'Getting Started',
    description: 'Learn how to create an account and start your learning journey',
    link: '/help/getting-started',
  },
  {
    icon: 'book',
    title: 'Course Access',
    description: 'How to enroll in courses and access learning materials',
    link: '/help/course-access',
  },
  {
    icon: 'clipboard-list',
    title: 'Mock Tests',
    description: 'Taking tests, viewing results, and tracking progress',
    link: '/help/mock-tests',
  },
  {
    icon: 'credit-card',
    title: 'Billing & Payments',
    description: 'Payment methods, subscriptions, and refund policies',
    link: '/help/billing',
  },
  {
    icon: 'mobile-alt',
    title: 'Mobile App',
    description: 'Download and use our mobile applications',
    link: '/help/mobile-app',
  },
  {
    icon: 'headset',
    title: 'Technical Support',
    description: 'Troubleshooting and technical assistance',
    link: '/help/technical-support',
  },
]

const popularArticles = [
  'How do I reset my password?',
  'Can I download course videos?',
  'How to change my subscription plan?',
  'What payment methods are accepted?',
  'How do I contact an instructor?',
  'Can I get a refund?',
]
</script>

<template>
  <div class="help-page">
    <!-- Hero Section -->
    <section class="bg-hero-pattern text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-down text-shadow-lg">How Can We Help?</h1>
        <p class="text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 text-shadow-md">
          Search our help center or browse by category
        </p>
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <font-awesome-icon
              :icon="['fas', 'search']"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for help..."
              class="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Help Topics -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Browse by Topic</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div
            v-for="topic in helpTopics"
            :key="topic.title"
            class="bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary-300 hover:shadow-xl transition cursor-pointer group"
          >
            <div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500 transition">
              <font-awesome-icon :icon="['fas', topic.icon]" class="text-primary-600 group-hover:text-white text-2xl transition" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
              {{ topic.title }}
            </h3>
            <p class="text-gray-600">{{ topic.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Articles -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Popular Articles</h2>
        <div class="space-y-4">
          <div
            v-for="(article, index) in popularArticles"
            :key="index"
            class="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition cursor-pointer flex items-center justify-between group"
          >
            <span class="text-gray-900 font-medium group-hover:text-primary-600 transition">
              {{ article }}
            </span>
            <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-gray-400 group-hover:text-primary-600 transition" />
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Support -->
    <PremiumCTA
      title="Still Need Help?"
      subtitle="Can't find what you're looking for? Our support team is here to assist you"
      buttonText="Contact Support"
      buttonLink="/contact"
      benefits="24/7 availability • Quick response • Expert assistance"
    />
  </div>
</template>