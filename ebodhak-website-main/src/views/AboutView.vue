<script setup lang="ts">
import PremiumCTA from '@/components/common/PremiumCTA.vue'

const team = [
  { name: 'Abhishek Jha', role: 'Founder & CEO', icon: 'user-tie', image: 'https://i.pravatar.cc/200?u=ceo' },
  { name: 'Abhishek Jha', role: 'Head of Academics', icon: 'chalkboard-teacher', image: 'https://i.pravatar.cc/200?u=academics' },
  { name: 'Abhishek Jha', role: 'Tech Lead', icon: 'laptop-code', image: 'https://i.pravatar.cc/200?u=tech' },
  { name: 'Abhishek Jha', role: 'Student Success Manager', icon: 'user-graduate', image: 'https://i.pravatar.cc/200?u=success' },
]

const values = [
  {
    icon: 'bullseye',
    title: 'Excellence',
    description: 'Committed to delivering the highest quality education',
  },
  {
    icon: 'lightbulb',
    title: 'Innovation',
    description: 'Leveraging technology to make learning more effective',
  },
  {
    icon: 'handshake',
    title: 'Community',
    description: 'Building a supportive network of learners and educators',
  },
  {
    icon: 'star',
    title: 'Impact',
    description: 'Empowering students to achieve their dreams',
  },
]
</script>

<template>
  <div class="about">
    <!-- Hero Section -->
    <section class="bg-compact-hero-pattern text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down text-shadow-lg">About Ebodhak</h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          Empowering Nepal's future engineers through quality education and innovative learning
          solutions
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <img 
          src="https://images.pexels.com/photos/5940837/pexels-photo-5940837.jpeg" 
          alt="Background pattern"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gradient-animate">Our Mission</h2>
            <p class="text-lg text-slate-700 mb-4 leading-relaxed">
              At Ebodhak, we believe that every student deserves access to world-class education.
              Founded in 2023, our mission is to democratize quality education for engineering
              aspirants across Nepal.
            </p>
            <p class="text-lg text-slate-700 mb-4 leading-relaxed">
              We combine expert instruction, comprehensive study materials, and cutting-edge
              technology to create an unparalleled learning experience that prepares students for
              success in competitive entrance exams and beyond.
            </p>
            <p class="text-lg text-slate-700 leading-relaxed">
              Based in Nepal, we understand the unique challenges faced by local students and have
              designed our platform to address these needs effectively.
            </p>
          </div>
          <div class="relative">
            <img 
              src="https://images.pexels.com/photos/5940837/pexels-photo-5940837.jpeg" 
              alt="A group of multiethnic college students collaborating on a project in a modern library setting by Kampus Production on Pexels"
              class="rounded-2xl shadow-2xl"
            />
            <div class="absolute -bottom-6 -left-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-xl">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'users']" class="text-2xl" />
                </div>
                <div>
                  <div class="text-2xl font-bold">10,000+</div>
                  <div class="text-sm opacity-90">Active Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="text-center">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <font-awesome-icon :icon="['fas', 'graduation-cap']" class="text-3xl" />
            </div>
            <div class="text-4xl font-bold mb-2">10,000+</div>
            <div class="text-lg opacity-90">Students Enrolled</div>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <font-awesome-icon :icon="['fas', 'trophy']" class="text-3xl" />
            </div>
            <div class="text-4xl font-bold mb-2">95%</div>
            <div class="text-lg opacity-90">Success Rate</div>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" class="text-3xl" />
            </div>
            <div class="text-4xl font-bold mb-2">50+</div>
            <div class="text-lg opacity-90">Expert Instructors</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-gray-50 relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <img 
          src="https://images.pexels.com/photos/6958506/pexels-photo-6958506.jpeg" 
          alt="Background pattern"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div
            v-for="value in values"
            :key="value.title"
            class="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-xl transition group"
          >
            <div class="mb-4 w-16 h-16 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <font-awesome-icon :icon="['fas', value.icon]" class="text-3xl text-indigo-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team/Learning Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div class="order-2 lg:order-1">
              <img 
                src="https://images.pexels.com/photos/7283630/pexels-photo-7283630.jpeg" 
                alt="Teenage girl wearing headphones using a laptop for online learning at home in a cozy setting by Karola G on Pexels"
                class="rounded-2xl shadow-2xl"
              />
            </div>
            <div class="order-1 lg:order-2">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Learn Anytime, Anywhere</h2>
              <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                Our platform is designed for flexibility. Access live classes, recorded lectures, and practice materials from any device, at any time.
              </p>
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <font-awesome-icon :icon="['fas', 'laptop']" class="text-xl text-indigo-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">Multi-Device Access</h4>
                    <p class="text-gray-600">Learn on desktop, tablet, or mobile</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <font-awesome-icon :icon="['fas', 'clock']" class="text-xl text-indigo-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">24/7 Availability</h4>
                    <p class="text-gray-600">Study at your own pace and schedule</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <font-awesome-icon :icon="['fas', 'download']" class="text-xl text-indigo-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">Offline Access</h4>
                    <p class="text-gray-600">Download materials for offline study</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Expert Instructors</h2>
              <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                Learn from industry professionals and experienced educators who are passionate about your success.
              </p>
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <font-awesome-icon :icon="['fas', 'user-graduate']" class="text-xl text-indigo-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">Qualified Educators</h4>
                    <p class="text-gray-600">Top 1% of industry professionals</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <font-awesome-icon :icon="['fas', 'comments']" class="text-xl text-indigo-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">Personalized Support</h4>
                    <p class="text-gray-600">One-on-one doubt clearing sessions</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <font-awesome-icon :icon="['fas', 'certificate']" class="text-xl text-indigo-600" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-1">Proven Track Record</h4>
                    <p class="text-gray-600">Years of successful student outcomes</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/6326046/pexels-photo-6326046.jpeg" 
                alt="Educator explaining physics concept with drawing on a whiteboard, showcasing active teaching method by Vanessa Garcia on Pexels"
                class="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate educators and innovators dedicated to your success
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div v-for="member in team" :key="member.name" class="text-center">
            <div class="relative w-32 h-32 mx-auto mb-4">
              <img :src="member.image" :alt="member.name" class="w-full h-full rounded-full object-cover border-4 border-primary-100" />
              <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white">
                <font-awesome-icon :icon="['fas', member.icon]" class="text-white text-sm" />
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ member.name }}</h3>
            <p class="text-gray-600">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div class="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Ebodhak was born from a simple observation: talented students in Nepal often lack
              access to quality educational resources that match their potential. Our founders,
              having experienced this challenge firsthand, set out to create a solution that would
              level the playing field.
            </p>
            <p>
              Starting with just a handful of courses in 2023, we've grown into Nepal's leading
              e-learning platform for engineering aspirants. Our success is measured not just in
              numbers, but in the dreams we've helped students achieve.
            </p>
            <p>
              Today, we're proud to serve over 10,000 students across Nepal, offering comprehensive
              courses, expert mentorship, and a supportive community that believes in the power of
              education to transform lives.
            </p>
            <p>
              We integrate with local payment solutions like Khalti to ensure accessibility, and our
              curriculum is specifically designed to align with Nepal's educational standards and
              entrance exam requirements.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <PremiumCTA
      title="Join Our Growing Community"
      subtitle="Be part of Nepal's largest community of aspiring engineers and achievers"
      buttonText="Start Your Journey Today"
      buttonLink="/pricing"
      benefits="15,000+ students • Expert instructors • Proven success"
    />
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
