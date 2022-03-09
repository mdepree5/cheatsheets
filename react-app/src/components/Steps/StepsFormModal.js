import { Modal } from '../../context/Modal';
import { useState } from 'react';
import StepsForm from '../../components/Steps/StepsForm';
import './steps.css';


function StepsFormModal({ cheatsheetId }) {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <div className='modal-button-container'>
                <button className='add-step-modal' onClick={e => setShowModal(true)}>Add Step</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <StepsForm closeModal={() => setShowModal(false)} cheatsheetId={cheatsheetId} />
                    </Modal>
                )}
            </div>
        </>
    );
}

export default StepsFormModal;
