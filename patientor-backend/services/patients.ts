import { SensitivePatientData, NewPatient } from '../types';
import { patients } from '../data/patients';
import { Patient } from '../interfaces';
import {parseName, parsedDOB, parseSSN, parseGender, parseOccupation} from '../utils';

export const getPatients = (): SensitivePatientData[] => {
    return patients.map(entry => ({
        id: entry.id,
        name: entry.name,
        dateOfBirth: entry.dateOfBirth,
        gender: entry.gender,
        occupation: entry.occupation
    }));
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
            occupation: parseOccupation(occupation)
        };

        patients.push(newPatient);

        return newPatient;
}
// console.log(addPatient({
//         name: 'Dana Scully',
//         dateOfBirth: '1974-01-05',
//         ssn: '050174-432N',
//         gender: 'Female',
//         occupation: 'Forensic Pathologist'
//       }));

//       console.log(addPatient({
//         name: 'Dana Scully',
//         dateOfBirth: '1974-01-05',
//         ssn: '050174-432N',
//         gender: 'Female',
//         occupation: 'Forensic Pathologist'
//       }));