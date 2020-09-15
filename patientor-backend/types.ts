import { Patient } from './interfaces';

export type SensitivePatientData = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}