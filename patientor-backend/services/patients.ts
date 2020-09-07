import { SensitivePatientData } from '../types';
import { patients } from '../data/patients';

export const getPatients = (): SensitivePatientData[] => {
    return patients.map(entry => ({
        id: entry.id,
        name: entry.name,
        dateOfBirth: entry.dateOfBirth,
        gender: entry.gender,
        occupation: entry.occupation
    }));
}