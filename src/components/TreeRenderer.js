import React from 'react';
import styled, { css } from 'styled-components';

const NameBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 150px;
  font-size: 12px;
  margin-left: ${props => 30 * props.depth + 'px'};
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;

  ${props =>
    props.depth === 0 &&
    css`
      background-color: rgba(0, 0, 0, 0.1);
    `};

  ${props =>
    props.depth === 1 &&
    css`
      background-color: rgba(0, 0, 0, 0.2);
    `};

  ${props =>
    props.depth === 2 &&
    css`
      background-color: rgba(0, 0, 0, 0.3);
      cursor: pointer;
    `};

  ${props =>
    props.depth === 2 &&
    !props.selected &&
    css`
      &:hover {
        background-color: rgba(123, 239, 178, 0.3);
      }
    `};

  ${props =>
    props.depth === 2 &&
    props.selected &&
    css`
      background-color: rgba(123, 239, 178, 0.8);
    `};

  & + & {
    margin-top: 10px;
  }
`;

const TreeRenderer = ({ depth, data, selected, fullText, onClick }) => {
  if (!data) return null;
  console.dir(selected);

  return (
    <React.Fragment>
      {Object.keys(data).map(key => (
        <React.Fragment>
          <NameBlock
            onClick={() => onClick(depth, fullText + '.' + key)}
            depth={depth}
            selected={fullText + '.' + key === selected}
          >
            {key}
          </NameBlock>
          {depth < 2 && data[key] && (
            <TreeRenderer
              depth={depth + 1}
              data={data[key]}
              selected={selected}
              fullText={fullText + '.' + key}
              onClick={onClick}
            />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default TreeRenderer;
