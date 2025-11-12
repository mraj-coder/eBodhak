<script setup lang="ts">
import { ref, computed } from 'vue'
import CourseCard from '../components/common/CourseCard.vue'

const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedLevel = ref('All')
const selectedPriceRange = ref('All')
const sortBy = ref('popular')

const categories = ['All', 'Engineering', 'Medical', 'Management', 'IT & CS', 'Science', 'Banking']
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
const priceRanges = ['All', 'Under Rs. 2000', 'Rs. 2000-5000', 'Above Rs. 5000']

const courses = [
  {
    id: '1',
    title: 'IOE Entrance Preparation - Complete Course',
    description:
      'Comprehensive preparation for IOE entrance exam covering Physics, Chemistry, Mathematics, and English',
    instructor: 'Dr. Ramesh Sharma',
    price: 4999,
    rating: 4.8,
    reviewCount: 245,
    duration: '120 hours',
    studentCount: 3200,
    thumbnail: 'https://images.unsplash.com/photo-1581092335331-5e00ac65e934?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGJsdWVwcmludCUyMHRlY2huaWNhbCUyMGdlYXJzfGVufDB8MHx8Ymx1ZXwxNzYyNDA3MTM4fDA&ixlib=rb-4.1.0&q=85',
    category: 'Engineering',
    level: 'Intermediate',
  },
  {
    id: '2',
    title: 'MBBS Entrance Complete Package',
    description:
      'Full preparation course for MBBS entrance with Biology, Chemistry, Physics, and English',
    instructor: 'Dr. Sunita Karki',
    price: 5999,
    rating: 4.9,
    reviewCount: 189,
    duration: '150 hours',
    studentCount: 2800,
    thumbnail: 'https://images.unsplash.com/photo-1659353886508-63654e63eca4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RldGhvc2NvcGUlMjBoZWFsdGhjYXJlJTIwYW5hdG9teXxlbnwwfDB8fHJlZHwxNzYyNDA3MTM3fDA&ixlib=rb-4.1.0&q=85',
    category: 'Medical',
    level: 'Advanced',
  },
  {
    id: '3',
    title: 'MBA Entrance Preparation',
    description: 'Complete MBA entrance preparation covering Quantitative, Verbal, and Logical Reasoning',
    instructor: 'Prof. Bijay Shrestha',
    price: 3999,
    rating: 4.7,
    reviewCount: 156,
    duration: '80 hours',
    studentCount: 1900,
    thumbnail: 'https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjaGFydHMlMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHxwdXJwbGV8MTc2MjQwNzEzOHww&ixlib=rb-4.1.0&q=85',
    category: 'Management',
    level: 'Intermediate',
  },
  {
    id: '4',
    title: 'Full Stack Web Development',
    description: 'Learn modern web development with React, Node.js, MongoDB, and deployment',
    instructor: 'Er. Prakash Thapa',
    price: 6999,
    rating: 4.9,
    reviewCount: 312,
    duration: '200 hours',
    studentCount: 4500,
    thumbnail: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBsYXB0b3AlMjB0ZWNobm9sb2d5fGVufDB8MHx8fDE3NjI0MDcxMzh8MA&ixlib=rb-4.1.0&q=85',
    category: 'IT & CS',
    level: 'Beginner',
  },
  {
    id: '5',
    title: 'Data Science & Machine Learning',
    description: 'Master Python, Statistics, ML algorithms, and real-world data science projects',
    instructor: 'Dr. Anita Tamang',
    price: 7999,
    rating: 4.8,
    reviewCount: 278,
    duration: '180 hours',
    studentCount: 3100,
    thumbnail: 'https://images.unsplash.com/photo-1542831371-32f555c86880?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxwcm9ncmFtbWluZyUyMGNvZGUlMjBsYXB0b3AlMjB0ZWNobm9sb2d5fGVufDB8MHx8fDE3NjI0MDcxMzh8MA&ixlib=rb-4.1.0&q=85',
    category: 'IT & CS',
    level: 'Advanced',
  },
  {
    id: '6',
    title: 'Banking Service Commission Preparation',
    description: 'Complete preparation for Nepal Rastra Bank and other banking exams',
    instructor: 'CA Mohan Adhikari',
    price: 2999,
    rating: 4.6,
    reviewCount: 134,
    duration: '60 hours',
    studentCount: 1500,
    thumbnail: 'https://images.unsplash.com/photo-1656337426914-5e5ba162d606?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwc2NpZW5jZSUyMG1pY3Jvc2NvcGUlMjByZXNlYXJjaHxlbnwwfDB8fHRlYWx8MTc2MjQwNzEzN3ww&ixlib=rb-4.1.0&q=85',
    category: 'Banking',
    level: 'Intermediate',
  },
  {
    id: '7',
    title: 'Physics for Engineering Students',
    description: 'Advanced physics concepts for engineering entrance and undergraduate studies',
    instructor: 'Prof. Krishna Bahadur',
    price: 3499,
    rating: 4.7,
    reviewCount: 198,
    duration: '90 hours',
    studentCount: 2400,
    thumbnail: 'https://images.unsplash.com/photo-1656337426914-5e5ba162d606?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwc2NpZW5jZSUyMG1pY3Jvc2NvcGUlMjByZXNlYXJjaHxlbnwwfDB8fHRlYWx8MTc2MjQwNzEzN3ww&ixlib=rb-4.1.0&q=85',
    category: 'Science',
    level: 'Intermediate',
  },
  {
    id: '8',
    title: 'BBA Foundation Course',
    description: 'Complete foundation course for BBA entrance and first-year students',
    instructor: 'Prof. Sita Gurung',
    price: 2499,
    rating: 4.5,
    reviewCount: 112,
    duration: '70 hours',
    studentCount: 1800,
    thumbnail: 'https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjaGFydHMlMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHxwdXJwbGV8MTc2MjQwNzEzOHww&ixlib=rb-4.1.0&q=85',
    category: 'Management',
    level: 'Beginner',
  },
]

const filteredCourses = computed(() => {
  return courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || course.category === selectedCategory.value
    const matchesLevel = selectedLevel.value === 'All' || course.level === selectedLevel.value
    const matchesPrice =
      selectedPriceRange.value === 'All' ||
      (selectedPriceRange.value === 'Under Rs. 2000' && course.price < 2000) ||
      (selectedPriceRange.value === 'Rs. 2000-5000' && course.price >= 2000 && course.price <= 5000) ||
      (selectedPriceRange.value === 'Above Rs. 5000' && course.price > 5000)

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice
  })
})
</script>

<template>
  <div class="courses-page">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Explore Our Courses</h1>
          <p class="text-xl text-primary-100 mb-8">
            Choose from 200+ expert-led courses across Engineering, Medical, Management, IT, and more
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
        <div class="flex flex-col lg:flex-row gap-8">
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
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div v-if="filteredCourses.length > 0" class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <CourseCard v-for="course in filteredCourses" :key="course.id" v-bind="course" />
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