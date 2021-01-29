import patients from "../../data/patients";
import { PublicPatient, NewPatient, Patient, Entry } from "../types";

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

const addEntry = (id: string, entry: Entry): Entry => {
    const addedEntry: Entry = {
        ...entry,
        id: (Math.floor(Math.random() * 100000).toString())
    };

    const patient = patients.find(p => p.id === id);
    patient?.entries.push(addedEntry);
    return addedEntry;
};


export default {
    getPatients,
    addPatinet,
    getPatientById,
    addEntry
};

