<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { apiService } from '@/services/api'
import type { SubscriptionPlan } from '@/types/subscription'

interface ProcessedPlan extends SubscriptionPlan {
  parsedFeatures: string[]
  numericPrice: number
  numericEffectivePrice: number
}

const pricingPlans = ref<ProcessedPlan[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll only pay the prorated difference. When downgrading, the change will take effect at the end of your current billing cycle.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major payment methods including Khalti, eSewa, IME Pay, and international credit/debit cards. All payments are processed securely.',
  },
  {
    question: 'Is there a money-back guarantee?',
    answer:
      'Yes! We offer a 7-day money-back guarantee. If you\'re not satisfied with our courses within the first 7 days, we\'ll refund your payment, no questions asked.',
  },
  {
    question: 'Do you offer student discounts?',
    answer:
      'Yes! Students with valid student IDs can get an additional 10% discount on annual plans. Contact our support team to claim your student discount.',
  },
  {
    question: 'Can I access courses offline?',
    answer:
      'Yes! Our mobile app allows you to download video lectures and study materials for offline access. This feature is available on all plans.',
  },
  {
    question: 'What happens after my subscription ends?',
    answer:
      'You\'ll lose access to premium features, but your progress and certificates will be saved. You can reactivate your subscription anytime to continue learning.',
  },
]

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
    loading.value = true
    error.value = null
    const response = await apiService.getGlobalSubscriptionPlans()
    
    if (response.success && response.data.plans) {
      // Process and filter plans (exclude "Free Forever" from main pricing cards)
      pricingPlans.value = response.data.plans
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
    } else {
      throw new Error('Failed to fetch subscription plans')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load pricing plans'
    console.error('Error fetching subscription plans:', err)
  } finally {
    loading.value = false
  }
}

const getPrice = (plan: ProcessedPlan) => {
  return plan.numericEffectivePrice
}

const getSavings = (plan: ProcessedPlan) => {
  if (plan.discounted_price) {
    return plan.numericPrice - plan.numericEffectivePrice
  }
  return 0
}

const getDurationText = (plan: ProcessedPlan) => {
  if (!plan.duration_months) return 'Lifetime'
  if (plan.duration_months === 1) return '/month'
  if (plan.duration_months === 12) return '/year'
  return `/${plan.duration_months} months`
}

// Calculate max savings percentage from all plans
const maxSavingsPercentage = computed(() => {
  if (pricingPlans.value.length === 0) return 0
  const savings = pricingPlans.value
    .filter(plan => plan.discounted_price)
    .map(plan => {
      const discount = plan.numericPrice - plan.numericEffectivePrice
      return Math.round((discount / plan.numericPrice) * 100)
    })
  return savings.length > 0 ? Math.max(...savings) : 0
})

// Key comparison features - manually curated for better readability
const comparisonFeatures = [
  { label: 'Duration', key: 'duration' },
  { label: 'Full Access', key: 'full_access' },
  { label: 'Practice & Mock Tests', key: 'practice_tests' },
  { label: 'Analytics', key: 'analytics' },
  { label: 'Priority Support', key: 'priority_support' },
  { label: 'Certificate Eligibility', key: 'certificate' },
  { label: 'Future Updates', key: 'future_updates' },
]

// Helper to check if plan has a feature
const planHasFeature = (plan: ProcessedPlan, featureKey: string): string | boolean => {
  const features = plan.parsedFeatures.map(f => f.toLowerCase())
  
  switch (featureKey) {
    case 'duration':
      if (plan.duration_months === null) return 'Lifetime'
      if (plan.duration_months === 1) return '1 Month'
      if (plan.duration_months === 3) return '3 Months'
      if (plan.duration_months === 6) return '6 Months'
      if (plan.duration_months === 12) return '12 Months'
      return `${plan.duration_months} Months`
    
    case 'full_access':
      return features.some(f => f.includes('full access') || f.includes('full content'))
    
    case 'practice_tests':
      return features.some(f => f.includes('practice') || f.includes('mock test') || f.includes('unlimited'))
    
    case 'analytics':
      if (features.some(f => f.includes('advanced analytics'))) return 'Advanced'
      if (features.some(f => f.includes('full analytics'))) return 'Full'
      return features.some(f => f.includes('analytics'))
    
    case 'priority_support':
      if (features.some(f => f.includes('premium support'))) return 'Premium'
      return features.some(f => f.includes('priority support'))
    
    case 'certificate':
      return features.some(f => f.includes('certificate'))
    
    case 'future_updates':
      return features.some(f => f.includes('future updates'))
    
    default:
      return false
  }
}

onMounted(() => {
  fetchSubscriptionPlans()
})
</script>

<template>
  <div class="pricing-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Choose Your Perfect Plan</h1>
        <p class="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
          Invest in your future with our affordable pricing plans. All plans include access to quality courses
          and expert instructors.
        </p>

        <!-- Savings Badge -->
        <div v-if="maxSavingsPercentage > 0" class="flex justify-center">
          <span class="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full text-sm font-bold shadow-lg">
            💰 Save up to {{ maxSavingsPercentage }}% with longer plans
          </span>
        </div>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
          <p class="mt-4 text-gray-600 text-lg">Loading pricing plans...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <font-awesome-icon :icon="['fas', 'exclamation-circle']" class="text-red-500 text-5xl mb-4" />
            <h3 class="text-xl font-bold text-red-900 mb-2">Failed to Load Pricing Plans</h3>
            <p class="text-red-700 mb-6">{{ error }}</p>
            <button
              @click="fetchSubscriptionPlans"
              class="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
            >
              <font-awesome-icon :icon="['fas', 'redo']" class="mr-2" />
              Try Again
            </button>
          </div>
        </div>

        <!-- Pricing Plans Grid -->
        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          <div
            v-for="plan in pricingPlans"
            :key="plan.id"
            :class="[
              'rounded-3xl p-8 transition transform hover:scale-105 border-2 flex flex-col',
              plan.is_popular
                ? 'bg-primary-50 border-primary-500 shadow-2xl scale-105 relative'
                : 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-xl',
            ]"
          >
            <div v-if="plan.is_popular" class="absolute -top-4 left-1/2 -translate-x-1/2">
              <span
                class="bg-primary-500 text-white px-6 py-2 rounded-full text-sm font-bold uppercase shadow-lg flex items-center gap-2"
              >
                <font-awesome-icon :icon="['fas', 'star']" />
                Most Popular
              </span>
            </div>

            <div class="text-center mb-6">
              <h3 class="text-3xl font-bold mb-2 text-gray-900">{{ plan.name }}</h3>
              <p class="text-gray-600 mb-6">{{ plan.description }}</p>

              <div class="mb-4">
                <div v-if="plan.discounted_price" class="mb-2">
                  <span class="text-2xl text-gray-400 line-through">{{ plan.currency }} {{ parseFloat(plan.price).toLocaleString() }}</span>
                </div>
                <div>
                  <span class="text-5xl font-bold text-gray-900">{{ plan.currency }} {{ getPrice(plan).toLocaleString() }}</span>
                  <span class="text-gray-500 block mt-1">{{ getDurationText(plan) }}</span>
                </div>
              </div>

              <div v-if="getSavings(plan) > 0" class="mb-6">
                <span class="text-sm text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">
                  Save {{ plan.currency }} {{ getSavings(plan).toLocaleString() }}
                </span>
              </div>
            </div>

            <div class="space-y-4 mb-8 flex-grow text-left">
              <div
                v-for="feature in plan.parsedFeatures"
                :key="feature"
                class="flex items-start gap-3 text-gray-700"
              >
                <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500 mt-1 flex-shrink-0" />
                <span>{{ feature }}</span>
              </div>
            </div>

            <div class="mt-auto">
              <RouterLink
                :to="{ name: 'checkout', params: { planId: plan.id } }"
                class="block w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg text-center bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                style="color: white !important;"
              >
                <span class="text-white">Get Started Now</span>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Trust Indicators -->
        <div class="mt-16 text-center">
          <div class="flex flex-wrap justify-center gap-8 text-gray-600">
            <div class="flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500" />
              <span>7-day money-back guarantee</span>
            </div>
            <div class="flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500" />
              <span>Secure Khalti & eSewa payment</span>
            </div>
            <div class="flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500" />
              <span>Cancel anytime</span>
            </div>
            <div class="flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500" />
              <span>No hidden fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Comparison -->
    <section v-if="!loading && !error && pricingPlans.length > 0" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Compare Plans</h2>
          <p class="text-xl text-gray-600">Key differences at a glance</p>
        </div>

        <div class="max-w-6xl mx-auto overflow-x-auto">
          <table class="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
            <thead>
              <tr class="border-b-2 border-gray-200 bg-gray-50">
                <th class="text-left py-5 px-6 font-bold text-gray-900 sticky left-0 bg-gray-50 z-10">Features</th>
                <th 
                  v-for="plan in pricingPlans" 
                  :key="plan.id"
                  :class="[
                    'text-center py-5 px-4 font-bold min-w-[140px]',
                    plan.is_popular ? 'text-white bg-primary-500' : 'text-gray-900 bg-gray-50'
                  ]"
                >
                  <div class="flex flex-col items-center gap-1">
                    <span>{{ plan.name }}</span>
                    <span v-if="plan.is_popular" class="text-xs font-normal opacity-90">Most Popular</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Price Row -->
              <tr class="border-b border-gray-200 bg-gradient-to-r from-primary-50 to-transparent">
                <td class="py-5 px-6 text-gray-900 font-bold sticky left-0 bg-white">Price</td>
                <td 
                  v-for="plan in pricingPlans" 
                  :key="`price-${plan.id}`"
                  :class="[
                    'text-center py-5 px-4',
                    plan.is_popular ? 'bg-primary-50' : ''
                  ]"
                >
                  <div>
                    <div v-if="plan.discounted_price" class="text-xs text-gray-400 line-through mb-1">
                      {{ plan.currency }} {{ parseFloat(plan.price).toLocaleString() }}
                    </div>
                    <div class="font-bold text-xl text-primary-600">
                      {{ plan.currency }} {{ getPrice(plan).toLocaleString() }}
                    </div>
                    <div class="text-xs text-gray-500 mt-1">{{ getDurationText(plan) }}</div>
                  </div>
                </td>
              </tr>

              <!-- Key Features Rows -->
              <tr 
                v-for="(feature, index) in comparisonFeatures" 
                :key="`feature-${index}`"
                :class="[
                  'border-b border-gray-100',
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                ]"
              >
                <td class="py-4 px-6 text-gray-700 font-medium sticky left-0 z-10" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                  {{ feature.label }}
                </td>
                <td 
                  v-for="plan in pricingPlans" 
                  :key="`${plan.id}-${index}`"
                  :class="[
                    'text-center py-4 px-4',
                    plan.is_popular && index % 2 === 0 ? 'bg-primary-50/30' : '',
                    plan.is_popular && index % 2 !== 0 ? 'bg-primary-50/50' : ''
                  ]"
                >
                  <template v-if="typeof planHasFeature(plan, feature.key) === 'string'">
                    <span class="text-gray-900 font-semibold text-sm">
                      {{ planHasFeature(plan, feature.key) }}
                    </span>
                  </template>
                  <template v-else>
                    <font-awesome-icon 
                      v-if="planHasFeature(plan, feature.key)"
                      :icon="['fas', 'check']" 
                      class="text-green-500 text-lg"
                    />
                    <span 
                      v-else
                      class="text-gray-300 text-lg"
                    >
                      ✕
                    </span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- View Full Features Link -->
        <div class="text-center mt-8">
          <p class="text-gray-600">
            Want to see all features? Check out the detailed feature list in each plan card above.
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p class="text-xl text-gray-600">Everything you need to know about our pricing</p>
        </div>

        <div class="max-w-3xl mx-auto space-y-6">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-2xl border border-gray-200 p-6"
          >
            <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-3">
              <font-awesome-icon :icon="['fas', 'question-circle']" class="text-primary-500" />
              {{ faq.question }}
            </h3>
            <p class="text-gray-700 leading-relaxed pl-8">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Methods -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Accepted Payment Methods</h2>
        <div class="flex flex-wrap justify-center items-center gap-8">
          <div class="bg-gray-100 px-8 py-4 rounded-lg">
            <span class="text-2xl font-bold text-purple-600">Khalti</span>
          </div>
          <div class="bg-gray-100 px-8 py-4 rounded-lg">
            <span class="text-2xl font-bold text-green-600">eSewa</span>
          </div>
          <div class="bg-gray-100 px-8 py-4 rounded-lg">
            <span class="text-2xl font-bold text-red-600">IME Pay</span>
          </div>
          <div class="bg-gray-100 px-8 py-4 rounded-lg">
            <span class="text-lg font-semibold text-gray-700">Credit/Debit Cards</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Still Have Questions?</h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Our team is here to help you choose the right plan for your learning goals
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/contact"
            class="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
          >
            <font-awesome-icon :icon="['fas', 'headset']" class="mr-2" />
            Contact Support
          </RouterLink>
          <RouterLink
            to="/contact"
            class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-600 transition"
          >
            <font-awesome-icon :icon="['fas', 'calendar']" class="mr-2" />
            Schedule a Call
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>