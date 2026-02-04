import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  deleteProject,
  downloadProject
} from '../controllers/project.controller';

const router = Router();

// GET /api/projects - Get all projects
router.get('/', getProjects);

// GET /api/projects/:id - Get project by ID
router.get('/:id', getProjectById);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', deleteProject);

// GET /api/projects/:id/download - Download project ZIP
router.get('/:id/download', downloadProject);

export { router as projectRoutes };
