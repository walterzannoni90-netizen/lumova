import { Request, Response, NextFunction } from 'express';
import { projectService } from '../services/project.service';
import { createError } from '../middleware/errorHandler';

export const getProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects = projectService.getAll();
    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (
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

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = projectService.delete(id);

    if (!deleted) {
      throw createError('Project not found', 404);
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const downloadProject = async (
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

    if (project.status !== 'completed') {
      throw createError('Project is not ready for download', 400);
    }

    // In production, this would generate and stream a ZIP file
    const zipBuffer = await projectService.generateZip(id);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${project.name}.zip"`);
    res.send(zipBuffer);
  } catch (error) {
    next(error);
  }
};
