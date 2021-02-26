"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const patientServices_1 = __importDefault(require("../services/patientServices"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    const patients = patientServices_1.default.getPatients();
    res.json(patients);
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const patient = patientServices_1.default.getPatientById(id);
    res.json(patient);
});
router.post("/", (req, res) => {
    const newPatient = utils_1.default(req.body);
    const addedPatient = patientServices_1.default.addPatinet(newPatient);
    res.json(addedPatient);
});
router.post("/:id/entries", (req, res) => {
    const addedEntry = patientServices_1.default.addEntry(req.params.id, req.body);
    res.json(addedEntry);
});
exports.default = router;
