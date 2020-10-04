import React, { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";

const PatientDetails: React.FC<{ match: any }> = ({ match }) => {
  const [{ patients, patient }, dispatch] = useStateValue();

  useEffect(() => {
    let patientId = match.params.id;

    if (patientId in patients) {
      dispatch({ type: "SET_PATIENT", payload: patients[patientId] });
    } else {
      const fetchPatient = async () => {
        try {
          const { data: receivedPatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${patientId}`
          );
          dispatch({ type: "SET_PATIENT", payload: receivedPatient });
          dispatch({ type: "ADD_PATIENT", payload: receivedPatient });
        } catch (err) {
          console.error(err.message);
        }
      };

      fetchPatient();
    }
  }, [dispatch, patient, patients]);

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
    </>
  );
};

export default PatientDetails;
