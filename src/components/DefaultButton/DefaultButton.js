import React from 'react';
import classnames from 'classnames';
import './DefaultButton.scss';

const DefaultButton = ({ cn, style, children, onClick }) => {
  return (
    <button
      className={classnames(cn, 'DefaultButton')}
      style={{ ...style }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
