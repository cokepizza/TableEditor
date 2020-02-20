import React from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

const ScaleBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  display: none;
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const NumberBlock = styled.div`
  margin-left: 5px;
  font-size: 12px;
  padding: 1px 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
`;

const TitleBlock = styled.div`
  font-size: 12px;
`;

const Scale = () => {
  return (
    <ScaleBlock>
      <TitleBlock>scale</TitleBlock>
      <NumberBlock>1.0</NumberBlock>
      <IconBlock>
        <IconContext.Provider
          value={{ style: { width: '20px', height: '15px' } }}
        >
          <FaCaretUp />
        </IconContext.Provider>
        <IconContext.Provider
          value={{ style: { width: '20px', height: '15px' } }}
        >
          <FaCaretDown />
        </IconContext.Provider>
      </IconBlock>
    </ScaleBlock>
  );
};

export default Scale;
