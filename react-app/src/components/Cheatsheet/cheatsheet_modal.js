import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CheatsheetForm from './cheatsheet_form';
// todo ——————————————————————————————————————————————————————————————————————————————————

function CheatsheetFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={e => setShowModal(true)}>Publish</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CheatsheetForm closeModal={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default CheatsheetFormModal;