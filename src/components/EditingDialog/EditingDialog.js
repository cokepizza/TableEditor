import React, { useCallback } from 'react';
import './EditingDialog.scss';
import { MdClose } from 'react-icons/md';

import { IconContext } from 'react-icons';
import styled, { css } from 'styled-components';

import HeaderButtonContainer from '../../containers/HeaderButtonContainer';
import TableCanvasContainer from '../../containers/TableCanvasContainer';
import SubmitFormContainer from '../../containers/SubmitFormContainer';
import CheckKeyEvent from '../Hook/CheckKeyEvent';
import DataBindingContainer from '../../containers/DataBindingContainer';
import InformContainer from '../../containers/InformContainer';
import HeaderOnlyContainer from '../../containers/HeaderOnlyContainer';
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

const TableCanvasFrameBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-left: 20px;
  margin-right: 20px;
  min-height: 300px;
  max-width: 800px;
  min-width: 422px;

  ${props =>
    !props.scroll &&
    css`
      &::-webkit-scrollbar-track {
        background: transparent !important;
        border: transparent !important;
      }

      &::-webkit-scrollbar {
        background: transparent !important;
        height: 15px;
      }

      &::-webkit-scrollbar-thumb {
        background: transparent !important;
        border: transparent !important;
      }
    `}

  /* &::-webkit-scrollbar-track {
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
  } */

  ${props =>
    props.scroll &&
    css`
      &::-webkit-scrollbar-track {
        box-shadow: inset rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
          rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
          rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
        border-radius: 10px;
        background-color: white !important;
        border: 1px solid rgba(0, 0, 0, 0.3) !important;
      }

      &::-webkit-scrollbar {
        background-color: white !important;
        height: 15px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.2) !important;
        background-color: rgba(0, 0, 0, 0.1) !important;
      }
    `}
`;

const IconBlock = styled.img`
  @keyframes blinker {
    50% {
      opacity: 0.3;
    }
  }

  height: 20px;
  width: 20px;
  cursor: pointer;
  position: relative;

  &:hover {
    animation: blinker 1s linear infinite;
    animation-iteration-count: 1;
  }
`;

const IconFrameBlock = styled.div`
  position: relative;

  & + & {
    margin-left: 10px;
  }

  &:hover::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    bottom: 100%;
    top: 31px;
    left: 4px;
    border: 5px solid transparent;
    border-top: none;
    border-bottom-color: black;
    z-index: 100;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
  }

  &:hover::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    bottom: 100%;
    top: 32px;
    left: 5px;
    border: 4px solid transparent;
    border-top: none;
    border-bottom-color: white;
    z-index: 200;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
  }
`;

const IconPseudoBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover::after {
    content: "${props => props.tooltip}";
    font-size: 11px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    top: 35px;
    left: -26px;
    background: rgba(255, 255, 255, 0.8);
    width: 44px;
    height: 4px;
    overflow: hidden;
    border: 1px solid black;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
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
  /* display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 300px;
  max-width: 800px;
  min-width: 422px;
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
  } */
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
            <IconFrameBlock>
              <IconPseudoBlock tooltip="edit">
                <IconBlock src={EditIcon} />
              </IconPseudoBlock>
            </IconFrameBlock>
            <IconFrameBlock>
              <IconPseudoBlock tooltip="erase">
                <IconBlock src={EraseIcon} />
              </IconPseudoBlock>
            </IconFrameBlock>
            <IconFrameBlock>
              <IconPseudoBlock tooltip="merge">
                <IconBlock
                  src={MergeIcon}
                  onClick={onMergeCell}
                  disabled={!actionIcon[0]}
                />
              </IconPseudoBlock>
            </IconFrameBlock>
            <IconFrameBlock>
              <IconPseudoBlock tooltip="divide">
                <IconBlock src={DivideIcon} onClick={onDivideCell} />
              </IconPseudoBlock>
            </IconFrameBlock>
            <div className="verticalLine" />
            <IconFrameBlock>
              <IconPseudoBlock tooltip="add col">
                <IconBlock src={AddCols} onClick={onAddCols} />
              </IconPseudoBlock>
            </IconFrameBlock>
            <IconFrameBlock>
              <IconPseudoBlock tooltip="del col">
                <IconBlock src={DelCols} onClick={onDelCols} />
              </IconPseudoBlock>
            </IconFrameBlock>
            <div className="verticalLine" />
            <IconFrameBlock>
              <IconPseudoBlock tooltip="add row">
                <IconBlock src={AddRows} onClick={onAddRows} />
              </IconPseudoBlock>
            </IconFrameBlock>
            <IconFrameBlock>
              <IconPseudoBlock tooltip="del row">
                <IconBlock src={DelRows} onClick={onDelRows} />
              </IconPseudoBlock>
            </IconFrameBlock>
            <div className="verticalLine" />
            <IconFrameBlock>
              <IconPseudoBlock tooltip="crop">
                <HeaderOnlyContainer />
              </IconPseudoBlock>
            </IconFrameBlock>
            <IconFrameBlock>
              <IconPseudoBlock tooltip="scale">
                <ScaleContainer />
              </IconPseudoBlock>
            </IconFrameBlock>
          </div>
        </div>
        <DialogBody>
          <TableCanvasFrameBlock
            scroll={canvasWidth >= 800 ? 'true' : undefined}
            style={{
              justifyContent: canvasWidth < 600 ? 'center' : 'flex-start'
            }}
          >
            <TableCanvasContainer />
          </TableCanvasFrameBlock>
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
