import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import TraitInputContainer from '../../containers/TraitInputContainer';
import TraitSelectBoxContainer from '../../containers/TraitSelectBoxContainer';

const traitComponents = {
  input: TraitInputContainer,
  selectbox: TraitSelectBoxContainer
};

const traitConverter = ({ ...rest }) => {
  const TraitReactDom = traitComponents[rest.type];
  return <TraitReactDom {...rest} />;
};

const ListItemContentBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
`;

const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  opacity: 0.5;

  & + & {
    border-top: 1px solid black;
  }

  & + &:hover {
    border-top: 1px solid rgba(0, 0, 0, 0.5);
  }

  &:hover {
    opacity: 1;
  }

  .ListItemIcon {
    cursor: pointer;
  }

  .ListItem {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    font-size: 13px;
  }
`;

const ListItem = ({ data, textWrite, textErase, propertyClick }) => {
  console.dir(data);
  const onMouseOver = useCallback(
    e => {
      e.stopPropagation();
      textWrite(e.currentTarget.dataset.name);
    },
    [textWrite]
  );

  const onMouseOut = useCallback(
    e => {
      e.stopPropagation();
      textErase();
    },
    [textErase]
  );

  const onClick = useCallback(
    e => propertyClick(e.currentTarget.dataset.name),
    [propertyClick]
  );

  return (
    <React.Fragment>
      {data.name && data.name !== 'none' && (
        <ListItemWrapper>
          <ListItemContentBox
            data-name={data.name}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
          >
            <IconContext.Provider value={{ className: 'ListItemIcon' }}>
              {data.checked ? <FaCaretDown /> : <FaCaretRight />}
            </IconContext.Provider>
            <div className="ListItem">{data.name}</div>
          </ListItemContentBox>
        </ListItemWrapper>
      )}
      {data.checked &&
        data.traits &&
        data.traits.length > 0 &&
        data.traits.map(trait => (
          <ListItemWrapper
            key={data.name.concat('-', trait.name)}
            data-name={trait.name}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          >
            <ListItemContentBox>
              {traitConverter({
                ...trait,
                onMouseOver,
                onMouseOut
              })}
            </ListItemContentBox>
          </ListItemWrapper>
        ))}
    </React.Fragment>
  );
};

export default ListItem;
