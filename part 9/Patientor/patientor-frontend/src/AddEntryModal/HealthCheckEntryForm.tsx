import React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

import { NewEntry, NewHealthCheckEntry } from "../types";

interface Props {
    onSubmit: (entry: NewEntry) => void;
    setIsModalOpen: (p: boolean) => void;
}

const HealthCheckEntryForm: React.FC<Props> = ({ onSubmit, setIsModalOpen }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                date: "",
                description: "",
                specialist: "",
                healthCheckRating: 0,
                type: "HealthCheck"
            }}
            onSubmit={onSubmit}
            validate={(values: NewHealthCheckEntry) => {
                const requiredError = "Field is required";
                const outOfBoundsError = "Enter number 0 through 5";
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
                if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
                    errors.healthCheckRating = outOfBoundsError;
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
                            label="Health Check Rating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />
                        <DiagnosisSelection
                            diagnoses={Object.values(diagnoses)}
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    color="red"
                                >
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

export default HealthCheckEntryForm;
