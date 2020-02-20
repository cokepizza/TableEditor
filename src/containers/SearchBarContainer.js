import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../components/SearchBar/SearchBar';
import { propertyFilterThunk } from '../modules/editingdialog';

const SearchBarContainer = props => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const onChange = useCallback(
    e => {
      setValue(e.target.value);
      // propertyFilter(e.target.value);
      dispatch(
        propertyFilterThunk({
          value: e.target.value
        })
      );
    },
    [dispatch]
  );

  return <SearchBar {...props} value={value} onChange={onChange} />;
};

export default SearchBarContainer;
