<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiService } from '@/services/api'
import type { SubscriptionPlan } from '@/types/subscription'

const route = useRoute()
const router = useRouter()

interface ProcessedPlan extends SubscriptionPlan {
  parsedFeatures: string[]
  numericPrice: number
  numericEffectivePrice: number
}

const selectedPlan = ref<ProcessedPlan | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const processingPayment = ref(false)

// Form data
const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  paymentMethod: 'khalti',
  agreeToTerms: false,
})

const parseFeatures = (featuresJson: string): string[] => {
  try {
    return JSON.parse(featuresJson)
  } catch {
    return []
  }
}

const fetchPlanDetails = async () => {
  try {
    loading.value = true
    error.value = null
    const planId = Number(route.params.planId)
    
    const response = await apiService.getGlobalSubscriptionPlans()
    
    if (response.success && response.data.plans) {
      const plan = response.data.plans.find(p => p.id === planId)
      
      if (!plan) {
        throw new Error('Plan not found')
      }
      
      selectedPlan.value = {
        ...plan,
        parsedFeatures: parseFeatures(plan.features),
        numericPrice: parseFloat(plan.price),
        numericEffectivePrice: parseFloat(plan.effective_price),
      }
    } else {
      throw new Error('Failed to fetch plan details')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load plan details'
    console.error('Error fetching plan:', err)
  } finally {
    loading.value = false
  }
}

const getDurationText = (plan: ProcessedPlan) => {
  if (!plan.duration_months) return 'Lifetime Access'
  if (plan.duration_months === 1) return '1 Month Access'
  if (plan.duration_months === 12) return '1 Year Access'
  return `${plan.duration_months} Months Access`
}

const getSavings = computed(() => {
  if (!selectedPlan.value || !selectedPlan.value.discounted_price) return 0
  return selectedPlan.value.numericPrice - selectedPlan.value.numericEffectivePrice
})

const handleSubmit = async () => {
  if (!formData.value.agreeToTerms) {
    alert('Please accept the terms and conditions')
    return
  }
  
  processingPayment.value = true
  
  // Simulate payment processing
  setTimeout(() => {
    processingPayment.value = false
    alert('Payment processing will be implemented soon!')
    // TODO: Integrate with actual payment gateway (Khalti/eSewa)
  }, 2000)
}

onMounted(() => {
  fetchPlanDetails()
})
</script>

<template>
  <div class="checkout-page bg-gray-50 min-h-screen py-12">
    <div class="container mx-auto px-4">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
        <p class="mt-4 text-gray-600 text-lg">Loading checkout...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div class="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
          <font-awesome-icon :icon="['fas', 'exclamation-circle']" class="text-red-500 text-5xl mb-4" />
          <h3 class="text-xl font-bold text-red-900 mb-2">Error Loading Plan</h3>
          <p class="text-red-700 mb-6">{{ error }}</p>
          <RouterLink
            to="/pricing"
            class="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition inline-block"
          >
            <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
            Back to Pricing
          </RouterLink>
        </div>
      </div>

      <!-- Checkout Content -->
      <div v-else-if="selectedPlan" class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <RouterLink
            to="/pricing"
            class="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-2 mb-4"
          >
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            Back to Pricing
          </RouterLink>
          <h1 class="text-4xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p class="text-gray-600 mt-2">You're one step away from starting your learning journey</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Checkout Form -->
          <div class="lg:col-span-2">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Personal Information -->
              <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <font-awesome-icon :icon="['fas', 'user']" class="text-primary-500" />
                  Personal Information
                </h2>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="formData.fullName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="formData.email"
                      type="email"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                </div>
              </div>

              <!-- Payment Method -->
              <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <font-awesome-icon :icon="['fas', 'credit-card']" class="text-primary-500" />
                  Payment Method
                </h2>
                
                <div class="grid sm:grid-cols-2 gap-4">
                  <label
                    :class="[
                      'flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition',
                      formData.paymentMethod === 'khalti'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300',
                    ]"
                  >
                    <input
                      v-model="formData.paymentMethod"
                      type="radio"
                      value="khalti"
                      class="w-5 h-5 text-primary-600"
                    />
                    <div class="flex-1">
                      <div class="font-bold text-purple-600 text-xl">Khalti</div>
                      <div class="text-sm text-gray-600">Digital Wallet</div>
                    </div>
                  </label>
                  
                  <label
                    :class="[
                      'flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition',
                      formData.paymentMethod === 'esewa'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300',
                    ]"
                  >
                    <input
                      v-model="formData.paymentMethod"
                      type="radio"
                      value="esewa"
                      class="w-5 h-5 text-primary-600"
                    />
                    <div class="flex-1">
                      <div class="font-bold text-green-600 text-xl">eSewa</div>
                      <div class="text-sm text-gray-600">Digital Wallet</div>
                    </div>
                  </label>
                  
                  <label
                    :class="[
                      'flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition',
                      formData.paymentMethod === 'ime'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300',
                    ]"
                  >
                    <input
                      v-model="formData.paymentMethod"
                      type="radio"
                      value="ime"
                      class="w-5 h-5 text-primary-600"
                    />
                    <div class="flex-1">
                      <div class="font-bold text-red-600 text-xl">IME Pay</div>
                      <div class="text-sm text-gray-600">Digital Wallet</div>
                    </div>
                  </label>
                  
                  <label
                    :class="[
                      'flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition',
                      formData.paymentMethod === 'card'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300',
                    ]"
                  >
                    <input
                      v-model="formData.paymentMethod"
                      type="radio"
                      value="card"
                      class="w-5 h-5 text-primary-600"
                    />
                    <div class="flex-1">
                      <div class="font-bold text-gray-700 text-lg">Card</div>
                      <div class="text-sm text-gray-600">Credit/Debit</div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Terms and Conditions -->
              <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <label class="flex items-start gap-3 cursor-pointer">
                  <input
                    v-model="formData.agreeToTerms"
                    type="checkbox"
                    required
                    class="w-5 h-5 text-primary-600 mt-1 rounded"
                  />
                  <span class="text-gray-700">
                    I agree to the
                    <RouterLink to="/terms" class="text-primary-600 hover:underline font-semibold">
                      Terms and Conditions
                    </RouterLink>
                    and
                    <RouterLink to="/privacy" class="text-primary-600 hover:underline font-semibold">
                      Privacy Policy
                    </RouterLink>
                  </span>
                </label>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="processingPayment"
                class="w-full bg-primary-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-600 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <font-awesome-icon
                  v-if="processingPayment"
                  :icon="['fas', 'spinner']"
                  class="animate-spin"
                />
                <span v-if="processingPayment">Processing Payment...</span>
                <span v-else>
                  <font-awesome-icon :icon="['fas', 'lock']" class="mr-2" />
                  Complete Secure Payment
                </span>
              </button>
            </form>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 sticky top-24">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div class="space-y-4 mb-6">
                <div>
                  <div class="text-sm text-gray-600 mb-1">Selected Plan</div>
                  <div class="text-xl font-bold text-gray-900">{{ selectedPlan.name }}</div>
                  <div class="text-sm text-gray-600">{{ getDurationText(selectedPlan) }}</div>
                </div>
                
                <div class="border-t border-gray-200 pt-4">
                  <div class="flex justify-between text-gray-700 mb-2">
                    <span>Plan Price</span>
                    <span>{{ selectedPlan.currency }} {{ selectedPlan.numericPrice.toLocaleString() }}</span>
                  </div>
                  
                  <div v-if="getSavings > 0" class="flex justify-between text-green-600 font-semibold mb-2">
                    <span>Discount</span>
                    <span>- {{ selectedPlan.currency }} {{ getSavings.toLocaleString() }}</span>
                  </div>
                  
                  <div class="flex justify-between text-2xl font-bold text-gray-900 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>{{ selectedPlan.currency }} {{ selectedPlan.numericEffectivePrice.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
              
              <div class="bg-primary-50 rounded-xl p-4 mb-6">
                <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'check-circle']" class="text-primary-500" />
                  What's Included
                </h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li v-for="feature in selectedPlan.parsedFeatures.slice(0, 5)" :key="feature" class="flex items-start gap-2">
                    <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
              
              <div class="space-y-3 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'shield-alt']" class="text-primary-500" />
                  <span>Secure payment processing</span>
                </div>
                <div class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'redo']" class="text-primary-500" />
                  <span>7-day money-back guarantee</span>
                </div>
                <div class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'headset']" class="text-primary-500" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>