<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <RouterLink to="/" class="logo" @click="closeMobileMenu">
          <span class="logo-text">Ebodhak</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="nav-desktop">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/courses" class="nav-link">Courses</RouterLink>
          <RouterLink to="/mock-tests" class="nav-link">Mock Tests</RouterLink>
          <RouterLink to="/pricing" class="nav-link">Pricing</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </nav>

        <!-- CTA Buttons -->
        <div class="header-actions">
          <button class="btn btn-secondary">Login</button>
          <button class="btn btn-primary">Get Started</button>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
          <svg
            v-if="!mobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <nav v-if="mobileMenuOpen" class="nav-mobile">
        <RouterLink to="/" class="nav-link-mobile" @click="closeMobileMenu">Home</RouterLink>
        <RouterLink to="/courses" class="nav-link-mobile" @click="closeMobileMenu"
          >Courses</RouterLink
        >
        <RouterLink to="/mock-tests" class="nav-link-mobile" @click="closeMobileMenu"
          >Mock Tests</RouterLink
        >
        <RouterLink to="/pricing" class="nav-link-mobile" @click="closeMobileMenu"
          >Pricing</RouterLink
        >
        <RouterLink to="/about" class="nav-link-mobile" @click="closeMobileMenu">About</RouterLink>
        <div class="mobile-actions">
          <button class="btn btn-secondary btn-block" @click="closeMobileMenu">Login</button>
          <button class="btn btn-primary btn-block" @click="closeMobileMenu">Get Started</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
  z-index: 1000;
  height: var(--header-height);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-text {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Desktop Navigation */
.nav-desktop {
  display: none;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--color-text-primary);
  font-weight: 500;
  font-size: var(--font-size-base);
  transition: var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary);
}

/* Header Actions */
.header-actions {
  display: none;
  gap: 1rem;
  align-items: center;
}

.btn {
  padding: 0.625rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: var(--font-size-sm);
  transition: var(--transition-base);
  white-space: nowrap;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-border-dark);
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--color-text-primary);
  padding: 0.5rem;
}

/* Mobile Navigation */
.nav-mobile {
  position: absolute;
  top: var(--header-height);
  left: 0;
  right: 0;
  background: var(--color-white);
  box-shadow: var(--shadow-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-link-mobile {
  color: var(--color-text-primary);
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition-fast);
}

.nav-link-mobile:hover,
.nav-link-mobile.router-link-active {
  background: var(--color-primary-50);
  color: var(--color-primary);
}

.mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.btn-block {
  width: 100%;
}

/* Desktop Styles */
@media (min-width: 769px) {
  .nav-desktop {
    display: flex;
  }

  .header-actions {
    display: flex;
  }

  .mobile-menu-toggle {
    display: none;
  }
}

/* Tablet Styles */
@media (min-width: 640px) and (max-width: 768px) {
  .nav-desktop {
    display: flex;
    gap: 1.5rem;
  }

  .header-actions .btn-secondary {
    display: none;
  }

  .mobile-menu-toggle {
    display: none;
  }
}
</style>
