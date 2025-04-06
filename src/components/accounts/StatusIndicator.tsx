import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface StatusIndicatorProps {
  status: 'completed' | 'pending' | 'failed' | 'loading' | undefined;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  // Determine color based on status
  let color = '';
  
  switch (status) {
    case 'completed':
      color = '#2ecc71'; // green
      break;
    case 'failed':
      color = '#e74c3c'; // red
      break;
    case 'loading':
      // For loading, we'll return a circular progress
      return <CircularProgress size={12} thickness={4} sx={{ mr: 0.75 }} />;
    default: // pending or undefined
      color = '#f1c40f'; // yellow
  }
  
  return (
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: color,
        mr: 0.75,
        display: 'inline-block'
      }}
    />
  );
};

export default StatusIndicator; 