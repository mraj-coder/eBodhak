<script setup lang="ts">
const team = [
  { name: 'Ramesh Adhikari', role: 'Founder & CEO', icon: '👨‍💼' },
  { name: 'Sunita Karki', role: 'Head of Academics', icon: '👩‍🏫' },
  { name: 'Bijay Shrestha', role: 'Tech Lead', icon: '👨‍💻' },
  { name: 'Anita Tamang', role: 'Student Success Manager', icon: '👩‍💼' },
]

const values = [
  {
    icon: '🎯',
    title: 'Excellence',
    description: 'Committed to delivering the highest quality education',
  },
  {
    icon: '💡',
    title: 'Innovation',
    description: 'Leveraging technology to make learning more effective',
  },
  {
    icon: '🤝',
    title: 'Community',
    description: 'Building a supportive network of learners and educators',
  },
  {
    icon: '🌟',
    title: 'Impact',
    description: 'Empowering students to achieve their dreams',
  },
]
</script>

<template>
  <div class="about">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">About Ebodhak</h1>
        <p class="text-xl max-w-3xl mx-auto text-primary-100">
          Empowering Nepal's future engineers through quality education and innovative learning
          solutions
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p class="text-lg text-gray-600 mb-4 leading-relaxed">
              At Ebodhak, we believe that every student deserves access to world-class education.
              Founded in 2023, our mission is to democratize quality education for engineering
              aspirants across Nepal.
            </p>
            <p class="text-lg text-gray-600 mb-4 leading-relaxed">
              We combine expert instruction, comprehensive study materials, and cutting-edge
              technology to create an unparalleled learning experience that prepares students for
              success in competitive entrance exams and beyond.
            </p>
            <p class="text-lg text-gray-600 leading-relaxed">
              Based in Nepal, we understand the unique challenges faced by local students and have
              designed our platform to address these needs effectively.
            </p>
          </div>
          <div class="bg-primary-50 rounded-2xl p-8">
            <div class="space-y-6">
              <div class="bg-white rounded-xl p-6 shadow-sm">
                <div class="text-4xl mb-3">🎓</div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">10,000+ Students</h3>
                <p class="text-gray-600">Trust us for their preparation</p>
              </div>
              <div class="bg-white rounded-xl p-6 shadow-sm">
                <div class="text-4xl mb-3">🏆</div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">95% Success Rate</h3>
                <p class="text-gray-600">In entrance examinations</p>
              </div>
              <div class="bg-white rounded-xl p-6 shadow-sm">
                <div class="text-4xl mb-3">🇳🇵</div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Made in Nepal</h3>
                <p class="text-gray-600">For Nepali students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-gray-50">
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
            class="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-xl transition"
          >
            <div class="text-5xl mb-4">{{ value.icon }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
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
            <div
              class="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-6xl"
            >
              {{ member.icon }}
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
    <section class="py-20 bg-gray-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Join Our Growing Community</h2>
        <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Be part of Nepal's largest community of aspiring engineers
        </p>
        <button
          class="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 shadow-lg"
        >
          Start Your Journey Today
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
