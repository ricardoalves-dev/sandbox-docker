import type { Request, NextFunction, Response } from "express";
import { HttpStatus } from "../types/http-status.js";
import { uptime } from "node:process";

export class HealthController {
  static health(_req: Request, res: Response, _next: NextFunction) {
    res.status(HttpStatus.OK).send({
      status: 'OK',
      uptimeInSeconds: Math.floor(uptime()),
      currentTime: new Date().toLocaleString(),
    });
  }
}