export interface SubscriptionPlan {
  id: number
  name: string
  slug: string
  description: string
  price: string
  discounted_price: string | null
  effective_price: string
  discount_percentage: number | null
  duration_months: number | null
  features: string // JSON string that needs to be parsed
  is_popular: boolean
  currency: string
}

export interface SubscriptionPlansResponse {
  success: boolean
  message: string
  data: {
    plans: SubscriptionPlan[]
  }
}