import { Schema, model } from "mongoose";

const serviceRequestSchema = new Schema(
  {
    publicToken: {
      type: String,
      required: true,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },

    customerEmail: {
      type: String,
      trim: true,
      default: "",
    },

    vehicleMake: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleModel: {
      type: String,
      required: true,
      trim: true,
    },

    licensePlate: {
      type: String,
      trim: true,
    },

    mileage: {
      type: Number,
      default: null,
    },

    tuvDueDate: {
      type: Date,
      default: null,
    },

    serviceType: {
      type: String,
      enum: [
        "INSPEKTION",
        "OELWECHSEL",
        "BREMSEN",
        "REIFEN",
        "KLIMA",
        "DIAGNOSE",
        "TUEV",
        "SONSTIGES",
      ],
      default: "SONSTIGES",
    },

    problemDescription: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "ANGELEGT",
        "ANGENOMMEN",
        "IN_ARBEIT",
        "WARTET_AUF_TEILE",
        "WARTET_AUF_FREIGABE",
        "FERTIG",
        "ABGEHOLT",
        "STORNIERT",
      ],
      default: "ANGELEGT",
    },

    estimatedCost: {
      type: Number,
      default: null,
    },

    workshopComment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ServiceRequest = model("service_requests", serviceRequestSchema);
