import { Request, Response, NextFunction } from 'express';

export const paginate = (maxLimit: number = 25) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let page = Number(req.query.page); 
        let limit = Number(req.query.limit); 

        limit = Math.min(limit, maxLimit);

        const offset = (page - 1) * limit;
        req.pagination = { limit, offset };
        next();
    };
};
