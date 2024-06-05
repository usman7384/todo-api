import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = new Date().getTime();
    const { method, originalUrl } = req;

    res.on('finish', () => {
        const duration = new Date().getTime() - start;
        const { statusCode } = res;

        if (statusCode >= 200 && statusCode < 300) {
            console.log(`${method} ${originalUrl} - ${statusCode} - ${duration}ms - SUCCESS`);
        } else {
            console.error(`${method} ${originalUrl} - ${statusCode} - ${duration}ms - FAILURE`);
        }
    });

    next();
};
