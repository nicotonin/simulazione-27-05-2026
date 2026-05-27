"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    description: { type: String, required: true },
}, {
    timestamps: true,
});
categorySchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.id;
        return ret;
    },
});
exports.CategoryModel = (0, mongoose_1.model)('Category', categorySchema);
