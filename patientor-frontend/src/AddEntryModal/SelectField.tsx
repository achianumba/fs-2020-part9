import React from "react";
import { Field } from "formik";
import { Form } from "semantic-ui-react";

export type SelectFieldOption = {
  value: string | number;
  label: string;
};

// <select> field props
type SelectFieldProps = {
  name: string;
  label: string;
  options: SelectFieldOption[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);
