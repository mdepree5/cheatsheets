import { Modal } from '../../context/Modal';
import { useState } from 'react';
import EditComment from '.'



function EditcommentsFormModal({ commentId }) {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div className='edit-comment-modal-button-container'>
            <button className='edit-comment-modal' onClick={e => setShowModal(true)}>Edit comment</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Editcomment closeModal={() => setShowModal(false)} commentId={commentId} />
                </Modal>
            )}
        </div>
    );
}

export default EditcommentsFormModal;
