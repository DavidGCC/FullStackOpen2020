import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Header, Icon, Button } from "semantic-ui-react";

import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal/AddEntryModal";

import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis, NewEntry, EntryTypes } from "../types";
import {
    useStateValue,
    setFetchedPatient,
    setDiagnoses,
    addEntry,
} from "../state";

const PatientPage: React.FC<{}> = () => {
    const id = useParams<{ id: string }>();
    const [{ diagnoses }, dispatch] = useStateValue();
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [entryType, setEntryType] = React.useState<EntryTypes>("Hospital");

    const [patient, setPatient] = React.useState<Patient | undefined>();

    React.useEffect(() => {
        const fetchPatient = async (id: string) => {
            try {
                const { data: foundPatient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                setPatient(foundPatient);
                dispatch(setFetchedPatient(foundPatient));
            } catch (error) {
                console.error(error);
            }
        };

        const updateDiagnoses = async () => {
            try {
                if (diagnoses === {}) {
                    const { data: fetchedDiagnoses } = await axios.get<
                        Diagnosis[]
                    >(`${apiBaseUrl}/diagnoses`);
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

    const onSubmit = async (entry: NewEntry) => {
        try {
            console.log(entry);
            
            const { data: createdEntry } = await axios.post(`${apiBaseUrl}/patients/${id.id}/entries`, entry);
            dispatch(addEntry(id.id, createdEntry));
        } catch (error) {
            console.error(error);
        }
    };

    const icon =
        patient?.gender === "male"
            ? "man"
            : patient?.gender === "female"
            ? "woman"
            : "other gender";
    return (
        <div>
            <Header as={"h1"}>
                {patient?.name} <Icon fitted name={icon} />
            </Header>
            <p>SSN: {patient?.ssn}</p>
            <p>Occupation: {patient?.occupation}</p>
            <select onChange={(e) => setEntryType(e.target.value as EntryTypes)} defaultValue="Hospital">
                <option value="Hospital">Hospital Entry</option>
                <option value="HealthCheck">Health Check Entry</option>
                <option value="OccupationalHealthcare">Occupational Health Care Entry</option>
            </select>
            <AddEntryModal isModalOpen={isModalOpen} onSubmit={onSubmit} setIsModalOpen={setIsModalOpen} entryType={entryType}/>
            <Button onClick={() => setIsModalOpen(true)}>Add New Entry</Button>
            <Header as={"h2"}>Entries</Header>
            <div>
                {patient?.entries.map((entry) => (
                    <div key={entry.id} style={{ marginTop: "1rem" }}>
                        <EntryDetails entry={entry} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientPage;
