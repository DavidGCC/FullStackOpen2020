import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Header, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis } from "../types";
import { useStateValue, setFetchedPatient, setDiagnoses } from "../state"; 

const PatientPage: React.FC<{}> = () => {
    const id = useParams<{id: string}>();
    const [{ diagnoses }, dispatch ] = useStateValue();

    const [patient, setPatient] = React.useState<Patient | undefined>();
    
    React.useEffect(() => {
        const fetchPatient = async (id: string) => {
            try {
                const {data: foundPatient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(foundPatient);
                dispatch(setFetchedPatient(foundPatient));
            } catch (error) {
                console.error(error);
            }
        };
        
        const updateDiagnoses = async () => {
            try {
                if (diagnoses === {}) {
                    const {data: fetchedDiagnoses} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
                    console.log(fetchedDiagnoses);
                    dispatch(setDiagnoses(fetchedDiagnoses));
                }
            } catch (error) {
                console.error(error);
            }
        };
        updateDiagnoses();
        fetchPatient(id.id);
    }, []);
    const icon = patient?.gender === "male" ? "man" : patient?.gender === "female" ? "woman" : "other gender";
    return (
        <div>
            <Header as={"h1"}>{patient?.name} <Icon fitted name={icon} /></Header>
            <p>SSN: {patient?.ssn}</p>
            <p>Occupation: {patient?.occupation}</p>
            <Header as={"h2"}>Entries</Header>
            <div>
                {
                    patient?.entries.map(entry => (
                        <div key={entry.id}>
                            <p>{entry.date} {entry.description}</p>
                            <ul>
                                {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code]?.name}</li>)}
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default PatientPage;