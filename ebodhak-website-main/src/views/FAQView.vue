<script setup lang="ts">
import { ref } from 'vue'

const expandedFaq = ref<number | null>(null)

const toggleFaq = (index: number) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const faqCategories = [
  {
    category: 'General',
    questions: [
      {
        question: 'What is Ebodhak?',
        answer: 'Ebodhak is Nepal\'s premier e-learning platform offering comprehensive courses for Engineering (IOE), Medical (MBBS), Management (MBA/BBA), IT, and various competitive exams. We provide expert-led instruction, practice tests, and study materials to help you succeed.',
      },
      {
        question: 'How do I get started?',
        answer: 'Simply sign up for a free account, browse our course catalog, and choose a plan that fits your needs. You can start with our 7-day free trial to explore the platform before committing to a subscription.',
      },
      {
        question: 'Can I access courses on mobile devices?',
        answer: 'Yes! Our platform is fully responsive and works on all devices. We also have dedicated mobile apps for iOS and Android for a better learning experience on the go.',
      },
    ],
  },
  {
    category: 'Courses & Content',
    questions: [
      {
        question: 'What courses do you offer?',
        answer: 'We offer 200+ courses across Engineering, Medical, Management, IT, Science & Technology, and Banking & Government exam preparation. Each course includes video lectures, practice questions, mock tests, and study materials.',
      },
      {
        question: 'Are the courses updated regularly?',
        answer: 'Yes, all our courses are regularly updated to reflect the latest syllabus and exam patterns. We add new content monthly and update existing materials based on student feedback and curriculum changes.',
      },
      {
        question: 'Can I download course materials?',
        answer: 'Yes, Premium and Ultimate plan subscribers can download video lectures and PDF study materials for offline access through our mobile app.',
      },
    ],
  },
  {
    category: 'Pricing & Payment',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Khalti, eSewa, IME Pay, and all major credit/debit cards. All transactions are secure and encrypted.',
      },
      {
        question: 'Is there a refund policy?',
        answer: 'Yes, we offer a 7-day money-back guarantee. If you\'re not satisfied with our courses within the first 7 days of purchase, we\'ll provide a full refund, no questions asked.',
      },
      {
        question: 'Can I upgrade or downgrade my plan?',
        answer: 'Absolutely! You can upgrade your plan anytime and pay only the prorated difference. Downgrades take effect at the end of your current billing cycle.',
      },
    ],
  },
  {
    category: 'Technical Support',
    questions: [
      {
        question: 'What if I face technical issues?',
        answer: 'Our support team is available 24/7 to help you. You can reach us via email at support@ebodhak.com, through our live chat, or by calling our helpline. Premium and Ultimate members get priority support.',
      },
      {
        question: 'What are the system requirements?',
        answer: 'Our platform works on any modern web browser (Chrome, Firefox, Safari, Edge). For the best experience, we recommend a stable internet connection of at least 2 Mbps for video streaming.',
      },
    ],
  },
]
</script>

<template>
  <div class="faq-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          Find answers to common questions about Ebodhak, our courses, and services
        </p>
      </div>
    </section>

    <!-- FAQ Content -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 max-w-4xl">
        <div v-for="(category, categoryIndex) in faqCategories" :key="categoryIndex" class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <font-awesome-icon :icon="['fas', 'question-circle']" class="text-primary-500" />
            {{ category.category }}
          </h2>
          <div class="space-y-4">
            <div
              v-for="(faq, faqIndex) in category.questions"
              :key="faqIndex"
              class="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <button
                @click="toggleFaq(categoryIndex * 100 + faqIndex)"
                class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
              >
                <h3 class="text-lg font-bold text-gray-900 pr-4">{{ faq.question }}</h3>
                <font-awesome-icon
                  :icon="['fas', expandedFaq === categoryIndex * 100 + faqIndex ? 'chevron-up' : 'chevron-down']"
                  class="text-primary-500 flex-shrink-0"
                />
              </button>
              <div
                v-if="expandedFaq === categoryIndex * 100 + faqIndex"
                class="px-6 pb-6 text-gray-700 leading-relaxed"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>

        <!-- Still Have Questions -->
        <div class="bg-white rounded-2xl p-8 border border-gray-200 text-center mt-12">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
          <p class="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <RouterLink
            to="/contact"
            class="inline-block bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105"
          >
            Contact Support
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>