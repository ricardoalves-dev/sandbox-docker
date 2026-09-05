import express from 'express';
import { HealthController } from '../controllers/health-controller.js';

export const healthRouter = express.Router();
healthRouter.get('/health', (req, res, next) => HealthController.health(req, res, next));