import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  FolderOpen,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Code2,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { projectsApi } from '../services/api';

const quickActions = [
  {
    title: 'Create New Project',
    description: 'Generate a new app with AI',
    icon: Plus,
    path: '/dashboard/projects/new',
    color: 'from-primary-500 to-primary-600',
  },
  {
    title: 'View Projects',
    description: 'Manage your generated apps',
    icon: FolderOpen,
    path: '/dashboard/projects',
    color: 'from-purple-500 to-purple-600',
  },
];

const recentActivity = [
  { action: 'Project generated', project: 'E-commerce API', time: '2 hours ago', status: 'success' },
  { action: 'Project created', project: 'Blog Platform', time: '5 hours ago', status: 'pending' },
  { action: 'Downloaded ZIP', project: 'Task Manager', time: '1 day ago', status: 'success' },
];

export function DashboardPage() {
  const { projects, setProjects, user } = useStore();

  useEffect(() => {
    // Fetch projects on mount
    const fetchProjects = async () => {
      try {
        const response = await projectsApi.getAll();
        if (response.success && response.data) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, [setProjects]);

  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const generatingProjects = projects.filter((p) => p.status === 'generating').length;

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderOpen, color: 'text-primary-400' },
    { label: 'Completed', value: completedProjects, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Generating', value: generatingProjects, icon: Zap, color: 'text-yellow-400' },
    { label: 'This Month', value: projects.filter(p => new Date(p.createdAt).getMonth() === new Date().getMonth()).length, icon: TrendingUp, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {user?.name || 'Developer'}!
          </h1>
          <p className="text-slate-400 mt-1">
            Here's what's happening with your projects
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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center gap-3">
              <div className={`p-3 bg-dark-700 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.path}
              className="card group hover:border-primary-500/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">{action.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
            <Link
              to="/dashboard/projects"
              className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="card text-center py-12">
              <div className="w-16 h-16 bg-primary-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No projects yet</h3>
              <p className="text-slate-400 mb-6">Create your first project to get started</p>
              <Link to="/dashboard/projects/new" className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Project
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <Link
                  key={project.id}
                  to={`/dashboard/projects/${project.id}`}
                  className="card group hover:border-primary-500/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center">
                        <Code2 className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white group-hover:text-primary-400 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-slate-400 line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`status-badge ${project.status}`}
                      >
                        {project.status}
                      </span>
                      <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="card space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-4 border-b border-slate-700/50 last:border-0 last:pb-0"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.status === 'success'
                      ? 'bg-green-500/20'
                      : activity.status === 'pending'
                      ? 'bg-yellow-500/20'
                      : 'bg-blue-500/20'
                  }`}
                >
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : activity.status === 'pending' ? (
                    <Clock className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Zap className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-sm text-primary-400">{activity.project}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips Card */}
          <div className="card mt-4 bg-gradient-to-br from-primary-600/10 to-purple-600/10 border-primary-500/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Pro Tip</h3>
                <p className="text-sm text-slate-400">
                  Be specific in your project description for better results. Include key features and target audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
