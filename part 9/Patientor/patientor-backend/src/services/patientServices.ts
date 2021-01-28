import patientData from "../../data/patients.json";

import { PublicPatient, NewPatient, Patient } from "../types";

const patients: Patient[] = patientData as Patient[];
const noSsnPatients: PublicPatient[] = patientData as PublicPatient[];

const getPatients = (): PublicPatient[] => {
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

const getPatientById = (id: string): Patient | undefined => {
    return patients.find((p: Patient) => p.id === id);
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
    addPatinet,
    getPatientById
};

