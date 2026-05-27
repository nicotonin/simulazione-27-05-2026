"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.add = void 0;
const user_service_1 = __importStar(require("../user/user.service"));
const lodash_1 = require("lodash");
const passport_1 = __importDefault(require("passport"));
const jwt_strategy_1 = require("../../lib/auth/jwt/jwt-strategy");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = (0, lodash_1.omit)(req.body, 'email', 'password');
        const credentialsData = (0, lodash_1.pick)(req.body, 'email', 'password');
        const newUser = yield user_service_1.default.add(userData, credentialsData);
        res.status(201).json(newUser);
    }
    catch (err) {
        if (err instanceof user_service_1.UserExistsError) {
            res.status(400).json({
                error: err.name,
                message: err.message
            });
        }
        else {
            next(err);
        }
    }
});
exports.add = add;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('local', { session: false }, (loginErr, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (loginErr)
                return next(loginErr);
            if (!user) {
                return res.status(400).json({
                    error: 'LoginError',
                    message: info.message
                });
            }
            const token = jsonwebtoken_1.default.sign(user, jwt_strategy_1.JWT_SECRET, { expiresIn: '7 days' });
            res.status(200).json({
                user,
                token
            });
        }
        catch (err) {
            next(err);
        }
    }))(req, res, next);
});
exports.login = login;
