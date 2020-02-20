import React from 'react';
import { connect } from 'react-redux';
import List from '../components/List/List';

const ListContainer = ({ datas, selected }) => {
  return <List datas={datas} selected={selected} />;
};

export default connect(
  state => ({
    datas: state.editingdialog.properties,
    selected: state.editingdialog.selected
  }),
  {}
)(ListContainer);
