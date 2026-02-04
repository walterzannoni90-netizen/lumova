# LUMOVA - AI-Powered Web App Generator

<p align="center">
  <img src="https://via.placeholder.com/120x120/3b82f6/ffffff?text=L" alt="LUMOVA Logo" width="120" height="120">
</p>

<p align="center">
  <strong>Generate complete, production-ready React + Node.js applications in seconds</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#api-documentation">API</a>
</p>

---

## What is LUMOVA?

LUMOVA is an AI-powered web application generator that creates deployable **React + Node.js** projects from simple descriptions. It's designed to help developers and teams ship faster by automating the initial project setup, boilerplate code generation, and common feature implementation.

### Key Capabilities

- **Describe → Generate → Deploy**: Simply describe your app, and LUMOVA generates a complete project
- **Multiple Tech Stacks**: React + Node.js, React + Express, or Next.js + Node.js
- **Built-in Features**: Authentication, CRUD operations, database integration, payments (Stripe-ready)
- **Production Ready**: Clean, modular code following modern best practices
- **Instant Deployment**: Download as ZIP or deploy directly to Vercel, Netlify, or Render

---

## Features

### Frontend (Dashboard)
- 🎨 Modern SaaS dashboard with dark theme
- 📱 Fully responsive design
- 🔐 Authentication-ready UI (Login/Register)
- 📊 Project management interface
- 🗂️ File explorer-style code preview
- ⚡ Real-time generation status updates

### Backend (API)
- 🚀 Express.js server with TypeScript
- 🔒 Security middleware (Helmet, CORS, Rate Limiting)
- 📡 RESTful API endpoints
- 🤖 Mock AI generation service (ready for integration)
- 📦 ZIP generation for project downloads
- 🗃️ In-memory storage (easily replaceable with database)

### Generated Projects Include
- ✅ React frontend with Vite
- ✅ Node.js/Express backend
- ✅ TypeScript configuration
- ✅ Tailwind CSS styling
- ✅ JWT authentication (optional)
- ✅ MongoDB/Mongoose models (optional)
- ✅ Stripe payment integration (optional)
- ✅ CRUD API endpoints (optional)
- ✅ Complete README with deployment instructions

---

## Project Structure

```
lumova/
├── frontend/                 # React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── services/        # API services
│   │   ├── store/           # Zustand state management
│   │   ├── styles/          # CSS styles
│   │   └── types/           # TypeScript types
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                  # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/lumova.git
cd lumova
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173

# API Keys (for future AI integration)
# OPENAI_API_KEY=your_openai_key_here
# ANTHROPIC_API_KEY=your_anthropic_key_here

# JWT Secret (for future auth)
# JWT_SECRET=your_super_secret_jwt_key
# JWT_EXPIRES_IN=7d

# Database (for future persistence)
# DATABASE_URL=postgresql://user:password@localhost:5432/lumova

# Stripe (for future payments)
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...
```

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3001/api

# App Configuration
VITE_APP_NAME=LUMOVA
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_STRIPE=false
VITE_ENABLE_ANALYTICS=false
```

---

## Running Locally

### Start the Backend

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:3001`

### Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to `http://localhost:5173`

---

## Usage

### Creating a New Project

1. **Sign up or log in** to your LUMOVA account
2. Click **"New Project"** from the dashboard
3. **Enter project details**:
   - Project name
   - Description (be specific about features)
   - Select technology stack
   - Choose features (Auth, CRUD, Database, Payments, API)
4. Click **"Generate Project"**
5. Wait for generation to complete (usually 30-60 seconds)
6. **Download ZIP** or deploy directly

### Project Statuses

- **Pending**: Project is queued for generation
- **Generating**: AI is creating your project
- **Completed**: Project is ready for download/deployment
- **Failed**: Something went wrong (try regenerating)

### Downloading Projects

Once a project is completed:
1. Go to the project detail page
2. Click **"Download ZIP"**
3. Extract and run locally with `npm install && npm run dev`

---

## Deployment

### Deploy Frontend (Vercel)

```bash
cd frontend
npm run build
vercel --prod
```

### Deploy Backend (Render/Railway/Heroku)

```bash
cd backend
npm run build
# Follow platform-specific deployment instructions
```

### Environment Variables for Production

Make sure to set these in your production environment:

**Frontend:**
- `VITE_API_URL` - Your backend API URL

**Backend:**
- `PORT` - Usually set by platform
- `NODE_ENV=production`
- `FRONTEND_URL` - Your frontend URL
- `JWT_SECRET` - Strong random string
- `DATABASE_URL` - Production database connection
- `STRIPE_SECRET_KEY` - For payment processing

---

## API Documentation

### Health Check
```
GET /health
```

### Projects

#### Get All Projects
```
GET /api/projects
```

#### Get Project by ID
```
GET /api/projects/:id
```

#### Delete Project
```
DELETE /api/projects/:id
```

#### Download Project ZIP
```
GET /api/projects/:id/download
```

### Generation

#### Generate New Project
```
POST /api/generate
Content-Type: application/json

{
  "name": "My Awesome App",
  "description": "A task management app with user authentication",
  "stack": "react-node",
  "features": {
    "auth": true,
    "crud": true,
    "payments": false,
    "database": true,
    "api": true
  }
}
```

#### Regenerate Project
```
POST /api/generate/:id/regenerate
```

---

## Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Security**: Helmet, CORS, express-rate-limit
- **Validation**: Zod

### Generated Projects
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Optional**: MongoDB/Mongoose, JWT Auth, Stripe

---

## Roadmap

### Phase 1 (Current)
- [x] Basic project generation
- [x] Dashboard UI
- [x] ZIP download
- [x] Mock AI service

### Phase 2 (Coming Soon)
- [ ] Real AI integration (OpenAI/Claude)
- [ ] Database persistence
- [ ] User authentication
- [ ] Stripe subscriptions
- [ ] More templates

### Phase 3 (Future)
- [ ] Custom AI training
- [ ] Team collaboration
- [ ] CI/CD integration
- [ ] Custom component library
- [ ] Mobile app generation

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Write clean, self-documenting code
- Add comments for complex logic
- Test your changes thoroughly

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

- 📧 Email: support@lumova.dev
- 💬 Discord: [Join our community](https://discord.gg/lumova)
- 🐦 Twitter: [@lumova](https://twitter.com/lumova)
- 📖 Documentation: [docs.lumova.dev](https://docs.lumova.dev)

---

## Acknowledgments

- Built with ❤️ by the LUMOVA team
- Inspired by [Lovable](https://lovable.dev) and [v0](https://v0.dev)
- Icons by [Lucide](https://lucide.dev)

---

<p align="center">
  <strong>Built for developers, by developers</strong>
</p>

<p align="center">
  ⭐ Star us on GitHub — it motivates us a lot!
</p>
