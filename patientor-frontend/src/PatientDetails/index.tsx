import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateValue, setPatientDetails, addPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
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

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log(values);
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
