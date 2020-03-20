import React from 'react';
import styled, { css } from 'styled-components';

import Crop from '../static/crop.png';
import Checked from '../static/checked.png';

const ImageIconFrameBlock = styled.div`
  position: relative;
  height: 20px;
  width: 20px;
`;

const ImageIconBlock = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;

  ${props =>
    props.headerOnly &&
    css`
      opacity: 0.5;
    `}
`;

const CheckedImageIconBlock = styled.img`
  position: absolute;
  cursor: pointer;
  top: -20%;
  left: 40%;
  height: 15px;
  width: 15px;
`;

const HeaderOnly = ({ headerOnly, onClick }) => {
  return (
    <ImageIconFrameBlock onClick={onClick}>
      <ImageIconBlock src={Crop} headerOnly={headerOnly} />
      {headerOnly && <CheckedImageIconBlock src={Checked} />}
    </ImageIconFrameBlock>
  );
};

export default HeaderOnly;
