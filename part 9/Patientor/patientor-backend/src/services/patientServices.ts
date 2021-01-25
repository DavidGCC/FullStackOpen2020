import patientData from "../../data/patients.json";

import { NoSsnPatients, NewPatient, Patient } from "../types";

const patients: Patient[] = patientData as Patient[];
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

const addPatinet = (patient: NewPatient): Patient  => {
    const addedPatient: Patient = {
        ...patient,
        id: (Math.floor(Math.random() * 100000)).toString()
    };

    patients.push(addedPatient);

    return addedPatient;
};


export default {
    getPatients,
    addPatinet
};

