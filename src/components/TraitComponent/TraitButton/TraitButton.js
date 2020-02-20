import React from 'react';
import styled from 'styled-components';

const TraitButtonBlock = styled.div`
  border: none;
  width: 100%;
  background-color: white;
  box-sizing: border-box;
  border-style: solid;
  border-color: black;
  opacity: 0.7;
  transition: 0.5s;
  height: 80%;

  & + & {
    border-width: 1px 0px 1px 1px;
  }

  &:first-child {
    border-width: 1px 0px 1px 1px;
  }

  &:last-child {
    border-width: 1px 1px 1px 1px;
  }

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: pink;
    opacity: 1;
  }
`;

const TraitButton = ({ children }) => {
  return <TraitButtonBlock>{children}</TraitButtonBlock>;
};

export default TraitButton;
