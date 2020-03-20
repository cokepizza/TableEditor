import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CheckBox from '../components/CheckBox';
import { headerOnlyToggle } from '../modules/editingdialog';
import { makeFullBody, makeShrinkBody } from '../modules/tablecanvas';

const CheckBoxContainer = ({ title }) => {
  const { headerOnly } = useSelector(({ editingdialog }) => ({
    headerOnly: editingdialog.headerOnly
  }));

  const dispatch = useDispatch();

  const onChange = useCallback(
    e => {
      dispatch(headerOnlyToggle());
      if (e.target.checked) {
        //  only fire when body exist
        dispatch(makeShrinkBody());
      } else {
        dispatch(makeFullBody());
      }
    },
    [dispatch]
  );

  return <CheckBox title={title} active={headerOnly} onChange={onChange} />;
};

export default CheckBoxContainer;
