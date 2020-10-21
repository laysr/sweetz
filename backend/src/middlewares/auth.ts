import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = '';
        if (req.headers.access_token){
        token = (<string>req.headers.access_token).split(' ')[1];
        }
        jwt.verify(token, <string>process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};