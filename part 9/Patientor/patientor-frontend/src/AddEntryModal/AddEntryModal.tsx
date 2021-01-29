import React from "react";
import { Modal } from "semantic-ui-react";

import { NewEntry } from "../types";
import HospitalEntryForm from "./HospitalEntryForm";

interface Props {
    onSubmit: (entry: NewEntry) => void;
    isModalOpen: boolean;
    setIsModalOpen: (p: boolean) => void;
}

const AddEntryModal: React.FC<Props> = ({
    onSubmit,
    isModalOpen,
    setIsModalOpen,
}) => {
    return (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} centered={false} closeIcon>
            <Modal.Header>Add a new entry</Modal.Header>
            <Modal.Content>
                <HospitalEntryForm onSubmit={onSubmit} setIsModalOpen={() => setIsModalOpen(false)} />
            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;
