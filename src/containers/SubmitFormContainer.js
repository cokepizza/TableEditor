import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import SubmitForm from '../components/SubmitForm';

const SubmitFormContainer = ({ onClose, model }) => {
  const { cover, cell, dataSelected, headerOnly } = useSelector(
    ({ tablecanvas, editingdialog }) => ({
      cover: tablecanvas.cover,
      cell: tablecanvas.cell,
      dataSelected: tablecanvas.dataSelected,
      headerOnly: editingdialog.headerOnly
    })
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      // const { headerSet, bodySet, columns } = unloader({
      //   cover,
      //   cell,
      //   headerOnly
      // });

      onClose();

      // if (dataSelected) {
      //   itemData = dataSelected
      //     .split('.')
      //     .filter((data, index) => index > 1)
      //     .join('.');
      // }

      console.dir(cover);
      console.dir(cell);
      console.dir(dataSelected);
      console.dir(headerOnly);
      
    },
    [cover, cell, headerOnly, dataSelected, onClose]
  );

  const onCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  return <SubmitForm onSubmit={onSubmit} onCancel={onCancel} />;
};

export default SubmitFormContainer;
