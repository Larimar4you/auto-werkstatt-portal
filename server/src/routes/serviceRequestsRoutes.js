import { Router } from "express";

import {
  createServiceRequest,
  getPublicServiceRequestByToken,
  getServiceRequestById,
  getServiceRequests,
  updateServiceRequest,
} from "../controllers/serviceRequestsController.js";

const router = Router();

router.get("/service-requests", getServiceRequests);
router.post("/service-requests", createServiceRequest);
router.get("/service-requests/:id", getServiceRequestById);
router.patch("/service-requests/:id", updateServiceRequest);

router.get("/track/:publicToken", getPublicServiceRequestByToken);

export default router;
