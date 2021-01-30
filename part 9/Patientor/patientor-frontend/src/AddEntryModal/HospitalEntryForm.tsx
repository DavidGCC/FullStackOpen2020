import React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";
import  * as Yup from "yup";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

import { NewEntry } from "../types";

interface Props {
    onSubmit: (entry: NewEntry) => void;
    setIsModalOpen: (p: boolean) => void;
}
// /(\d\d\d\d)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i
const HospitalEntryForm: React.FC<Props> = ({ onSubmit, setIsModalOpen }) => {
    const [{ diagnoses }] = useStateValue();
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
                }
            }}
            onSubmit={onSubmit}
            validationSchema={Yup.object().shape({
                description: Yup.string().required("Description is required"),
                date: Yup.string()
                    .required("Date is required")
                    .matches(/(\d\d\d\d)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i, "Please enter valid date. Format: YYYY-MM-DD"),
                specialist: Yup.string().required("Specialist is required"),
                discharge: Yup.object().shape({
                    date: Yup.string()
                        .required("Discharge date is required")
                        .matches(/(\d\d\d\d)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i, "Please enter valid date. Format YYYY-MM-DD"),
                    criteria: Yup.string().required("Discharge criteria is required")
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

export default HospitalEntryForm;
