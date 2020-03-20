import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TableCanvas from '../components/TableCanvas/TableCanvas';
import { setGlobalClicked } from '../modules/tablecanvas';
import { onClickThunk } from '../modules/editingdialog';

const TableCanvasContainer = () => {
  const { cover, cell, globalClicked, zoom } = useSelector(
    ({ tablecanvas, editingdialog }) => ({
      cover: tablecanvas.cover,
      cell: tablecanvas.cell,
      globalClicked: tablecanvas.globalClicked,
      zoom: editingdialog.zoom
    })
  );

  const dispatch = useDispatch();
  const zoomRef = useRef();

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const updateGlobalClicked = useCallback(
    clicked => {
      dispatch(setGlobalClicked(clicked));
    },
    [dispatch]
  );

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
      zoom={zoom}
      onClick={onClick}
      updateGlobalClicked={updateGlobalClicked}
      globalClicked={globalClicked}
    />
  );
};

export default TableCanvasContainer;
