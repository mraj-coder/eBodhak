export interface CourseCategory {
  id: number
  name: string
  slug: string
  description: string
  icon: string
}

export interface Course {
  id: number
  name: string
  // Optional fields that may be added later
  course_category_id?: number
  code?: string
  description?: string
  duration_months?: number
  is_active?: boolean
  image_url?: string
  created_at?: string
  updated_at?: string
  category?: CourseCategory
  subjects_count?: number
  questions_count?: number
  total_chapters?: number
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
}

export interface CoursesResponse {
  success: boolean
  message: string
  data: {
    courses: Course[]
  }
}