import React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";
import * as Yup from "yup";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

import { NewEntry } from "../types";

interface Props {
    onSubmit: (entry: NewEntry) => void;
    setIsModalOpen: (p: boolean) => void;
}

const OccupationalEntryForm: React.FC<Props> = ({ onSubmit, setIsModalOpen }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                date: "",
                description: "",
                specialist: "",
                employerName: "",
                sickLeave: {
                    startDate: "",
                    endDate: "",
                },
                type: "OccupationalHealthcare"
            }}
            onSubmit={onSubmit}
            validationSchema={Yup.object().shape({
                description: Yup.string().required("Description is required"),
                date: Yup.string()
                    .required("Date is required")
                    .matches(/(\d\d\d\d)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i, "Please enter valid date. Format: YYYY-MM-DD"),
                specialist: Yup.string().required("Specialist is required"),
                sickLeave: Yup.object().shape({
                    startDate: Yup.string()
                        .matches(/(\d\d\d\d)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i, "Please enter valid date. Format YYYY-MM-DD"),
                    endDate: Yup.string()
                        .matches(/(\d\d\d\d)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i, "Please enter valid date. Format YYYY-MM-DD")
                }),

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
                            label="Employer Name"
                            placeholder="Employer Name"
                            name="employerName"
                            component={TextField}
                        />
                        <Field
                            label="Sick Leave Start Date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.startDate"
                            component={TextField}
                        />
                        <Field
                            label="Sick Leave End Date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.endDate"
                            component={TextField}
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

export default OccupationalEntryForm;
