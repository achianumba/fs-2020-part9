import React, { useEffect, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, useFormikContext } from "formik";
import { EntryType, Entry } from "../types";
import { SelectFieldOption, SelectField } from "./SelectField";
import { TextField } from "./FormField";
import { HealthCheckRating } from "../types";

export type EntryFormValues = Omit<Entry, "id">;

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
const validate = (values: any) => {
  const requiredError = "Field is required";
  const errors: { [field: string]: string } = {};

  if (!values.description) {
    errors.description = requiredError;
  }

  if (!values.date) {
    errors.date = requiredError;
  }

  if (!values.specialist) {
    errors.specialist = requiredError;
  }

  if (!values.type) {
    errors.type = requiredError;
  }
};

// get <select> field value
const SetEntryType: React.FC<{ setType: (type: string) => void }> = ({
  setType,
}) => {
  const {
    values: { type },
  } = useFormikContext();
  useEffect(() => {
    setType(type);
  }, [type, setType]);
  return null;
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [selectedType, setSelectedType] = useState<string>("Hospital");

  const setType = (type: string): void => {
    setSelectedType(type);
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "Hospital",
        healthCheckRating: "",
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
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Diagnosis Type"
              name="type"
              options={entryType}
            />
            <SetEntryType setType={setType} />
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
            {/* Add diagnosis codes */}
            {selectedType === "Hospital" && (
              <fieldset>
                <legend>Discharge</legend>
                <Field
                  label="Date"
                  name="discharge.date"
                  placeholder="Discharge date"
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

            {selectedType === "OccupationalHealthcare" && (
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
                    name="sickLeave.startDate"
                    placeholder="YYYY-MM-DD"
                    component={TextField}
                  />
                </fieldset>
              </>
            )}
            {selectedType === "HealthCheck" && (
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
