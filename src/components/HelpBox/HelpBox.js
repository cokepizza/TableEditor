import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import './HelpBox.scss';

const HelpBoxBlock = styled.div``;
const HelpBoxOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6em;
  border: 1px solid black;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  background-color: white;
`;

const HelpBox = ({ style, text }) => {
  return (
    <HelpBoxOuter>
      <p className={cn('ellipsis-3', 'HelpBox')} style={{ ...style }}>
        {text}
      </p>
    </HelpBoxOuter>
  );
};

export default HelpBox;
