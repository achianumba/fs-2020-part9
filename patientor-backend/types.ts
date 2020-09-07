import { Patient } from './interfaces';

export type SensitivePatientData = Omit<Patient, 'ssn'>;