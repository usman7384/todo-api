export class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class DatabaseError extends CustomError {
    constructor(message: string) {
        super(message);
    }
}

export class ServiceError extends CustomError {
    constructor(message: string) {
        super(message);
    }
}
