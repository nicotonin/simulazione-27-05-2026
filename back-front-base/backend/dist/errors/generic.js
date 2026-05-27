"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericHandler = void 0;
const genericHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: err.name,
        message: err.message
    });
};
exports.genericHandler = genericHandler;
