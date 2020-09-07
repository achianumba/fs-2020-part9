import { SensitivePatientData } from '../types';
import { patients } from '../data/patients';

export const getPatients = (): SensitivePatientData[] => patients;