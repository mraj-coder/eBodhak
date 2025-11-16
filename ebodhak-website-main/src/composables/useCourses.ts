import { ref, type Ref } from 'vue'
import { apiService } from '@/services/api'
import type { Course } from '@/types/course'

interface UseCoursesReturn {
  courses: Ref<Course[]>
  loading: Ref<boolean>
  error: Ref<string | null>
  fetchCourses: () => Promise<void>
}

export function useCourses(): UseCoursesReturn {
  const courses = ref<Course[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCourses = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.getAllCourses()
      if (response.success && response.data.courses) {
        courses.value = response.data.courses
      } else {
        error.value = `API Error: ${response.message || 'Failed to fetch courses'}. Please contact the backend team.`
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes('500')) {
        error.value = 'The API server is experiencing issues (500 Internal Server Error). Please contact the backend team to check the server logs.'
      } else {
        error.value = err instanceof Error ? err.message : 'An error occurred while fetching courses'
      }
      console.error('Error fetching courses:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    courses,
    loading,
    error,
    fetchCourses,
  }
}

interface UseCourseReturn {
  course: Ref<Course | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  fetchCourse: (id: number) => Promise<void>
}

export function useCourse(): UseCourseReturn {
  const course = ref<Course | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCourse = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.getCourseById(id)
      if (response.success && response.data.courses && response.data.courses.length > 0) {
        course.value = response.data.courses[0] || null
      } else {
        error.value = 'Course not found'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred while fetching course'
      console.error('Error fetching course:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    course,
    loading,
    error,
    fetchCourse,
  }
}