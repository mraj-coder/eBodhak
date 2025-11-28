# Deployment Guide

## Environment Variables

This project uses environment variables for configuration. The following files are available:

- `.env.example` - Template file showing all available environment variables
- `.env.development` - Development environment configuration (optional)
- `.env.production` - Production environment configuration

### Required Environment Variables

#### VITE_BASE_URL
- **Description**: Base URL for the application routing
- **Default**: `/`
- **Example**: If deploying to `https://example.com/app/`, set to `/app/`

#### VITE_API_BASE_URL
- **Description**: Backend API server URL
- **Default**: `https://ebodhakapi.factbills.com`
- **Development**: Empty string (uses Vite proxy)
- **Production**: Full API URL

#### NODE_ENV
- **Description**: Application environment mode
- **Values**: `development` | `production`

## Deployment Steps

### 1. Configure Environment Variables

Copy `.env.example` to `.env.production` and update values:

```bash
cp .env.example .env.production
```

Edit `.env.production` with your production values:

```env
VITE_BASE_URL=/
VITE_API_BASE_URL=https://ebodhakapi.factbills.com
NODE_ENV=production
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build for Production

```bash
npm run build
```

This will:
- Run type checking
- Build the application
- Output files to `dist/` directory

### 4. Preview Build (Optional)

Test the production build locally:

```bash
npm run preview
```

### 5. Deploy

Upload the contents of the `dist/` directory to your web server.

## Common Deployment Platforms

### Netlify / Vercel

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in platform settings:
   - `VITE_BASE_URL=/`
   - `VITE_API_BASE_URL=https://ebodhakapi.factbills.com`
   - `NODE_ENV=production`

### Traditional Web Server (Apache/Nginx)

1. Build the project locally or in CI/CD
2. Upload `dist/` contents to web root
3. Configure server for SPA routing (redirect all routes to index.html)

#### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/ebodhak/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Apache Configuration Example

Add to `.htaccess` in `dist/` directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Environment-Specific Builds

### Production Build
```bash
npm run build
```
Uses `.env.production` automatically

### Development Build
```bash
npm run dev
```
Uses `.env.development` or defaults

## Troubleshooting

### API Calls Failing
- Verify `VITE_API_BASE_URL` is correct
- Check CORS settings on API server
- Ensure API server is accessible from deployment environment

### Routing Issues (404 on refresh)
- Configure server to redirect all routes to `index.html`
- Verify `VITE_BASE_URL` matches deployment path

### Assets Not Loading
- Check `VITE_BASE_URL` configuration
- Ensure assets are included in `dist/` build output

## Security Notes

- Never commit `.env.production` to version control
- Keep `.env.example` updated with all variables (without sensitive values)
- Use platform-specific secret management for sensitive data
- Rotate API keys regularly