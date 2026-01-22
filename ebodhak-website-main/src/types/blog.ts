export interface BlogAuthor {
  id: number
  name: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  summary: string
  content: string
  author: BlogAuthor
  featured_image: string | null
  views: number | string
  is_featured: boolean
  published_at: string
  created_at: string
  updated_at?: string
}

export interface PaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}

export interface BlogsListResponse {
  data: BlogPost[]
  links: PaginationLinks
  meta: PaginationMeta
}

export interface BlogDetailResponse {
  data: BlogPost
}