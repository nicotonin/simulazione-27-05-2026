import { Router } from "express";
import {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequestById,
  deleteRequestById,
  getRequestsToApprove,
  approveRequest,
  rejectRequest
} from "./request.controller";

const router = Router();


router.get("/getAllRequests", getAllRequests);
router.post("/createRequest", createRequest);
router.get("/getRequestsToApprove", getRequestsToApprove); 
router.get("/getRequestById/:id", getRequestById);
router.put("/updateRequest/:id", updateRequestById);
router.put("/approveRequest/:id", approveRequest);
router.put("/rejectRequest/:id", rejectRequest);
router.delete("/deleteRequest/:id", deleteRequestById);


export default router;
