<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { apiService } from '@/services/api'
import type { SubscriptionPlan } from '@/types/subscription'
import PremiumCTA from '@/components/common/PremiumCTA.vue'
import FieldCard from '@/components/common/FieldCard.vue'

const router = useRouter()

interface ProcessedPlan extends SubscriptionPlan {
  parsedFeatures: string[]
  numericPrice: number
  numericEffectivePrice: number
}

// Hero Carousel
const currentSlide = ref(0)
let autoplayInterval: number | null = null

const heroSlides = [
  {
    title: 'Master Any Field of Study',
    subtitle: 'Engineering • Medical • Management • IT',
    description:
      'Comprehensive e-learning platform for all competitive exams and professional courses',
    badge: '15+ Fields of Study',
    badgeIcon: 'graduation-cap',
    bgGradient: 'from-gray-50 to-white',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop&q=80',
    imageAlt: 'Students collaborating and learning together in a modern educational environment',
  },
  {
    title: 'Learn at Your Own Pace',
    subtitle: 'Anytime, Anywhere Access',
    description: 'Live classes, recorded sessions, and unlimited practice materials available 24/7',
    badge: 'Multi-Device Learning',
    badgeIcon: 'mobile-alt',
    bgGradient: 'from-purple-50 to-pink-50',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=800&fit=crop&q=80',
    imageAlt: 'Student studying online with laptop and notes in a comfortable learning environment',
  },
  {
    title: 'Expert-Led Instruction',
    subtitle: '50+ Industry Professionals',
    description: 'Learn from experienced educators and industry experts with proven track records',
    badge: 'Top 1% Educators',
    badgeIcon: 'user-graduate',
    bgGradient: 'from-orange-50 to-yellow-50',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=800&fit=crop&q=80',
    imageAlt: 'Professional instructor teaching in a modern classroom with engaged students',
  },
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + heroSlides.length) % heroSlides.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetAutoplay()
}

const resetAutoplay = () => {
  if (autoplayInterval) clearInterval(autoplayInterval)
  autoplayInterval = setInterval(nextSlide, 6000)
}

onMounted(() => {
  autoplayInterval = setInterval(nextSlide, 6000)
  fetchSubscriptionPlans()
})

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval)
})

// Course Categories
const categories = [
  {
    name: 'Engineering (IOE, BE)',
    icon: 'cog',
    courses: 25,
    students: '5,200+',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&q=80',
  },
  { 
    name: 'Medical (MBBS, BDS)', 
    icon: 'stethoscope', 
    courses: 18, 
    students: '3,800+',
    category: 'Medical',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop&q=80',
  },
  {
    name: 'Management (MBA, BBA)',
    icon: 'briefcase',
    courses: 22,
    students: '4,100+',
    category: 'Management',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&q=80',
  },
  {
    name: 'Science & Technology',
    icon: 'flask',
    courses: 30,
    students: '6,500+',
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop&q=80',
  },
  {
    name: 'IT & Computer Science',
    icon: 'laptop-code',
    courses: 35,
    students: '7,200+',
    category: 'IT',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop&q=80',
  },
  {
    name: 'Banking & Government',
    icon: 'landmark',
    courses: 20,
    students: '3,200+',
    category: 'Banking',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop&q=80',
  },
]

// Features data
const features = [
  {
    icon: 'book',
    title: 'Comprehensive Curriculum',
    description:
      'Expertly crafted content for Engineering, Medical, Management, IT and all competitive exams',
    gradient: 'from-blue-500 to-blue-600',
    illustration: '/illustrations/education-interest.svg',
  },
  {
    icon: 'video',
    title: 'HD Video Lectures',
    description: 'Crystal clear video content with interactive whiteboards and detailed animations',
    gradient: 'from-purple-500 to-purple-600',
    illustration: '/illustrations/video-gopro.svg',
  },
  {
    icon: 'clipboard-list',
    title: 'Practice & Mock Tests',
    description:
      '10,000+ questions with detailed solutions and comprehensive performance analytics',
    gradient: 'from-primary-500 to-primary-600',
    illustration: '/illustrations/online-exams.svg',
  },
  {
    icon: 'users',
    title: 'Live Doubt Sessions',
    description: 'Real-time interaction with expert instructors for instant doubt resolution',
    gradient: 'from-pink-500 to-pink-600',
    illustration: 'https://pixabay.com/get/gcc5fe6558f498bd669d008e9c4d6f90639938d573be4ff7be138067a0d5e0bf90a954a222a16e63786a04469c474f110.svg',
  },
  {
    icon: 'chart-line',
    title: 'Progress Tracking',
    description: 'Advanced analytics dashboard to monitor your learning journey and improvements',
    gradient: 'from-indigo-500 to-indigo-600',
    illustration: 'https://pixabay.com/get/g0afab2aee735f670d2e28b3d80304197968b879256ad1c4480d98ae77b208ae94ec94597b8f7d9fa60c6f80959a108c1.svg',
  },
  {
    icon: 'comments',
    title: 'Study Communities',
    description: 'Collaborate with peers through forums, group discussions and study sessions',
    gradient: 'from-teal-500 to-teal-600',
    illustration: '/illustrations/phone-comment.svg',
  },
  {
    icon: 'mobile-alt',
    title: 'Mobile Learning',
    description: 'Learn on the go with our mobile-friendly platform and dedicated apps',
    gradient: 'from-cyan-500 to-cyan-600',
    illustration: '/illustrations/app-development.svg',
  },
  {
    icon: 'trophy',
    title: 'Certificates',
    description: 'Earn recognized certificates and showcase your achievements professionally',
    gradient: 'from-orange-500 to-orange-600',
    illustration: '/illustrations/success-trophy.svg',
  },
]

// Statistics
const stats = [
  { number: '15,000+', label: 'Active Students', icon: 'users' },
  { number: '96%', label: 'Success Rate', icon: 'chart-line' },
  { number: '50+', label: 'Expert Instructors', icon: 'user-graduate' },
  { number: '200+', label: 'Total Courses', icon: 'book' },
]

// Testimonials
const testimonials = [
  {
    name: 'Abhishek Jha',
    role: 'IOE Entrance Rank 5',
    image: 'https://i.pravatar.cc/150?u=abhishek1',
    content:
      'The structured approach and quality content helped me crack IOE with flying colors. The mock tests were exactly like the real exam!',
    rating: 5,
  },
  {
    name: 'Abhishek Jha',
    role: 'MBBS Student',
    image: 'https://i.pravatar.cc/150?u=abhishek2',
    content:
      'Ebodhak made medical entrance preparation so much easier. The biology section is incredibly detailed and well-explained.',
    rating: 5,
  },
  {
    name: 'Abhishek Jha',
    role: 'BBA Graduate',
    image: 'https://i.pravatar.cc/150?u=abhishek3',
    content:
      'Best decision I made for my career! The management courses are practical and industry-relevant. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Abhishek Jha',
    role: 'Computer Science Student',
    image: 'https://i.pravatar.cc/150?u=abhishek4',
    content:
      'The programming courses are top-notch. Real-world projects and coding exercises helped me build a strong portfolio.',
    rating: 5,
  },
]

// Pricing - Fetch from API
const pricingPlans = ref<ProcessedPlan[]>([])
const pricingLoading = ref(true)

// Parse features from JSON string
const parseFeatures = (featuresJson: string): string[] => {
  try {
    return JSON.parse(featuresJson)
  } catch {
    return []
  }
}

// Fetch subscription plans from API
const fetchSubscriptionPlans = async () => {
  try {
    pricingLoading.value = true
    const response = await apiService.getGlobalSubscriptionPlans()
    
    if (response.success && response.data.plans) {
      // Process and filter plans (exclude "Free Forever")
      const allPlans = response.data.plans
        .filter(plan => plan.slug !== 'free-forever')
        .map(plan => ({
          ...plan,
          parsedFeatures: parseFeatures(plan.features),
          numericPrice: parseFloat(plan.price),
          numericEffectivePrice: parseFloat(plan.effective_price),
        }))
        .sort((a, b) => {
          // Sort by duration: null (lifetime) goes last, others by duration
          if (a.duration_months === null) return 1
          if (b.duration_months === null) return -1
          return a.duration_months - b.duration_months
        })
      
      // Show 3 most relevant plans: 1 month, 6 months (popular), and 1 year
      // Or if less plans available, show what we have
      if (allPlans.length <= 3) {
        pricingPlans.value = allPlans
      } else {
        // Try to get a good mix: shortest, popular/middle, and longest term
        const selectedPlans = []
        
        // Get the popular plan first
        const popularPlan = allPlans.find(p => p.is_popular)
        if (popularPlan) selectedPlans.push(popularPlan)
        
        // Get shortest duration plan (if not already added)
        const shortestPlan = allPlans.find(p => !selectedPlans.includes(p) && p.duration_months !== null)
        if (shortestPlan) selectedPlans.push(shortestPlan)
        
        // Get longest duration plan (if not already added)
        const longestPlan = [...allPlans].reverse().find(p => !selectedPlans.includes(p))
        if (longestPlan) selectedPlans.push(longestPlan)
        
        // If we still need more, add remaining plans
        while (selectedPlans.length < 3 && selectedPlans.length < allPlans.length) {
          const nextPlan = allPlans.find(p => !selectedPlans.includes(p))
          if (nextPlan) selectedPlans.push(nextPlan)
          else break
        }
        
        pricingPlans.value = selectedPlans
      }
    }
  } catch (err) {
    console.error('Error fetching subscription plans:', err)
  } finally {
    pricingLoading.value = false
  }
}

const getPrice = (plan: ProcessedPlan) => {
  return plan.numericEffectivePrice
}

const getDurationText = (plan: ProcessedPlan) => {
  if (!plan.duration_months) return 'Lifetime'
  if (plan.duration_months === 1) return '/month'
  if (plan.duration_months === 12) return '/year'
  return `/${plan.duration_months} months`
}
</script>

<template>
  <div class="home">
    <!-- Hero Slider Section -->
    <section class="relative overflow-hidden">
      <div class="relative h-[600px] lg:h-[700px]">
        <TransitionGroup name="fade">
          <div
            v-for="(slide, index) in heroSlides"
            v-show="currentSlide === index"
            :key="index"
            class="absolute inset-0"
          >
            <div :class="['absolute inset-0 bg-gradient-to-br', slide.bgGradient]">
              <div class="container mx-auto px-4 h-full flex items-center">
                <div class="grid lg:grid-cols-2 gap-12 items-center w-full">
                  <!-- Left Content -->
                  <div class="max-w-3xl">
                    <div class="mb-6">
                      <span
                        class="bg-primary-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg inline-flex items-center gap-2"
                      >
                        <font-awesome-icon :icon="['fas', slide.badgeIcon]" />
                        {{ slide.badge }}
                      </span>
                    </div>
                    <h1
                      class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900 animate-fade-in-down"
                    >
                      {{ slide.title }}
                    </h1>
                    <p class="text-xl md:text-2xl mb-4 text-gray-700 font-medium">
                      {{ slide.subtitle }}
                    </p>
                    <p class="text-lg md:text-xl mb-10 text-gray-600">
                      {{ slide.description }}
                    </p>
                   <div class="flex flex-col sm:flex-row gap-4">
                      <RouterLink
                        to="/pricing"
                        class="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 shadow-lg hover:shadow-xl text-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        style="color: white !important;"
                      >
                        <span class="text-white">Start Free Trial</span>
                      </RouterLink>
                      <RouterLink
                        to="/courses"
                        class="bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 active:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition shadow-md hover:shadow-lg text-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        <span>Explore Courses</span>
                      </RouterLink>
                    </div>
                  </div>

                  <!-- Right Image -->
                  <div class="hidden lg:flex items-center justify-center relative">
                    <div class="relative w-full max-w-xl">
                      <!-- Decorative background blur -->
                      <div 
                        :class="['absolute inset-0 rounded-full blur-3xl opacity-20', 
                        currentSlide === 0 ? 'bg-blue-400' : currentSlide === 1 ? 'bg-purple-400' : 'bg-orange-400']"
                      ></div>
                      
                      <!-- Main Hero Image -->
                      <img
                        :src="heroSlides[currentSlide]?.image"
                        :alt="heroSlides[currentSlide]?.imageAlt"
                        class="relative z-10 w-full h-auto rounded-3xl shadow-2xl object-cover animate-float"
                        style="max-height: 600px;"
                        loading="eager"
                      />
                      
                      <!-- Floating decorative elements -->
                      <div class="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-float-icon z-20">
                        <font-awesome-icon :icon="['fas', 'book']" class="text-4xl text-primary-500" />
                      </div>
                      <div class="absolute -bottom-6 -left-6 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-float-icon z-20" style="animation-delay: 1s">
                        <font-awesome-icon :icon="['fas', 'graduation-cap']" class="text-3xl text-primary-600" />
                      </div>
                      <div class="absolute top-1/4 -left-8 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-float-icon z-20" style="animation-delay: 2s">
                        <font-awesome-icon :icon="['fas', 'lightbulb']" class="text-2xl text-yellow-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Slider Controls -->
        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full transition shadow-lg z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full transition shadow-lg z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- Slider Indicators -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          <button
            v-for="(slide, index) in heroSlides"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'h-3 rounded-full transition-all',
              currentSlide === index ? 'bg-primary-500 w-12' : 'bg-gray-300 hover:bg-gray-400 w-3',
            ]"
          ></button>
        </div>
      </div>
    </section>

    <!-- Stats Banner -->
    <section class="bg-white border-y border-gray-200 py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="mb-3">
              <font-awesome-icon :icon="['fas', stat.icon]" class="text-5xl text-primary-500" />
            </div>
            <p class="text-4xl md:text-5xl font-bold mb-2 text-primary-600">{{ stat.number }}</p>
            <p class="text-gray-600 font-medium">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Categories -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Explore Learning Paths</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from a wide range of fields and start your journey to success
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FieldCard
            v-for="category in categories"
            :key="category.name"
            :name="category.name"
            :icon="category.icon"
            :courses="category.courses"
            :students="category.students"
            :category="category.category"
            :image="category.image"
          />
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-20 bg-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <img 
          src="https://images.pexels.com/photos/5940715/pexels-photo-5940715.jpeg" 
          alt="Background pattern"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to accelerate your learning journey
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="feature in features" :key="feature.title" class="group">
            <div
              class="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-primary-300 hover:shadow-2xl transition-all transform hover:-translate-y-2 h-full relative overflow-hidden"
            >
              <!-- 3D Illustration -->
              <div class="flex justify-center mb-6">
                <div class="w-48 h-48 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img 
                    :src="feature.illustration" 
                    :alt="feature.title"
                    class="w-full h-full object-contain"
                    style="width: 192px; height: 192px;"
                  />
                </div>
              </div>
              
              <!-- Content -->
              <div class="text-center">
                <h3
                  class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition"
                >
                  {{ feature.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Slider -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful students who achieved their goals with Ebodhak
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary-200 hover:shadow-xl transition"
          >
            <div class="flex items-center gap-1 mb-4">
              <svg
                v-for="n in 5"
                :key="n"
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <p class="text-gray-700 mb-6 italic">"{{ testimonial.content }}"</p>
            <div class="flex items-center gap-3">
              <img :src="testimonial.image" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover" />
              <div>
                <p class="font-bold text-gray-900">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Affordable Plans for Everyone
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan that fits your learning goals and budget
          </p>
        </div>
        <!-- Loading State -->
        <div v-if="pricingLoading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-500"></div>
          <p class="mt-4 text-gray-600">Loading pricing plans...</p>
        </div>

        <!-- Pricing Plans Grid -->
        <div v-else class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            v-for="plan in pricingPlans"
            :key="plan.id"
            :class="[
              'rounded-3xl p-8 transition transform hover:scale-105 border-2 flex flex-col',
              plan.is_popular
                ? 'bg-primary-50 border-primary-500 shadow-xl scale-105'
                : 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-lg',
            ]"
          >
            <div v-if="plan.is_popular" class="text-center mb-4 -mt-4">
              <span
                class="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase shadow-lg inline-flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Most Popular
              </span>
            </div>
            <div class="text-center mb-6">
              <h3 class="text-3xl font-bold mb-2 text-gray-900">{{ plan.name }}</h3>
              <p class="text-gray-600 mb-6">
                {{ plan.description }}
              </p>
              <div class="mb-4">
                <div v-if="plan.discounted_price" class="mb-2">
                  <span class="text-2xl text-gray-400 line-through">{{ plan.currency }} {{ parseFloat(plan.price).toLocaleString() }}</span>
                </div>
                <div>
                  <span class="text-5xl font-bold text-gray-900">{{ plan.currency }} {{ getPrice(plan).toLocaleString() }}</span>
                  <span class="text-gray-500 block mt-1">{{ getDurationText(plan) }}</span>
                </div>
                <div v-if="plan.discounted_price" class="mt-3">
                  <span class="text-sm text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full inline-block">
                    Save {{ plan.currency }} {{ (parseFloat(plan.price) - getPrice(plan)).toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>

            <ul class="space-y-4 mb-8 flex-grow text-left">
              <li v-for="feature in plan.parsedFeatures" :key="feature" class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 flex-shrink-0 text-primary-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>

            <div class="mt-auto">
              <RouterLink
                to="/pricing"
                class="block w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg text-center bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                style="color: white !important;"
              >
                <span class="text-white">Get Started Now</span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <div class="flex flex-wrap justify-center gap-8 text-gray-600 mb-6">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>7-day money-back guarantee</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Secure Khalti & eSewa payment</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Cancel anytime</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>No hidden fees</span>
            </div>
          </div>
          <RouterLink
            to="/pricing"
            class="text-primary-600 hover:text-primary-700 font-semibold text-lg inline-flex items-center gap-2 group"
          >
            View All Plans & Features
            <svg class="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <PremiumCTA />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Smooth floating animation for hero image */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Floating icon animation */
.animate-float-icon {
  animation: float 4s ease-in-out infinite;
}
</style>
