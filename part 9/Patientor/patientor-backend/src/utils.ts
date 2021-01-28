/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatient, Gender, EntryTypes, Entry } from "./types";

const isString = (text: any): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

/* eslint-disable */
const areEntries = (entries: any): entries is Entry[] => {
    return entries.every((entry: any) => {
        Object.values(EntryTypes).includes(entry.type);
    });
};
/* eslint-enable */

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
    if (!gender || !isGender(gender)) {
        throw new Error("Invalid or missing gender");
    }
    return gender;
};

const parseEntries = (entries: Entry[]): Entry[] => {
    if (!entries || !areEntries(entries)) {
        throw new Error("Invalid or missing entries");
    }
    return entries;
};

const toNewPatient = (object: NewPatient): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        entries: parseEntries(object.entries)
    };

    return newPatient;
};

export default toNewPatient;