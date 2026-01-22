<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiService } from '@/services/api'
import type { BlogPost } from '@/types/blog'
import PremiumCTA from '@/components/common/PremiumCTA.vue'

const route = useRoute()
const router = useRouter()
const post = ref<BlogPost | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchBlog = async () => {
  try {
    loading.value = true
    error.value = null
    const slug = route.params.slug as string
    const response = await apiService.getBlogBySlug(slug)
    
    if (response.data) {
      // Normalize views to number type
      post.value = {
        ...response.data,
        views: typeof response.data.views === 'string' ? parseInt(response.data.views) || 0 : response.data.views
      }
    } else {
      throw new Error('Invalid response format')
    }
  } catch (err) {
    console.error('Failed to fetch blog:', err)
    error.value = 'Failed to load blog post. Please try again later.'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const goBack = () => {
  router.push('/blog')
}

onMounted(() => {
  fetchBlog()
})
</script>

<template>
  <div class="blog-detail-page bg-gray-50 min-h-screen">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600">Loading blog post...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !post" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-auto px-4">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="text-4xl text-red-500" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">Blog Post Not Found</h3>
        <p class="text-gray-600 mb-6">{{ error || 'The blog post you are looking for does not exist.' }}</p>
        <button
          @click="goBack"
          class="bg-primary-500 hover:bg-primary-600 text-white py-3 px-8 rounded-xl font-semibold transition"
        >
          Back to Blog
        </button>
      </div>
    </div>

    <!-- Content -->
    <template v-else-if="post">
      <!-- Back Button -->
      <div class="bg-white border-b border-gray-200">
        <div class="container mx-auto px-4 py-4">
          <button
            @click="goBack"
            class="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition"
          >
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            <span class="font-semibold">Back to Blog</span>
          </button>
        </div>
      </div>

      <!-- Hero Section -->
      <section class="bg-white py-12">
        <div class="container mx-auto px-4 max-w-4xl">
          <!-- Featured Image -->
          <div v-if="post.featured_image" class="mb-8 rounded-2xl overflow-hidden">
            <img
              :src="post.featured_image"
              :alt="post.title"
              class="w-full h-[400px] object-cover"
            />
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {{ post.title }}
          </h1>

          <!-- Meta Information -->
          <div class="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <span class="text-primary-600 font-bold text-xl">{{ post.author.name.charAt(0) }}</span>
              </div>
              <div>
                <p class="font-semibold text-gray-900">{{ post.author.name }}</p>
                <p class="text-sm text-gray-600">{{ formatDate(post.published_at) }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4 text-gray-600">
              <span class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'eye']" class="text-primary-500" />
                {{ post.views.toLocaleString() }} views
              </span>
            </div>

            <div v-if="post.is_featured" class="ml-auto">
              <span class="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                Featured
              </span>
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-xl mb-8">
            <p class="text-lg text-gray-700 leading-relaxed">
              {{ post.summary }}
            </p>
          </div>

          <!-- Content -->
          <div class="prose prose-lg max-w-none">
            <div v-html="post.content" class="text-gray-700 leading-relaxed"></div>
          </div>
        </div>
      </section>

      <!-- Share Section -->
      <section class="bg-gray-100 py-8">
        <div class="container mx-auto px-4 max-w-4xl">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900">Share this article</h3>
            <div class="flex gap-3">
              <button class="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition">
                <font-awesome-icon :icon="['fab', 'facebook-f']" />
              </button>
              <button class="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition">
                <font-awesome-icon :icon="['fab', 'twitter']" />
              </button>
              <button class="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center transition">
                <font-awesome-icon :icon="['fab', 'linkedin-in']" />
              </button>
              <button class="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition">
                <font-awesome-icon :icon="['fab', 'whatsapp']" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <PremiumCTA
        title="Ready to Start Learning?"
        subtitle="Join thousands of students preparing for their exams with our comprehensive courses"
        buttonText="Browse Courses"
        buttonLink="/courses"
        benefits="Expert instructors • Comprehensive materials • Proven results"
      />
    </template>
  </div>
</template>

<style scoped>
.prose {
  color: #374151;
}

.prose h2 {
  font-size: 1.875rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #111827;
}

.prose h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #111827;
}

.prose p {
  margin-bottom: 1.25rem;
  line-height: 1.75;
}

.prose ul,
.prose ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose strong {
  font-weight: 600;
  color: #111827;
}

.prose a {
  color: #6366f1;
  text-decoration: underline;
}

.prose a:hover {
  color: #4f46e5;
}

.prose blockquote {
  border-left: 4px solid #6366f1;
  padding-left: 1rem;
  font-style: italic;
  color: #6b7280;
  margin: 1.5rem 0;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: 'Courier New', monospace;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
}
</style>