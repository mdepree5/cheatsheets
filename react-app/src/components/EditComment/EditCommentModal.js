import { Modal } from '../../context/Modal';
import { useState } from 'react';
import EditComment from './index'
import { useSelector } from 'react-redux';
import match from '../../utils/match'



function EditCommentsModal({ comment }) {
    const [ showModal, setShowModal ] = useState(false);

    const sessionId = useSelector(state => state?.session?.user?.id)
    const writerId = comment.writer_id

    const matchingToSessionUser = match(sessionId, writerId)

    return (
        matchingToSessionUser &&(
            <div className='edit-comment-modal-button-container'>
                <button className='edit-comment-modal' onClick={e => setShowModal(true)}>Edit</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditComment closeModal={() => setShowModal(false)} comment={comment} />
                    </Modal>
                )}
            </div>
        )
    );
}

export default EditCommentsModal;
