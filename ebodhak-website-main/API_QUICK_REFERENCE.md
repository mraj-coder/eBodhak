# API Quick Reference

**Quick status check for backend team**

## 🚦 Current Status

| Endpoint | Status | HTTP | Action |
|----------|--------|------|--------|
| `GET /api/courses/all` | ✅ WORKING | 200 | None - API working! |
| `GET /api/subscriptions/plans/global` | ❌ MISSING | 404 | Deploy endpoint |
| `GET /api/blog/posts` | ❌ NOT IMPL | - | Implement (optional) |

## 🔧 Quick Tests

### Test Courses API
```bash
curl https://ebodhakapi.factbills.com/api/courses/all
```
**Status:** ✅ WORKING  
**Response:** `{"success":true,"message":"Courses retrieved successfully","data":{"courses":[...]}}`

### Test Subscription API
```bash
curl https://ebodhakapi.factbills.com/api/subscriptions/plans/global
```
**Current:** `{"message":"Not Found"}` (404)  
**Expected:** `{"success":true,"data":{"plans":[...]}}`

### Test Blog API
```bash
curl https://ebodhakapi.factbills.com/api/blog/posts
```
**Current:** Not implemented  
**Expected:** `{"success":true,"data":{"posts":[...]}}`

## 📖 Full Documentation

See [BACKEND_API_REQUIREMENTS.md](./BACKEND_API_REQUIREMENTS.md) for:
- Complete API specifications
- Request/Response formats
- Example responses
- CORS configuration
- Testing checklist

## ✅ When Fixed

Once APIs are working:
1. Frontend will automatically use real data
2. No code changes needed on frontend
3. Remove mock data files (optional)

## 🆘 Need Help?

Contact frontend team if:
- Response format is unclear
- Need example data
- Have questions about requirements