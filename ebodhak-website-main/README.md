# Ebodhak E-Learning Platform

A modern, professional e-learning platform built with Vue 3, TypeScript, and Tailwind CSS. Ebodhak provides comprehensive learning solutions for multiple fields including Engineering, Medical, Management, IT, Science, and Banking exams in Nepal.

## 🚀 Tech Stack

- **Vue 3.5.22** - Progressive JavaScript Framework with Composition API
- **TypeScript** - Type-safe development
- **Vue Router 4.6.3** - Client-side routing
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Vite (Rolldown-Vite 7.1.20)** - Next-generation frontend build tool
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Project Structure

```
ebodhak-website/
├── public/                  # Static assets
├── src/
│   ├── assets/
│   │   ├── base.css        # CSS custom properties & global styles
│   │   └── main.css        # Tailwind CSS imports
│   ├── components/
│   │   ├── AppHeader.vue   # Responsive header with mobile menu
│   │   └── AppFooter.vue   # Footer with payment methods
│   ├── router/
│   │   └── index.ts        # Vue Router configuration
│   ├── views/
│   │   ├── HomeView.vue    # Landing page
│   │   └── AboutView.vue   # About page
│   ├── App.vue             # Root component
│   └── main.ts             # Application entry point
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## 🎨 Design System

### Color Palette

- **Primary (Green)**: `#10b981` - Education-focused brand color
- **Background**: Light gray (`#f9fafb`) and white
- **Text**: Gray-900 for headings, Gray-600 for body text
- **Borders**: Gray-200 with primary-300 on hover

### Design Principles

- Clean, professional light theme
- Minimal use of color for better focus
- Consistent spacing using Tailwind's scale
- Subtle borders instead of heavy shadows
- Smooth transitions and hover effects
- Mobile-first responsive design

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 20.19.0 or >=22.12.0
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Server will start at `http://localhost:5173` (or next available port)

### Build for Production

```bash
npm run build
```

### Lint with ESLint

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## 📄 Current Implementation

### ✅ Completed Pages

#### 1. Home Page (`/`)

**Components:**

- **Hero Carousel** - Auto-rotating slider with 3 slides showcasing key value propositions
- **Stats Banner** - 4 key metrics (15,000+ students, 96% success rate, 50+ instructors, 200+ courses)
- **Course Categories** - 6 field categories:
  - Engineering (IOE, BE)
  - Medical (MBBS, BDS)
  - Management (MBA, BBA)
  - Science & Technology
  - IT & Computer Science
  - Banking & Government Exams
- **Features Grid** - 8 feature cards highlighting platform capabilities
- **Testimonials** - 4 student success stories
- **Pricing Section** - 3 pricing tiers (Basic Rs.1999, Premium Rs.4999, Ultimate Rs.9999)
- **CTA Section** - Final call-to-action

**Features:**

- Fully responsive design
- Auto-playing hero carousel (5-second intervals)
- Hover effects and transitions
- Professional light theme

#### 2. About Page (`/about`)

Basic about page with company information, mission, and team details.

#### 3. App Header (`components/AppHeader.vue`)

- Logo and navigation menu
- Responsive mobile hamburger menu
- Links: Home, Courses, Mock Tests, Pricing, About
- CTA buttons: Login, Get Started

#### 4. App Footer (`components/AppFooter.vue`)

- Company information
- Support links
- Resource links
- Payment method badges (Khalti, eSewa, IME Pay)
- Social media links

## 📋 Pages to Implement

### 🔴 High Priority

#### 1. **Courses Page** (`/courses`)

**Purpose:** Browse and filter all available courses

**Suggested Features:**

- Course catalog grid with filtering
- Filter by:
  - Field/Category (Engineering, Medical, etc.)
  - Level (Beginner, Intermediate, Advanced)
  - Price range
  - Rating
  - Duration
- Search functionality
- Course cards showing:
  - Course thumbnail/icon
  - Title and description
  - Instructor name
  - Price
  - Rating and reviews count
  - Duration
  - Student count
  - "Enroll Now" button
- Sorting options (Popular, Newest, Price, Rating)
- Pagination or infinite scroll

**API Integration Points:**

```typescript
GET /api/courses              // Fetch course list
GET /api/courses/:id          // Get course details
GET /api/categories           // Get course categories
```

---

#### 2. **Course Detail Page** (`/courses/:id`)

**Purpose:** Display detailed information about a specific course

**Suggested Features:**

- Course hero section with title, subtitle, instructor
- Course overview video or image
- Key highlights (duration, lessons, level, language)
- Curriculum/syllabus accordion
- Instructor profile section
- Student reviews and ratings
- Related courses
- Enrollment form/button
- FAQ section
- "What you'll learn" section
- Requirements section
- Price and enrollment options

**Components to Create:**

- `CourseHero.vue`
- `CourseCurriculum.vue`
- `CourseReviews.vue`
- `InstructorCard.vue`
- `EnrollmentCard.vue` (sticky sidebar)

---

#### 3. **Mock Tests Page** (`/mock-tests`)

**Purpose:** Access practice exams and mock tests

**Suggested Features:**

- List of available mock tests by category
- Filter by exam type (IOE, MBBS, MBA, etc.)
- Test cards showing:
  - Test name
  - Number of questions
  - Duration
  - Difficulty level
  - Attempts count
  - Best score
  - "Start Test" button
- Previous test results/history
- Leaderboard section
- Test analytics dashboard

**Components to Create:**

- `TestCard.vue`
- `TestFilters.vue`
- `TestHistory.vue`
- `Leaderboard.vue`

---

#### 4. **Pricing Page** (`/pricing`)

**Purpose:** Detailed pricing information and comparison

**Suggested Features:**

- Expanded pricing table with feature comparison
- Monthly/Annual toggle
- All plan features clearly listed
- FAQ about pricing
- Testimonials specific to value
- Payment methods accepted
- Money-back guarantee information
- Contact sales for enterprise

**Enhancements from Home:**

- More detailed feature breakdown
- Side-by-side comparison table
- Discount badges for annual plans

---

### 🟡 Medium Priority

#### 5. **Student Dashboard** (`/dashboard`)

**Purpose:** Personalized student portal

**Suggested Features:**

- Welcome section with student name
- Enrolled courses progress
- Upcoming live classes
- Recent test scores
- Study streak tracker
- Recommended courses
- Announcements
- Quick actions (Resume learning, Take test, etc.)

**Components:**

- `DashboardStats.vue`
- `EnrolledCourses.vue`
- `UpcomingClasses.vue`
- `RecentActivity.vue`

---

#### 6. **My Courses Page** (`/my-courses`)

**Purpose:** View all enrolled courses

**Suggested Features:**

- List/Grid view toggle
- Filter: In Progress, Completed, Not Started
- Course progress bars
- Continue learning buttons
- Download certificate (for completed)
- Course ratings and reviews

---

#### 7. **Instructor Profile Page** (`/instructors/:id`)

**Purpose:** View instructor details and courses

**Suggested Features:**

- Instructor bio and credentials
- Teaching experience
- Courses taught
- Student ratings
- Video introduction
- Social media links
- Contact/message button

---

#### 8. **Live Classes Page** (`/live-classes`)

**Purpose:** Schedule and join live sessions

**Suggested Features:**

- Calendar view of upcoming classes
- Filter by subject/category
- Join live class button
- Recorded classes archive
- Class reminders setup
- Q&A section

---

#### 9. **Blog/Resources Page** (`/blog` or `/resources`)

**Purpose:** Educational content and articles

**Suggested Features:**

- Blog posts grid
- Categories: Exam tips, Study guides, Success stories
- Search and filter
- Featured articles
- Author profiles
- Social sharing

---

#### 10. **Contact Page** (`/contact`)

**Purpose:** Contact form and support information

**Suggested Features:**

- Contact form (name, email, subject, message)
- Office location (if applicable)
- Email and phone
- Support hours
- FAQ link
- Social media links
- Live chat integration option

---

### 🟢 Lower Priority (Enhancement Pages)

#### 11. **Authentication Pages**

- `/login` - Login form
- `/signup` - Registration form
- `/forgot-password` - Password recovery
- `/verify-email` - Email verification

#### 12. **User Profile Settings** (`/profile`)

- Edit profile information
- Change password
- Notification preferences
- Payment methods
- Subscription management

#### 13. **Payment/Checkout Page** (`/checkout`)

- Course/plan selection
- Khalti payment integration
- Order summary
- Payment confirmation

#### 14. **Search Results Page** (`/search`)

- Global search results
- Filter by type (Courses, Tests, Articles)
- Advanced search options

#### 15. **Success Stories Page** (`/success-stories`)

- Student testimonials in detail
- Video testimonials
- Achievement showcase
- Interview format stories

#### 16. **Career Guidance Page** (`/career`)

- Career paths information
- Salary insights
- Job market trends
- Counseling booking

#### 17. **FAQ Page** (`/faq`)

- Comprehensive FAQ
- Categorized questions
- Search functionality
- Contact support CTA

## 🔌 API Integration Plan

### Suggested API Endpoints

```typescript
// Courses
GET    /api/courses              // List all courses
GET    /api/courses/:id          // Course details
GET    /api/courses/:id/curriculum // Course curriculum
POST   /api/courses/:id/enroll   // Enroll in course

// Mock Tests
GET    /api/tests                // List tests
GET    /api/tests/:id            // Test details
POST   /api/tests/:id/start      // Start test
POST   /api/tests/:id/submit     // Submit test

// User
POST   /api/auth/login           // Login
POST   /api/auth/register        // Register
GET    /api/user/profile         // Get profile
PUT    /api/user/profile         // Update profile
GET    /api/user/enrolled-courses // Get enrolled courses

// Payment
POST   /api/payment/initiate     // Initiate Khalti payment
POST   /api/payment/verify       // Verify payment

// Content
GET    /api/instructors          // List instructors
GET    /api/categories           // List categories
GET    /api/testimonials         // List testimonials
```

## 🎯 Recommended Implementation Order

1. **Phase 1 - Core Pages** (Week 1-2)
   - Courses Page with filtering
   - Course Detail Page
   - Pricing Page (enhanced)

2. **Phase 2 - Testing Features** (Week 2-3)
   - Mock Tests Page
   - Test Taking Interface
   - Results Page

3. **Phase 3 - User Features** (Week 3-4)
   - Authentication (Login/Signup)
   - Student Dashboard
   - My Courses Page

4. **Phase 4 - Additional Features** (Week 4-5)
   - Live Classes Page
   - Instructor Profiles
   - Payment Integration (Khalti)

5. **Phase 5 - Enhancement** (Week 5-6)
   - Blog/Resources
   - Contact Page
   - Search Functionality
   - Profile Settings

## 🧩 Reusable Components to Create

```
src/components/
├── common/
│   ├── Button.vue           # Reusable button component
│   ├── Card.vue             # Generic card component
│   ├── Badge.vue            # Badge/tag component
│   ├── Modal.vue            # Modal dialog
│   ├── Dropdown.vue         # Dropdown menu
│   ├── Tabs.vue             # Tab navigation
│   ├── Accordion.vue        # Accordion component
│   ├── ProgressBar.vue      # Progress indicator
│   └── Pagination.vue       # Pagination component
├── course/
│   ├── CourseCard.vue       # Course display card
│   ├── CourseGrid.vue       # Course grid layout
│   ├── CourseFilter.vue     # Filter component
│   └── CourseCurriculum.vue # Curriculum display
├── test/
│   ├── TestCard.vue         # Test card
│   ├── QuestionCard.vue     # Question display
│   └── TestTimer.vue        # Timer component
└── user/
    ├── Avatar.vue           # User avatar
    ├── ProfileCard.vue      # Profile display
    └── StatsCard.vue        # Stats widget
```

## 🔧 Development Guidelines

### Code Style

- Use Composition API with `<script setup>` syntax
- TypeScript for type safety
- Use Tailwind utility classes (avoid custom CSS when possible)
- Follow Vue 3 style guide
- Use meaningful component and variable names

### Component Structure

```vue
<script setup lang="ts">
// Imports
// Props/Emits
// Composables
// Reactive state
// Computed properties
// Methods
// Lifecycle hooks
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Only if absolutely necessary */
</style>
```

### State Management

- For simple state: Use Composition API with composables
- For complex state: Consider Pinia (Vue 3 store)

### API Calls

- Create a separate `services/` directory for API calls
- Use Axios or Fetch API
- Implement error handling
- Add loading states

## 🧪 Testing (Future Enhancement)

```bash
# Unit tests with Vitest
npm run test:unit

# E2E tests with Cypress/Playwright
npm run test:e2e
```

## 🚀 Deployment

### Build

```bash
npm run build
```

### Deployment Platforms

- Vercel (Recommended for Vite projects)
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront

## 📝 Environment Variables

Create `.env` file:

```
VITE_API_BASE_URL=https://api.ebodhak.com
VITE_KHALTI_PUBLIC_KEY=your_khalti_public_key
VITE_APP_NAME=Ebodhak
```

## 🎨 Tailwind Configuration

The project uses Tailwind CSS v3 with custom configuration:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0fdf4',
        100: '#dcfce7',
        // ... green shades
        500: '#10b981',
        600: '#059669',
      }
    }
  }
}
```

## 📱 Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit: `git commit -m "Add new feature"`
3. Push to branch: `git push origin feature/new-feature`
4. Create Pull Request

## 📞 Support

For questions or issues:

- Email: support@ebodhak.com
- Website: https://ebodhak.com

## 🔗 Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

### Recommended Extensions

- Vue - Official (Volar)
- Tailwind CSS IntelliSense
- ESLint
- Prettier

## 📄 License

Copyright © 2025 Ebodhak. All rights reserved.

---

**Last Updated:** November 3, 2025  
**Version:** 1.0.0  
**Status:** Active Development
