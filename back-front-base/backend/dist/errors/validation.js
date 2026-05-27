"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHandler = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(errors) {
        super();
        this.originalErrors = errors;
        this.name = 'ValidationError';
        this.message = this.originalErrors.map(err => {
            return Object.values(err.constraints).join('; ');
        }).join('; ');
    }
}
exports.ValidationError = ValidationError;
const validationHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        console.log(err);
        res.status(400);
        res.json({
            error: err.name,
            message: err.message,
            details: err.originalErrors.map(e => ({
                property: e.property,
                constraints: e.constraints,
                value: e.value
            }))
        });
    }
    else {
        next(err);
    }
};
exports.validationHandler = validationHandler;
