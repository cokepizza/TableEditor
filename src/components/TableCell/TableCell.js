import React from 'react';
import styled from 'styled-components';
const keySet = new Set([
  'div',
  'top',
  'left',
  'width',
  'height',
  'state',
  'cellIndex'
]);

const TableCellBlock = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: cell;
  user-select: none;
  &:hover {
    z-index: 1000;
    position: relative;
    outline: 1px solid blueviolet;
  }
`;
const BorderBottom = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  height: 1px;
  background-color: black;
  z-index: -1;
`;

const BorderRight = styled.div`
  position: absolute;
  top: 0px;
  left: -1px;
  width: 1px;
  background-color: black;
  z-index: -1;
`;

const CheckBoxBlock = styled.input`
  position: absolute;
`;

const TableCell = ({
  top,
  left,
  width,
  height,
  state,
  div,
  cellIndex,
  onMouseOver,
  onMouseDown,
  onMouseMove,
  onMouseUp
}) => {
  // console.dir('----------------------');
  // console.dir(div.id);
  // console.dir(div);
  // console.dir('----------------------');
  return (
    <TableCellBlock
      style={{
        top: top ? top : '0px',
        left: left ? left : '0px',
        width: width ? width : '0px',
        height: height ? height : '0px',
        backgroundColor: state === 'clicked' ? 'pink' : 'transparent'
      }}
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <BorderBottom style={{ width: width ? width + 1 : '0px' }} />
      <BorderRight style={{ height: height ? height : '0px' }} />
      {div.checkbox && div.checkbox.toString() === 'true' && (
        <CheckBoxBlock
          type="checkbox"
          style={{
            margin: '0px',
            top: '3px',
            left: 'calc(100% - 16px)',
            opacity: '0.7'
          }}
        />
      )}
      Cell {cellIndex}
    </TableCellBlock>
  );
};

export default React.memo(TableCell, (prevProps, nextProps) => {
  return Object.keys(prevProps).every(key => {
    if (keySet.has(key)) {
      return prevProps[key] === nextProps[key];
    }
    return true;
  });
});
