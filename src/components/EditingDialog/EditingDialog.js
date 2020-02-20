import React, { useCallback } from 'react';
import './EditingDialog.scss';
import { MdClose } from 'react-icons/md';

import { IconContext } from 'react-icons';
import styled from 'styled-components';

import HeaderButtonContainer from '../../containers/HeaderButtonContainer';
import TableCanvasContainer from '../../containers/TableCanvasContainer';
import SubmitFormContainer from '../../containers/SubmitFormContainer';
import CheckKeyEvent from '../Hook/CheckKeyEvent';
import DataBindingContainer from '../../containers/DataBindingContainer';
import InformContainer from '../../containers/InformContainer';
import CheckBoxContainer from '../../containers/CheckBoxContainer';
import PropertiesContainer from '../../containers/PropertiesContainer';
import ScaleContainer from '../../containers/ScaleContainer';

import MergeIcon from '../../static/merge.png';
import DivideIcon from '../../static/divide.png';
import AddCols from '../../static/add_cols.png';
import DelCols from '../../static/del_cols.png';
import AddRows from '../../static/add_rows.png';
import DelRows from '../../static/del_rows.png';
import EditIcon from '../../static/edit.png';
import EraseIcon from '../../static/erase.png';

const IconBlock = styled.img`
  @keyframes blinker {
    50% {
      opacity: 0.3;
    }
  }

  height: 20px;
  width: 20px;
  cursor: pointer;

  &:hover {
    animation: blinker 1s linear infinite;
    animation-iteration-count: 1;
  }

  & + & {
    margin-left: 10px;
  }
`;

const DialogFooterBlock = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  box-sizing: border-box;
  padding: 20px;
  align-items: flex-end;
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
  color: black;
`;

const DialogBody = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 300px;
  max-width: 800px;
  min-width: 446px;
  margin-left: 20px;
  margin-right: 20px;
  overflow-x: auto;

  &::-webkit-scrollbar-track {
    box-shadow: inset rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
      rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar {
    background-color: white;
    height: 15px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const EditingDialog = ({
  menu,
  model,
  editor,
  actionIcon,
  onMergeCell,
  onDivideCell,
  onAddCols,
  onDelCols,
  onAddRows,
  onDelRows,
  onClose,
  onContextMenu,
  onClick,
  onCloseSideModal,
  canvasWidth
}) => {
  CheckKeyEvent(
    useCallback(
      e => {
        if (e.keyCode === 107) {
          onMergeCell();
        } else if (e.keyCode === 109) {
          onDivideCell();
        }
      },
      [onMergeCell, onDivideCell]
    )
  );

  return (
    <div className="Canvas" onClick={onClick} onContextMenu={onContextMenu}>
      <TitleBlock>
        <TitleTextBlock>
          Table Editor Dialog
          <IconContext.Provider
            value={{
              className: 'DialogHeaderIcon',
              style: { width: '25px', height: '25px' }
            }}
          >
            <MdClose onClick={onClose} />
          </IconContext.Provider>
        </TitleTextBlock>
      </TitleBlock>
      <div className="EditingDialog">
        <div className="DialogHeader">
          <div className="DialogHeaderSelectBox">
            {Object.keys(menu).map(menuName => (
              <HeaderButtonContainer
                checked={menu[menuName]['checked']}
                key={menuName}
              >
                {menuName}
              </HeaderButtonContainer>
            ))}
          </div>
          <div className="DialogHeaderIconBox">
            <IconBlock src={EditIcon} />
            <IconBlock src={EraseIcon} />
            <IconBlock
              src={MergeIcon}
              onClick={onMergeCell}
              disabled={!actionIcon[0]}
            />
            <IconBlock src={DivideIcon} onClick={onDivideCell} />
            <div className="verticalLine" />
            <IconBlock src={AddCols} onClick={onAddCols} />
            <IconBlock src={DelCols} onClick={onDelCols} />
            <div className="verticalLine" />
            <IconBlock src={AddRows} onClick={onAddRows} />
            <IconBlock src={DelRows} onClick={onDelRows} />
            <div className="verticalLine" />
            <CheckBoxContainer title="header only" />
            <ScaleContainer />
          </div>
        </div>
        <DialogBody
          style={{
            justifyContent: canvasWidth < 600 ? 'center' : 'flex-start'
          }}
        >
          <div>
            <TableCanvasContainer />
          </div>
        </DialogBody>
        <DialogFooterBlock>
          <SubmitFormContainer model={model} onClose={onClose} />
        </DialogFooterBlock>
      </div>

      <InformContainer onCloseSideModal={onCloseSideModal} />
      <PropertiesContainer onCloseSideModal={onCloseSideModal} />
      <DataBindingContainer
        onCloseSideModal={onCloseSideModal}
        editor={editor}
      />
    </div>
  );
};

export default EditingDialog;
