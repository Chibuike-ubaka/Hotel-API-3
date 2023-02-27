import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

function validate(schema: Joi.ObjectSchema) {
  return function(req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
  }
}

const roomTypeSchema = Joi.object({
  name: Joi.string().required()
});

const roomSchema = Joi.object({
  name: Joi.string().required(),
  roomType: Joi.string().required(),
  price: Joi.number().required()
});
