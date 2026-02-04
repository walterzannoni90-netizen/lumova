import { Router } from 'express';
import { z } from 'zod';
import { generateProject, regenerateProject } from '../controllers/generate.controller';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

const generateSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  stack: z.enum(['react-node', 'react-express', 'next-node']),
  features: z.object({
    auth: z.boolean(),
    crud: z.boolean(),
    payments: z.boolean(),
    database: z.boolean(),
    api: z.boolean()
  })
});

// POST /api/generate - Generate new project
router.post('/', validateRequest(generateSchema), generateProject);

// POST /api/generate/:id/regenerate - Regenerate existing project
router.post('/:id/regenerate', regenerateProject);

export { router as generateRoutes };
