"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModel = void 0;
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    dataInizio: { type: Date, required: true },
    dataFine: { type: Date, required: true },
    categoriaId: { type: String, required: true },
    stato: { type: String, enum: ["In attesa", "Approvato", "Rifiutato"], default: "In attesa" },
    role1ID: { type: String, required: true },
    role2ID: { type: String },
}, { timestamps: true });
requestSchema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});
exports.RequestModel = (0, mongoose_1.model)("Request1", requestSchema);
