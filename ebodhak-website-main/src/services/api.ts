import type { CoursesResponse } from '@/types/course'
import type { SubscriptionPlansResponse } from '@/types/subscription'
import type { BlogsListResponse, BlogDetailResponse } from '@/types/blog'
import { mockCoursesResponse, mockSubscriptionPlans } from './mockData'

// Use environment variable for API base URL
// In development, VITE_API_BASE_URL is empty string, so we use '' for proxy
// In production, VITE_API_BASE_URL is set to the full API URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

// Fallback flags - set to true to use mock data when API fails
const USE_MOCK_COURSES = false
const USE_MOCK_SUBSCRIPTIONS = false
const USE_MOCK_BLOGS = false // Using real API for blogs

// Log API configuration on startup
console.log('🔧 API Configuration:', {
  BASE_URL: BASE_URL || '(using Vite proxy)',
  USE_MOCK_COURSES,
  USE_MOCK_SUBSCRIPTIONS,
  environment: import.meta.env.MODE
})

class ApiService {
  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${BASE_URL}${endpoint}`
    console.log(`🌐 API Request: ${url}`)
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      console.log(`📡 API Response: ${response.status} ${response.statusText}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ API Success:`, data)
      return data
    } catch (error) {
      console.error(`❌ API Error for ${endpoint}:`, error)
      throw error
    }
  }

  async getAllCourses(): Promise<CoursesResponse> {
    if (USE_MOCK_COURSES) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockCoursesResponse
    }
    
    // Direct API call - no fallback, will throw error if API fails
    return this.fetch<CoursesResponse>('/api/courses/all')
  }

  async getCourseById(id: number): Promise<CoursesResponse> {
    // Fetch all courses and filter by ID
    const response = await this.getAllCourses()
    const course = response.data.courses.find((c) => c.id === id)
    
    if (!course) {
      throw new Error(`Course with id ${id} not found`)
    }

    return {
      ...response,
      data: {
        courses: [course]
      }
    }
  }

  async getGlobalSubscriptionPlans(): Promise<SubscriptionPlansResponse> {
    if (USE_MOCK_SUBSCRIPTIONS) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockSubscriptionPlans
    }
    
    // Direct API call - no fallback, will throw error if API fails
    return this.fetch<SubscriptionPlansResponse>('/api/subscriptions/plans/global')
  }

  async getAllBlogs(page: number = 1): Promise<BlogsListResponse> {
    // API call for list of blogs with pagination
    return this.fetch<BlogsListResponse>(`/api/blogs?page=${page}`)
  }

  async getBlogBySlug(slug: string): Promise<BlogDetailResponse> {
    // API call for specific blog by slug
    // Example: /api/blogs/how-subscriptions-unlock-full-potential
    return this.fetch<BlogDetailResponse>(`/api/blogs/${slug}`)
  }
}

export const apiService = new ApiService()