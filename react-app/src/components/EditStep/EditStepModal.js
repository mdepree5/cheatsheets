import { Modal } from '../../context/Modal';
import { useState } from 'react';
import EditStep from '.';
import './editStep.css';


function EditStepsFormModal({ stepId }) {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div className='edit-step-modal-button-container'>
            <button className='edit-step-modal' onClick={e => setShowModal(true)}>Edit Step</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditStep closeModal={() => setShowModal(false)} stepId={stepId} />
                </Modal>
            )}
        </div>
    );
}

export default EditStepsFormModal;
