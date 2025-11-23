import type { CoursesResponse } from '@/types/course'

// Type definitions for mock data
export interface Instructor {
  id: number
  name: string
  title: string
  bio: string
  image: string
  expertise: string[]
  experience: number
  students: number
  courses: number
  rating: number
  totalReviews: number
  education: string[]
  certifications: string[]
  socialLinks: {
    linkedin?: string
    twitter?: string
    youtube?: string
  }
  videoIntro?: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  authorImage: string
  category: string
  tags: string[]
  image: string
  publishedDate: string
  readTime: number
  views: number
  featured: boolean
}

export interface LiveClass {
  id: number
  title: string
  description: string
  instructor: string
  instructorImage: string
  subject: string
  category: string
  startTime: string
  endTime: string
  duration: number
  isRecorded: boolean
  recordingUrl?: string
  meetingLink: string
  maxParticipants: number
  currentParticipants: number
  status: 'upcoming' | 'live' | 'completed'
}

export interface EnrolledCourse {
  id: number
  courseId: number
  courseName: string
  courseImage: string
  category: string
  progress: number
  totalLessons: number
  completedLessons: number
  lastAccessed: string
  instructor: string
  status: 'in-progress' | 'completed' | 'not-started'
  certificateUrl?: string
  rating: number
}

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

export const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: 1,
    courseId: 1,
    courseName: 'NEET UG 2025',
    courseImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
    category: 'Medical',
    progress: 65,
    totalLessons: 120,
    completedLessons: 78,
    lastAccessed: '2024-01-15T10:30:00',
    instructor: 'Dr. Rajesh Kumar',
    status: 'in-progress',
    rating: 4.5,
  },
  {
    id: 2,
    courseId: 2,
    courseName: 'JEE Main 2025',
    courseImage: 'https://images.unsplash.com/photo-1581092335331-5e00ac65e934?w=400&h=300&fit=crop',
    category: 'Engineering',
    progress: 45,
    totalLessons: 100,
    completedLessons: 45,
    lastAccessed: '2024-01-14T15:20:00',
    instructor: 'Prof. Amit Sharma',
    status: 'in-progress',
    rating: 4.8,
  },
  {
    id: 3,
    courseId: 3,
    courseName: 'AWS Cloud Practitioner',
    courseImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    category: 'IT & Cloud',
    progress: 100,
    totalLessons: 50,
    completedLessons: 50,
    lastAccessed: '2024-01-10T09:00:00',
    instructor: 'John Anderson',
    status: 'completed',
    certificateUrl: '/certificates/aws-cloud-practitioner.pdf',
    rating: 5.0,
  },
]

export const mockInstructors: Instructor[] = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    title: 'Medical Sciences Expert',
    bio: 'Dr. Rajesh Kumar is a renowned medical educator with over 15 years of experience in preparing students for NEET and medical entrance exams. His innovative teaching methods have helped thousands of students achieve their dreams.',
    image: 'https://i.pravatar.cc/400?u=rajesh-kumar',
    expertise: ['Biology', 'Chemistry', 'Medical Sciences', 'NEET Preparation'],
    experience: 15,
    students: 5200,
    courses: 12,
    rating: 4.9,
    totalReviews: 1250,
    education: ['MBBS - AIIMS Delhi', 'MD - Internal Medicine', 'PhD - Medical Education'],
    certifications: ['Medical Education Specialist', 'NEET Expert Trainer'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/rajesh-kumar',
      youtube: 'https://youtube.com/@drrajeshkumar',
    },
    videoIntro: 'https://example.com/intro-video',
  },
  {
    id: 2,
    name: 'Prof. Amit Sharma',
    title: 'Engineering & Mathematics Expert',
    bio: 'Professor Amit Sharma brings 18 years of teaching experience in engineering mathematics and physics. His clear explanations and problem-solving techniques have made complex concepts accessible to thousands of JEE aspirants.',
    image: 'https://i.pravatar.cc/400?u=amit-sharma',
    expertise: ['Mathematics', 'Physics', 'Engineering', 'JEE Preparation'],
    experience: 18,
    students: 7200,
    courses: 15,
    rating: 4.8,
    totalReviews: 2100,
    education: ['B.Tech - IIT Delhi', 'M.Tech - IIT Bombay', 'PhD - Applied Mathematics'],
    certifications: ['IIT-JEE Expert', 'Advanced Mathematics Trainer'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/amit-sharma',
      twitter: 'https://twitter.com/profamitsharma',
    },
    videoIntro: 'https://example.com/intro-video-2',
  },
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Proven Study Techniques for NEET Success',
    excerpt: 'Discover the most effective study methods that top NEET scorers use to ace their exams.',
    content: 'Full blog content here...',
    author: 'Dr. Rajesh Kumar',
    authorImage: 'https://i.pravatar.cc/100?u=rajesh',
    category: 'Exam Tips',
    tags: ['NEET', 'Study Tips', 'Medical'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop',
    publishedDate: '2024-01-10T10:00:00',
    readTime: 8,
    views: 1520,
    featured: true,
  },
  {
    id: 2,
    title: 'JEE Main 2025: Complete Preparation Strategy',
    excerpt: 'A comprehensive guide to planning your JEE Main preparation from scratch.',
    content: 'Full blog content here...',
    author: 'Prof. Amit Sharma',
    authorImage: 'https://i.pravatar.cc/100?u=amit',
    category: 'Study Guides',
    tags: ['JEE', 'Engineering', 'Preparation'],
    image: 'https://images.unsplash.com/photo-1581092335331-5e00ac65e934?w=800&h=500&fit=crop',
    publishedDate: '2024-01-08T14:30:00',
    readTime: 12,
    views: 2340,
    featured: true,
  },
  {
    id: 3,
    title: 'From Zero to Hero: My NEET Journey',
    excerpt: 'A student shares their inspiring journey from average scores to NEET success.',
    content: 'Full blog content here...',
    author: 'Priya Patel',
    authorImage: 'https://i.pravatar.cc/100?u=priya',
    category: 'Success Stories',
    tags: ['Success Story', 'NEET', 'Motivation'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop',
    publishedDate: '2024-01-05T09:00:00',
    readTime: 6,
    views: 3120,
    featured: false,
  },
]

export const mockLiveClasses: LiveClass[] = [
  {
    id: 1,
    title: 'Organic Chemistry - Reaction Mechanisms',
    description: 'Deep dive into organic reaction mechanisms with real-world examples',
    instructor: 'Dr. Rajesh Kumar',
    instructorImage: 'https://i.pravatar.cc/150?u=rajesh',
    subject: 'Chemistry',
    category: 'Medical',
    startTime: '2024-01-16T14:00:00',
    endTime: '2024-01-16T15:30:00',
    duration: 90,
    isRecorded: true,
    meetingLink: 'https://meet.ebodhak.com/organic-chem',
    maxParticipants: 100,
    currentParticipants: 78,
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Calculus - Integration Techniques',
    description: 'Master advanced integration methods for JEE Main',
    instructor: 'Prof. Amit Sharma',
    instructorImage: 'https://i.pravatar.cc/150?u=amit',
    subject: 'Mathematics',
    category: 'Engineering',
    startTime: '2024-01-16T16:30:00',
    endTime: '2024-01-16T17:30:00',
    duration: 60,
    isRecorded: true,
    meetingLink: 'https://meet.ebodhak.com/calculus',
    maxParticipants: 150,
    currentParticipants: 142,
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Physics - Electromagnetism Basics',
    description: 'Understanding electromagnetic fields and their applications',
    instructor: 'Dr. Sarah Johnson',
    instructorImage: 'https://i.pravatar.cc/150?u=sarah',
    subject: 'Physics',
    category: 'Engineering',
    startTime: '2024-01-15T10:00:00',
    endTime: '2024-01-15T11:30:00',
    duration: 90,
    isRecorded: true,
    recordingUrl: 'https://recordings.ebodhak.com/physics-em-basics',
    meetingLink: 'https://meet.ebodhak.com/physics-em',
    maxParticipants: 100,
    currentParticipants: 100,
    status: 'completed',
  },
]