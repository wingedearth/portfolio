# Heroku Deployment Guide

This guide covers deploying your portfolio to Heroku.

## Prerequisites

- Heroku account
- Heroku CLI installed (optional, for manual deployment)
- GitHub repository connected to Heroku app

## Environment Variables

Set the following environment variables in your Heroku app settings:

### Required Variables

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=w2kdqr08
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Setting Environment Variables

**Via Heroku Dashboard:**
1. Go to your app: https://dashboard.heroku.com/apps/bubblelab
2. Click on "Settings" tab
3. Click "Reveal Config Vars"
4. Add each variable with its value

**Via Heroku CLI:**
```bash
heroku config:set NEXT_PUBLIC_SANITY_PROJECT_ID=w2kdqr08 --app bubblelab
heroku config:set NEXT_PUBLIC_SANITY_DATASET=production --app bubblelab
heroku config:set NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01 --app bubblelab
```

## Deployment Methods

### Automatic Deployment (Recommended)

Since your GitHub repository is already connected:

1. Go to your app dashboard: https://dashboard.heroku.com/apps/bubblelab
2. Navigate to the "Deploy" tab
3. Under "Automatic deploys", select your branch (usually `master` or `main`)
4. Click "Enable Automatic Deploys"
5. Every push to that branch will trigger a deployment

### Manual Deployment via Dashboard

1. Go to the "Deploy" tab
2. Scroll to "Manual deploy"
3. Select the branch to deploy
4. Click "Deploy Branch"

### Manual Deployment via Heroku CLI

```bash
# Login to Heroku
heroku login

# Add Heroku remote (if not already added)
heroku git:remote -a bubblelab

# Deploy
git push heroku master
```

## Build Process

Heroku will automatically:
1. Install dependencies (`npm install`)
2. Build the Next.js app (`npm run build`)
3. Start the server (`npm start`)

The build process is defined in:
- `Procfile`: Specifies the web process
- `package.json`: Build and start scripts

## Verifying Deployment

After deployment completes:
1. Visit your app: https://bubblelab.herokuapp.com
2. Check build logs in Heroku dashboard or via CLI:
   ```bash
   heroku logs --tail --app bubblelab
   ```

## Troubleshooting

### Build Failures

Check the build logs for errors:
```bash
heroku logs --tail --app bubblelab
```

Common issues:
- Missing environment variables
- Node version compatibility
- Build errors in Next.js

### Runtime Issues

If the app builds but doesn't run:
- Check that `npm start` works locally
- Verify environment variables are set correctly
- Review application logs for errors

### Performance

For better performance on Heroku:
- Use the Hobby or higher dyno tier for production
- Enable automatic SSL via Heroku (automatically configured)
- Consider using a CDN for static assets

## Custom Domain

To add a custom domain:

1. Via Dashboard:
   - Go to "Settings" tab
   - Click "Add domain"
   - Follow DNS configuration instructions

2. Via CLI:
   ```bash
   heroku domains:add yourdomain.com --app bubblelab
   ```

## Monitoring

- View metrics: https://dashboard.heroku.com/apps/bubblelab/metrics
- View logs: https://dashboard.heroku.com/apps/bubblelab/logs
- Enable logging add-on for persistent logs (optional)

## Additional Resources

- [Heroku Node.js Documentation](https://devcenter.heroku.com/articles/deploying-nodejs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
