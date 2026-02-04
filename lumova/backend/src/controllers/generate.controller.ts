import { Request, Response, NextFunction } from 'express';
import { generateService } from '../services/generate.service';
import { projectService } from '../services/project.service';
import { createError } from '../middleware/errorHandler';
import { GenerateRequest } from '../types';

export const generateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data: GenerateRequest = req.body;

    // Create project record
    const project = projectService.create(data);

    // Start generation process (async)
    generateService.generate(project).catch(console.error);

    res.status(202).json({
      success: true,
      projectId: project.id,
      message: 'Project generation started',
      estimatedTime: 30 // seconds
    });
  } catch (error) {
    next(error);
  }
};

export const regenerateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const project = projectService.getById(id);

    if (!project) {
      throw createError('Project not found', 404);
    }

    // Reset project status
    projectService.updateStatus(id, 'generating');

    // Start regeneration
    generateService.generate(project).catch(console.error);

    res.json({
      success: true,
      projectId: id,
      message: 'Project regeneration started',
      estimatedTime: 30
    });
  } catch (error) {
    next(error);
  }
};
