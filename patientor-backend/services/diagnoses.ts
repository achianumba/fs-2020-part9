import { Diagnose } from '../interfaces';
import { diagnoses } from '../data/diagnoses';

export const getDiagnoses = (): Diagnose[] => diagnoses;