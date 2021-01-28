export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export enum EntryTypes {
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare",
    HealthCheck = "HealthCheck"
}

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge: {
        date: string,
        criteria: string
    }
}

export interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

export type Entry = HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry;


export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;