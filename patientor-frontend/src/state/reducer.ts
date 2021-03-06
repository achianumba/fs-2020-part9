import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

const SET_PATIENT_LIST = "SET_PATIENT_LIST";
const ADD_PATIENT = "ADD_PATIENT";
const SET_PATIENT_DETAILS = "SET_PATIENT_DETAILS";
const SET_DIAGNOSIS_LIST = "SET_DIAGNOSIS_LIST";
const ADD_ENTRY = "ADD_ENTRY";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_DETAILS";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      patientId: string;
      payload: Entry;
    };

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: SET_PATIENT_LIST,
    payload,
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: ADD_PATIENT,
    payload,
  };
};

export const setPatientDetails = (payload: Patient): Action => {
  return {
    type: SET_PATIENT_DETAILS,
    payload,
  };
};

export const setDiagnosisList = (payload: Diagnosis[]): Action => {
  return {
    type: SET_DIAGNOSIS_LIST,
    payload,
  };
};

export const addEntry = (payload: Entry, patientId: string): Action => {
  return {
    type: ADD_ENTRY,
    patientId,
    payload,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PATIENT_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case SET_PATIENT_DETAILS:
      return {
        ...state,
        patient: action.payload,
      };
    case SET_DIAGNOSIS_LIST:
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (acc, diagnosis) => ({ ...acc, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    case ADD_ENTRY:
      let patient: Patient = state.patients[action.patientId];
      patient.entries.push(action.payload);

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patientId]: patient,
        },
      };
    default:
      return state;
  }
};
