import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton/HeaderButton';
import { menuToggle } from '../modules/editingdialog';

const HeaderButtonContainer = ({ checked, ...rest }) => {
  const { menu } = useSelector(({ editingdialog }) => ({
    menu: editingdialog.menu
  }));

  const dispatch = useDispatch();

  const onClick = useCallback(
    name => {
      const side = menu[name].side;

      Object.keys(menu).forEach(key => {
        if (key !== name && menu[key].side === side && menu[key].checked) {
          dispatch(menuToggle(key));
        }
      });

      dispatch(menuToggle(name));
    },
    [dispatch, menu]
  );

  return <HeaderButton checked={checked} onClick={onClick} {...rest} />;
};

export default HeaderButtonContainer;
