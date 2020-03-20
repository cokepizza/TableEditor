import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeaderOnly from '../components/HeaderOnly';
import { setToggle } from '../modules/editingdialog';
import { makeShrinkBody, makeFullBody } from '../modules/tablecanvas';

const HeaderOnlyContainer = () => {
  const { headerOnly } = useSelector(({ editingdialog }) => ({
    headerOnly: editingdialog.headerOnly
  }));

  const dispatch = useDispatch();

  const onClick = useCallback(
    e => {
      dispatch(
        setToggle({
          key: 'headerOnly'
        })
      );

      if (!headerOnly) {
        dispatch(makeShrinkBody());
      } else {
        dispatch(makeFullBody());
      }
    },
    [dispatch, headerOnly]
  );

  return <HeaderOnly headerOnly={headerOnly} onClick={onClick} />;
};

export default HeaderOnlyContainer;
