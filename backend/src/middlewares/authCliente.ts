import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = '';
        if (req.headers.authorization) {
            token = (<string>req.headers.authorization).split(' ')[1];
        }
        jwt.verify(token, <string>process.env.SECRET_KEY_CLIENTE);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Authentication failed!" });
    }
};