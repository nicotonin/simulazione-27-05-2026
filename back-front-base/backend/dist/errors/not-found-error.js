"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor() {
        super('Entity Not Found');
    }
}
exports.NotFoundError = NotFoundError;
const notFoundHandler = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        res.status(404).json({
            error: 'NotFoundError',
            message: 'Entity not found'
        });
    }
    else {
        next(err);
    }
};
exports.notFoundHandler = notFoundHandler;
