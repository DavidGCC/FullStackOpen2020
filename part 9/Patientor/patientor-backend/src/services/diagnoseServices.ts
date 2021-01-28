import diagnoseData from "../../data/diagnoses.json";

import { Diagnosis } from "../types";    

const diagnoses: Diagnosis[] = diagnoseData as Diagnosis[];

const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

const addDiagnose = (): null => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnose
};