# P402 Frontend

Modern, one-page Vue 3 + TypeScript frontend for P402 - The Blockchain-Powered Pay-Per-Use API Gateway.

## 🎨 Features

- **Wallet Authentication**: Connect with MetaMask or other Web3 wallets
- **API Management**: Create, update, delete, and monitor your APIs
- **Real-time Dashboard**: View usage statistics and revenue
- **Modern UI**: Dark theme with orange accents, fully responsive
- **One-Page Design**: Smooth, intuitive single-page experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask browser extension

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🔧 Configuration

Update `.env` file:

```env
VITE_API_URL=http://localhost:8787
```

For production, update `.env.production`:

```env
VITE_API_URL=https://your-api.workers.dev
```

## 📦 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Pinia** - State management
- **Vue Router** - Routing
- **Ethers.js** - Web3 wallet integration
- **Axios** - HTTP client

## 🎯 Usage

1. **Connect Wallet**: Click "Connect Wallet" to authenticate with MetaMask
2. **Add API**: Click "Add New API" to register your API endpoint
3. **Configure**: Set name, description, target URL, price, and network
4. **Monitor**: View your APIs and statistics in the dashboard
5. **Manage**: Toggle API status, edit details, or delete APIs

