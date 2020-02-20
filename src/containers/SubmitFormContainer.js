import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      // const { headerSet, bodySet, columns } = unloader({
      //   cover,
      //   cell,
      //   headerOnly
      // });

      onClose();

      let itemData;
      if (dataSelected) {
        itemData = dataSelected
          .split('.')
          .filter((data, index) => index > 1)
          .join('.');
      }

      
    },
    [dispatch, cover, cell, headerOnly, dataSelected]
  );

  const onCancel = useCallback(() => {
    onClose();
  }, [dispatch]);

  return <SubmitForm onSubmit={onSubmit} onCancel={onCancel} />;
};

export default SubmitFormContainer;
