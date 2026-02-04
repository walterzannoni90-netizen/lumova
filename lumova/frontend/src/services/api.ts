import { Project, GenerateRequest, ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error || 'Something went wrong'
    );
  }

  return data;
}

// Projects API
export const projectsApi = {
  getAll: () => fetchApi<ApiResponse<Project[]>>('/projects'),
  
  getById: (id: string) => fetchApi<ApiResponse<Project>>(`/projects/${id}`),
  
  delete: (id: string) =>
    fetchApi<ApiResponse<void>>(`/projects/${id}`, {
      method: 'DELETE',
    }),
  
  download: (id: string) => {
    window.open(`${API_URL}/projects/${id}/download`, '_blank');
  },
};

// Generation API
export const generateApi = {
  generate: (data: GenerateRequest) =>
    fetchApi<ApiResponse<{ projectId: string; estimatedTime: number }>>('/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  regenerate: (id: string) =>
    fetchApi<ApiResponse<{ projectId: string; estimatedTime: number }>>(
      `/generate/${id}/regenerate`,
      {
        method: 'POST',
      }
    ),
};

// Health check
export const healthApi = {
  check: () => fetchApi<{ status: string; timestamp: string }>('/health'),
};

export { ApiError };
