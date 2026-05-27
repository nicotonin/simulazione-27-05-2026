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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRole2 = exports.isRole1 = void 0;
const isRole1 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || req.user.role !== 'role1') {
            res.status(404).json({ message: "L'utente non è un role1 " });
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.isRole1 = isRole1;
const isRole2 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || req.user.role !== 'role2') {
            res.status(404).json({ message: "L'utente non è un role2" });
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.isRole2 = isRole2;
