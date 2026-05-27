import { Request, Response, NextFunction } from 'express';

export const isRole1 = async (
  req: Request,
  res: Response,
  next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user || req.user.role !== 'role1') {
      res.status(404).json({ message: "L'utente non è un role1 " });
      }
      next();
    } catch (error) {
      next(error);
    }
};

export const isRole2 = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user || req.user.role !== 'role2') {
     res.status(404).json({ message: "L'utente non è un role2" });
    }
    next();
  } catch (error) {
    next(error);
  }
};


