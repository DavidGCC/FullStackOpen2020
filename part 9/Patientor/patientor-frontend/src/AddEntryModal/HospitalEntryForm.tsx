import React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";


import { NewEntry, NewHospitalEntry } from "../types";

interface Props {
    onSubmit: (entry: NewEntry) => void;
    setIsModalOpen: (p: boolean) => void;
}

const HospitalEntryForm: React.FC<Props> = ({ onSubmit, setIsModalOpen }) => {
    const [{diagnoses}, ] = useStateValue(); 
    return (
        <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        discharge: {
            date: "",
            criteria: ""
        },
      }}
      onSubmit={onSubmit}
      validate={(values: NewHospitalEntry) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.discharge.date) {
            errors.discharge = requiredError;
        }
        if (!values.discharge.criteria) {
            errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
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
            <Field
                label="Discharge Date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
            />
            <Field 
                label="Criteria"
                placeholder="Criteria"
                name="discharge.criteria"
                component={TextField}
            />
            <DiagnosisSelection diagnoses={Object.values(diagnoses)} setFieldTouched={setFieldTouched} setFieldValue={setFieldValue}/>
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={() => setIsModalOpen(false)} color="red">
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

export default HospitalEntryForm;