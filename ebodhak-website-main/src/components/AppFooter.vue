<script setup lang="ts">
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()

const footerLinks = {
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Mock Tests', path: '/mock-tests' },
    { name: 'Careers', path: '/careers' },
  ],
  support: [
    { name: 'Help Center', path: '/help' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
  ],
  resources: [
    { name: 'Blog', path: '/blog' },
    { name: 'Study Materials', path: '/materials' },
    { name: 'Success Stories', path: '/success-stories' },
  ],
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- Main Footer Content -->
      <div class="footer-main">
        <!-- Brand Section -->
        <div class="footer-brand">
          <h3 class="footer-logo">Ebodhak</h3>
          <p class="footer-description">
            Transform your learning journey with Nepal's premier e-learning platform. Expert-led
            courses, comprehensive mock tests, and interactive learning materials designed for
            aspiring engineers.
          </p>
          <div class="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Links Sections -->
        <div class="footer-links">
          <div class="footer-column">
            <h4 class="footer-heading">Company</h4>
            <ul class="link-list">
              <li v-for="link in footerLinks.company" :key="link.path">
                <RouterLink :to="link.path" class="footer-link">{{ link.name }}</RouterLink>
              </li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="footer-heading">Support</h4>
            <ul class="link-list">
              <li v-for="link in footerLinks.support" :key="link.path">
                <RouterLink :to="link.path" class="footer-link">{{ link.name }}</RouterLink>
              </li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="footer-heading">Resources</h4>
            <ul class="link-list">
              <li v-for="link in footerLinks.resources" :key="link.path">
                <RouterLink :to="link.path" class="footer-link">{{ link.name }}</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Payment Section -->
      <div class="payment-section">
        <p class="payment-text">We accept payments via</p>
        <div class="payment-methods">
          <div class="payment-badge">
            <span class="khalti-badge">Khalti</span>
          </div>
          <div class="payment-badge">eSewa</div>
          <div class="payment-badge">IME Pay</div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} Ebodhak. All rights reserved. 
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-secondary);
  color: var(--color-gray-300);
  padding: 4rem 0 2rem;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

/* Brand Section */
.footer-brand {
  max-width: 400px;
}

.footer-logo {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.footer-description {
  color: var(--color-gray-400);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--color-secondary-light);
  border-radius: 50%;
  color: var(--color-gray-300);
  transition: var(--transition-base);
}

.social-links a:hover {
  background: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-3px);
}

/* Footer Links */
.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-heading {
  color: var(--color-white);
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: 1rem;
}

.link-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  color: var(--color-gray-400);
  transition: var(--transition-fast);
  font-size: var(--font-size-sm);
}

.footer-link:hover {
  color: var(--color-primary);
  padding-left: 0.25rem;
}

/* Payment Section */
.payment-section {
  padding: 2rem 0;
  border-top: 1px solid var(--color-secondary-light);
  border-bottom: 1px solid var(--color-secondary-light);
  text-align: center;
}

.payment-text {
  color: var(--color-gray-400);
  margin-bottom: 1rem;
  font-size: var(--font-size-sm);
}

.payment-methods {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.payment-badge {
  padding: 0.5rem 1.25rem;
  background: var(--color-secondary-light);
  border-radius: var(--border-radius);
  color: var(--color-gray-300);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.khalti-badge {
  color: var(--color-primary);
  font-weight: 600;
}

/* Footer Bottom */
.footer-bottom {
  padding-top: 2rem;
  text-align: center;
}

.copyright {
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
}

/* Responsive Design */
@media (min-width: 768px) {
  .footer-main {
    grid-template-columns: 2fr 3fr;
    gap: 4rem;
  }

  .footer-links {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer {
    padding: 5rem 0 2rem;
  }
}
</style>
