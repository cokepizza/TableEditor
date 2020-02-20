import React from 'react';
import styled, { css } from 'styled-components';

const TableHeaderBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* pointer-events: none; */
    margin: 0px;
    font-size: 12px;
    font-weight: bold;

    &:hover {
      background-color: rgb(255, 192, 203, 0.5);
    }

    ${props =>
      props.state === 'clicked'
        ? css`
            background-color: rgb(255, 192, 203, 0.7);
          `
        : css`
            ${props =>
              props.state === 'hovered'
                ? css`
                    background-color: rgb(255, 192, 203, 0.3);
                  `
                : css``}
          `}

    ${props =>
      props.row &&
      css`
        border-left: 1px solid black;
        flex-direction: column;
        height: ${props => props.height};
        ${props =>
          props.index > 0 &&
          css`
            &::before {
              content: '';
              position: absolute;
              top: -3px;
              left: 0px;
              height: 7px;
              background-color: transparent;
              width: 100%;
              /* pointer-events: all; */
            }

            &::after {
              content: '';
              position: absolute;
              top: 0px;
              left: 0px;
              height: 1px;
              background-color: black;
              width: 100%;
              /* pointer-events: all; */
            }

            &:hover::before {
              cursor: row-resize;
            }

            &:hover::after {
              cursor: row-resize;
            }
          `};
      `}


    ${props =>
      props.col &&
      css`
        border-top: 1px solid black;
        width: ${props => props.width};
        ${props =>
          props.index > 0
            ? css`
                &::before {
                  content: '';
                  position: absolute;
                  top: 0px;
                  left: -3px;
                  width: 7px;
                  background-color: transparent;
                  height: 100%;
                  /* pointer-events: all; */
                }

                &::after {
                  content: '';
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  width: 1px;
                  background-color: black;
                  height: 100%;
                  /* pointer-events: all; */
                }

                &:hover::before {
                  cursor: col-resize;
                }

                &:hover::after {
                  cursor: col-resize;
                }
              `
            : css`
                &::after {
                  content: '';
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  width: 1px;
                  background-color: black;
                  height: 100%;
                  /* pointer-events: all; */
                }
              `};
      `};
  `;

const TableHeader = props => <TableHeaderBlock {...props} />;

export default React.memo(TableHeader);
