import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  mergeCellThunk,
  divideCellThunk,
  addColsThunk,
  delColsThunk,
  addRowsThunk,
  delRowsThunk,
  setValue
} from '../modules/tablecanvas';
import EditorDialog from '../components/EditingDialog/EditingDialog';
import { menuToggle } from '../modules/editingdialog';
import { setDataSelected } from '../modules/tablecanvas';
import { nameFinder } from '../lib/nameFinder';
import { clearAll as editingdialogClearAll } from '../modules/editingdialog';
import { clearAll as tablecanvasClearAll } from '../modules/tablecanvas';
import { refreshPartialSum } from '../modules/tablecanvas';

const EditingDialogContainer = ({ modal, model, editor, tableConfig }) => {
  const {
    menu,
    actionIcon,
    globalClicked,
    cell,
    cellId,
    cover,
    dataBinding,
    dataSelected
  } = useSelector(({ editingdialog, tablecanvas }) => ({
    menu: editingdialog.menu,
    actionIcon: editingdialog.actionIcon,
    globalClicked: tablecanvas.globalClicked,
    cell: tablecanvas.cell,
    cellId: tablecanvas.cellId,
    cover: tablecanvas.cover,
    dataBinding: tablecanvas.dataBinding,
    dataSelected: tablecanvas.dataSelected
  }));

  const dispatch = useDispatch();

  const onMergeCell = useCallback(() => {
    dispatch(mergeCellThunk({ globalClicked, cell, cellId }));
  }, [dispatch, globalClicked, cell, cellId]);

  const onDivideCell = useCallback(() => {
    dispatch(divideCellThunk({ globalClicked, cell, cellId }));
  }, [dispatch, globalClicked, cell, cellId]);

  const onAddCols = useCallback(() => {
    dispatch(addColsThunk({ globalClicked, cell, cellId, cover }));
  }, [dispatch, globalClicked, cell, cellId, cover]);

  const onDelCols = useCallback(() => {
    dispatch(delColsThunk({ globalClicked, cell, cellId, cover }));
  }, [dispatch, globalClicked, cell, cellId, cover]);

  const onAddRows = useCallback(() => {
    dispatch(addRowsThunk({ globalClicked, cell, cellId, cover }));
  }, [dispatch, globalClicked, cell, cellId, cover]);

  const onDelRows = useCallback(() => {
    dispatch(delRowsThunk({ globalClicked, cell, cellId, cover }));
  }, [dispatch, globalClicked, cell, cellId, cover]);

  const onClose = useCallback(() => {
    dispatch(editingdialogClearAll());
    dispatch(tablecanvasClearAll());
    // modal.close();
  }, [modal]);

  useEffect(() => {
    let { cell, cover } = tableConfig;
    cover = {
      ...cover,
      partialSum: refreshPartialSum({
        columnHeader: cover.columnHeader,
        rowHeader: cover.rowHeader
      })
    };

    console.dir(cover);
    
    const cellId = cell.length;

    dispatch(
      setValue({
        cover,
        cell,
        cellId,
        globalClicked: {
          rows: new Map(),
          cols: new Map(),
          cell: new Set()
        }
      })
    );
  }, [tableConfig]);

  useEffect(() => {
    if (!dataSelected && dataBinding && Object.keys(dataBinding).length > 0) {
      let { itemData } = tableConfig;
      // itemData = 'viewconData.nononono';
      if (itemData) {
        const controller = nameFinder(dataBinding, 0, itemData.split('.'));
        const dataSelected =
          '.' + [controller, ...itemData.split('.')].join('.');
        dispatch(setDataSelected({ dataSelected }));
      }
    }
  }, [dispatch, tableConfig, dataBinding, dataSelected]);

  const onContextMenu = useCallback(e => {
    e.preventDefault();
  }, []);

  const onCloseSideModal = useCallback(
    name => {
      dispatch(menuToggle(name));
    },
    [dispatch]
  );

  const onClick = useCallback(e => {
    e.stopPropagation();
  });

  const canvasWidth = cover.columnHeader.reduce((acc, cur) => {
    if (cur.children) {
      return (
        acc + cur.children.reduce((acc, cur) => acc + parseInt(cur.width), 0)
      );
    } else {
      return acc + parseInt(cur.width);
    }
  }, 0);

  return (
    <EditorDialog
      onClick={onClick}
      menu={menu}
      model={model}
      editor={editor}
      actionIcon={actionIcon}
      onMergeCell={onMergeCell}
      onDivideCell={onDivideCell}
      onAddCols={onAddCols}
      onDelCols={onDelCols}
      onAddRows={onAddRows}
      onDelRows={onDelRows}
      onClose={onClose}
      onContextMenu={onContextMenu}
      onCloseSideModal={onCloseSideModal}
      canvasWidth={canvasWidth}
    />
  );
};

export default EditingDialogContainer;
