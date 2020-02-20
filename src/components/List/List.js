import * as React from 'react';
import styled from 'styled-components';
import ListItemContainer from '../../containers/ListItemContainer';

const ListBlock = styled.div`
  width: 100%;
  flex: 1;
  margin-top: 10px;
  margin-bottom: 10px;
  /* overflow-y: scroll; */
  overflow-y: hidden;
  overflow-x: hidden;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  background-color: white;
  box-sizing: border-box;
  border: 1px solid black;
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar:hover {
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #eee;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 20px;
  margin-bottom: 9px;
  padding-left: 10px;
  padding-right: 10px;
  /* width: fit-content; */
  width: 60px;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
`;

const List = ({ datas, selected }) => {
  let title;
  if (selected.type) {
    const type = selected.type === 'column' ? 'col' : selected.type;
    title = type + ' ' + selected.index;
  }

  return (
    <ListBlock>
      {title && <TitleBlock>{title}</TitleBlock>}
      {datas &&
        Object.values(datas).map((data, index) =>
          data.visible ? (
            <ListItemContainer key={`data_${index}`} data={data} />
          ) : null
        )}
    </ListBlock>
  );
};

export default React.memo(
  List,
  (prevProps, nextProps) => prevProps.datas === nextProps.datas
);
