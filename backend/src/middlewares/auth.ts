import { Request, Response, NextFunction } from 'express';
const jwt = require("jsonwebtoken");

module.exports = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = '';
        if (req.headers.access_token){
        token = (<string>req.headers.access_token).split(' ')[1];
        }
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};