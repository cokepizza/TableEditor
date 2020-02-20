import React from 'react';
import styled from 'styled-components';

const TraitInputFrameBlock = styled.form`
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 50px;
  box-sizing: border-box;
  height: 100%;
  cursor: pointer;
`;

const NameBlock = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 60px;
`;

const TraitInputBlock = styled.input`
  height: 22px;
  user-select: none;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  width: 120px;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;

  background-color: rgba(0, 0, 0, 0.03);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.28), 0 3px 1px -2px rgba(0, 0, 0, 0.4),
    0 1px 5px 0 rgba(0, 0, 0, 0.24);
`;

const TraitInput = ({ inputRef, onClick, onChange, onSubmit, name, value }) => {
  return (
    <TraitInputFrameBlock onClick={onClick} onSubmit={e => onSubmit(e, name)}>
      <NameBlock>{name}</NameBlock>
      <TraitInputBlock
        spellCheck="false"
        ref={inputRef}
        value={value}
        onChange={e => onChange(e, name)}
        onBlur={e => onSubmit(e, name)}
      />
    </TraitInputFrameBlock>
  );
};

export default TraitInput;
