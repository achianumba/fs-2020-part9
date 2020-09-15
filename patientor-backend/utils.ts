import { Gender } from './types';

export const isString = (str: any): boolean => {
    return typeof str === 'string' || str instanceof String;
}

export const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${ name }`)
    }
    return name;
}

const isDate = (date: any): boolean => {
    let parsedDate: Date = new Date(date);
    return parsedDate.toString() !== 'Invalid Date';
}

export const parsedDOB = (dob: any): string => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error(`Incorrect or missing date of birth: ${ dob }`);
    }
    return dob;
}

export const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing SSN: ${ ssn }`);
    }
    return ssn;
}

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
}

export const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${ gender }`);
    }
    return gender;
}

export const parseOccupation = (occ: any): string => {
    if (!occ || !isString(occ)) {
        throw new Error(`Incorrect or missing occupation: ${ occ }`);
    }
    return occ;
}