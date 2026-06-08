import { Router } from "express";
import { getServiceRequests } from "../controllers/serviceRequestsController.js";

const router = Router();

router.get("/service-requests", getServiceRequests);

export default router;
