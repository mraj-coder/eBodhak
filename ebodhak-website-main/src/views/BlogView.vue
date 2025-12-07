<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '@/services/api'
import type { BlogPost } from '@/types/blog'

const router = useRouter()
const posts = ref<BlogPost[]>([])
const selectedCategory = ref('all')
const searchQuery = ref('')
const loading = ref(true)
const error = ref<string | null>(null)

const categories = ['all', 'Exam Tips', 'Study Guides', 'Success Stories']

const filteredPosts = computed(() => {
  let filtered = posts.value

  if (selectedCategory.value !== 'all') {
    // For now, show all posts regardless of category since API doesn't provide category
    // You can enhance this later when category data is available from API
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      post =>
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query)
    )
  }

  return filtered
})

const featuredPosts = computed(() => posts.value.filter(post => post.is_featured))

const fetchBlogs = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await apiService.getAllBlogs()
    
    if (response.data && Array.isArray(response.data)) {
      // Normalize views to number type
      posts.value = response.data.map(post => ({
        ...post,
        views: typeof post.views === 'string' ? parseInt(post.views) || 0 : post.views
      }))
    } else {
      throw new Error('Invalid response format')
    }
  } catch (err) {
    console.error('Failed to fetch blogs:', err)
    error.value = 'Failed to load blog posts. Please try again later.'
  } finally {
    loading.value = false
  }
}

const navigateToBlog = (slug: string) => {
  router.push(`/blog/${slug}`)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

onMounted(() => {
  fetchBlogs()
})
</script>

<template>
  <div class="blog-page bg-gray-50 min-h-screen">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600">Loading blog posts...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-auto px-4">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="text-4xl text-red-500" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">Failed to Load Blogs</h3>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button
          @click="fetchBlogs"
          class="bg-primary-500 hover:bg-primary-600 text-white py-3 px-8 rounded-xl font-semibold transition"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Hero Section -->
      <section class="bg-compact-hero-pattern text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down text-shadow-lg">Blog & Resources</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Expert insights, study tips, and success stories to help you excel in your exams
          </p>

          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search articles..."
                class="w-full px-6 py-4 pr-12 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/20"
              />
              <font-awesome-icon
                :icon="['fas', 'search']"
                class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Category Filter -->
      <section class="py-8 bg-white border-b border-gray-200">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap gap-3 justify-center">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-6 py-3 rounded-xl font-semibold transition',
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              {{ category === 'all' ? 'All Articles' : category }}
            </button>
          </div>
        </div>
      </section>

      <!-- Featured Posts -->
      <section v-if="featuredPosts.length > 0 && selectedCategory === 'all' && !searchQuery" class="py-12 bg-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-5">
          <img 
            src="https://images.pexels.com/photos/5940715/pexels-photo-5940715.jpeg" 
            alt="Background pattern"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div
              v-for="post in featuredPosts"
              :key="post.id"
              @click="navigateToBlog(post.slug)"
              class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
            >
              <div class="relative h-64 overflow-hidden">
                <img
                  v-if="post.featured_image"
                  :src="post.featured_image"
                  :alt="post.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'newspaper']" class="text-6xl text-white opacity-50" />
                </div>
                <div class="absolute top-4 left-4">
                  <span class="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    Featured
                  </span>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span class="text-primary-600 font-bold text-lg">{{ post.author.name.charAt(0) }}</span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ post.author.name }}</p>
                    <p class="text-sm text-gray-600">{{ formatDate(post.published_at) }}</p>
                  </div>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mt-4 mb-3">{{ post.title }}</h3>
                <p class="text-gray-600 mb-4">{{ post.summary }}</p>
                
                <div class="flex items-center justify-between text-sm text-gray-600">
                  <span class="flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'eye']" class="text-primary-500" />
                    {{ post.views.toLocaleString() }} views
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- All Posts -->
      <section class="py-12">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">
            {{ selectedCategory === 'all' ? 'Latest Articles' : selectedCategory }}
          </h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="post in filteredPosts"
              :key="post.id"
              @click="navigateToBlog(post.slug)"
              class="bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all overflow-hidden group cursor-pointer"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  v-if="post.featured_image"
                  :src="post.featured_image"
                  :alt="post.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'newspaper']" class="text-4xl text-white opacity-50" />
                </div>
              </div>
              
              <div class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span class="text-primary-600 font-semibold text-sm">{{ post.author.name.charAt(0) }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">{{ post.author.name }}</p>
                    <p class="text-xs text-gray-600">{{ formatDate(post.published_at) }}</p>
                  </div>
                </div>
                
                <h3 class="text-xl font-bold text-gray-900 mt-3 mb-2">{{ post.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ post.summary }}</p>
                
                <div class="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                  <span class="flex items-center gap-1">
                    <font-awesome-icon :icon="['fas', 'eye']" class="text-primary-500" />
                    {{ post.views.toLocaleString() }}
                  </span>
                  <button class="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1">
                    Read
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredPosts.length === 0" class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <font-awesome-icon :icon="['fas', 'newspaper']" class="text-5xl text-gray-300" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
            <p class="text-gray-600 mb-8">Try adjusting your search or filters</p>
            <button
              @click="searchQuery = ''; selectedCategory = 'all'"
              class="bg-primary-500 hover:bg-primary-600 text-white py-3 px-8 rounded-xl font-semibold transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="py-16 bg-newsletter-pattern text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest study tips and exam strategies delivered to your inbox
          </p>
          
          <div class="max-w-md mx-auto">
            <div class="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                class="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/20"
              />
              <button class="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-xl font-bold transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>