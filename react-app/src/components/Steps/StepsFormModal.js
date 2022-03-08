import { Modal } from '../../context/Modal';
import { useState } from 'react';
import StepsForm from '../../components/Steps/StepsForm';


function StepsFormModal({ cheatsheetId }) {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={e => setShowModal(true)}>Add Step</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <StepsForm closeModal={() => setShowModal(false)} cheatsheetId={cheatsheetId} />
                </Modal>
            )}
        </>
    );
}

export default StepsFormModal;
