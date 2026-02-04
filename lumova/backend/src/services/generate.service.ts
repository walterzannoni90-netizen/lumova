import { Project, GeneratedFile, GenerateRequest } from '../types';
import { projectService } from './project.service';

class GenerateService {
  async generate(project: Project): Promise<void> {
    try {
      console.log(`[Generate] Starting generation for project: ${project.id}`);

      // Simulate AI generation process
      await this.simulateGeneration(project);

      // Generate files based on project configuration
      const files = this.generateFiles(project);

      // Update project with generated files
      projectService.updateFiles(project.id, files);
      projectService.updateStatus(project.id, 'completed');

      console.log(`[Generate] Completed generation for project: ${project.id}`);
    } catch (error) {
      console.error(`[Generate] Failed for project: ${project.id}`, error);
      projectService.updateStatus(project.id, 'failed');
      throw error;
    }
  }

  private async simulateGeneration(project: Project): Promise<void> {
    // Simulate processing time based on complexity
    const complexity = this.calculateComplexity(project);
    const delay = Math.min(5000 + complexity * 500, 15000);

    console.log(`[Generate] Estimated time: ${delay}ms`);

    // Simulate progress updates
    const steps = 5;
    for (let i = 1; i <= steps; i++) {
      await this.sleep(delay / steps);
      console.log(`[Generate] Progress: ${(i / steps) * 100}%`);
    }
  }

  private calculateComplexity(project: Project): number {
    let complexity = 1;
    if (project.features.auth) complexity += 2;
    if (project.features.crud) complexity += 2;
    if (project.features.payments) complexity += 3;
    if (project.features.database) complexity += 2;
    if (project.features.api) complexity += 1;
    return complexity;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateFiles(project: Project): GeneratedFile[] {
    const files: GeneratedFile[] = [];

    // Generate based on stack
    switch (project.stack) {
      case 'react-node':
        files.push(...this.generateReactNodeFiles(project));
        break;
      case 'react-express':
        files.push(...this.generateReactExpressFiles(project));
        break;
      case 'next-node':
        files.push(...this.generateNextNodeFiles(project));
        break;
    }

    return files;
  }

  private generateReactNodeFiles(project: Project): GeneratedFile[] {
    const files: GeneratedFile[] = [
      {
        path: 'frontend/package.json',
        content: this.generateFrontendPackageJson(project),
        language: 'json'
      },
      {
        path: 'frontend/src/App.tsx',
        content: this.generateAppTsx(project),
        language: 'tsx'
      },
      {
        path: 'frontend/src/main.tsx',
        content: this.generateMainTsx(),
        language: 'tsx'
      },
      {
        path: 'frontend/index.html',
        content: this.generateIndexHtml(project),
        language: 'html'
      },
      {
        path: 'backend/package.json',
        content: this.generateBackendPackageJson(project),
        language: 'json'
      },
      {
        path: 'backend/server.js',
        content: this.generateBackendServer(project),
        language: 'javascript'
      },
      {
        path: 'README.md',
        content: this.generateReadme(project),
        language: 'markdown'
      }
    ];

    if (project.features.auth) {
      files.push({
        path: 'backend/routes/auth.js',
        content: this.generateAuthRoutes(),
        language: 'javascript'
      });
      files.push({
        path: 'frontend/src/components/Login.tsx',
        content: this.generateLoginComponent(),
        language: 'tsx'
      });
    }

    if (project.features.crud) {
      files.push({
        path: 'backend/routes/api.js',
        content: this.generateApiRoutes(),
        language: 'javascript'
      });
      files.push({
        path: 'frontend/src/components/Dashboard.tsx',
        content: this.generateDashboardComponent(),
        language: 'tsx'
      });
    }

    if (project.features.database) {
      files.push({
        path: 'backend/models/index.js',
        content: this.generateDatabaseModels(),
        language: 'javascript'
      });
    }

    return files;
  }

  private generateReactExpressFiles(project: Project): GeneratedFile[] {
    // Similar to react-node but with Express-specific configurations
    return this.generateReactNodeFiles(project);
  }

  private generateNextNodeFiles(project: Project): GeneratedFile[] {
    const files = this.generateReactNodeFiles(project);
    // Add Next.js specific files
    files.push({
      path: 'frontend/next.config.js',
      content: '/** @type {import("next").NextConfig} */\nconst nextConfig = {\n  reactStrictMode: true,\n}\n\nmodule.exports = nextConfig',
      language: 'javascript'
    });
    return files;
  }

  // Template generators
  private generateFrontendPackageJson(project: Project): string {
    const dependencies: Record<string, string> = {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.20.0'
    };

    if (project.features.auth) {
      dependencies['@auth0/auth0-react'] = '^2.2.0';
    }

    if (project.features.payments) {
      dependencies['@stripe/stripe-js'] = '^2.2.0';
      dependencies['@stripe/react-stripe-js'] = '^2.4.0';
    }

    return JSON.stringify({
      name: project.name.toLowerCase().replace(/\s+/g, '-'),
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
        preview: 'vite preview'
      },
      dependencies,
      devDependencies: {
        '@types/react': '^18.2.43',
        '@types/react-dom': '^18.2.17',
        '@typescript-eslint/eslint-plugin': '^6.14.0',
        '@typescript-eslint/parser': '^6.14.0',
        '@vitejs/plugin-react': '^4.2.1',
        autoprefixer: '^10.4.16',
        eslint: '^8.55.0',
        'eslint-plugin-react-hooks': '^4.6.0',
        'eslint-plugin-react-refresh': '^0.4.5',
        postcss: '^8.4.32',
        tailwindcss: '^3.4.0',
        typescript: '^5.2.2',
        vite: '^5.0.8'
      }
    }, null, 2);
  }

  private generateBackendPackageJson(project: Project): string {
    const dependencies: Record<string, string> = {
      express: '^4.18.2',
      cors: '^2.8.5',
      dotenv: '^16.3.1',
      helmet: '^7.1.0',
      morgan: '^1.10.0'
    };

    if (project.features.auth) {
      dependencies['jsonwebtoken'] = '^9.0.2';
      dependencies['bcryptjs'] = '^2.4.3';
    }

    if (project.features.database) {
      dependencies['mongoose'] = '^8.0.0';
    }

    if (project.features.payments) {
      dependencies['stripe'] = '^14.0.0';
    }

    return JSON.stringify({
      name: `${project.name.toLowerCase().replace(/\s+/g, '-')}-backend`,
      version: '1.0.0',
      type: 'module',
      scripts: {
        start: 'node server.js',
        dev: 'nodemon server.js'
      },
      dependencies,
      devDependencies: {
        nodemon: '^3.0.2'
      }
    }, null, 2);
  }

  private generateAppTsx(project: Project): string {
    let imports = "import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\n";
    let routes = '';

    if (project.features.auth) {
      imports += "import Login from './components/Login';\n";
      routes += "        <Route path='/login' element={<Login />} />\n";
    }

    if (project.features.crud) {
      imports += "import Dashboard from './components/Dashboard';\n";
      routes += "        <Route path='/dashboard' element={<Dashboard />} />\n";
    }

    return `${imports}
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
${routes}        </Routes>
      </div>
    </Router>
  );
}

export default App;
`;
  }

  private generateMainTsx(): string {
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`;
  }

  private generateIndexHtml(project: Project): string {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${project.name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
  }

  private generateBackendServer(project: Project): string {
    let middleware = '';
    let routes = '';

    if (project.features.auth) {
      routes += "app.use('/api/auth', authRoutes);\n";
    }

    if (project.features.crud) {
      routes += "app.use('/api', apiRoutes);\n";
    }

    return `import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
${project.features.auth ? "import authRoutes from './routes/auth.js';" : ''}
${project.features.crud ? "import apiRoutes from './routes/api.js';" : ''}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

${routes}
// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;
  }

  private generateReadme(project: Project): string {
    return `# ${project.name}

${project.description}

## Generated by LUMOVA

## Features

${project.features.auth ? '- ✅ Authentication' : '- ❌ Authentication'}
${project.features.crud ? '- ✅ CRUD Operations' : '- ❌ CRUD Operations'}
${project.features.payments ? '- ✅ Payments' : '- ❌ Payments'}
${project.features.database ? '- ✅ Database' : '- ❌ Database'}
${project.features.api ? '- ✅ API' : '- ❌ API'}

## Getting Started

### Frontend

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### Backend

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

## Deployment

- Frontend: Deploy to Vercel or Netlify
- Backend: Deploy to Render, Railway, or Heroku
`;
  }

  private generateAuthRoutes(): string {
    return `import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Mock user database (replace with real database)
const users = [];

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), email, password: hashedPassword };
    users.push(user);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
`;
  }

  private generateApiRoutes(): string {
    return `import express from 'express';

const router = express.Router();

// Mock data store
const items = [];

// GET all items
router.get('/items', (req, res) => {
  res.json(items);
});

// GET single item
router.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// CREATE item
router.post('/items', (req, res) => {
  const item = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  items.push(item);
  res.status(201).json(item);
});

// UPDATE item
router.put('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  
  items[index] = { ...items[index], ...req.body, updatedAt: new Date().toISOString() };
  res.json(items[index]);
});

// DELETE item
router.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  
  items.splice(index, 1);
  res.status(204).send();
});

export default router;
`;
  }

  private generateLoginComponent(): string {
    return `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
`;
  }

  private generateDashboardComponent(): string {
    return `import { useState, useEffect } from 'react';

interface Item {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      
      if (response.ok) {
        setNewItem({ title: '', description: '' });
        fetchItems();
      }
    } catch (error) {
      console.error('Failed to create item');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(\`/api/items/\${id}\`, { method: 'DELETE' });
      fetchItems();
    } catch (error) {
      console.error('Failed to delete item');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            <textarea
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Item
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
`;
  }

  private generateDatabaseModels(): string {
    return `import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
export const Item = mongoose.model('Item', itemSchema);
`;
  }
}

export const generateService = new GenerateService();
