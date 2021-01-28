import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Header, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { useStateValue, setFetchedPatiend } from "../state"; 

const PatientPage: React.FC<{}> = () => {
    const id = useParams<{id: string}>();
    const [ , dispatch ] = useStateValue();
    const [patient, setPatient] = React.useState<Patient | undefined>();
    
    React.useEffect(() => {
        const fetchPatient = async (id: string) => {
            try {
                const {data: foundPatient} = await axios.get<Patient>(`http://localhost:3001/api/patients/${id}`);
                setPatient(foundPatient);
                dispatch(setFetchedPatiend(foundPatient));
            } catch (error) {
                console.error(error);
            }
        };
        fetchPatient(id.id);
    }, [id, dispatch]); 

    const icon = patient?.gender === "male" ? "man" : patient?.gender === "female" ? "woman" : "other gender";
    return (
        <div>
            <Header as={"h1"}>{patient?.name} <Icon fitted name={icon} /></Header>
            <p>SSN: {patient?.ssn}</p>
            <p>Occupation: {patient?.occupation}</p>
        </div>
    );
};

export default PatientPage;