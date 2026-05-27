"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlers = void 0;
const not_found_error_1 = require("./not-found-error");
const generic_1 = require("./generic");
const validation_1 = require("./validation");
exports.errorHandlers = [validation_1.validationHandler, not_found_error_1.notFoundHandler, generic_1.genericHandler];
