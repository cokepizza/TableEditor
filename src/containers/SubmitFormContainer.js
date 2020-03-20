import React, { useCallback } from 'react';
// import { useSelector } from 'react-redux';

import SubmitForm from '../components/SubmitForm';
// import { unloader } from '../lib/revisedLoader';

const SubmitFormContainer = ({ onClose, model }) => {
  // const { cover, cell, dataSelected, headerOnly } = useSelector(
  //   ({ tablecanvas, editingdialog }) => ({
  //     cover: tablecanvas.cover,
  //     cell: tablecanvas.cell,
  //     dataSelected: tablecanvas.dataSelected,
  //     headerOnly: editingdialog.headerOnly
  //   })
  // );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      // const { headerSet, bodySet, columns } = unloader({
      //   cover,
      //   cell,
      //   headerOnly
      // });

      // let itemData;
      // if (dataSelected) {
      //   itemData = dataSelected
      //     .split('.')
      //     .filter((data, index) => index > 1)
      //     .join('.');

      //   model.set('itemData', itemData);
      // }

      // model.addAttributes({
      //   columns,
      //   headerSet,
      //   bodySet
      // });

      // onClose();

      // model.trigger('struct');
    },
    []
  );

  const onCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  return <SubmitForm onSubmit={onSubmit} onCancel={onCancel} />;
};

export default SubmitFormContainer;
