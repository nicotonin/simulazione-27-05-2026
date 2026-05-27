"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth/auth.router"));
const user_router_1 = __importDefault(require("./user/user.router"));
const request_router_1 = __importDefault(require("./Request/request.router"));
const category_router_1 = __importDefault(require("./Category/category.router"));
const auth_middleware_1 = require("../lib/auth/auth.middleware");
const router = (0, express_1.Router)();
router.use('/requests', auth_middleware_1.isAuthenticated, request_router_1.default);
router.use('/category', auth_middleware_1.isAuthenticated, category_router_1.default);
router.use('/users', auth_middleware_1.isAuthenticated, user_router_1.default);
router.use(auth_router_1.default);
exports.default = router;
