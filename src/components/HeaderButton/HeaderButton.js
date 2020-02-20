import React, { useCallback } from 'react';
import styled from 'styled-components';
import DefaultButton from '../DefaultButton/DefaultButton';
import classnames from 'classnames';
import './HeaderButton.scss';

// const HeaderButtonBlock = styled.button`
//   @-webkit-keyframes mover {
//       0% { transform: translateY(0); }
//       20% { transform: translateY(-2px); }
//   }
//   @keyframes mover {
//       0% { transform: translateY(0); }
//       20% { transform: translateY(-2px); }
//   }

//   border: 0px;
//   background: none;
//   justify-content: flex-start;
//   font-variant-caps: all-petite-caps;
//   opacity: 0.3;
//   width: initial;
//   border-radius: 30px;
//   user-select: none;

//   &+& {
//       margin-left: 10px;
//   }

//   &:hover {
//       background: none;
//       -webkit-animation: mover 2s infinite  alternate;
//       animation: mover 2s infinite  alternate;
//   }

//   ${props => props.checked && css`
//     opacity: 1;
//   `}
// `;

const HeaderButton = ({ checked, onClick, children }) => {
  return (
    <DefaultButton
      cn={classnames('HeaderButton', { checked })}
      onClick={() => onClick(children)}
    >
      {children}
    </DefaultButton>
  );
};

export default React.memo(HeaderButton);
