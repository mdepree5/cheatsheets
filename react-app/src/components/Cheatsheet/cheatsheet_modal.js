import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CheatsheetForm from './cheatsheet_form';
// todo ——————————————————————————————————————————————————————————————————————————————————

function CheatsheetFormModal({name='Create', edit=false, cheatsheet=null}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={e => setShowModal(true)}>{name}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CheatsheetForm name={name} edit={edit} cheatsheet={cheatsheet} closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default CheatsheetFormModal;