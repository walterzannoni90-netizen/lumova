import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Folder,
  FileCode,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  Download,
  FileJson,
  FileType,
  File as FileIcon,
} from 'lucide-react';
import { projectsApi } from '../services/api';
import { Project, GeneratedFile } from '../types';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  content?: string;
  language?: string;
}

function buildFileTree(files: GeneratedFile[]): FileNode[] {
  const root: FileNode[] = [];
  const map = new Map<string, FileNode>();

  files.forEach((file) => {
    const parts = file.path.split('/');
    let currentPath = '';

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (!map.has(currentPath)) {
        const node: FileNode = {
          name: part,
          path: currentPath,
          type: isLast ? 'file' : 'directory',
          children: isLast ? undefined : [],
          content: isLast ? file.content : undefined,
          language: isLast ? file.language : undefined,
        };

        map.set(currentPath, node);

        if (index === 0) {
          root.push(node);
        } else {
          const parentPath = parts.slice(0, index).join('/');
          const parent = map.get(parentPath);
          if (parent && parent.children) {
            parent.children.push(node);
          }
        }
      }
    });
  });

  return root;
}

function getFileIcon(filename: string) {
  if (filename.endsWith('.json')) return <FileJson className="w-4 h-4 text-yellow-400" />;
  if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return <FileType className="w-4 h-4 text-blue-400" />;
  if (filename.endsWith('.js') || filename.endsWith('.jsx')) return <FileType className="w-4 h-4 text-yellow-400" />;
  if (filename.endsWith('.css') || filename.endsWith('.scss')) return <FileType className="w-4 h-4 text-pink-400" />;
  if (filename.endsWith('.html')) return <FileType className="w-4 h-4 text-orange-400" />;
  if (filename.endsWith('.md')) return <FileType className="w-4 h-4 text-white" />;
  return <FileIcon className="w-4 h-4 text-slate-400" />;
}

function FileTreeItem({
  node,
  level,
  selectedFile,
  onSelect,
  expandedDirs,
  onToggleDir,
}: {
  node: FileNode;
  level: number;
  selectedFile: string | null;
  onSelect: (node: FileNode) => void;
  expandedDirs: Set<string>;
  onToggleDir: (path: string) => void;
}) {
  const isExpanded = expandedDirs.has(node.path);
  const isSelected = selectedFile === node.path;

  if (node.type === 'directory') {
    return (
      <div>
        <button
          onClick={() => onToggleDir(node.path)}
          className="file-tree-item w-full"
          style={{ paddingLeft: `${level * 12 + 12}px` }}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <Folder className="w-4 h-4 text-primary-400" />
          <span>{node.name}</span>
        </button>
        {isExpanded && node.children && (
          <div>
            {node.children.map((child) => (
              <FileTreeItem
                key={child.path}
                node={child}
                level={level + 1}
                selectedFile={selectedFile}
                onSelect={onSelect}
                expandedDirs={expandedDirs}
                onToggleDir={onToggleDir}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(node)}
      className={`file-tree-item w-full ${isSelected ? 'active' : ''}`}
      style={{ paddingLeft: `${level * 12 + 24}px` }}
    >
      {getFileIcon(node.name)}
      <span className="truncate">{node.name}</span>
    </button>
  );
}

export function CodePreviewPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(['frontend', 'backend']));
  const [copied, setCopied] = useState(false);
  const [fileTree, setFileTree] = useState<FileNode[]>([]);

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
        if (response.data.files) {
          const tree = buildFileTree(response.data.files);
          setFileTree(tree);
          // Select first file
          const firstFile = response.data.files[0];
          if (firstFile) {
            setSelectedFile({
              name: firstFile.path.split('/').pop() || '',
              path: firstFile.path,
              type: 'file',
              content: firstFile.content,
              language: firstFile.language,
            });
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDir = (path: string) => {
    setExpandedDirs((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const handleCopy = async () => {
    if (selectedFile?.content) {
      await navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (id) {
      projectsApi.download(id);
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
        <h2 className="text-xl font-semibold text-white mb-2">Project not found</h2>
        <Link to="/dashboard/projects" className="btn-primary mt-4">
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
            to={`/dashboard/projects/${id}`}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {project.name}
            </h1>
            <p className="text-slate-400 mt-1">Source Code Preview</p>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="btn-primary flex items-center gap-2 self-start"
        >
          <Download className="w-5 h-5" />
          Download ZIP
        </button>
      </div>

      {/* Code Viewer */}
      <div className="card p-0 overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
        <div className="flex h-full">
          {/* File Tree */}
          <div className="w-64 border-r border-slate-700/50 overflow-auto">
            <div className="p-3 border-b border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400">Files</h3>
            </div>
            <div className="py-2">
              {fileTree.map((node) => (
                <FileTreeItem
                  key={node.path}
                  node={node}
                  level={0}
                  selectedFile={selectedFile?.path || null}
                  onSelect={setSelectedFile}
                  expandedDirs={expandedDirs}
                  onToggleDir={toggleDir}
                />
              ))}
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {selectedFile ? (
              <>
                {/* File Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-dark-800">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-primary-400" />
                    <span className="text-sm text-white font-mono">
                      {selectedFile.path}
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Code */}
                <div className="flex-1 overflow-auto bg-dark-950">
                  <pre className="p-4 text-sm font-mono">
                    <code className="text-slate-300">
                      {selectedFile.content}
                    </code>
                  </pre>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <FileCode className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Select a file to view its contents</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
