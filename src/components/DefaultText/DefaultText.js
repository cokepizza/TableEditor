import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import './DefaultText.scss';

// const DefaultTextBlock = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
//     font-size: 12px;
//     font-weight: bold;
//     width: 100%;
//     height: 100%;
//     margin: 0px;
//     cursor: default;
// `

const DefaultText = props => {
  return (
    <p
      className={classnames(props.cn, 'DefaultText')}
      style={{ ...props.style }}
      {...props}
    >
      {props.children}
    </p>
  );
};

export default DefaultText;
