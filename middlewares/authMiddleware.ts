import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface User {
id: string;
username: string;
role: string;
}

declare global {
namespace Express {
interface Request {
user?: User;
}
}
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (!token) {
return res.sendStatus(401);
}

jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: User) => {
if (err) {
return res.sendStatus(403);
}
req.user = user;
next();
});
}

export function authorize(role: string) {
return function(req: Request, res: Response, next: NextFunction): void {
if (req.user?.role !== role) {
return res.sendStatus(401);
}
next();
}
}



