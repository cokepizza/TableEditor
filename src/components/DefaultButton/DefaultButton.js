import React from 'react';
import classnames from 'classnames';
import './DefaultButton.scss';

// const DefaultButtonBlock = styled.div`
//  border: none;
//     width: 100%;
//     height: 100%;
//     background-color: white;
//     box-sizing: border-box;
//     border-style: solid;
//     border-color: black;
//     opacity: 0.7;
//     transition: 0.5s;

//     & + & {
//         border-width: 1px 0px 1px 1px;
//     }

//     &:first-child {
//         border-width: 1px 0px 1px 1px;
//     }

//     &:last-child {
//         border-width: 1px 1px 1px 1px;
//     }

//     &:focus {
//         outline:0;
//     }

//     &:hover {
//         background-color: pink;
//         opacity: 1;
//     }
// `

const DefaultButton = ({ cn, style, children, onClick }) => {
  return (
    <button
      className={classnames(cn, 'DefaultButton')}
      style={{ ...style }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
