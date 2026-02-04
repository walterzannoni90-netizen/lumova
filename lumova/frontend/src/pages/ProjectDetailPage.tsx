import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  RefreshCw,
  Download,
  Code2,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Folder,
  FileCode,
  Zap,
  Database,
  CreditCard,
  Shield,
  Server,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { projectsApi, generateApi } from '../services/api';
import { Project } from '../types';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setCurrentProject } = useStore();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (projectId: string) => {
    try {
      setIsLoading(true);
      const response = await projectsApi.getById(projectId);
      if (response.success && response.data) {
        setProject(response.data);
        setCurrentProject(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!id) return;
    try {
      setIsRegenerating(true);
      await generateApi.regenerate(id);
      // Refresh project after a delay
      setTimeout(() => fetchProject(id), 2000);
    } catch (error) {
      console.error('Failed to regenerate:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleDownload = () => {
    if (id) {
      projectsApi.download(id);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await projectsApi.delete(id);
      navigate('/dashboard/projects');
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'generating':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="spinner" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="card text-center py-16">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Project not found</h2>
        <p className="text-slate-400 mb-6">The project you're looking for doesn't exist</p>
        <Link to="/dashboard/projects" className="btn-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard/projects"
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {project.name}
              </h1>
              <span className={`status-badge flex items-center gap-1 ${project.status}`}>
                {getStatusIcon(project.status)}
                <span className="capitalize">{project.status}</span>
              </span>
            </div>
            <p className="text-slate-400 mt-1">
              Created {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating || project.status === 'generating'}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            {isRegenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
            Regenerate
          </button>
          {project.status === 'completed' && (
            <button
              onClick={handleDownload}
              className="btn-primary flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download ZIP
            </button>
          )}
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="card">
            <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
            <p className="text-slate-300 whitespace-pre-wrap">{project.description}</p>
          </div>

          {/* Features */}
          <div className="card">
            <h2 className="text-lg font-semibold text-white mb-4">Enabled Features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: 'auth', label: 'Authentication', icon: Shield, enabled: project.features.auth },
                { key: 'crud', label: 'CRUD Operations', icon: Zap, enabled: project.features.crud },
                { key: 'database', label: 'Database', icon: Database, enabled: project.features.database },
                { key: 'payments', label: 'Payments', icon: CreditCard, enabled: project.features.payments },
                { key: 'api', label: 'REST API', icon: Server, enabled: project.features.api },
              ].map((feature) => (
                <div
                  key={feature.key}
                  className={`flex items-center gap-3 p-4 rounded-lg ${
                    feature.enabled
                      ? 'bg-primary-600/10 border border-primary-500/30'
                      : 'bg-dark-700/50 border border-slate-700'
                  }`}
                >
                  <feature.icon
                    className={`w-5 h-5 ${
                      feature.enabled ? 'text-primary-400' : 'text-slate-500'
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      feature.enabled ? 'text-white' : 'text-slate-500'
                    }`}
                  >
                    {feature.label}
                  </span>
                  {feature.enabled && <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />}
                </div>
              ))}
            </div>
          </div>

          {/* Generated Files */}
          {project.files && project.files.length > 0 && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Generated Files</h2>
                <Link
                  to={`/dashboard/projects/${id}/code`}
                  className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
                >
                  <Code2 className="w-4 h-4" />
                  View Code
                </Link>
              </div>
              <div className="space-y-2">
                {project.files.slice(0, 10).map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-lg"
                  >
                    <FileCode className="w-4 h-4 text-primary-400" />
                    <span className="text-sm text-slate-300 font-mono">{file.path}</span>
                  </div>
                ))}
                {project.files.length > 10 && (
                  <p className="text-center text-slate-500 text-sm py-2">
                    +{project.files.length - 10} more files
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stack Info */}
          <div className="card">
            <h2 className="text-lg font-semibold text-white mb-4">Technology Stack</h2>
            <div className="flex items-center gap-3 p-4 bg-dark-700/50 rounded-lg">
              <Folder className="w-5 h-5 text-primary-400" />
              <div>
                <p className="font-medium text-white">
                  {project.stack.replace('-', ' + ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
                <p className="text-sm text-slate-400">Full-stack application</p>
              </div>
            </div>
          </div>

          {/* Deployment */}
          {project.status === 'completed' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-white mb-4">Deploy</h2>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-slate-400" />
                  <span className="text-white">Deploy to Vercel</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-slate-400" />
                  <span className="text-white">Deploy to Netlify</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-slate-400" />
                  <span className="text-white">Deploy to Render</span>
                </a>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to={`/dashboard/projects/${id}/code`}
                className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
              >
                <Code2 className="w-5 h-5 text-primary-400" />
                <span className="text-white">View Source Code</span>
              </Link>
              {project.status === 'completed' && (
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center gap-3 p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors text-left"
                >
                  <Download className="w-5 h-5 text-green-400" />
                  <span className="text-white">Download ZIP</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-dark-800 border border-slate-700 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Project</h3>
            <p className="text-slate-400 mb-6">
              Are you sure you want to delete "{project.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
