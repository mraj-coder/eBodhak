<script setup lang="ts">
const lastUpdated = 'January 15, 2025'
</script>

<template>
  <div class="privacy-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
        <p class="text-xl text-primary-100">Last updated: {{ lastUpdated }}</p>
      </div>
    </section>

    <!-- Privacy Content -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 space-y-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p class="text-gray-700 leading-relaxed">
              At Ebodhak, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Personal information (name, email address, phone number)</li>
              <li>Account credentials</li>
              <li>Payment information (processed securely by our payment partners)</li>
              <li>Course progress and performance data</li>
              <li>Communications with our support team</li>
              <li>Usage data and analytics</li>
            </ul>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Personalize your learning experience</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p class="text-gray-700 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
              <li>Service providers who assist in operating our platform</li>
              <li>Payment processors for transaction processing</li>
              <li>Analytics providers to understand platform usage</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p class="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Export your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p class="text-gray-700 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p class="text-gray-700 leading-relaxed">
              Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p class="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p class="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div class="mt-4 text-gray-700">
              <p>Email: privacy@ebodhak.com</p>
              <p>Phone: +977 981-2345678</p>
              <p>Address: Thamel, Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>