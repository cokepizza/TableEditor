import React from 'react';
import styled from 'styled-components';

const SubmitFormBlock = styled.form`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const ButtonBlock = styled.button`
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: none;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  user-select: none;
  outline: none;

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }

  & + & {
    margin-left: 20px;
  }
`;

const SubmitForm = ({ onSubmit, onCancel }) => {
  return (
    <SubmitFormBlock onSubmit={onSubmit}>
      <ButtonBlock type="submit">Submit</ButtonBlock>
      <ButtonBlock type="button" onClick={onCancel}>
        Cancel
      </ButtonBlock>
    </SubmitFormBlock>
  );
};

export default SubmitForm;
