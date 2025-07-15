// try catch wrapper

import { Request, Response, NextFunction } from "express";

const asyncHandler =
  <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

export default asyncHandler;
