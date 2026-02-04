import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Check,
  Code2,
  Database,
  CreditCard,
  Shield,
  Server,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { generateApi } from '../services/api';
import { StackType, ProjectFeatures } from '../types';

const stacks: { value: StackType; label: string; description: string }[] = [
  {
    value: 'react-node',
    label: 'React + Node.js',
    description: 'Classic full-stack with React frontend and Node.js backend',
  },
  {
    value: 'react-express',
    label: 'React + Express',
    description: 'React frontend with lightweight Express backend',
  },
  {
    value: 'next-node',
    label: 'Next.js + Node.js',
    description: 'Full-stack Next.js with API routes and Node.js server',
  },
];

const featuresList: {
  key: keyof ProjectFeatures;
  label: string;
  description: string;
  icon: typeof Shield;
}[] = [
  {
    key: 'auth',
    label: 'Authentication',
    description: 'JWT-based auth with login, register, and protected routes',
    icon: Shield,
  },
  {
    key: 'crud',
    label: 'CRUD Operations',
    description: 'Create, read, update, delete API endpoints and UI components',
    icon: Code2,
  },
  {
    key: 'database',
    label: 'Database',
    description: 'MongoDB/Mongoose integration with models and connections',
    icon: Database,
  },
  {
    key: 'payments',
    label: 'Payments',
    description: 'Stripe integration for subscriptions and one-time payments',
    icon: CreditCard,
  },
  {
    key: 'api',
    label: 'REST API',
    description: 'Complete REST API with error handling and validation',
    icon: Server,
  },
];

export function CreateProjectPage() {
  const navigate = useNavigate();
  const { addProject, setIsGenerating, setGenerationProgress } = useStore();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stack, setStack] = useState<StackType>('react-node');
  const [features, setFeatures] = useState<ProjectFeatures>({
    auth: true,
    crud: true,
    database: false,
    payments: false,
    api: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const toggleFeature = (key: keyof ProjectFeatures) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setIsGenerating(true);

    try {
      const response = await generateApi.generate({
        name,
        description,
        stack,
        features,
      });

      if (response.success && response.data) {
        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setGenerationProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
          }
        }, response.data.estimatedTime * 10);

        // Navigate to project detail
        navigate(`/dashboard/projects/${response.data.projectId}`);
      } else {
        setError(response.error || 'Failed to generate project');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard/projects"
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Create New Project
          </h1>
          <p className="text-slate-400 mt-1">
            Describe your app and let AI do the rest
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Details */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-6">
            Project Details
          </h2>
          <div className="space-y-6">
            <div>
              <label className="form-label">Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome App"
                className="form-input"
                required
                maxLength={100}
              />
              <p className="text-sm text-slate-500 mt-2">
                Give your project a clear, descriptive name
              </p>
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what your app does, its main features, and target audience..."
                className="form-input min-h-[120px] resize-none"
                required
                minLength={10}
                maxLength={2000}
              />
              <p className="text-sm text-slate-500 mt-2">
                Be specific about features, user flows, and any special requirements
              </p>
            </div>
          </div>
        </div>

        {/* Stack Selection */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-6">
            Technology Stack
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {stacks.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStack(s.value)}
                className={`
                  relative p-6 rounded-xl border-2 text-left transition-all
                  ${stack === s.value
                    ? 'border-primary-500 bg-primary-600/10'
                    : 'border-slate-700 hover:border-slate-600'}
                `}
              >
                {stack === s.value && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <h3 className="font-semibold text-white mb-2">{s.label}</h3>
                <p className="text-sm text-slate-400">{s.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Features Selection */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-6">
            Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuresList.map((feature) => (
              <button
                key={feature.key}
                type="button"
                onClick={() => toggleFeature(feature.key)}
                className={`
                  relative p-4 rounded-xl border-2 text-left transition-all flex items-start gap-4
                  ${features[feature.key]
                    ? 'border-primary-500 bg-primary-600/10'
                    : 'border-slate-700 hover:border-slate-600'}
                `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                    ${features[feature.key]
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-700 text-slate-400'}
                  `}
                >
                  <feature.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{feature.label}</h3>
                    {features[feature.key] && (
                      <Check className="w-4 h-4 text-primary-400" />
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    {feature.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard/projects"
            className="btn-secondary"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || !name || !description}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
