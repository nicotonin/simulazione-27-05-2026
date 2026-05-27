"use strict";
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
exports.UserService = exports.UserExistsError = void 0;
const user_identity_model_1 = require("../../lib/auth/local/user-identity.model");
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserExistsError extends Error {
    constructor() {
        super();
        this.name = 'UserExists';
        this.message = 'username already in use';
    }
}
exports.UserExistsError = UserExistsError;
class UserService {
    add(user, credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingIdentity = yield user_identity_model_1.UserIdentityModel.findOne({ 'credentials.email': credentials.email });
            if (existingIdentity) {
                throw new UserExistsError();
            }
            const newUser = yield user_model_1.UserModel.create(user);
            const hashedPassword = yield bcrypt_1.default.hash(credentials.password, 10);
            yield user_identity_model_1.UserIdentityModel.create({
                provider: 'local',
                user: newUser.id,
                credentials: {
                    email: credentials.email,
                    hashedPassword
                }
            });
            return newUser;
        });
    }
    getUsers(role) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (role) {
                query = { role: role };
            }
            return yield user_model_1.UserModel.find(query);
        });
    }
}
exports.UserService = UserService;
exports.default = new UserService();
