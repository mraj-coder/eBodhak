import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('../views/CoursesView.vue'),
    },
    {
      path: '/courses/:id',
      name: 'course-detail',
      component: () => import('../views/CourseDetailView.vue'),
      props: true, // Enables passing course ID as prop
    },
    {
      path: '/mock-tests',
      name: 'mock-tests',
      component: () => import('../views/MockTestsView.vue'),
    },
    {
      path: '/mock-tests/test/:id',
      name: 'test-taking',
      component: () => import('../views/TestTakingView.vue'),
    },
    {
      path: '/mock-tests/results/:id',
      name: 'test-results',
      component: () => import('../views/TestResultsView.vue'),
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('../views/PricingView.vue'),
    },
    {
      path: '/checkout/:planId',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      props: true,
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FAQView.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpView.vue'),
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/TermsView.vue'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyView.vue'),
    },
    {
      path: '/careers',
      name: 'careers',
      component: () => import('../views/ComingSoonView.vue'),
      props: { title: 'Careers', description: 'Join our team! Career opportunities coming soon.' },
    },
    {
      path: '/my-courses',
      name: 'my-courses',
      component: () => import('../views/MyCoursesView.vue'),
    },
    {
      path: '/instructors/:id',
      name: 'instructor-profile',
      component: () => import('../views/InstructorProfileView.vue'),
      props: true,
    },
    {
      path: '/live-classes',
      name: 'live-classes',
      component: () => import('../views/LiveClassesView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: () => import('../views/BlogDetailView.vue'),
      props: true,
    },
    {
      path: '/materials',
      name: 'materials',
      component: () => import('../views/ComingSoonView.vue'),
      props: { title: 'Study Materials', description: 'Downloadable study materials coming soon.' },
    },
    {
      path: '/success-stories',
      name: 'success-stories',
      component: () => import('../views/ComingSoonView.vue'),
      props: { title: 'Success Stories', description: 'Inspiring student success stories coming soon.' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

export default router