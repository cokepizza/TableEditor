import React from 'react';
import { useSelector } from 'react-redux';
import Inform from '../components/Inform';

const InformContainer = ({ onCloseSideModal }) => {
  const { menu } = useSelector(({ editingdialog }) => ({
    menu: editingdialog.menu
  }));

  return (
    <Inform
      active={menu['Inform']['checked']}
      onCloseSideModal={onCloseSideModal}
    />
  );
};

export default InformContainer;
