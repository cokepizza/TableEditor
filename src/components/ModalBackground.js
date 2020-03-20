import React from 'react';
import styled from 'styled-components';
import EditingDialogContainer from '../containers/EditingDialogContainer';

const ModalBackgroundBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  z-index: 1000;
  user-select: none;
`;

const ModalBackground = ({ onClick, ...rest }) => {
  return (
    <ModalBackgroundBlock onClick={onClick}>
      <EditingDialogContainer {...rest} />
    </ModalBackgroundBlock>
  );
};

export default ModalBackground;
