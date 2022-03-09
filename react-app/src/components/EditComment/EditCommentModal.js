import { Modal } from '../../context/Modal';
import { useState } from 'react';
import EditComment from './index'



function EditCommentsModal({ comment }) {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div className='edit-comment-modal-button-container'>
            <button className='edit-step-modal' onClick={e => setShowModal(true)}>Edit Comment</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditComment closeModal={() => setShowModal(false)} comment={comment} />
                </Modal>
            )}
        </div>
    );
}

export default EditCommentsModal;
