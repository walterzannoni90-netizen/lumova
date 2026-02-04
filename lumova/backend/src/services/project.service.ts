import { v4 as uuidv4 } from 'uuid';
import { Project, GenerateRequest, ProjectStatus, GeneratedFile } from '../types';

// In-memory storage (replace with database in production)
const projects: Map<string, Project> = new Map();

class ProjectService {
  create(data: GenerateRequest): Project {
    const now = new Date().toISOString();
    const project: Project = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      stack: data.stack,
      features: data.features,
      status: 'generating',
      createdAt: now,
      updatedAt: now
    };

    projects.set(project.id, project);
    return project;
  }

  getAll(): Project[] {
    return Array.from(projects.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getById(id: string): Project | undefined {
    return projects.get(id);
  }

  updateStatus(id: string, status: ProjectStatus): Project | undefined {
    const project = projects.get(id);
    if (project) {
      project.status = status;
      project.updatedAt = new Date().toISOString();
      projects.set(id, project);
    }
    return project;
  }

  updateFiles(id: string, files: GeneratedFile[]): Project | undefined {
    const project = projects.get(id);
    if (project) {
      project.files = files;
      project.updatedAt = new Date().toISOString();
      projects.set(id, project);
    }
    return project;
  }

  delete(id: string): boolean {
    return projects.delete(id);
  }

  // Mock ZIP generation - returns a buffer
  async generateZip(id: string): Promise<Buffer> {
    const project = projects.get(id);
    if (!project) {
      throw new Error('Project not found');
    }

    // In production, this would create an actual ZIP file
    // For now, return a mock buffer
    const mockZipContent = this.createMockZip(project);
    return Buffer.from(mockZipContent);
  }

  private createMockZip(project: Project): string {
    // This is a mock implementation
    // In production, use a library like 'archiver' or 'jszip'
    return `PK${project.id}-mock-zip-content`;
  }
}

export const projectService = new ProjectService();
