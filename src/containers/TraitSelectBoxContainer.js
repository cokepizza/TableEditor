import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TraitSelectBox from '../components/TraitComponent/TraitSelectBox/TraitSelectBox';
import {
  onChangeThunk,
  onSubmitThunk,
  parentList
} from '../modules/editingdialog';

const TraitBoxContainer = ({ name, param }) => {
  const parentName = parentList[name];
  const { parentObject } = useSelector(({ editingdialog }) => ({
    parentObject: editingdialog.properties[parentName]
  }));

  const index = parentObject.traits.findIndex(trait => trait.name === name);
  const inputValue = parentObject.traits[index].value;

  const dispatch = useDispatch();

  const onClick = useCallback(
    value => {
      dispatch(
        onChangeThunk({
          value,
          name
        })
      );
      dispatch(
        onSubmitThunk({
          value,
          name
        })
      );
    },
    [dispatch]
  );

  return (
    <TraitSelectBox
      name={name}
      value={inputValue}
      param={param}
      onClick={onClick}
    />
  );
};

export default TraitBoxContainer;
