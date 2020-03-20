import React from 'react';
import styled, { css } from 'styled-components';

import Resize from '../static/resize.png';
import ArrowUp from '../static/arrow_up.png';
import ArrowDown from '../static/arrow_down.png';
import Checked from '../static/checked.png';

const ImageBlock = styled.img`
  height: 6px;
  width: 10px;
`;

const ImageIconFrameBlock = styled.div`
  position: relative;
  height: 20px;
  width: 20px;
`;

const ImageBlockWrapper = styled.div`
  display: flex;
  justify-content: center;
  opacity: 0.5;
  height: 13px;
  width: 15px;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  ${props =>
    props.marginDown &&
    css`
      align-items: flex-end;
      margin-bottom: 2px;
    `}

  ${props =>
    props.marginUp &&
    css`
      align-items: flex-start;
      margin-top: 2px;
    `}
`;

const ImageIconBlock = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
  opacity: 1;

  ${props =>
    props.scale &&
    css`
      opacity: 0.5;
    `}
`;

const ScaleBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const NumberBlock = styled.div`
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  font-size: 12px;
  box-sizing: border-box;
  padding: 0px 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
`;

const CheckedImageIconBlock = styled.img`
  position: absolute;
  cursor: pointer;
  top: -20%;
  left: 40%;
  height: 15px;
  width: 15px;
`;

const MoveBlock = styled.div`
  height: 20px;
  transition: width 1s, opacity 0.5s;
  display: flex;
  align-items: center;
  opacity: 0;
  width: 0;
  overflow: hidden;

  ${props =>
    props.scale &&
    css`
      opacity: 1;
      width: 60px;
    `}
`;

const Scale = ({ scale, zoom, onClick, onArrowClick }) => {
  return (
    <ScaleBlock>
      <ImageIconFrameBlock onClick={onClick}>
        <ImageIconBlock src={Resize} scale={scale} />
        {scale && <CheckedImageIconBlock src={Checked} />}
      </ImageIconFrameBlock>
      <MoveBlock scale={scale}>
        <NumberBlock>{zoom && zoom.toFixed(1)}</NumberBlock>
        <IconBlock>
          <ImageBlockWrapper marginDown onClick={() => onArrowClick('up')}>
            <ImageBlock src={ArrowUp} />
          </ImageBlockWrapper>
          <ImageBlockWrapper marginUp onClick={() => onArrowClick('down')}>
            <ImageBlock src={ArrowDown} />
          </ImageBlockWrapper>
        </IconBlock>
      </MoveBlock>
    </ScaleBlock>
  );
};

export default Scale;
