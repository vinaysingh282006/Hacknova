# 🚀 EcoPulse Deployment Guide

Quick deployment instructions for hosting your EcoPulse environmental visualization website.

## Prerequisites

- Git installed on your machine
- GitHub account (for GitHub Pages)
- OR Netlify/Vercel account (recommended for easiest deployment)

## Option 1: Netlify (Recommended - Easiest)

### One-Line Deploy
```bash
npx netlify-cli deploy --prod --dir .
```

### Manual Steps
1. Visit [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to your Git repository
4. Configure settings:
   - **Build command**: Leave empty (static site)
   - **Publish directory**: `.` (root)
5. Click **"Deploy site"**

**Done!** Your site will be live at `https://[random-name].netlify.app`

## Option 2: Vercel

### One-Line Deploy
```bash
npx vercel --prod
```

### Manual Steps
1. Visit [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (leave empty)
   - **Output Directory**: `./`
5. Click **"Deploy"**

**Done!** Site live at `https://[project-name].vercel.app`

## Option 3: GitHub Pages

### Setup Steps

1. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: EcoPulse hackathon project"
   ```

2. **Create GitHub Repository**
   ```bash
   # Create new repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/ecopulse.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **"main"** branch
   - Click **Save**

4. **Access Your Site**
   - Wait 2-3 minutes
   - Visit: `https://YOUR_USERNAME.github.io/ecopulse/`

## Option 4: Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login & Initialize**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure** (`firebase.json`):
   ```json
   {
     "hosting": {
       "public": ".",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
     }
   }
   ```

4. **Deploy**
   ```bash
   firebase deploy
   ```

## Custom Domain Setup

### Netlify
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow DNS configuration instructions

### Vercel
1. Go to project **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed

### GitHub Pages
1. Add `CNAME` file to repository root with your domain
2. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153 (and 3 other IPs GitHub provides)
   ```

## Performance Optimization

### Before Deployment

1. **Minify CSS** (optional)
   ```bash
   npx clean-css-cli css/styles.css -o css/styles.min.css
   ```

2. **Enable Compression**
   - Most platforms (Netlify/Vercel) do this automatically
   - For custom servers, enable gzip

3. **Cache Headers**
   - Add `_headers` file (Netlify) or `vercel.json` (Vercel)

### Netlify `_headers`:
```
/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/data/*
  Cache-Control: public, max-age=3600
```

### Vercel `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## SSL/HTTPS

All recommended platforms (Netlify, Vercel, GitHub Pages, Firebase) provide **automatic HTTPS** with free SSL certificates.

No configuration needed! 🎉

## Testing Your Deployment

After deployment, verify:

✅ All pages load (index, air, water, light, presentation)  
✅ Navigation works  
✅ 3D scenes render (check Air page)  
✅ Charts display properly  
✅ Mobile responsiveness  
✅ HTTPS is enabled (padlock in browser)  

## Troubleshooting

### Issue: 404 on refresh
**Solution**: Configure redirect rules

**Netlify** (`_redirects` file):
```
/*    /index.html   200
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/$1" }
  ]
}
```

### Issue: Assets not loading
**Solution**: Check paths are relative (no leading `/`)
- ✅ `css/styles.css`
- ❌ `/css/styles.css`

### Issue: 3D scene not rendering
**Solution**: Check browser console for errors
- Ensure Three.js CDN is accessible
- Check WebGL support in browser

## Environment-Specific Notes

### Local Development
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### Production
- Use CDNs for Three.js and Chart.js (already configured)
- Enable compression
- Monitor with Google Analytics (add tracking code if needed)

## Cost

All recommended options have **FREE tiers**:

- **Netlify**: 100GB bandwidth/month
- **Vercel**: Unlimited bandwidth for personal projects
- **GitHub Pages**: Unlimited for public repos
- **Firebase**: 10GB storage, 360MB/day transfer

Perfect for hackathon projects! 💚

## Post-Deployment Checklist

- [ ] Test all pages work
- [ ] Share link with judges/team
- [ ] Add to README.md
- [ ] Test on mobile device
- [ ] Check browser console for errors
- [ ] Verify 3D scenes load
- [ ] Test presentation mode

## Support

Need help? Check:
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/pages)

---

**Ready to deploy!** Choose your platform and follow the steps above. Good luck with your hackathon! 🚀🌍
