import React from 'react';
import { useSelector } from 'react-redux';
import Properties from '../components/Properties';

const PropertiesContainer = ({ onCloseSideModal }) => {
  const { menu } = useSelector(({ editingdialog }) => ({
    menu: editingdialog.menu
  }));

  return (
    <Properties
      active={menu['Properties']['checked']}
      onCloseSideModal={onCloseSideModal}
    />
  );
};

export default PropertiesContainer;
