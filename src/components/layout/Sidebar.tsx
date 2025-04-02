import React from 'react';
import { Box, IconButton, styled, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '85px',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : '#e0e0e0',
  padding: theme.spacing(2, 0),
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.03)',
  position: 'relative',
  zIndex: 10,
}));

const LogoContainer = styled(Box)({
  marginBottom: '30px',
  width: '40px',
  height: '40px',
  borderRadius: '3px',
  overflow: 'hidden',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
  },
});

const NavButton = styled(IconButton)<{ active?: boolean }>(({ theme, active }) => ({
  margin: theme.spacing(1, 0),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  position: 'relative',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-2px)',
  },
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    left: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '20px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0 3px 3px 0',
  } : {},
}));

const AvatarContainer = styled(Box)({
  marginTop: 'auto',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.08)',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
  },
});

// Nouvel indicateur de badge pour les notifications
const NotificationBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '2px',
  right: '2px',
  width: '8px',
  height: '8px',
  backgroundColor: theme.palette.error.main,
  borderRadius: '50%',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(185, 28, 28, 0.7)',
    },
    '70%': {
      transform: 'scale(1)',
      boxShadow: '0 0 0 5px rgba(185, 28, 28, 0)',
    },
    '100%': {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(185, 28, 28, 0)',
    },
  },
}));

interface SidebarProps {
  toggleNotifications: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleNotifications }) => {
  const location = useLocation();
  const path = location.pathname;
  const [hasNotifications, setHasNotifications] = React.useState(true);
  const { mode } = useTheme();

  return (
    <SidebarContainer>
      <LogoContainer sx={{ 
        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f0f0f0' 
      }}>
        <img src="/images/logo.png" alt="Ino Logo" width="30" height="30" />
      </LogoContainer>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Tooltip title="Dashboard" placement="right" arrow>
          <Link to="/">
            <NavButton aria-label="Home" active={path === '/'}>
              <HomeIcon />
            </NavButton>
          </Link>
        </Tooltip>
        
        <Tooltip title="Accounts" placement="right" arrow>
          <Link to="/accounts">
            <NavButton aria-label="Accounts" active={path === '/accounts'}>
              <PeopleIcon />
            </NavButton>
          </Link>
        </Tooltip>
        
        <Tooltip title="Profile" placement="right" arrow>
          <Link to="/profile">
            <NavButton aria-label="Profile" active={path === '/profile'}>
              <PersonIcon />
            </NavButton>
          </Link>
        </Tooltip>
        
        <Tooltip title="Documents" placement="right" arrow>
          <Link to="/documents">
            <NavButton aria-label="Documents" active={path === '/documents'}>
              <DescriptionIcon />
            </NavButton>
          </Link>
        </Tooltip>
        
        <Tooltip title="Settings" placement="right" arrow>
          <Link to="/settings">
            <NavButton aria-label="Settings" active={path === '/settings'}>
              <SettingsIcon />
            </NavButton>
          </Link>
        </Tooltip>
        
        <Tooltip title="Notifications" placement="right" arrow>
          <NavButton 
            onClick={() => {
              toggleNotifications();
              setHasNotifications(false);
            }} 
            aria-label="Notifications"
            sx={{ position: 'relative' }}
          >
            <NotificationsIcon />
            {hasNotifications && <NotificationBadge />}
          </NavButton>
        </Tooltip>

        {/* Bouton pour changer de thème */}
        <ThemeToggle tooltipPlacement="right" />
      </Box>

      <Tooltip title="Your Profile" placement="right" arrow>
        <AvatarContainer sx={{ 
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f0f0f0' 
        }}>
          <img src="/images/avatar.png" alt="User Avatar" width="40" height="40" />
        </AvatarContainer>
      </Tooltip>
    </SidebarContainer>
  );
};

export default Sidebar; 