import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

interface User {
  username: string;
  password: string;
  role: 'guest' | 'admin';
}

interface RequestWithUser extends Request {
  user: User;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // implementation code
};

export const authorize = (role: User['role']) => {
  return (req: RequestWithUser, res: Response, next: NextFunction): void => {
    // implementation code
  };
};

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
  };
};
