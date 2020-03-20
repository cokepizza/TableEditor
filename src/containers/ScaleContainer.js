import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Scale from '../components/Scale';
import { setToggle, setZoomThunk } from '../modules/editingdialog';

const ScaleContainer = () => {
  const { scale, zoom } = useSelector(({ editingdialog }) => ({
    scale: editingdialog.scale,
    zoom: editingdialog.zoom
  }));
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(
      setToggle({
        key: 'scale'
      })
    );
  }, [dispatch]);

  const onArrowClick = useCallback(
    flag => {
      if (flag === 'up') {
        if (zoom + 0.1 <= 2) {
          dispatch(
            setZoomThunk({
              zoom: (zoom * 10 + 1) / 10
            })
          );
        }
      } else if (flag === 'down') {
        if (zoom - 0.1 >= 0.1) {
          dispatch(
            setZoomThunk({
              zoom: (zoom * 10 - 1) / 10
            })
          );
        }
      }
    },
    [dispatch, zoom]
  );

  return (
    <Scale
      scale={scale}
      zoom={zoom}
      onClick={onClick}
      onArrowClick={onArrowClick}
    />
  );
};

export default ScaleContainer;
