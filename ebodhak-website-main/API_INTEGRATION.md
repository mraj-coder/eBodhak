# API Integration Documentation

## Global Subscriptions API

### Endpoint
```
GET https://ebodhakapi.factbills.com/api/subscriptions/plans/global
```

### Integration Details

#### 1. Type Definitions
Created in `src/types/subscription.ts`:
- `SubscriptionPlan`: Defines the structure of a subscription plan
- `SubscriptionPlansResponse`: Defines the API response structure

#### 2. API Service
Updated `src/services/api.ts`:
- Added `getGlobalSubscriptionPlans()` method
- Uses the existing fetch wrapper with proper error handling
- Supports proxy in development mode

#### 3. Component Integration
Updated `src/views/PricingView.vue`:
- Fetches real data from API on component mount
- Shows loading state while fetching
- Shows error state with retry button if API fails
- Displays plans sorted by `display_order`
- Only shows active plans (`is_active: true`)
- Dynamically calculates savings percentage

### API Response Structure

```typescript
{
  success: boolean
  message: string
  data: {
    plans: [
      {
        id: number
        name: string
        description: string
        monthly_price: number
        annual_price: number
        features: string[]
        is_highlighted: boolean
        display_order: number
        is_active: boolean
        created_at?: string
        updated_at?: string
      }
    ]
  }
}
```

### Features Mapping

The API returns `features` as an array of strings. Each feature will be displayed with a checkmark icon in the pricing card.

Example:
```json
{
  "features": [
    "Access to 50+ courses",
    "1000+ practice questions",
    "Email support"
  ]
}
```

### Development Proxy

The Vite config includes a proxy for development:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://ebodhakapi.factbills.com',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

This allows the frontend to make requests to `/api/*` which are proxied to the backend API, avoiding CORS issues during development.

### Testing

1. Start the development server:
```bash
npm run dev
```

2. Navigate to the pricing page:
```
http://localhost:5173/pricing
```

3. The page should:
   - Show a loading spinner initially
   - Fetch and display subscription plans from the API
   - Show error message with retry button if API fails
   - Allow toggling between monthly and annual billing
   - Display savings percentage dynamically

### Error Handling

The integration includes comprehensive error handling:
- Network errors are caught and displayed to the user
- Users can retry failed requests with a button
- Console logs provide debugging information
- Fallback UI ensures the page doesn't break on error

### Next Steps

To complete the subscription flow:
1. Add authentication/user context
2. Implement payment integration (Khalti, eSewa, etc.)
3. Add subscription purchase endpoint
4. Create user subscription management page
5. Add subscription status checks for protected content