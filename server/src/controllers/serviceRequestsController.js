import crypto from "node:crypto";
import createHttpError from "http-errors";

import { ServiceRequest } from "../models/serviceRequest.js";

const generatePublicToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const getServiceRequests = async (req, res) => {
  const serviceRequests = await ServiceRequest.find().sort({ createdAt: -1 });

  res.json({
    status: 200,
    message: "Service requests retrieved successfully",
    data: serviceRequests,
  });
};

export const createServiceRequest = async (req, res) => {
  const publicToken = generatePublicToken();

  const serviceRequest = await ServiceRequest.create({
    ...req.body,
    publicToken,
  });

  res.status(201).json({
    status: 201,
    message: "Service request created successfully",
    data: serviceRequest,
    trackingUrl: `/track/${serviceRequest.publicToken}`,
  });
};

export const getServiceRequestById = async (req, res, next) => {
  const { id } = req.params;

  const serviceRequest = await ServiceRequest.findById(id);

  if (!serviceRequest) {
    return next(createHttpError(404, "Service request not found"));
  }

  res.json({
    status: 200,
    message: "Service request retrieved successfully",
    data: serviceRequest,
  });
};

export const updateServiceRequest = async (req, res, next) => {
  const { id } = req.params;

  const serviceRequest = await ServiceRequest.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!serviceRequest) {
    return next(createHttpError(404, "Service request not found"));
  }

  res.json({
    status: 200,
    message: "Service request updated successfully",
    data: serviceRequest,
  });
};

export const getPublicServiceRequestByToken = async (req, res, next) => {
  const { publicToken } = req.params;

  const serviceRequest = await ServiceRequest.findOne({ publicToken });

  if (!serviceRequest) {
    return next(createHttpError(404, "Tracking page not found"));
  }

  res.json({
    status: 200,
    message: "Public repair status retrieved successfully",
    data: {
      vehicleMake: serviceRequest.vehicleMake,
      vehicleModel: serviceRequest.vehicleModel,
      serviceType: serviceRequest.serviceType,
      problemDescription: serviceRequest.problemDescription,
      status: serviceRequest.status,
      estimatedCost: serviceRequest.estimatedCost,
      workshopComment: serviceRequest.workshopComment,
      updatedAt: serviceRequest.updatedAt,
    },
  });
};
