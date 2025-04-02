import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  /** Taille du bouton */
  size?: 'small' | 'medium' | 'large';
  /** Placement du tooltip */
  tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'medium',
  tooltipPlacement = 'bottom'
}) => {
  const { mode, toggleColorMode } = useTheme();
  
  return (
    <Tooltip
      title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      placement={tooltipPlacement}
      arrow
    >
      <IconButton 
        onClick={toggleColorMode} 
        color="inherit" 
        aria-label="toggle theme"
        size={size}
        sx={{
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'rotate(12deg)',
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
          }
        }}
      >
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle; 