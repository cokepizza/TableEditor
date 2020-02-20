import React, { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TraitInput from '../components/TraitComponent/TraitInput/TraitInput';
import {
  onChangeThunk,
  onSubmitThunk,
  parentList
} from '../modules/editingdialog';

const TraitInputContainer = ({ name, onMouseOver, onMouseOut }) => {
  const parentName = parentList[name];
  const { parentObject } = useSelector(({ editingdialog }) => ({
    parentObject: editingdialog.properties[parentName]
  }));

  const inputRef = useRef();
  const dispatch = useDispatch();

  const index = parentObject.traits.findIndex(trait => trait.name === name);
  const inputValue = parentObject.traits[index].value;

  const onClick = useCallback(() => {
    inputRef.current.focus();
  }, []);

  const onChange = useCallback(
    (e, name) => {
      dispatch(
        onChangeThunk({
          value: e.target.value,
          name
        })
      );
    },
    [dispatch]
  );

  const onSubmit = useCallback(
    (e, name) => {
      e.preventDefault();
      dispatch(
        onSubmitThunk({
          value: inputRef.current.value,
          name
        })
      );
    },
    [dispatch]
  );

  return (
    <TraitInput
      inputRef={inputRef}
      onClick={onClick}
      onChange={onChange}
      onSubmit={onSubmit}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      name={name}
      value={inputValue}
    />
  );
};

export default TraitInputContainer;
