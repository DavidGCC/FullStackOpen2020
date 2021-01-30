import React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";
import * as Yup from "yup";

import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

import { NewEntry } from "../types";

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
            validationSchema={Yup.object().shape({
                description: Yup.string().required("Description is required"),
                date: Yup.string()
                    .required("Date is required")
                    .matches(/(\d\d\d\d)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i, "Please enter valid date. Format: YYYY-MM-DD"),
                specialist: Yup.string().required("Specialist is required"),
                healthCheckRating: Yup.number()
                    .required("Health Check Rating is required")
                    .min(0, "Must be between 0 and 3(inclusive)")
                    .max(3, "Must be between 0 and 3(inclusive)")
            })}
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
