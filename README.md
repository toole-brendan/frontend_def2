# HandReceipt Defense Frontend

This is the defense version of the HandReceipt application, deployed at `handreceipt.com/defense`.

## Project Structure

The HandReceipt application is structured as a multi-frontend application:

```
www.handreceipt.com (CloudFront Distribution)
├── / (root - frontend_login project)
│   ├── index.html           # Version selector landing page
│   └── assets/              # Login selector assets
│
├── /defense 
│   ├── index.html           # Defense app landing page
│   └── assets/              # Defense app assets
│
└── /civ 
    └── 
```

## Development

### Prerequisites
- Node.js
- npm
- AWS CLI configured with appropriate permissions

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

The development server will run at `http://localhost:3000/defense/`

## Deployment

### Infrastructure Setup
- **S3 Bucket**: `www.handreceipt.com`
  - Hosts the static files
  - Files for this project are in the `/defense` prefix

- **CloudFront Distribution**: `E3T7VX6HV95Q5O`
  - Provides CDN caching
  - SSL/TLS termination
  - Custom domain handling

### Deployment Process

1. **Build and Deploy**
   ```bash
   ./deploy.sh
   ```

   The deployment script:
   - Builds the project
   - Uploads to S3 with appropriate settings
   - Invalidates CloudFront cache

2. **File Handling**:
   - **JavaScript Files**:
     - MIME type: `application/javascript`
     - Cache duration: 1 year
     - Required for ES modules to work correctly

   - **Static Assets**:
     - Cache duration: 1 year
     - Improves loading performance

   - **HTML Files**:
     - No caching
     - Ensures immediate updates

### Configuration

- **Vite Config** (`vite.config.ts`):
  ```typescript
  export default defineConfig({
    base: '/defense/',  // Required for correct asset paths
    // ... other config
  });
  ```

- **AWS Configuration**:
  - Ensure your AWS CLI is configured with appropriate permissions:
    - S3 bucket access
    - CloudFront invalidation permissions

## Troubleshooting

### Common Issues

1. **MIME Type Errors**:
   - Error: "Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of 'text/html'"
   - Solution: Ensure JavaScript files are being served with `application/javascript` MIME type

2. **404 Errors**:
   - Check that assets are being uploaded to the correct S3 prefix (`/defense/`)
   - Verify CloudFront cache invalidation has completed

3. **Asset Loading Issues**:
   - Verify the `base` path in `vite.config.ts` is set to `/defense/`
   - Check network requests in browser dev tools

## Development Guidelines

1. **Path Handling**:
   - Always use relative paths in components
   - The `base` config in Vite handles the `/defense/` prefix

2. **Asset Organization**:
   - Place all static assets in the `public` directory
   - Use the `src/assets` directory for imported assets

3. **Deployment Best Practices**:
   - Always test builds locally before deploying
   - Monitor CloudFront invalidation status
   - Check browser network tab for MIME type issues

## Security Considerations

1. **S3 Bucket**:
   - Configured for static website hosting
   - Public read-only access
   - Write access restricted to authenticated users

2. **CloudFront**:
   - SSL/TLS encryption
   - Edge location caching
   - Custom domain configuration

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Create a pull request

## License

[Your License Here] 