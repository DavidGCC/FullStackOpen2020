"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
/* eslint-disable */
// const areEntries = (entries: any): entries is Entry[] => {
//     return entries.every((entry: any) => {
//         Object.values(EntryTypes).includes(entry.type);
//     });
// };
/* eslint-enable */
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("Invalid or missing name");
    }
    return name;
};
const parseDate = (date) => {
    if (!date || !isDate(date)) {
        throw new Error("Invalid or missing date");
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString) {
        throw new Error("invalid or missing ssn");
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Invalid or missing occupation");
    }
    return occupation;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Invalid or missing gender");
    }
    return gender;
};
// const parseEntries = (entries: Entry[]): Entry[] => {
//     if (!entries || !areEntries(entries)) {
//         throw new Error("Invalid or missing entries");
//     }
//     return entries;
// };
const toNewPatient = (object) => {
    const newPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        entries: []
    };
    return newPatient;
};
exports.default = toNewPatient;
