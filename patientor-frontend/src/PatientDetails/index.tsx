import React, { useEffect } from "react";
import axios from "axios";
import { useStateValue, setPatientDetails, addPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";
import Entries from "../components/Entries";

const PatientDetails: React.FC<{ match: any }> = ({
  match: {
    params: { id: patientId },
  },
}) => {
  const [{ patients, patient }, dispatch] = useStateValue();

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
      <h3>entries</h3>
      <Entries entries={patient.entries} />
    </>
  );
};

export default PatientDetails;
