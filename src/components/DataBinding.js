import React from 'react';
import styled, { css } from 'styled-components';
import { IconContext } from 'react-icons';
import { MdClose } from 'react-icons/md';

import Spinner from '../static/spinner.svg';
import TreeRenderer from '../components/TreeRenderer';

const ImageBlock = styled.img`
  width: 50px;
  height: 50px;
`;

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

const DataBindingBlock = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
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
      left: calc(100% + 5px);
      visibility: visible;
    `}
`;

const DataBindingBodyBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(248, 248, 248);
  /* padding-top: 20px;
    padding-bottom: 20px; */
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;

  ${props =>
    props.data &&
    !props.loading &&
    css`
      align-items: flex-start;
      justify-content: flex-start;
      padding-left: 100px;
    `}
`;

const DataBinding = ({
  active,
  onCloseSideModal,
  onClick,
  loading,
  error,
  data,
  selected
}) => {
  return (
    <DataBindingBlock active={active}>
      <TitleBlock>
        <TitleTextBlock>
          DataBinding
          <IconContext.Provider
            value={{
              className: 'DialogHeaderIcon',
              style: { width: '25px', height: '25px' }
            }}
          >
            <MdClose onClick={() => onCloseSideModal('DataBinding')} />
          </IconContext.Provider>
        </TitleTextBlock>
      </TitleBlock>
      <DataBindingBodyBlock loading={loading} data={data}>
        {loading || !data ? (
          <ImageBlock src={Spinner} />
        ) : (
          <TreeRenderer
            depth={0}
            data={data}
            selected={selected}
            onClick={onClick}
            fullText=""
          />
        )}
      </DataBindingBodyBlock>
    </DataBindingBlock>
  );
};

export default DataBinding;
