<script setup lang="ts">
const lastUpdated = 'January 15, 2025'
</script>

<template>
  <div class="terms-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
        <p class="text-xl text-primary-100">Last updated: {{ lastUpdated }}</p>
      </div>
    </section>

    <!-- Terms Content -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 space-y-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p class="text-gray-700 leading-relaxed">
              By accessing and using Ebodhak's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Permission is granted to temporarily access the materials (information or software) on Ebodhak's platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p class="text-gray-700 leading-relaxed">
              When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding your password and for all activities under your account.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
            <p class="text-gray-700 leading-relaxed">
              All payments are processed securely through our payment partners. Subscription fees are billed in advance on a monthly or annual basis. Refunds are available within 7 days of purchase as per our refund policy.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p class="text-gray-700 leading-relaxed">
              All content, including but not limited to text, graphics, logos, videos, and software, is the property of Ebodhak and is protected by copyright laws. Unauthorized use of any materials may violate copyright, trademark, and other laws.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p class="text-gray-700 leading-relaxed">
              Ebodhak shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">7. Termination</h2>
            <p class="text-gray-700 leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice, for any breach of these Terms. Upon termination, your right to use the service will immediately cease.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
            <p class="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last Updated" date. Your continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <p class="text-gray-700 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div class="mt-4 text-gray-700">
              <p>Email: legal@ebodhak.com</p>
              <p>Phone: +977 981-2345678</p>
              <p>Address: Thamel, Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>