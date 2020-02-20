import React from 'react';

const TraitTextBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  margin: 0px;
  cursor: default;

  padding-left: 10%;
  padding-right: 10%;
  width: 30%;
`;

const TraitText = props => {
  return <TraitTextBlock {...props}>{props.children}</TraitTextBlock>;
};

export default TraitText;
