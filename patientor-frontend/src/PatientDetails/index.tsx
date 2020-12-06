import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useStateValue,
  setPatientDetails,
  addPatient,
  addEntry,
} from "../state";
import { apiBaseUrl } from "../constants";
import {
  BaseEntry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  Entry,
  Patient,
  EntryType,
} from "../types";
import { Icon, Button } from "semantic-ui-react";
import Entries from "../components/Entries";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientDetails: React.FC<{ match: any }> = ({
  match: {
    params: { id: patientId },
  },
}) => {
  const [{ patients, patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const parseNewEntry = (entry: EntryFormValues): Omit<Entry, "id"> => {
    const baseEntry: Omit<BaseEntry, "id"> = {
      description: entry.description,
      date: entry.date,
      specialist: entry.specialist,
      diagnosisCodes: entry.diagnosisCodes,
    };

    switch (entry.type) {
      case EntryType.Hospital:
        const hospitalEntry: Omit<HospitalEntry, "id"> = {
          ...baseEntry,
          type: EntryType.Hospital,
          discharge: {
            date: entry.discharge.date,
            criteria: entry.discharge.criteria,
          },
        };
        return hospitalEntry;
      case EntryType.HealthCheck:
        const healthCheckEntry: Omit<HealthCheckEntry, "id"> = {
          ...baseEntry,
          type: EntryType.HealthCheck,
          healthCheckRating: entry.healthCheckRating,
        };
        return healthCheckEntry;
      case EntryType.OccupationalHealthcare:
        const occEntry: Omit<OccupationalHealthcareEntry, "id"> = {
          ...baseEntry,
          type: EntryType.OccupationalHealthcare,
          employerName: entry.employerName,
          sickLeave: {
            startDate: entry.sickLeave.startDate,
            endDate: entry.sickLeave.endDate,
          },
        };
        return occEntry;
      default:
        throw new Error(`Invalid entry: ${JSON.stringify(entry, null, 2)}`);
    }
  };

  const submitNewEntry = async (entry: EntryFormValues) => {
    try {
      type NewEntry = Omit<Entry, "id"> & { userId: string };
      const newEntry: NewEntry = {
        userId: patientId,
        ...parseNewEntry(entry),
      };

      const { data: savedEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        newEntry
      );
      dispatch(addEntry(savedEntry, patientId));
      closeModal();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => setModalOpen(false);

  useEffect(() => {
    if (patientId in patients) {
      dispatch(setPatientDetails(patients[patientId]));
    } else {
      const fetchPatient = async () => {
        try {
          const { data: receivedPatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${patientId}`
          );
          dispatch(setPatientDetails(receivedPatient));
          dispatch(addPatient(receivedPatient));
        } catch (err) {
          setError(err.message);
          console.error(err.message);
        }
      };

      fetchPatient();
    }
  }, [dispatch, patient, patients, patientId]);

  if (!patient) {
    return <h1>Patient not found!</h1>;
  }

  return (
    <>
      <h1>
        {patient.name}{" "}
        <Icon
          name={
            patient.gender === "male"
              ? "mars"
              : patient.gender === "female"
              ? "venus"
              : "transgender alternate"
          }
        />
      </h1>
      {patient.ssn && <p>ssn: {patient.ssn}</p>}
      <p>occupation: {patient.occupation}</p>
      <h3 style={{ display: "inline-block", maxWidth: "50%" }}>entries</h3>
      <Button
        onClick={openModal}
        style={{ display: "inline-block", marginLeft: "24px" }}
      >
        Add New Entry
      </Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}
      />
      <Entries entries={patient.entries} />
    </>
  );
};

export default PatientDetails;
