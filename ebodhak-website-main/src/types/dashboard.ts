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
  rating?: number
}

export interface UpcomingClass {
  id: number
  title: string
  instructor: string
  instructorImage: string
  courseName: string
  startTime: string
  duration: number
  meetingLink: string
  isLive: boolean
}

export interface DashboardStats {
  totalCourses: number
  completedCourses: number
  hoursLearned: number
  studyStreak: number
  averageScore: number
  testsCompleted: number
}

export interface RecentActivity {
  id: number
  type: 'course' | 'test' | 'achievement' | 'class'
  title: string
  description: string
  timestamp: string
  icon: string
}

export interface Announcement {
  id: number
  title: string
  message: string
  type: 'info' | 'warning' | 'success'
  date: string
  isRead: boolean
}

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