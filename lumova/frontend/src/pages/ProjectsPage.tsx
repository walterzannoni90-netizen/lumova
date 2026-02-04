import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Download,
  RefreshCw,
  Trash2,
  Code2,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { projectsApi } from '../services/api';
import { Project } from '../types';

const statusFilters = ['all', 'completed', 'generating', 'pending', 'failed'] as const;

export function ProjectsPage() {
  const { projects, setProjects } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<typeof statusFilters[number]>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await projectsApi.getAll();
      if (response.success && response.data) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await projectsApi.delete(id);
      setProjects(projects.filter((p) => p.id !== id));
      setDeleteModalOpen(null);
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleDownload = (id: string) => {
    projectsApi.download(id);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'generating':
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Projects</h1>
          <p className="text-slate-400 mt-1">
            Manage and deploy your generated applications
          </p>
        </div>
        <Link
          to="/dashboard/projects/new"
          className="btn-primary flex items-center gap-2 self-start"
        >
          <Plus className="w-5 h-5" />
          New Project
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="form-input pl-12 w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilters[number])}
            className="form-input w-40"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="generating">Generating</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="spinner" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="card text-center py-16">
          <div className="w-20 h-20 bg-primary-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-primary-400" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            {projects.length === 0 ? 'No projects yet' : 'No matching projects'}
          </h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            {projects.length === 0
              ? 'Create your first project to start building amazing applications'
              : 'Try adjusting your search or filter criteria'}
          </p>
          {projects.length === 0 && (
            <Link
              to="/dashboard/projects/new"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Project
            </Link>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card group hover:border-primary-500/30 transition-all flex flex-col"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-dark-700 rounded-xl flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`status-badge flex items-center gap-1 ${project.status}`}
                  >
                    {getStatusIcon(project.status)}
                    <span className="capitalize">{project.status}</span>
                  </span>
                  <div className="relative group/menu">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-dark-800 border border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10">
                      <Link
                        to={`/dashboard/projects/${project.id}`}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:bg-dark-700 hover:text-white first:rounded-t-xl"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </Link>
                      <Link
                        to={`/dashboard/projects/${project.id}/code`}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:bg-dark-700 hover:text-white"
                      >
                        <Code2 className="w-4 h-4" />
                        View Code
                      </Link>
                      {project.status === 'completed' && (
                        <button
                          onClick={() => handleDownload(project.id)}
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:bg-dark-700 hover:text-white"
                        >
                          <Download className="w-4 h-4" />
                          Download ZIP
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteModalOpen(project.id)}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 last:rounded-b-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <Link
                to={`/dashboard/projects/${project.id}`}
                className="flex-1"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                  {project.description}
                </p>
              </Link>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-700/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-slate-400 capitalize">
                    {project.stack.replace('-', ' + ')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.features.auth && (
                    <span className="px-2 py-1 text-xs bg-primary-600/20 text-primary-400 rounded">
                      Auth
                    </span>
                  )}
                  {project.features.crud && (
                    <span className="px-2 py-1 text-xs bg-green-600/20 text-green-400 rounded">
                      CRUD
                    </span>
                  )}
                  {project.features.payments && (
                    <span className="px-2 py-1 text-xs bg-purple-600/20 text-purple-400 rounded">
                      Payments
                    </span>
                  )}
                  {project.features.database && (
                    <span className="px-2 py-1 text-xs bg-yellow-600/20 text-yellow-400 rounded">
                      DB
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-dark-800 border border-slate-700 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-2">
              Delete Project
            </h3>
            <p className="text-slate-400 mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModalOpen(null)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalOpen)}
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
