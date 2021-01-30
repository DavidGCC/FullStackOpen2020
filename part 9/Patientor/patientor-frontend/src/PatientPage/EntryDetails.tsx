import React from "react";
import { Card, Icon, Divider, Header } from "semantic-ui-react";


import { Entry, assertNever, Diagnosis } from "../types";

type IconColor = "green" | "yellow" | "red" | "orange";
const color = ["green", "yellow", "orange", "red"] as IconColor[];
const EntryDetails: React.FC<{ entry: Entry; diagnoses: {[code: string]: Diagnosis} }> = ({ entry, diagnoses }) => {
    switch (entry.type) {
        case "HealthCheck":
            return (
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            {entry.date}
                            <Icon size="big" name="doctor" />
                        </Card.Header>
                        <Card.Description style={{color: "black"}}>
                            <p>{entry.description}</p>
                            <Divider />
                            <Icon name="heart" color={color[entry.healthCheckRating]} />
                        </Card.Description>
                    </Card.Content>
                </Card>
            );
        case "Hospital":
            return (
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            {entry.date}
                            <Icon name="hospital outline" size="big"/>
                        </Card.Header>
                        <Card.Description style={{color: "black"}}>
                            <p>{entry.description}</p>
                            <Divider />
                            <div>
                                <p><b>Discharge Date:</b> {entry.discharge.date}</p>
                                <p><b>Discharge Criteria:</b> {entry.discharge.criteria}</p>
                            </div>
                            <Divider />
                            <p>Specialist: {entry.specialist}</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            );
        case "OccupationalHealthcare":
            return (
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            {entry.date}
                            <Icon fitted name="heart" size="big"/>
                        </Card.Header>
                        <Card.Description style={{ color: "black" }}>
                            <p>{entry.description}</p>
                            <Divider />
                            <p>Employer: {entry.employerName}</p>
                            <Divider />
                            <p>Sick Leave</p>
                            <p>Start: {entry.sickLeave ? entry.sickLeave.startDate : "Not specified"}</p>
                            <p>End: {entry.sickLeave ? entry.sickLeave.endDate : "Not specified"}</p>
                            <Divider />
                            <Header as="h4">Diagnoses</Header>
                            { 
                                entry.diagnosisCodes?.length === 0 ? "No Diagnoses" : (
                                    <ul>
                                        { 
                                            entry.diagnosisCodes?.map(code => (
                                                <li key={code}>{code} {diagnoses[code]?.name}</li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </Card.Description>
                    </Card.Content>
                </Card>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;