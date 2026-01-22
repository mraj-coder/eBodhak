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

---

## Blog API Integration

### Endpoints

#### Get All Blogs (List with Pagination)
```
GET https://ebodhakapi.factbills.com/api/blogs
GET https://ebodhakapi.factbills.com/api/blogs?page=1
```

Returns a paginated list of all blog posts.

#### Get Blog by Slug
```
GET https://ebodhakapi.factbills.com/api/blogs/{slug}
```

Example:
```
GET https://ebodhakapi.factbills.com/api/blogs/how-subscriptions-unlock-full-potential
```

Returns a single blog post by its slug.

### Integration Details

#### 1. Type Definitions
Created in `src/types/blog.ts`:
- `BlogAuthor`: Defines the author structure
- `BlogPost`: Defines the structure of a blog post
- `BlogsResponse`: Defines the API response structure

#### 2. API Service
Updated `src/services/api.ts`:
- Added `getAllBlogs()` method (currently using mock data)
- Added `getBlogBySlug(slug)` method for fetching individual blogs
- Uses the existing fetch wrapper with proper error handling
- Supports proxy in development mode

#### 3. Component Integration

**BlogView.vue** (`src/views/BlogView.vue`):
- Fetches list of blogs on component mount
- Shows loading state while fetching
- Shows error state with retry button if API fails
- Supports search and category filtering
- Displays featured posts separately
- Click on any post navigates to detail page

**BlogDetailView.vue** (`src/views/BlogDetailView.vue`):
- Fetches individual blog by slug from route params
- Shows loading state while fetching
- Shows error state if blog not found
- Displays full blog content with proper formatting
- Includes share buttons and CTA section
- Back button to return to blog list

#### 4. Router Configuration
Added routes in `src/router/index.ts`:
- `/blog` - Blog list page
- `/blog/:slug` - Individual blog detail page

### API Response Structure

#### List Response (GET /api/blogs)
```typescript
{
  data: [
    {
      id: number
      title: string
      slug: string
      summary: string
      content: string
      author: {
        id: number
        name: string
      }
      featured_image: string | null
      views: string | number  // Can be string from API
      is_featured: boolean
      published_at: string
      created_at: string
      updated_at: string
    }
  ],
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  },
  meta: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
}
```

#### Detail Response (GET /api/blogs/{slug})
```typescript
{
  data: {
    id: number
    title: string
    slug: string
    summary: string
    content: string
    author: {
      id: number
      name: string
    }
    featured_image: string | null
    views: string | number  // Can be string from API
    is_featured: boolean
    published_at: string
    created_at: string
    updated_at: string
  }
}
```

### Current Status

**✅ Using Real API**: The blog integration is now fully connected to the real API:
- List endpoint (`/api/blogs`) is working with pagination support
- Detail endpoint (`/api/blogs/{slug}`) is working
- Views field is normalized from string to number for consistency
- All blog data is fetched from the live API

### Testing

1. Start the development server:
```bash
npm run dev
```

2. Navigate to the blog page:
```
http://localhost:5174/blog
```

3. The page should:
   - Show a loading spinner initially
   - Display list of blog posts (currently mock data)
   - Allow searching and filtering
   - Show featured posts in a separate section
   - Navigate to detail page on click

4. Click on any blog post to view details:
```
http://localhost:5174/blog/{slug}
```

### Features

- **Pagination Support**: The API returns paginated results (10 per page by default)
- **Search & Filter**: Client-side search and filtering on fetched blog posts
- **Featured Posts**: Posts with `is_featured: true` are displayed prominently
- **Dynamic Routing**: Each blog post has its own detail page at `/blog/{slug}`
- **View Count**: Displays view count for each blog post
- **Author Information**: Shows author name and avatar
- **Responsive Design**: Works on all device sizes

### Error Handling

The integration includes comprehensive error handling:
- Network errors are caught and displayed to the user
- Users can retry failed requests with a button
- Console logs provide debugging information
- Fallback UI ensures the page doesn't break on error
- Mock data provides a working demo until API is ready