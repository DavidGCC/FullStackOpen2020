import patientData from "../../data/patients.json";

import { NoSsnPatients } from "../types";

const noSsnPatients: NoSsnPatients[] = patientData as NoSsnPatients[];

const getPatients = (): NoSsnPatients[] => {
    return noSsnPatients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        };
    });
};

const addPatinet = (): null => {
    return null;
};


export default {
    getPatients,
    addPatinet
};

