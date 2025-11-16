import type { CoursesResponse } from '@/types/course'
import { mockCoursesResponse } from './mockData'

// Use proxy in development, direct URL in production
const BASE_URL = import.meta.env.DEV ? '' : 'https://ebodhakapi.factbills.com'

// Set to true to use mock data (for development when API is unavailable)
const USE_MOCK_DATA = false

class ApiService {
  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  async getAllCourses(): Promise<CoursesResponse> {
    if (USE_MOCK_DATA) {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockCoursesResponse
    }
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
}

export const apiService = new ApiService()