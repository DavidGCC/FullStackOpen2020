"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_json_1 = __importDefault(require("../../data/diagnoses.json"));
const diagnoses = diagnoses_json_1.default;
const getDiagnoses = () => {
    return diagnoses;
};
const addDiagnose = () => {
    return null;
};
exports.default = {
    getDiagnoses,
    addDiagnose
};
