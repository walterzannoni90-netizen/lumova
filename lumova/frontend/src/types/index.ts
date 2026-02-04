export interface Project {
  id: string;
  name: string;
  description: string;
  stack: StackType;
  features: ProjectFeatures;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  files?: GeneratedFile[];
  downloadUrl?: string;
}

export type StackType = 'react-node' | 'react-express' | 'next-node';

export interface ProjectFeatures {
  auth: boolean;
  crud: boolean;
  payments: boolean;
  database: boolean;
  api: boolean;
}

export type ProjectStatus = 'pending' | 'generating' | 'completed' | 'failed';

export interface GeneratedFile {
  path: string;
  content: string;
  language: string;
}

export interface GenerateRequest {
  name: string;
  description: string;
  stack: StackType;
  features: ProjectFeatures;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
