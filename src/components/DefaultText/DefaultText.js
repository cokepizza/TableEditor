import React from 'react';
import styled from 'styled-components';

const DefaultTextBlock = styled.p`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 12px;
    font-weight: bold;
    width: 100%;
    height: 100%;
    margin: 0px;
    cursor: default;
`

// className={classnames(props.cn, 'DefaultText')}
const DefaultText = props => {
  return (
    <DefaultTextBlock
      className={props.cn}
      style={{ ...props.style }}
      {...props}
    >
      {props.children}
    </DefaultTextBlock>
  );
};

export default DefaultText;
