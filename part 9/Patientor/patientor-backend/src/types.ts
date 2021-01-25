export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    Male = "Male",
    Female = "Female"
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
}

export type NoSsnPatients = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;