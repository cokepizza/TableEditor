import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalBackground from '../components/ModalBackground';
import {
  setZoomThunk
} from '../modules/editingdialog';

const ModalBackgroundContainer = ({ ...rest }) => {
  const { zoom } = useSelector(({ editingdialog }) => ({
    zoom: editingdialog.zoom
  }));

  const zoomRef = useRef();

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const dispatch = useDispatch();

  //  window event
  const onWheel = useCallback(
    e => {
      if (e.ctrlKey) {
        e.preventDefault();
        let revisedZoom = zoomRef.current;
        revisedZoom += e.deltaY * -0.001;
        revisedZoom = Math.round(revisedZoom * 10) / 10;
        if (0.1 <= revisedZoom && revisedZoom <= 2) {
          dispatch(
            setZoomThunk({
              zoom: revisedZoom
            })
          );
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    window.addEventListener('wheel', onWheel, { passive: false });
  }, [onWheel]);

  const onClose = useCallback(() => {
    // dispatch(editingdialogClearAll());
    // dispatch(tablecanvasClearAll());
    window.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  const onClick = useCallback(
    e => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  return (
    <ModalBackground
      {...rest}
      onClick={onClick}
      onClose={onClose}
    />
  );
};

export default ModalBackgroundContainer;
