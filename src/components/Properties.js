import React from 'react';
import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { IconContext } from 'react-icons';

import SearchBarContainer from '../containers/SearchBarContainer';
import ListContainer from '../containers/ListContainer';
import HelpBoxContainer from '../containers/HelpBoxContainer';

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

const PropertiesBlock = styled.div`
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

const PropertiesBodyBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(248, 248, 248);
  padding-top: 20px;
`;

const ListViewBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 300px;
  padding-right: 20px;
  padding-left: 20px;
`;

const Properties = ({ active, onCloseSideModal }) => {
  return (
    <PropertiesBlock active={active}>
      <TitleBlock>
        <TitleTextBlock>
          Properties
          <IconContext.Provider
            value={{
              className: 'DialogHeaderIcon',
              style: { width: '25px', height: '25px' }
            }}
          >
            <MdClose onClick={() => onCloseSideModal('Properties')} />
          </IconContext.Provider>
        </TitleTextBlock>
      </TitleBlock>
      <PropertiesBodyBlock>
        <ListViewBlock>
          <SearchBarContainer style={{ height: '30px' }} />
          <ListContainer />
          <HelpBoxContainer />
        </ListViewBlock>
      </PropertiesBodyBlock>
    </PropertiesBlock>
  );
};

export default Properties;
