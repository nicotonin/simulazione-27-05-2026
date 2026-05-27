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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_identity_model_1 = require("./user-identity.model");
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identity = yield user_identity_model_1.UserIdentityModel.findOne({ 'credentials.email': email });
        if (!identity) {
            return done(null, false, { message: `invalid email` });
        }
        const match = yield bcrypt_1.default.compare(password, identity.credentials.hashedPassword);
        if (match) {
            return done(null, identity.toObject().user);
        }
        return done(null, false, { message: 'password supplied' });
    }
    catch (err) {
        return done(err);
    }
})));
