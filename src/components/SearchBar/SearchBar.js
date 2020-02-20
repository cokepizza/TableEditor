import React from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FaSistrix } from 'react-icons/fa';
import './SearchBar.scss';

const SearchBarBlock = styled.input`
  background-color: white;
  border: none;
  height: 100%;
  width: 90%;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  &:focus {
    outline: none;
  }
`;

const SearchBarFrameBlock = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  box-sizing: border-box;
  border: 1px solid black;
`;

const SearchBar = ({ style, value, onChange }) => {
  return (
    <SearchBarFrameBlock style={{ ...style }}>
      <SearchBarBlock value={value} onChange={onChange} />
      <IconContext.Provider value={{ className: 'SearchIcon' }}>
        <FaSistrix />
      </IconContext.Provider>
    </SearchBarFrameBlock>
  );
};

export default SearchBar;
