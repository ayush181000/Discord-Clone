import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ScreenShare, StopScreenShare } from '@mui/icons-material';

const ScreenShareButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(true);

  const handleScreenShareToggle = () => {
    setIsScreenSharingActive(!isScreenSharingActive);
  };

  return (
    <IconButton onClick={handleScreenShareToggle} style={{ color: 'white' }}>
      {isScreenSharingActive ? <ScreenShare /> : <StopScreenShare />}
    </IconButton>
  );
};

export default ScreenShareButton;
