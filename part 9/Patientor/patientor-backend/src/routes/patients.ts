/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import patientService from "../services/patientServices";
import toNewPatient  from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    const patients = patientService.getPatients();
    res.json(patients);
});

router.get("/:id", (req, res) => {
    const id: string = req.params.id;
    const patient = patientService.getPatientById(id);
    if (patient) {
        patient.entries = [];
    }
    res.json(patient);
});

router.post("/", (req, res) => {
    const newPatient = toNewPatient(req.body);
    
    const addedPatient = patientService.addPatinet(newPatient);

    res.json(addedPatient);
});

export default router;