/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatient, Gender } from "./types";

const isString = (text: any): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseName = (name: string):string => {
    if (!name || !isString(name)) {
        throw new Error("Invalid or missing name");
    }
    return name;
};

const parseDate = (date: string): string => {
    if (!date || !isDate(date)) {
        throw new Error("Invalid or missing date");
    }
    return date;
};

const parseSsn = (ssn: string): string => {
    if (!ssn || !isString) {
        throw new Error("invalid or missing ssn");
    }
    return ssn;
};

const parseOccupation = (occupation: string): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Invalid or missing occupation");
    }
    return occupation;
};

const parseGender = (gender: Gender): Gender => {
    if (!gender || isGender(gender)) {
        throw new Error("Invalid or missing gender");
    }
    return gender;
};

const toNewPatient = (object: NewPatient): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender)
    };

    return newPatient;
};

export default toNewPatient;