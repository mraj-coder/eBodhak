import type { CoursesResponse } from '@/types/course'

// Mock data for development when API is unavailable
export const mockCoursesResponse: CoursesResponse = {
  success: true,
  message: 'Courses retrieved successfully (MOCK DATA)',
  data: {
    courses: [
      {
        id: 1,
        name: 'NEET UG 2025',
        description: 'Comprehensive preparation course for NEET UG entrance examination',
        duration_months: 12,
        is_active: true,
        image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
        category: {
          id: 1,
          name: 'Medical',
          slug: 'medical',
          description: 'Medical entrance exam category',
          icon: 'medical-icon.svg',
        },
        subjects_count: 4,
        questions_count: 2000,
        total_chapters: 52,
        difficulty_level: 'advanced',
      },
      {
        id: 2,
        name: 'JEE Main 2025',
        description: 'Complete preparation for JEE Main entrance examination',
        duration_months: 12,
        is_active: true,
        image_url: 'https://images.unsplash.com/photo-1581092335331-5e00ac65e934?w=400&h=300&fit=crop',
        category: {
          id: 2,
          name: 'Engineering',
          slug: 'engineering',
          description: 'Engineering entrance exam category',
          icon: 'engineering-icon.svg',
        },
        subjects_count: 3,
        questions_count: 1500,
        total_chapters: 45,
        difficulty_level: 'intermediate',
      },
      {
        id: 3,
        name: 'AWS Cloud Practitioner',
        description: 'Prepare for AWS Certified Cloud Practitioner certification',
        duration_months: 3,
        is_active: true,
        image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
        category: {
          id: 3,
          name: 'IT & Cloud',
          slug: 'it-cloud',
          description: 'IT and Cloud certification category',
          icon: 'cloud-icon.svg',
        },
        subjects_count: 5,
        questions_count: 800,
        total_chapters: 20,
        difficulty_level: 'beginner',
      },
    ],
  },
}