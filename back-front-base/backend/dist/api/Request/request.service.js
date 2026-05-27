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
exports.RequestService = void 0;
const request_model_1 = require("./request.model");
class RequestService {
    // CREA UNA NUOVA RICHIESTA
    createRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRequest = yield request_model_1.RequestModel.create(data);
            return newRequest;
        });
    }
    // TROVA TUTTE LE RICHIESTE DI UN UTENTE
    getRequestsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield request_model_1.RequestModel.find({ role1ID: userId }).sort({ createdAt: -1 }).exec();
        });
    }
    // TROVA TUTTE LE RICHIESTE CHE IL RESPONSABILE PUÒ VALUTARE
    getRequestsForApproval(managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield request_model_1.RequestModel.find().sort({ createdAt: -1 }).exec();
        });
    }
    // TROVA UNA RICHIESTA PER ID
    getRequestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield request_model_1.RequestModel.findById(id).exec();
        });
    }
    // AGGIORNA UNA RICHIESTA (PUT)
    updateRequest(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield request_model_1.RequestModel.findByIdAndUpdate(id, updates, { new: true });
            return request;
        });
    }
    // CAMBIA LO STATO DI UNA RICHIESTA (APPROVATO / RIFIUTATO)
    changeStatus(id, stato, valutatoreId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield request_model_1.RequestModel.findById(id);
            if (!request)
                return null;
            request.stato = stato;
            request.role2ID = valutatoreId;
            yield request.save();
            return request;
        });
    }
    // ELIMINAZIONE (soft delete: può essere solo da “In attesa”)
    deleteRequest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield request_model_1.RequestModel.findById(id);
            if (!request)
                return null;
            yield request.deleteOne(); // oppure puoi fare soft delete impostando uno stato
            return true;
        });
    }
    // APPROVA UNA RICHIESTA (solo responsabili)
    approveRequest(id, valutatoreId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield request_model_1.RequestModel.findById(id);
            if (!request)
                return null;
            request.stato = "Approvato";
            request.role2ID = valutatoreId;
            yield request.save();
            return request;
        });
    }
    // RIFIUTA UNA RICHIESTA (solo responsabili)
    rejectRequest(id, valutatoreId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield request_model_1.RequestModel.findById(id);
            if (!request)
                return null;
            request.stato = "Rifiutato";
            request.role2ID = valutatoreId;
            yield request.save();
            return request;
        });
    }
    // TROVA TUTTE LE RICHIESTE IN ATTESA (solo responsabili)
    getRequestsToApprove() {
        return __awaiter(this, void 0, void 0, function* () {
            // Filtra solo le richieste con stato "In attesa"
            return yield request_model_1.RequestModel.find({ stato: "In attesa" }).sort({ createdAt: -1 }).exec();
        });
    }
}
exports.RequestService = RequestService;
