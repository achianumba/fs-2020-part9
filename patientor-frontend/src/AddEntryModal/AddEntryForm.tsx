import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { EntryType } from "../types";
import { SelectFieldOption, SelectField } from "./SelectField";
import { TextField } from "../AddPatientModal/FormField";
import { HealthCheckRating, NewEntry } from "../types";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<NewEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryType: SelectFieldOption[] = [
  {
    value: EntryType.Hospital,
    label: "Hospital",
  },
  {
    value: EntryType.HealthCheck,
    label: "Health Check",
  },
  {
    value: EntryType.OccupationalHealthcare,
    label: "Occupational Healthcare",
  },
];

const healthRating: SelectFieldOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical" },
];

// form validation
const validate = (values: EntryFormValues) => {
  const requiredError = "Field is required";
  const invalidDateError =
    "Invalid date. Use the YYYY-MM-DD pattern instead. For example 2021-12-06";

  const isInvalidDate = (date: string): boolean => {
    return new Date(date).toString() === "Invalid Date";
  };
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  const errors: { [field: string]: string } = {};

  if (!values.description) {
    errors.description = requiredError;
  }

  if (!values.date) {
    errors.date = requiredError;
  }

  if (
    (values.date && isInvalidDate(values.date)) ||
    (values.date && !datePattern.test(values.date))
  ) {
    errors.date = invalidDateError;
  }

  if (!values.specialist) {
    errors.specialist = requiredError;
  }

  if (!values.type) {
    errors.type = requiredError;
  }

  switch (values.type) {
    case "Hospital":
      if (!values.discharge.date) {
        // required error
      }

      if (values.discharge.date && isInvalidDate(values.discharge.date)) {
        // invalid date error
      }

      if (!values.discharge.criteria) {
        // required error
      }
      return errors;

    case "HealthCheck":
      if (!values.healthCheckRating) {
        errors.healthCheckRating = requiredError;
      }
      if (values.healthCheckRating && typeof healthRating !== "number") {
        errors.healthCheckRating = "Please select a valid rating";
      }
      return errors;

    case "OccupationalHealthcare":
      if (!values.employerName) {
        errors.employerName = requiredError;
      }
      return errors;

    default:
      return errors;
  }
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "Hospital",
        healthCheckRating: 0,
        discharge: {
          date: "",
          criteria: "",
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      onCancel={onCancel}
      validate={validate}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Diagnosis Type"
              name="type"
              options={entryType}
            />
            <Field
              label="Description"
              placeholder="Summarize diagnosis details"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            {values.type === "Hospital" && (
              <fieldset>
                <legend>Discharge</legend>
                <Field
                  label="Date"
                  name="discharge.date"
                  placeholder="YYYY-MM-DD"
                  component={TextField}
                />
                <Field
                  label="Criteria"
                  name="discharge.criteria"
                  placeholder="Discharge criteria"
                  component={TextField}
                />
              </fieldset>
            )}

            {values.type === "OccupationalHealthcare" && (
              <>
                <Field
                  label="Employer"
                  name="employerName"
                  placeholder="Employer name"
                  component={TextField}
                />
                <fieldset>
                  <legend>Sick Leave</legend>
                  <Field
                    label="Start Date"
                    name="sickLeave.startDate"
                    placeholder="YYYY-MM-DD"
                    component={TextField}
                  />
                  <Field
                    label="End Date"
                    name="sickLeave.endDate"
                    placeholder="YYYY-MM-DD"
                    component={TextField}
                  />
                </fieldset>
              </>
            )}
            {values.type === "HealthCheck" && (
              <SelectField
                label="Health Rating"
                name="healthCheckRating"
                options={healthRating}
              />
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
