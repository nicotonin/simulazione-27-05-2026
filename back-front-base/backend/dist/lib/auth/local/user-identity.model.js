"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdentityModel = void 0;
const mongoose_1 = require("mongoose");
const userIdentitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    provider: { type: String, default: 'local' },
    credentials: {
        type: {
            email: String,
            hashedPassword: String
        },
        _id: false
    }
});
userIdentitySchema.pre('findOne', function (next) {
    this.populate('user');
    next();
});
exports.UserIdentityModel = (0, mongoose_1.model)('UserIdentity', userIdentitySchema);
