import { Schema, model } from "mongoose";
import { Request1 } from "./request.entity";

const requestSchema = new Schema<Request1>(
  {
    dataInizio: { type: Date, required: true },
    dataFine: { type: Date, required: true },
    categoriaId: { type: String, required: true },
    stato: { type: String, enum: ["In attesa", "Approvato", "Rifiutato"], default: "In attesa" },
    role1ID: { type: String, required: true },
    role2ID: { type: String },
  },
  { timestamps: true }
);

requestSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete (ret as unknown as any)._id;
    delete (ret as unknown as any).__v;
    return ret;
  },
});

export const RequestModel = model<Request1>("Request1", requestSchema);
