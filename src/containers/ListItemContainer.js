import React from 'react';
import { connect } from 'react-redux';
import ListItem from '../components/ListItem/ListItem';
import { textWrite, textErase } from '../modules/helpbox';
import { propertyClick } from '../modules/editingdialog';

const ListItemContainer = props => {
  return <ListItem {...props} />;
};

export default connect(() => ({}), {
  textWrite,
  textErase,
  propertyClick
})(ListItemContainer);
