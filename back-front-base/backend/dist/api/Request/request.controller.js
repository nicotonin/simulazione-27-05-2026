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
exports.rejectRequest = exports.approveRequest = exports.getRequestsToApprove = exports.deleteRequestById = exports.updateRequestById = exports.createRequest = exports.getRequestById = exports.getAllRequests = void 0;
const request_service_1 = require("./request.service");
const requestService = new request_service_1.RequestService();
// -----------------------------------
// GET /api/getAllRequests  → visualizza tutte le richieste
// i role1 vedono solo le proprie, i role2 tutte
const getAllRequests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        let requests;
        if (role === "role2") {
            // il role2 vede tutte
            requests = yield requestService.getRequestsForApproval(userId);
        }
        else {
            // i role1 vedono solo le proprie
            requests = yield requestService.getRequestsByUser(userId);
        }
        res.status(200).json(requests);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllRequests = getAllRequests;
// -----------------------------------
// GET /api/getRequestById/:id → visualizzazione richiesta singola
const getRequestById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        const request = yield requestService.updateRequest(id, {}); // usiamo findById internamente
        if (!request)
            res.status(404).json({ message: "Richiesta non trovata" });
        // controlli di visibilità
        if (role !== "role2" && (request === null || request === void 0 ? void 0 : request.role1ID) !== userId) {
            res.status(403).json({ message: "Non autorizzato" });
        }
        res.status(200).json(request);
    }
    catch (err) {
        next(err);
    }
});
exports.getRequestById = getRequestById;
// -----------------------------------
// POST /api/createRequest → inserimento nuova richiesta
const createRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { dataInizio, dataFine, categoriaId } = req.body;
        const data = {
            dataInizio: new Date(dataInizio),
            dataFine: new Date(dataFine),
            categoriaId,
            stato: "In attesa",
            role1ID: userId
        };
        const request = yield requestService.createRequest(data);
        res.status(201).json(request);
    }
    catch (err) {
        next(err);
    }
});
exports.createRequest = createRequest;
// -----------------------------------
// PUT /api/updateRequest/:id → modifica richiesta (solo role1 puo modificarela richiesta e solo se è in attesa)
const updateRequestById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const updates = req.body;
        const request = yield requestService.updateRequest(id, {});
        if (!request)
            res.status(404).json({ message: "Richiesta non trovata" });
        if ((request === null || request === void 0 ? void 0 : request.role1ID) !== userId)
            res.status(403).json({ message: "Non autorizzato" });
        if ((request === null || request === void 0 ? void 0 : request.stato) !== "In attesa")
            res.status(400).json({ message: "Richiesta già valutata, impossibile modificare" });
        const updatedRequest = yield requestService.updateRequest(id, updates);
        res.status(200).json(updatedRequest);
    }
    catch (err) {
        next(err);
    }
});
exports.updateRequestById = updateRequestById;
// -----------------------------------
// DELETE /api/deleteRequestById/:id → eliminazione richiesta
const deleteRequestById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (!userId || !role) {
            res.status(401).json({ message: "Utente non autenticato" });
        }
        else {
            const request = yield requestService.getRequestById(id);
            if (!request) {
                res.status(404).json({ message: "Richiesta non trovata" });
            }
            else {
                // Controlli per role1
                if (role !== "role2") {
                    if (request.role1ID !== userId) {
                        res.status(403).json({ message: "Non autorizzato" });
                    }
                    else if (request.stato !== "In attesa") {
                        res.status(400).json({ message: "Richiesta già valutata, impossibile eliminare" });
                    }
                    else {
                        // Soft delete per dipendente
                        requestService.changeStatus(id, "Rifiutato", userId);
                        res.status(200).json({ message: "Richiesta eliminata correttamente" });
                    }
                }
                else {
                    // Responsabile può cancellare qualsiasi richiesta
                    requestService.changeStatus(id, "Rifiutato", userId);
                    res.status(200).json({ message: "Richiesta eliminata correttamente" });
                }
            }
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deleteRequestById = deleteRequestById;
// GET /api/getRequestsToApprove → visualizza richieste da approvare (solo per role2)
const getRequestsToApprove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        if (role !== "role2" || !userId) {
            res.status(403).json({ message: "Non autorizzato" });
        }
        else {
            const requests = yield requestService.getRequestsToApprove();
            res.status(200).json(requests);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getRequestsToApprove = getRequestsToApprove;
// PUT /api/approveRequest/:id/approva → approvazione richiesta
const approveRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (!userId || role !== "role2") {
            res.status(403).json({ message: "Non autorizzato" });
        }
        else {
            const request = yield requestService.getRequestById(id);
            if (!request)
                res.status(404).json({ message: "Richiesta non trovata" });
            else if (request.stato !== "In attesa")
                res.status(400).json({ message: "Richiesta già valutata" });
            else {
                yield requestService.changeStatus(id, "Approvato", userId);
                res.status(200).json({ message: "Richiesta approvata correttamente" });
            }
        }
    }
    catch (err) {
        next(err);
    }
});
exports.approveRequest = approveRequest;
// PUT /api/rejectRequest/:id/rifiuta → rifiuto richiesta
const rejectRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (!userId || role !== "role2") {
            res.status(403).json({ message: "Non autorizzato" });
        }
        else {
            const request = yield requestService.getRequestById(id);
            if (!request)
                res.status(404).json({ message: "Richiesta non trovata" });
            else if (request.stato !== "In attesa")
                res.status(400).json({ message: "Richiesta già valutata" });
            else {
                yield requestService.changeStatus(id, "Rifiutato", userId);
                res.status(200).json({ message: "Richiesta rifiutata correttamente" });
            }
        }
    }
    catch (err) {
        next(err);
    }
});
exports.rejectRequest = rejectRequest;
