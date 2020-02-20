import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import ModalBackground from '../components/ModalBackground';
import { clearAll as editingdialogClearAll } from '../modules/editingdialog';
import { clearAll as tablecanvasClearAll } from '../modules/tablecanvas';

const ModalBackgroundContainer = ({ modal, ...rest }) => {
  const dispatch = useDispatch();

  const onClick = useCallback(
    e => {
      e.stopPropagation();
      dispatch(editingdialogClearAll());
      dispatch(tablecanvasClearAll());
      // modal.close();
    },
    [dispatch]
  );

  return <ModalBackground {...rest} modal={modal} onClick={onClick} />;
};

export default ModalBackgroundContainer;
