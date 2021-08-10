import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import { useRoomDispatch } from 'components/ImageEditor/imageEditor.context';
import React from 'react';

export default function ShareButton() {
  const dispatch = useRoomDispatch();

  const handleToggle = () => {
    dispatch({ type: 'show_backdrop', payload: true });
  };

  return (
    <IconButton aria-label={'Share'} onClick={handleToggle}>
      <ShareIcon />
    </IconButton>
  );
}
