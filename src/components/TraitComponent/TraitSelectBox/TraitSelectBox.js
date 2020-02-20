import React from 'react';
import styled, { css } from 'styled-components';

// import TraitButton from '../TraitButton/TraitButton';

const SelectBoxFrameBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

const SelectBoxBundleBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

const SelectBoxButtonBlock = styled.button`
  width: 100%;
  height: 80%;
  padding: 0;
  margin: 0;
  border: 0;
  outline: none;
  background-color: white;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.4) 0px 3px 1px -2px, rgba(0, 0, 0, 0.24) 0px 1px 5px 0px;

  & + & {
    margin-left: 5px;
  }

  ${props =>
    !props.checked &&
    css`
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        opacity: 1;
      }
    `}

  ${props =>
    props.checked &&
    css`
      background-color: rgba(0, 0, 0, 0.2);
    `}
`;

const NameBlock = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 60px;
`;

// const SelectBox = () => {
//   return (
//     <>
//     </>
//   )
// }

const SelectBox = ({ name, value, param, onClick }) => {
  return (
    <SelectBoxFrameBlock>
      <NameBlock>{name}</NameBlock>
      <SelectBoxBundleBlock>
        {param &&
          param.map((tagName, index) =>
            tagName.toString() === value.toString() ? (
              <SelectBoxButtonBlock
                key={`selectbox_${tagName}_${index}`}
                checked
                onClick={() => onClick(tagName)}
              >
                {tagName}
              </SelectBoxButtonBlock>
            ) : (
              <SelectBoxButtonBlock
                key={`selectbox_${tagName}_${index}`}
                onClick={() => onClick(tagName)}
              >
                {tagName}
              </SelectBoxButtonBlock>
            )
          )}
      </SelectBoxBundleBlock>
    </SelectBoxFrameBlock>
  );
};



export default SelectBox;
