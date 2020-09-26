import { NewPatient } from '../types';
import { patients } from '../data/patients';
import { Patient, PublicPatient } from '../interfaces';
import {parseName, parsedDOB, parseSSN, parseGender, parseOccupation} from '../utils';

export const getPatients = (): PublicPatient[] => {
    return patients.map(entry => ({
        id: entry.id,
        name: entry.name,
        dateOfBirth: entry.dateOfBirth,
        gender: entry.gender,
        occupation: entry.occupation,
        entries: entry.entries
    }));
}

export const getPatient = (id: string): PublicPatient => {
    const patient: Patient | undefined = patients.find(p => p.id === id);
    
    if (!patient) {
        throw new Error(`Missing or incorrect id: ${ id }`);
    }

    return {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
        entries: patient.entries
    }
}

const generateId = (): string => {
    return (patients.length + 1).toString()
}

export const addPatient = ({ name, dateOfBirth, ssn, gender, occupation}: NewPatient): Patient => {
        const newPatient: Patient = {
            id: generateId(),
            name: parseName(name),
            dateOfBirth: parsedDOB(dateOfBirth),
            ssn: parseSSN(ssn),
            gender: parseGender(gender),
            occupation: parseOccupation(occupation),
            entries: []
        };

        patients.push(newPatient);

        return newPatient;
}