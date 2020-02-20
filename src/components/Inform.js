import React from 'react';
import styled, { css } from 'styled-components';
import { IconContext } from 'react-icons';
import { MdClose } from 'react-icons/md';

const TitleBlock = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  margin-bottom: 5px;
  border-bottom: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  z-index: 1000;
`;

const TitleTextBlock = styled.div`
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  margin: 0px;
  cursor: default;
  background-color: white;
`;

const InformBlock = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  left: calc(100% - 400px);
  width: 400px;
  height: 100%;
  color: black;
  transition: 0.5s;
  z-index: 500;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  visibility: hidden;

  ${props =>
    props.active &&
    css`
      left: calc(0% - 405px);
      visibility: visible;
    `}
`;

const InformBodyBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: rgb(248, 248, 248);
  /* padding-top: 20px;
    padding-bottom: 20px; */
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
`;

const TextBlock = styled.p`
  margin: 0px;
  height: 20px;
  font-size: 12px;
  padding-left: 0px;

  ${props =>
    props.title &&
    css`
      font-weight: bold;
      padding-left: 10px;
    `}

  ${props =>
    props.span &&
    css`
      padding-left: 30px;
    `}
`;

const SpanBlock = styled.div`
  height: 15px;

  ${props =>
    props.small &&
    css`
      height: 10px;
    `}
`;

const Inform = ({ active, onCloseSideModal }) => {
  return (
    <InformBlock active={active}>
      <TitleBlock>
        <TitleTextBlock>
          Inform
          <IconContext.Provider
            value={{
              className: 'DialogHeaderIcon',
              style: { width: '25px', height: '25px' }
            }}
          >
            <MdClose onClick={() => onCloseSideModal('Inform')} />
          </IconContext.Provider>
        </TitleTextBlock>
      </TitleBlock>
      <InformBodyBlock>
        <TextBlock>This table is similar to Excel operation </TextBlock>
        <SpanBlock />
        <TextBlock title>Functional Specification</TextBlock>
        <TextBlock span>• Row Add & Del</TextBlock>
        <TextBlock span>• Col Add & Del</TextBlock>
        <TextBlock span>
          • Cell MultiSelect using Ctrl Key & Drag
        </TextBlock>
        <TextBlock span>• Cell Merge</TextBlock>
        <TextBlock span>• Cell Divide</TextBlock>
        <TextBlock span>• Row, Col, Cell Property Setting</TextBlock>
        <TextBlock span>• Both header & body Editable</TextBlock>
        <TextBlock span>• Header only Editable</TextBlock>
        <TextBlock span>• Edit both the header and the body</TextBlock>
        <TextBlock span>• Provide a Property helpbox</TextBlock>
        <TextBlock span>• Table Databinding Setting</TextBlock>
        <SpanBlock small />
        <TextBlock title>Shortcut</TextBlock>
        <TextBlock span>• Cell Merge : ＋ Button</TextBlock>
        <TextBlock span>• Cell Divide : － Button</TextBlock>
        <SpanBlock small />
        <TextBlock title>Restiction</TextBlock>
        <TextBlock span>
          • Merge cells only works with rectangular shapes
        </TextBlock>
        <TextBlock span>
          • Merge cells only works in the same area
        </TextBlock>
      </InformBodyBlock>
    </InformBlock>
  );
};

export default Inform;
