import React from "react";
import { Modal } from "semantic-ui-react";

import { NewEntry, EntryTypes } from "../types";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalEntryForm from "./OccupationalEntryForm";
import HealthCheckEntryForm from "./HealthCheckEntryForm";

interface Props {
    onSubmit: (entry: NewEntry) => void;
    isModalOpen: boolean;
    setIsModalOpen: (p: boolean) => void;
    entryType: EntryTypes;
}

const AddEntryModal: React.FC<Props> = ({
    onSubmit,
    isModalOpen,
    setIsModalOpen,
    entryType
}) => {
    const renderForm = () => {
        switch (entryType) {
            case "Hospital":
                return <HospitalEntryForm onSubmit={onSubmit} setIsModalOpen={() => setIsModalOpen(false)} />;
            case "OccupationalHealthcare":
                return <OccupationalEntryForm onSubmit={onSubmit} setIsModalOpen={() => setIsModalOpen(false)} />;
            case "HealthCheck":
                return <HealthCheckEntryForm onSubmit={onSubmit} setIsModalOpen={() => setIsModalOpen(false)} />;
            default:
                return <h1>Wrong entry type</h1>;
        }
    };
    return (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} centered={false} closeIcon>
            <Modal.Header>Add a new entry</Modal.Header>
            <Modal.Content>
                { renderForm() }
            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;
