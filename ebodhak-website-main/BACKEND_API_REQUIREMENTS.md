# Backend API Requirements Documentation

**Project:** Ebodhak E-Learning Platform  
**Frontend:** Vue 3 + TypeScript  
**API Base URL:** https://ebodhakapi.factbills.com  
**Date:** December 7, 2025

---

## 📋 Table of Contents

1. [API Status Overview](#api-status-overview)
2. [Required APIs](#required-apis)
3. [API Specifications](#api-specifications)
4. [CORS Configuration](#cors-configuration)
5. [Testing Checklist](#testing-checklist)

---

## 🎯 API Status Overview

| API Endpoint | Status | Priority | Notes |
|-------------|--------|----------|-------|
| `/api/courses/all` | ✅ **WORKING** | - | Verified working in Postman |
| `/api/subscriptions/plans/global` | ❌ **MISSING** | 🔴 HIGH | Returns 404, needs deployment |
| `/api/blog/posts` | ❌ **NOT IMPLEMENTED** | 🟡 MEDIUM | Currently using mock data |
| `/api/blog/posts/:id` | ❌ **NOT IMPLEMENTED** | 🟡 MEDIUM | For single blog post |
| `/api/blog/categories` | ❌ **NOT IMPLEMENTED** | 🟢 LOW | Optional enhancement |

---

## 🚨 Critical Issues

### 1. Subscription Plans API - MISSING ❌

**Endpoint:** `GET /api/subscriptions/plans/global`

**Current Response:**
```json
{
  "message": "Not Found"
}
```

**HTTP Status:** 404 Not Found

**Problem:** Endpoint doesn't exist

**Impact:** Pricing page shows error state to users

**Action Required:** Deploy this endpoint with subscription plans data

---

## 📡 API Specifications

### 1. Courses API

#### Get All Courses

**Endpoint:** `GET /api/courses/all`

**Request Headers:**
```
Accept: application/json
Content-Type: application/json
```

**Expected Response Format:**
```typescript
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": {
    "courses": [
      {
        "id": number,
        "name": string,
        "description": string,
        "duration_months": number,
        "is_active": boolean,
        "image_url": string,
        "category": {
          "id": number,
          "name": string,
          "slug": string,
          "description": string,
          "icon": string
        },
        "subjects_count": number,
        "questions_count": number,
        "total_chapters": number,
        "difficulty_level": "beginner" | "intermediate" | "advanced",
        "created_at"?: string,
        "updated_at"?: string
      }
    ]
  }
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": {
    "courses": [
      {
        "id": 1,
        "name": "NEET UG 2025",
        "description": "Comprehensive preparation course for NEET UG entrance examination",
        "duration_months": 12,
        "is_active": true,
        "image_url": "https://example.com/courses/neet-ug.jpg",
        "category": {
          "id": 1,
          "name": "Medical",
          "slug": "medical",
          "description": "Medical entrance exam category",
          "icon": "medical-icon.svg"
        },
        "subjects_count": 4,
        "questions_count": 2000,
        "total_chapters": 52,
        "difficulty_level": "advanced"
      }
    ]
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error information"
}
```

---

### 2. Subscription Plans API

#### Get Global Subscription Plans

**Endpoint:** `GET /api/subscriptions/plans/global`

**Request Headers:**
```
Accept: application/json
Content-Type: application/json
```

**Expected Response Format:**
```typescript
{
  "success": true,
  "message": "Subscription plans retrieved successfully",
  "data": {
    "plans": [
      {
        "id": number,
        "name": string,
        "slug": string,
        "description": string,
        "price": string,              // Decimal as string: "1999.00"
        "discounted_price": string | null,
        "effective_price": string,    // Final price after discount
        "discount_percentage": number | null,
        "duration_months": number | null,  // null for lifetime
        "features": string,           // JSON string array
        "is_popular": boolean,
        "currency": string            // "NPR", "USD", etc.
      }
    ]
  }
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "Subscription plans retrieved successfully",
  "data": {
    "plans": [
      {
        "id": 1,
        "name": "Monthly Plan",
        "slug": "monthly-plan",
        "description": "Perfect for short-term preparation",
        "price": "1999.00",
        "discounted_price": null,
        "effective_price": "1999.00",
        "discount_percentage": null,
        "duration_months": 1,
        "features": "[\"Full access to all courses\",\"1000+ practice questions\",\"Email support\",\"Basic analytics\",\"Mobile app access\",\"Certificate eligibility\"]",
        "is_popular": false,
        "currency": "NPR"
      },
      {
        "id": 2,
        "name": "6 Months Plan",
        "slug": "6-months-plan",
        "description": "Most popular choice for exam preparation",
        "price": "9999.00",
        "discounted_price": "7499.00",
        "effective_price": "7499.00",
        "discount_percentage": 25,
        "duration_months": 6,
        "features": "[\"Full access to all courses\",\"Unlimited practice questions\",\"Priority email support\",\"Full analytics dashboard\",\"Mobile app access\",\"Certificate eligibility\",\"Live doubt sessions\",\"Future updates included\"]",
        "is_popular": true,
        "currency": "NPR"
      }
    ]
  }
}
```

**Important Notes:**
- `features` field is a **JSON string** (not an array), needs to be parsed on frontend
- `price` and `effective_price` are strings to preserve decimal precision
- `duration_months` is `null` for lifetime plans
- At least one plan should have `is_popular: true` for highlighting

---

### 3. Blog API (NOT IMPLEMENTED)

#### Get All Blog Posts

**Endpoint:** `GET /api/blog/posts`

**Status:** ❌ Not implemented - currently using static mock data

**Query Parameters:**
```
?category=string     // Optional: Filter by category
?search=string       // Optional: Search in title/content
?page=number         // Optional: Pagination
?limit=number        // Optional: Items per page (default: 10)
```

**Expected Response Format:**
```typescript
{
  "success": true,
  "message": "Blog posts retrieved successfully",
  "data": {
    "posts": [
      {
        "id": number,
        "title": string,
        "slug": string,
        "excerpt": string,
        "content": string,          // Full HTML content
        "author": {
          "id": number,
          "name": string,
          "image": string
        },
        "category": string,
        "tags": string[],
        "image": string,
        "published_date": string,   // ISO 8601 format
        "read_time": number,        // Minutes
        "views": number,
        "featured": boolean
      }
    ],
    "total": number,
    "page": number,
    "per_page": number
  }
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "Blog posts retrieved successfully",
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "10 Proven Study Techniques for NEET Success",
        "slug": "10-proven-study-techniques-neet",
        "excerpt": "Discover the most effective study methods that top NEET scorers use to ace their exams.",
        "content": "<p>Full blog content in HTML format...</p>",
        "author": {
          "id": 1,
          "name": "Dr. Rajesh Kumar",
          "image": "https://example.com/authors/rajesh.jpg"
        },
        "category": "Exam Tips",
        "tags": ["NEET", "Study Tips", "Medical"],
        "image": "https://example.com/blog/neet-study-tips.jpg",
        "published_date": "2024-01-10T10:00:00Z",
        "read_time": 8,
        "views": 1520,
        "featured": true
      }
    ],
    "total": 50,
    "page": 1,
    "per_page": 10
  }
}
```

#### Get Single Blog Post

**Endpoint:** `GET /api/blog/posts/:id`

**Status:** ❌ Not implemented

**Expected Response Format:**
```typescript
{
  "success": true,
  "message": "Blog post retrieved successfully",
  "data": {
    "post": {
      // Same structure as above
    }
  }
}
```

#### Get Blog Categories

**Endpoint:** `GET /api/blog/categories`

**Status:** ❌ Not implemented (Optional)

**Expected Response Format:**
```typescript
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": {
    "categories": [
      {
        "id": number,
        "name": string,
        "slug": string,
        "post_count": number
      }
    ]
  }
}
```

---

## 🔐 CORS Configuration

**Required CORS Headers:**

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept, Authorization
Access-Control-Max-Age: 86400
```

**For Production:**
- Restrict `Access-Control-Allow-Origin` to your frontend domain
- Example: `https://ebodhak.com`

**For Development:**
- Allow `http://localhost:5173` (Vite dev server)
- Or use `*` for testing

---

## 🧪 Testing Checklist

### Before Deployment

- [ ] Test API endpoint with Postman/curl
- [ ] Verify response format matches specification
- [ ] Check all required fields are present
- [ ] Test with valid and invalid data
- [ ] Verify error responses have proper format
- [ ] Check CORS headers are set correctly
- [ ] Test from frontend localhost
- [ ] Test from deployed frontend

### Courses API Testing

```bash
# Test courses endpoint
curl -X GET https://ebodhakapi.factbills.com/api/courses/all \
  -H "Accept: application/json"

# Expected: 200 OK with courses data
# Current: Returns error
```

### Subscription Plans API Testing

```bash
# Test subscription endpoint
curl -X GET https://ebodhakapi.factbills.com/api/subscriptions/plans/global \
  -H "Accept: application/json"

# Expected: 200 OK with plans data
# Current: 404 Not Found
```

### Blog API Testing (When Implemented)

```bash
# Test blog posts endpoint
curl -X GET https://ebodhakapi.factbills.com/api/blog/posts \
  -H "Accept: application/json"

# Test with filters
curl -X GET "https://ebodhakapi.factbills.com/api/blog/posts?category=Exam%20Tips&limit=5" \
  -H "Accept: application/json"

# Test single post
curl -X GET https://ebodhakapi.factbills.com/api/blog/posts/1 \
  -H "Accept: application/json"
```

---

## 📞 Frontend Integration Status

### Current Frontend Behavior

**Courses Page (`/courses`):**
- Makes API call to `/api/courses/all`
- Shows error state when API fails
- Has retry button for users
- **Status:** Waiting for backend fix

**Pricing Page (`/pricing`):**
- Makes API call to `/api/subscriptions/plans/global`
- Shows error state when API fails
- Has retry button for users
- **Status:** Waiting for backend deployment

**Blog Page (`/blog`):**
- Currently uses static mock data
- No API integration yet
- **Status:** Can be implemented once blog API is ready

### Frontend Configuration

**File:** `src/services/api.ts`

```typescript
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

// Development: Uses Vite proxy
// Production: Uses full API URL
```

**Vite Proxy Configuration:**

```typescript
// vite.config.ts
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

---

## 🎯 Priority Action Items

### Immediate (This Week)

1. **Deploy Subscription Plans API** ❌
   - Endpoint doesn't exist (404)
   - Critical for pricing page
   - Follow specification above

### Short Term (Next 2 Weeks)

3. **Implement Blog API** (Optional)
   - Get all posts endpoint
   - Get single post endpoint
   - Category filtering
   - Search functionality

### Nice to Have

4. **Additional Endpoints**
   - User authentication
   - Course enrollment
   - Payment processing
   - User progress tracking

---

## 📝 Notes for Backend Team

1. **Response Format Consistency:**
   - Always include `success` boolean
   - Always include `message` string
   - Wrap data in `data` object
   - Use consistent error format

2. **Data Types:**
   - Use strings for decimal values (prices)
   - Use ISO 8601 for dates
   - Use null for optional fields (not undefined)
   - Use JSON strings for complex data (like features array)

3. **Performance:**
   - Add pagination for large datasets
   - Consider caching for static data
   - Optimize database queries
   - Add rate limiting

4. **Security:**
   - Validate all inputs
   - Sanitize data before returning
   - Use HTTPS only
   - Implement proper authentication (when needed)

5. **Documentation:**
   - Keep API documentation updated
   - Provide example responses
   - Document error codes
   - Share Postman collection

---

## 🤝 Communication

**Frontend Team Contact:**
- For API questions or clarifications
- To report API issues
- To request new endpoints

**Backend Team:**
- Please notify when APIs are deployed
- Share any breaking changes in advance
- Provide updated API documentation

---

## 📚 Additional Resources

- [API Integration Status](./API_INTEGRATION_STATUS.md)
- [Frontend Type Definitions](./src/types/)
- [Mock Data Examples](./src/services/mockData.ts)

---

**Last Updated:** December 7, 2025  
**Document Version:** 1.0  
**Maintained By:** Frontend Team