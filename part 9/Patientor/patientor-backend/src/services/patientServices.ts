import patients from "../../data/patients";
import { PublicPatient, NewPatient, Patient } from "../types";

const noSsnPatients: PublicPatient[] = patients as PublicPatient[];

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

