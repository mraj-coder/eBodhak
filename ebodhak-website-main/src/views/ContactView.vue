<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  // Add form submission logic here
  alert('Thank you for contacting us! We will get back to you soon.')
}
</script>

<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="bg-compact-hero-pattern text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down text-shadow-lg">Get in Touch</h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-20 bg-gray-50 relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <img 
          src="https://images.pexels.com/photos/6684499/pexels-photo-6684499.jpeg" 
          alt="Background pattern"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Contact Form -->
          <div class="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="+977 98XXXXXXXX"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Subject</label>
                <input
                  v-model="formData.subject"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  v-model="formData.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-bold text-lg transition transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-6">
            <div class="bg-white rounded-2xl p-8 border border-gray-200">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <font-awesome-icon :icon="['fas', 'headset']" class="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Customer Support</h3>
                  <p class="text-gray-600 mb-2">Available 24/7 to help you</p>
                  <a href="mailto:support@ebodhak.com" class="text-primary-600 hover:text-primary-700 font-semibold">
                    support@ebodhak.com
                  </a>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-8 border border-gray-200">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <font-awesome-icon :icon="['fas', 'mobile-alt']" class="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Phone</h3>
                  <p class="text-gray-600 mb-2">Mon-Fri from 8am to 6pm</p>
                  <a href="tel:+9779812345678" class="text-primary-600 hover:text-primary-700 font-semibold">
                    +977 981-2345678
                  </a>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-8 border border-gray-200">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <font-awesome-icon :icon="['fas', 'landmark']" class="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Office Address</h3>
                  <p class="text-gray-600">
                    Kathmandu, Nepal<br />
                    Thamel, Ward No. 26
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Support Hours</h3>
              <div class="space-y-3 text-gray-700">
                <div class="flex items-center justify-between">
                  <span>Monday - Friday</span>
                  <span class="font-semibold">8:00 AM - 6:00 PM</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Saturday</span>
                  <span class="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Sunday</span>
                  <span class="font-semibold text-red-600">Closed</span>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
              <div class="space-y-3">
                <RouterLink
                  to="/faq"
                  class="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition"
                >
                  <font-awesome-icon :icon="['fas', 'question-circle']" class="text-primary-500" />
                  <span class="font-semibold">FAQs</span>
                </RouterLink>
                <RouterLink
                  to="/help"
                  class="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition"
                >
                  <font-awesome-icon :icon="['fas', 'life-ring']" class="text-primary-500" />
                  <span class="font-semibold">Help Center</span>
                </RouterLink>
              </div>
            </div>

            <div class="bg-newsletter-pattern rounded-2xl p-8 text-white">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'comments']" class="text-2xl" />
                </div>
                <div>
                  <h3 class="text-lg font-bold">Live Chat</h3>
                  <p class="text-primary-100 text-sm">Get instant help</p>
                </div>
              </div>
              <p class="text-primary-100 mb-4">
                Chat with our support team for immediate assistance with your queries.
              </p>
              <button class="w-full bg-white text-primary-600 hover:bg-primary-50 py-3 rounded-xl font-bold transition">
                Start Chat
              </button>
            </div>

            <div class="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
              <div class="flex gap-4">
                <a href="#" class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition">
                  <font-awesome-icon :icon="['fab', 'facebook']" />
                </a>
                <a href="#" class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition">
                  <font-awesome-icon :icon="['fab', 'twitter']" />
                </a>
                <a href="#" class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition">
                  <font-awesome-icon :icon="['fab', 'linkedin']" />
                </a>
                <a href="#" class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition">
                  <font-awesome-icon :icon="['fab', 'instagram']" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>