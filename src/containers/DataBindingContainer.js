import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DataBinding from '../components/DataBinding';
import useAsync from '../components/Hook/useAsync';
import jsonParser from '../lib/jsonParser';
import {
  setDataSelected,
  setDataBinding,
  setDataReload,
  clearDataBinding
} from '../modules/tablecanvas';

const DataBindingContainer = ({ onCloseSideModal, editor }) => {
  const { menu, dataBinding, dataSelected, dataReload } = useSelector(
    ({ editingdialog, tablecanvas }) => ({
      menu: editingdialog.menu,
      dataBinding: tablecanvas.dataBinding,
      dataSelected: tablecanvas.dataSelected,
      dataReload: tablecanvas.dataReload
    })
  );

  const dispatch = useDispatch();

  const connection = async () => {
    const DBSvc = editor.getModel().get('DBSvc');

    try {
      const data = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          resolve(await DBSvc.getDataInstanceList());
        }, 1000);
      });

      const dataInstancePackage = data.global.reduce(
        (acc, cur) => [...acc, ...cur.dataInstancePackage],
        []
      );
      data.global = [
        {
          Name: 'global',
          Id: 'global',
          dataInstancePackage
        }
      ];

      const localNameTree = jsonParser(data.viewController);
      const globalNameTree = jsonParser(data.global);
      const dataBinding = { ...globalNameTree, ...localNameTree };

      dispatch(
        setDataBinding({
          dataBinding
        })
      );
    } catch (e) {
      console.dir(e);
    }

    return true;
  };

  useEffect(() => {
    if (menu['DataBinding']['checked']) {
      dispatch(setDataReload());
    } else {
      dispatch(clearDataBinding());
    }
  }, [menu['DataBinding']['checked']]);

  const onClick = useCallback(
    (depth, dataSelected) => {
      if (depth !== 2) return;

      dispatch(setDataSelected({ dataSelected }));
    },
    [dispatch]
  );

  const [state] = useAsync(connection, [dispatch, dataReload]);

  const { loading, data, error } = state;

  return (
    <DataBinding
      active={menu['DataBinding']['checked']}
      onCloseSideModal={onCloseSideModal}
      onClick={onClick}
      loading={loading}
      error={error}
      data={dataBinding}
      selected={dataSelected}
    />
  );
};

export default DataBindingContainer;
