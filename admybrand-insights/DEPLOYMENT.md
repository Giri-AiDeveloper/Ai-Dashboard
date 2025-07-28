# Deployment Guide - ADmyBRAND Insights

This guide covers various deployment options for the ADmyBRAND Insights analytics dashboard.

## 🚀 Quick Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/admybrand-insights)

### Manual Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## 🌐 Netlify Deployment

### Option 1: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=.next
   ```

### Option 2: Git Integration

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy

## 🐳 Docker Deployment

### Build Docker Image

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Commands

```bash
# Build image
docker build -t admybrand-insights .

# Run container
docker run -p 3000:3000 admybrand-insights
```

## ☁️ AWS Deployment

### AWS Amplify

1. Connect your Git repository to AWS Amplify
2. Set build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### AWS EC2 with PM2

1. **Setup EC2 instance with Node.js**
2. **Install PM2**
   ```bash
   npm install -g pm2
   ```

3. **Deploy and start**
   ```bash
   git clone <your-repo>
   cd admybrand-insights
   npm install
   npm run build
   pm2 start npm --name "admybrand-insights" -- start
   pm2 save
   pm2 startup
   ```

## 🔧 Environment Variables

Create a `.env.local` file for environment-specific configurations:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME=ADmyBRAND Insights
NEXT_PUBLIC_APP_VERSION=1.0.0

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# API Configuration (For future real data integration)
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
API_SECRET_KEY=your-secret-key

# Theme Configuration
NEXT_PUBLIC_DEFAULT_THEME=system
```

## 🚀 Performance Optimization

### Build Optimization

1. **Enable compression**
   ```javascript
   // next.config.ts
   const nextConfig = {
     compress: true,
     poweredByHeader: false,
     generateEtags: false,
   }
   ```

2. **Image optimization**
   ```javascript
   // next.config.ts
   const nextConfig = {
     images: {
       domains: ['your-domain.com'],
       formats: ['image/webp', 'image/avif'],
     },
   }
   ```

### CDN Configuration

For static assets, configure your CDN:

```javascript
// next.config.ts
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.yourdomain.com' 
    : '',
}
```

## 📊 Monitoring & Analytics

### Error Tracking (Sentry)

1. **Install Sentry**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configure Sentry**
   ```javascript
   // sentry.client.config.js
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     tracesSampleRate: 1.0,
   });
   ```

### Performance Monitoring

Add performance monitoring with Web Vitals:

```javascript
// pages/_app.tsx
export function reportWebVitals(metric) {
  console.log(metric)
  // Send to analytics service
}
```

## 🔐 Security Considerations

### Security Headers

Configure security headers in your deployment:

```javascript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

### Content Security Policy

```javascript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:;"
          },
        ],
      },
    ]
  },
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 📈 Scaling Considerations

### Database Integration

For production use with real data:

1. **Setup database** (PostgreSQL, MongoDB, etc.)
2. **Add ORM** (Prisma, TypeORM)
3. **Implement caching** (Redis)
4. **Add rate limiting**

### Load Balancing

For high-traffic scenarios:

1. **Use CDN** for static assets
2. **Implement caching** strategies
3. **Setup load balancer**
4. **Monitor performance** metrics

## 🐛 Troubleshooting

### Common Issues

1. **Build failures**
   - Check Node.js version compatibility
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

2. **Theme not working**
   - Ensure localStorage is available
   - Check for SSR hydration issues

3. **Charts not rendering**
   - Verify Recharts compatibility
   - Check for client-side rendering issues

### Debug Mode

Enable debug mode for troubleshooting:

```bash
DEBUG=* npm run dev
```

## 📞 Support

For deployment issues:

1. Check the [GitHub Issues](https://github.com/your-username/admybrand-insights/issues)
2. Review the [Next.js deployment documentation](https://nextjs.org/docs/deployment)
3. Contact support: support@admybrand.com

---

🎉 **Happy Deploying!** Your analytics dashboard should now be live and ready to help track marketing performance.