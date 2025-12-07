<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface CTAProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  benefits?: string
}

const props = withDefaults(defineProps<CTAProps>(), {
  title: 'Ready to Transform Your Future?',
  subtitle: 'Join 15,000+ students already learning and succeeding with Ebodhak',
  buttonText: 'Start Your Free Trial Today →',
  buttonLink: '/pricing',
  benefits: 'No credit card required • Instant access • Cancel anytime',
})
</script>

<template>
  <section class="relative py-24 overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-600 via-purple-600 to-primary-700">
      <!-- Animated Gradient Overlay -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
      </div>
      
      <!-- 3D Floating Elements -->
      <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-3xl backdrop-blur-sm animate-float" style="animation-delay: 0s;"></div>
      <div class="absolute top-20 right-20 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm animate-float" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-20 left-1/4 w-40 h-40 bg-white/10 rounded-2xl backdrop-blur-sm animate-float" style="animation-delay: 2s;"></div>
      <div class="absolute bottom-10 right-1/3 w-28 h-28 bg-white/10 rounded-full backdrop-blur-sm animate-float" style="animation-delay: 1.5s;"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="tech-grid-bg h-full w-full"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-4 text-center relative z-10">
      <!-- 3D Card Container -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] relative z-10">
          <!-- Title with 3D Effect -->
          <h2 class="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in-down text-shadow-lg transform hover:scale-105 transition-transform duration-300">
            {{ title }}
          </h2>
          
          <!-- Subtitle with Glow -->
          <p class="text-xl md:text-2xl mb-10 text-white/90 animate-fade-in-up animation-delay-200 text-shadow-md max-w-3xl mx-auto">
            {{ subtitle }}
          </p>
          
          <!-- CTA Button with 3D Effect -->
          <div class="mb-8 animate-scale-in-bounce animation-delay-400">
            <RouterLink
              :to="buttonLink"
              class="group relative inline-flex items-center justify-center px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary-600 cursor-pointer z-20"
              style="text-decoration: none; pointer-events: auto;"
            >
              <!-- Button Background with 3D Layers -->
              <div class="absolute inset-0 bg-white rounded-xl shadow-2xl group-hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] group-active:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 pointer-events-none"></div>
              <div class="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <!-- Ripple Effect on Click -->
              <div class="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div class="absolute inset-0 bg-primary-400/30 scale-0 group-active:scale-100 transition-transform duration-500 rounded-full"></div>
              </div>
              
              <!-- Button Text -->
              <span class="relative z-10 text-primary-600 group-hover:text-primary-700 group-active:text-primary-800 transition-colors duration-300 flex items-center gap-2 pointer-events-none">
                {{ buttonText }}
                <svg class="w-6 h-6 group-hover:translate-x-2 group-active:translate-x-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              <!-- Glow Effect -->
              <div class="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 group-active:opacity-30 blur-xl transition-opacity duration-300 pointer-events-none"></div>
              
              <!-- Shine Effect on Hover -->
              <div class="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </RouterLink>
          </div>
          
          <!-- Benefits with Icons -->
          <div class="flex flex-wrap justify-center gap-6 text-white/90 animate-fade-in-up animation-delay-600">
            <div v-for="benefit in benefits.split('•')" :key="benefit.trim()" class="flex items-center gap-2 group">
              <svg class="w-5 h-5 text-white group-hover:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-shadow-md group-hover:text-white transition-colors duration-300">{{ benefit.trim() }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>
  </section>
</template>

<style scoped>
/* Additional 3D effects */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(3deg);
  }
  66% {
    transform: translateY(-10px) rotate(-3deg);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 8s linear infinite;
}

/* Perspective for 3D effect */
.transform-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
}
</style>