"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const noSsnPatients = patients_1.default;
const getPatients = () => {
    return noSsnPatients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        };
    });
};
const getPatientById = (id) => {
    return patients_1.default.find((p) => p.id === id);
};
const addPatinet = (patient) => {
    const addedPatient = Object.assign(Object.assign({}, patient), { id: (Math.floor(Math.random() * 100000)).toString() });
    patients_1.default.push(addedPatient);
    return addedPatient;
};
const addEntry = (id, entry) => {
    const addedEntry = Object.assign(Object.assign({}, entry), { id: (Math.floor(Math.random() * 100000).toString()) });
    const patient = patients_1.default.find(p => p.id === id);
    patient === null || patient === void 0 ? void 0 : patient.entries.push(addedEntry);
    return addedEntry;
};
exports.default = {
    getPatients,
    addPatinet,
    getPatientById,
    addEntry
};
