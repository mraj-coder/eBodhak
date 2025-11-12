<script setup lang="ts">
import { ref } from 'vue'

const billingCycle = ref<'monthly' | 'annual'>('monthly')

const pricingPlans = [
  {
    name: 'Basic',
    monthlyPrice: 1999,
    annualPrice: 19990,
    description: 'Perfect for beginners starting their learning journey',
    features: [
      'Access to 50+ courses',
      '1000+ practice questions',
      'Recorded video lectures',
      'Email support',
      'Progress dashboard',
      'Mobile app access',
      'Study materials PDFs',
      'Community forum access',
    ],
    highlighted: false,
    color: 'blue',
  },
  {
    name: 'Premium',
    monthlyPrice: 4999,
    annualPrice: 49990,
    description: 'Most popular choice for serious learners',
    features: [
      'Everything in Basic',
      'Access to ALL 200+ courses',
      '5000+ practice questions',
      'Live classes & recordings',
      'Weekly doubt sessions',
      'Priority email & chat support',
      'Performance analytics',
      'Downloadable resources',
      'Mock test series',
      'Career guidance sessions',
    ],
    highlighted: true,
    color: 'primary',
  },
  {
    name: 'Ultimate',
    monthlyPrice: 9999,
    annualPrice: 99990,
    description: 'Complete learning package with personal mentorship',
    features: [
      'Everything in Premium',
      'Personal mentor assigned',
      'Unlimited mock tests',
      '10,000+ practice questions',
      'One-on-one sessions (4/month)',
      '24/7 priority support',
      'Career counseling',
      'Lifetime course access',
      'Interview preparation',
      'Resume review',
      'Job placement assistance',
      'Exclusive masterclasses',
    ],
    highlighted: false,
    color: 'purple',
  },
]

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

const getPrice = (plan: typeof pricingPlans[0]) => {
  return billingCycle.value === 'monthly' ? plan.monthlyPrice : plan.annualPrice
}

const getSavings = (plan: typeof pricingPlans[0]) => {
  if (billingCycle.value === 'annual') {
    const monthlyCost = plan.monthlyPrice * 12
    return monthlyCost - plan.annualPrice
  }
  return 0
}
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

        <!-- Billing Toggle -->
        <div class="flex items-center justify-center gap-4 mb-8">
          <span :class="billingCycle === 'monthly' ? 'text-white font-semibold' : 'text-primary-200'">
            Monthly
          </span>
          <button
            @click="billingCycle = billingCycle === 'monthly' ? 'annual' : 'monthly'"
            class="relative w-16 h-8 bg-white bg-opacity-30 rounded-full transition"
          >
            <div
              :class="[
                'absolute top-1 w-6 h-6 bg-white rounded-full transition-all',
                billingCycle === 'annual' ? 'left-9' : 'left-1',
              ]"
            ></div>
          </button>
          <span :class="billingCycle === 'annual' ? 'text-white font-semibold' : 'text-primary-200'">
            Annual
            <span class="ml-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
              Save 17%
            </span>
          </span>
        </div>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div
            v-for="plan in pricingPlans"
            :key="plan.name"
            :class="[
              'rounded-3xl p-8 transition transform hover:scale-105 border-2',
              plan.highlighted
                ? 'bg-primary-50 border-primary-500 shadow-2xl scale-105 relative'
                : 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-xl',
            ]"
          >
            <div v-if="plan.highlighted" class="absolute -top-4 left-1/2 -translate-x-1/2">
              <span
                class="bg-primary-500 text-white px-6 py-2 rounded-full text-sm font-bold uppercase shadow-lg flex items-center gap-2"
              >
                <font-awesome-icon :icon="['fas', 'star']" />
                Most Popular
              </span>
            </div>

            <div class="text-center mb-8">
              <h3 class="text-3xl font-bold mb-2 text-gray-900">{{ plan.name }}</h3>
              <p class="text-gray-600 mb-6">{{ plan.description }}</p>

              <div class="mb-4">
                <span class="text-5xl font-bold text-gray-900">Rs. {{ getPrice(plan).toLocaleString() }}</span>
                <span class="text-gray-500">{{ billingCycle === 'monthly' ? '/month' : '/year' }}</span>
              </div>

              <div v-if="billingCycle === 'annual' && getSavings(plan) > 0" class="mb-6">
                <span class="text-sm text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">
                  Save Rs. {{ getSavings(plan).toLocaleString() }} per year
                </span>
              </div>

              <button
                :class="[
                  'w-full py-4 rounded-xl font-bold text-lg transition shadow-md hover:shadow-lg',
                  plan.highlighted
                    ? 'bg-primary-500 text-white hover:bg-primary-600 transform hover:scale-105'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600',
                ]"
              >
                Get Started Now
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-start gap-3 text-gray-700"
              >
                <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500 mt-1 flex-shrink-0" />
                <span>{{ feature }}</span>
              </div>
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
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Compare Plans</h2>
          <p class="text-xl text-gray-600">See what's included in each plan</p>
        </div>

        <div class="max-w-5xl mx-auto overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b-2 border-gray-200">
                <th class="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-900">Basic</th>
                <th class="text-center py-4 px-6 font-semibold text-primary-600 bg-primary-50">Premium</th>
                <th class="text-center py-4 px-6 font-semibold text-gray-900">Ultimate</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200">
                <td class="py-4 px-6 text-gray-700">Number of Courses</td>
                <td class="text-center py-4 px-6">50+</td>
                <td class="text-center py-4 px-6 bg-primary-50 font-semibold">200+</td>
                <td class="text-center py-4 px-6 font-semibold">200+</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="py-4 px-6 text-gray-700">Practice Questions</td>
                <td class="text-center py-4 px-6">1,000+</td>
                <td class="text-center py-4 px-6 bg-primary-50 font-semibold">5,000+</td>
                <td class="text-center py-4 px-6 font-semibold">10,000+</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="py-4 px-6 text-gray-700">Live Classes</td>
                <td class="text-center py-4 px-6">
                  <font-awesome-icon :icon="['fas', 'check']" class="text-gray-300" />
                </td>
                <td class="text-center py-4 px-6 bg-primary-50">
                  <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500" />
                </td>
                <td class="text-center py-4 px-6">
                  <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500" />
                </td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="py-4 px-6 text-gray-700">Personal Mentor</td>
                <td class="text-center py-4 px-6">
                  <font-awesome-icon :icon="['fas', 'check']" class="text-gray-300" />
                </td>
                <td class="text-center py-4 px-6 bg-primary-50">
                  <font-awesome-icon :icon="['fas', 'check']" class="text-gray-300" />
                </td>
                <td class="text-center py-4 px-6">
                  <font-awesome-icon :icon="['fas', 'check']" class="text-primary-500" />
                </td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="py-4 px-6 text-gray-700">One-on-One Sessions</td>
                <td class="text-center py-4 px-6">
                  <font-awesome-icon :icon="['fas', 'check']" class="text-gray-300" />
                </td>
                <td class="text-center py-4 px-6 bg-primary-50">
                  <font-awesome-icon :icon="['fas', 'check']" class="text-gray-300" />
                </td>
                <td class="text-center py-4 px-6 font-semibold">4/month</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="py-4 px-6 text-gray-700">Support</td>
                <td class="text-center py-4 px-6">Email</td>
                <td class="text-center py-4 px-6 bg-primary-50 font-semibold">Priority</td>
                <td class="text-center py-4 px-6 font-semibold">24/7</td>
              </tr>
            </tbody>
          </table>
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
          <button
            class="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
          >
            <font-awesome-icon :icon="['fas', 'headset']" class="mr-2" />
            Contact Support
          </button>
          <button
            class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-600 transition"
          >
            <font-awesome-icon :icon="['fas', 'calendar']" class="mr-2" />
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  </div>
</template>