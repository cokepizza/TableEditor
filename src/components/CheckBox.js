import React from 'react';
import styled from 'styled-components';

const CheckBoxBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckBoxInputBlock = styled.input``;

const TitleBlock = styled.div`
  font-size: 12px;
  padding-right: 5px;
`;

const CheckBox = ({ title, active, onChange }) => {
  return (
    <CheckBoxBlock>
      <TitleBlock>{title}</TitleBlock>
      <CheckBoxInputBlock
        type="checkbox"
        checked={active}
        onChange={onChange}
      />
    </CheckBoxBlock>
  );
};

export default CheckBox;
