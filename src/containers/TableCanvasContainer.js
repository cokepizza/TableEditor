import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TableCanvas from '../components/TableCanvas/TableCanvas';
import { setGlobalClicked } from '../modules/tablecanvas';
import { onClickThunk } from '../modules/editingdialog';

const TableCanvasContainer = () => {
  const { cover, cell, globalClicked } = useSelector(({ tablecanvas }) => ({
    cover: tablecanvas.cover,
    cell: tablecanvas.cell,
    globalClicked: tablecanvas.globalClicked
  }));

  const dispatch = useDispatch();

  const updateGlobalClicked = useCallback(clicked => {
    dispatch(setGlobalClicked(clicked));
  }, [dispatch]);

  const onClick = useCallback(
    ([type, index]) => {
      dispatch(
        onClickThunk({
          type,
          index
        })
      );
    },
    [dispatch]
  );

  return (
    <TableCanvas
      cover={cover}
      cell={cell}
      onClick={onClick}
      updateGlobalClicked={updateGlobalClicked}
      globalClicked={globalClicked}
    />
  );
};

export default TableCanvasContainer;
