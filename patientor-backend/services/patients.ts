import { NewPatient } from "../types";
import { patients } from "../data/patients";

import {
  Patient,
  PublicPatient,
  BaseEntry,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../interfaces";

import {
  parseName,
  parsedDOB,
  parseSSN,
  parseGender,
  parseOccupation,
  parseDescription,
  parseSpecialist,
  parseDate,
  parseDiagnosisCodes,
} from "../utils";

export const getPatients = (): PublicPatient[] => {
  return patients.map((entry) => ({
    id: entry.id,
    name: entry.name,
    dateOfBirth: entry.dateOfBirth,
    gender: entry.gender,
    occupation: entry.occupation,
    entries: entry.entries,
  }));
};

export const getPatient = (id: string): PublicPatient => {
  const patient: Patient | undefined = patients.find((p) => p.id === id);

  if (!patient) {
    throw new Error(`Missing or incorrect id: ${id}`);
  }

  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  };
};

const generateId = (): string => {
  return (patients.length + 1).toString();
};

export const addPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: NewPatient): Patient => {
  const newPatient: Patient = {
    id: generateId(),
    name: parseName(name),
    dateOfBirth: parsedDOB(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  patients.push(newPatient);

  return newPatient;
};

export const addEntry = (entry: any): Entry => {
  const patient = patients.find((p) => p.id === entry.userId);
  const patientId = patient?.id;

  if (!patientId) {
    throw new Error(`Incorrect or missing patient id: ${entry.patientId}`);
  }

  let entryId = patient?.entries.length;

  if (entryId || entryId === 0) {
    entryId++;
  }

  let baseEntry: BaseEntry = {
    id: String(entryId),
    description: parseDescription(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    diagnosisCodes: entry.diagnosisCodes
      ? parseDiagnosisCodes(entry.diagnosisCodes)
      : [],
  };

  switch (entry.type) {
    case "HealthCheck":
      const healthEntry: HealthCheckEntry = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: entry.entryhealthCheckRating,
      };
      patient?.entries.push(healthEntry);
      return healthEntry;

    case "Hospital":
      const hospitalEntry: HospitalEntry = {
        ...baseEntry,
        type: "Hospital",
        discharge: entry.discharge,
      };
      patient?.entries.push(hospitalEntry);
      return hospitalEntry;

    case "OccupationalHealthcare":
      const occEntry: OccupationalHealthcareEntry = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: entry.employerName,
        sickLeave: entry.sickLeave ? entry.sickLeave : null,
      };
      patient?.entries.push(occEntry);
      return occEntry;

    default:
      throw Error("Unknown entry type");
  }
};
