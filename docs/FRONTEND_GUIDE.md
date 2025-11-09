# P402 Frontend - Setup and Usage Guide

## 🎯 Overview

P402's modern Vue 3-based frontend interface has been successfully created! Features:

- ✅ **Wallet Authentication**: Login with MetaMask
- ✅ **API Management**: Add, edit, delete APIs
- ✅ **Usage Statistics**: Track with dashboard
- ✅ **Modern Design**: Black-orange one-pager interface
- ✅ **Responsive**: Mobile-friendly design

## 🚀 Quick Start

### 1. Running the Frontend

```bash
cd frontend
npm run dev
```

The frontend will run at: **http://localhost:5173**

### 2. Running the Backend

In another terminal:

```bash
# In the main directory
npm run dev
```

The backend will run at: **http://localhost:8787**

### 3. Connecting with MetaMask

1. Open the MetaMask extension in your browser
2. Click the "Connect Wallet" button on the frontend
3. Approve the connection in MetaMask
4. You'll be automatically redirected to the dashboard

## 📋 Usage Steps

### Adding an API

1. Click the **"+ Add New API"** button on the dashboard
2. Fill out the form:
   - **API Name**: Name of your API (e.g., "Weather API")
   - **Description**: Description
   - **Target URL**: Target API URL (e.g., "https://api.openweathermap.org")
   - **Price**: Price (e.g., "$0.001")
   - **Network**: Blockchain network (Ethereum, Polygon, Solana, Base, Arbitrum)
3. Click the **"Create"** button

### Editing an API

1. Click the **"Edit"** button on the API card
2. Make your changes
3. Click the **"Update"** button

### Deleting an API

1. Click the **"Delete"** button on the API card
2. Confirm the deletion message

### Activating/Deactivating an API

- Click the **toggle switch** in the top right corner of the API card
- Green = Active, Gray = Inactive

### Copying the Proxy URL

- Click the **proxy URL** on the API card
- The URL will be automatically copied to the clipboard

## 🎨 Design Features

- **Primary Color**: Orange (#ff6b00)
- **Background**: Black (#0a0a0a)
- **Typography**: Modern, readable fonts
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Works on all devices

## 🔧 Technical Details

### Technologies

- **Vue 3**: Modern Vue with Composition API
- **TypeScript**: Type safety
- **Vite**: Fast development
- **Pinia**: State management
- **Ethers.js**: Web3 wallet integration
- **Axios**: HTTP client

### Project Structure

\`\`\`
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── router/         # Vue Router configuration
│   ├── services/       # API service layer
│   ├── stores/         # Pinia state stores
│   ├── types/          # TypeScript type definitions
│   ├── views/          # Page components
│   │   └── Home.vue    # Main one-pager page
│   ├── App.vue         # Root component
│   └── main.ts         # Application entry point
├── .env                # Environment variables
└── package.json        # Dependencies
\`\`\`

### State Management (Pinia)

**Auth Store** (\`stores/auth.ts\`):
- \`address\`: User's wallet address
- \`isConnected\`: Connection status
- \`connectWallet()\`: Connect wallet
- \`disconnectWallet()\`: Disconnect
- \`checkConnection()\`: Check current connection

### API Service (\`services/api.ts\`)

- \`getAllApis()\`: Get all APIs
- \`getUserApis(address)\`: Get user's APIs
- \`registerApi(data)\`: Register new API
- \`updateApi(id, data)\`: Update API
- \`deleteApi(id)\`: Delete API
- \`toggleApiStatus(id, status)\`: Toggle API status

## 🔐 Security

- Wallet-based authentication (no passwords!)
- Client-side state management
- Secure CORS configuration
- No sensitive data storage

## 📱 Responsive Breakpoints

- **Desktop**: 1920px+
- **Laptop**: 1440px - 1920px
- **Tablet**: 768px - 1440px
- **Mobile**: 375px - 768px

## �� Troubleshooting

### MetaMask Not Detected

**Problem**: "MetaMask not installed" error
**Solution**: Install and enable the MetaMask extension

### CORS Error

**Problem**: API requests are failing
**Solution**: Make sure the backend is running and CORS is properly configured

### Connection Lost

**Problem**: Wallet connection was lost
**Solution**: Refresh the page, it will automatically reconnect

### API Not Updating

**Problem**: Changes are not reflected
**Solution**: Clear browser cache or do a hard refresh (Cmd+Shift+R)

## 🚀 Production Build

### Creating a Build

\`\`\`bash
cd frontend
npm run build
\`\`\`

Build files will be created in the \`dist/\` folder.

### Preview

\`\`\`bash
npm run preview
\`\`\`

### Deploy

You can deploy to platforms like Cloudflare Pages, Vercel, Netlify:

\`\`\`bash
# For Cloudflare Pages
npx wrangler pages deploy dist

# For Vercel
npx vercel --prod

# For Netlify
npx netlify deploy --prod
\`\`\`

## 🔄 Backend Integration

The frontend communicates with the backend through these endpoints:

- \`GET /manage/apis\` - List all APIs
- \`GET /manage/my-apis/:address\` - List user's APIs
- \`POST /manage/register\` - Register new API
- \`PUT /manage/apis/:id\` - Update API
- \`DELETE /manage/apis/:id\` - Delete API

Set the environment variable in the \`.env\` file:

\`\`\`env
VITE_API_URL=http://localhost:8787
\`\`\`

## 📊 Dashboard Statistics

The dashboard displays these metrics:

- **Total APIs**: Total number of registered APIs
- **Active APIs**: Number of active APIs
- **Total Revenue**: Total revenue (currently mock data)
- **Total Requests**: Total number of requests (currently mock data)

> **Note**: A tracking system needs to be set up in the backend for usage statistics.

## 🎯 Future Improvements

- [ ] Real-time usage analytics
- [ ] Payment history page
- [ ] API documentation generator
- [ ] Rate limiting settings
- [ ] Custom domain support
- [ ] Team collaboration
- [ ] Webhook notifications

## 📄 License

MIT License

---

**Need help?** Feel free to ask questions on GitHub Issues.

**Want to contribute?** Pull requests are welcome! 🎉
