<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CourseCard from '../components/common/CourseCard.vue'
import { useCourses } from '@/composables/useCourses'
import type { Course } from '@/types/course'

const route = useRoute()
const { courses, loading, error, fetchCourses } = useCourses()

const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedLevel = ref('All')
const selectedPriceRange = ref('All')
const sortBy = ref('popular')

// Extract unique categories from API data
const categories = computed(() => {
  const uniqueCategories = new Set(
    courses.value
      .map((course) => course.category?.name)
      .filter((name): name is string => !!name)
  )
  return ['All', ...Array.from(uniqueCategories)]
})

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
const priceRanges = ['All', 'Under Rs. 2000', 'Rs. 2000-5000', 'Above Rs. 5000']

// Helper function to calculate price (you may need to adjust this based on actual pricing logic)
const getCoursePrice = (course: Course): number => {
  // This is a placeholder - adjust based on your actual pricing structure
  // For now, using a simple calculation based on duration
  return (course.duration_months || 6) * 1000
}

const filteredCourses = computed(() => {
  let filtered = courses.value.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (course.description || '').toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory =
      selectedCategory.value === 'All' || course.category?.name === selectedCategory.value
    const matchesLevel =
      selectedLevel.value === 'All' ||
      (course.difficulty_level?.toLowerCase() || 'intermediate') === selectedLevel.value.toLowerCase()

    const price = getCoursePrice(course)
    const matchesPrice =
      selectedPriceRange.value === 'All' ||
      (selectedPriceRange.value === 'Under Rs. 2000' && price < 2000) ||
      (selectedPriceRange.value === 'Rs. 2000-5000' && price >= 2000 && price <= 5000) ||
      (selectedPriceRange.value === 'Above Rs. 5000' && price > 5000)

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice
  })

  // Apply sorting
  if (sortBy.value === 'newest') {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    )
  } else if (sortBy.value === 'price-low') {
    filtered = [...filtered].sort((a, b) => getCoursePrice(a) - getCoursePrice(b))
  } else if (sortBy.value === 'price-high') {
    filtered = [...filtered].sort((a, b) => getCoursePrice(b) - getCoursePrice(a))
  }

  return filtered
})

onMounted(() => {
  // Check if there's a category query parameter
  const categoryParam = route.query.category as string
  if (categoryParam) {
    selectedCategory.value = categoryParam
  }
  fetchCourses()
})
</script>

<template>
  <div class="courses-page">
    <!-- Hero Section -->
    <section class="bg-compact-hero-pattern text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down text-shadow-lg">Explore Our Courses</h1>
          <p class="text-xl text-primary-100 mb-8">
            Choose from {{ courses.length }}+ expert-led courses across Engineering, Medical,
            Management, IT, and more
          </p>
          <div class="relative max-w-2xl mx-auto">
            <font-awesome-icon
              :icon="['fas', 'search']"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for courses..."
              class="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Filters and Courses -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          <p class="mt-4 text-gray-600">Loading courses...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <font-awesome-icon :icon="['fas', 'exclamation-circle']" class="text-6xl text-red-500 mb-4" />
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Error Loading Courses</h3>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <button
            @click="fetchCourses"
            class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Try Again
          </button>
        </div>

        <!-- Courses Content -->
        <div v-else class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar Filters -->
          <aside class="lg:w-64 flex-shrink-0">
            <div class="bg-white rounded-2xl p-6 border border-gray-200 sticky top-4">
              <div class="flex items-center gap-2 mb-6">
                <font-awesome-icon :icon="['fas', 'filter']" class="text-primary-500" />
                <h2 class="text-xl font-bold text-gray-900">Filters</h2>
              </div>

              <!-- Category Filter -->
              <div class="mb-6">
                <h3 class="font-semibold text-gray-900 mb-3">Category</h3>
                <div class="space-y-2">
                  <label
                    v-for="category in categories"
                    :key="category"
                    class="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      v-model="selectedCategory"
                      type="radio"
                      :value="category"
                      class="accent-green-600 focus:ring-offset-2 focus:ring-green-300"
                    />
                    <span class="text-gray-700">{{ category }}</span>
                  </label>
                </div>
              </div>

              <!-- Level Filter -->
              <div class="mb-6">
                <h3 class="font-semibold text-gray-900 mb-3">Level</h3>
                <div class="space-y-2">
                  <label v-for="level in levels" :key="level" class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="selectedLevel"
                      type="radio"
                      :value="level"
                      class="accent-green-600 focus:ring-offset-2 focus:ring-green-300"
                    />
                    <span class="text-gray-700">{{ level }}</span>
                  </label>
                </div>
              </div>

              <!-- Price Filter -->
              <div class="mb-6">
                <h3 class="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div class="space-y-2">
                  <label
                    v-for="priceRange in priceRanges"
                    :key="priceRange"
                    class="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      v-model="selectedPriceRange"
                      type="radio"
                      :value="priceRange"
                      class="accent-green-600 focus:ring-offset-2 focus:ring-green-300"
                    />
                    <span class="text-gray-700">{{ priceRange }}</span>
                  </label>
                </div>
              </div>

              <button
                @click="
                  () => {
                    selectedCategory = 'All'
                    selectedLevel = 'All'
                    selectedPriceRange = 'All'
                    searchQuery = ''
                  }
                "
                class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold transition"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          <!-- Course Grid -->
          <div class="flex-1">
            <div class="flex items-center justify-between mb-6">
              <p class="text-gray-600">
                <span class="font-semibold text-gray-900">{{ filteredCourses.length }}</span> courses found
              </p>
              <select
                v-model="sortBy"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div v-if="filteredCourses.length > 0" class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <CourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
            </div>

            <div v-else class="text-center py-20">
              <font-awesome-icon :icon="['fas', 'search']" class="text-6xl text-gray-300 mb-4" />
              <h3 class="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p class="text-gray-600 mb-6">Try adjusting your filters or search query</p>
              <button
                @click="
                  () => {
                    selectedCategory = 'All'
                    selectedLevel = 'All'
                    selectedPriceRange = 'All'
                    searchQuery = ''
                  }
                "
                class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>