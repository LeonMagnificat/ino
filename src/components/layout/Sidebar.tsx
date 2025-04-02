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
  width: '80px',
  height: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
  padding: theme.spacing(3, 0),
  boxShadow: theme.palette.mode === 'dark'
    ? '0 0 15px rgba(0, 0, 0, 0.3)'
    : '0 0 15px rgba(0, 0, 0, 0.05)',
  position: 'relative',
  zIndex: 10,
  transition: 'all 0.3s ease-in-out',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  marginBottom: '36px',
  width: '44px',
  height: '44px',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f7fa',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 3px 6px rgba(0, 0, 0, 0.2)'
    : '0 3px 6px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.08) translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 6px 12px rgba(0, 0, 0, 0.3)'
      : '0 6px 12px rgba(0, 0, 0, 0.12)',
  },
}));

const NavButton = styled(IconButton)<{ active?: boolean }>(({ theme, active }) => ({
  margin: theme.spacing(1.2, 0),
  padding: theme.spacing(1.5),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ?
    (theme.palette.mode === 'dark' ? 'rgba(33, 150, 243, 0.15)' : 'rgba(25, 118, 210, 0.08)') :
    'transparent',
  position: 'relative',
  borderRadius: '12px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    transform: 'translateY(-3px)',
    boxShadow: theme.palette.mode === 'dark' ? '0 4px 8px rgba(0, 0, 0, 0.3)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    left: '-18px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '24px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0 4px 4px 0',
  } : {},
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
    transition: 'transform 0.2s ease-in-out',
  },
  '&:hover .MuiSvgIcon-root': {
    transform: 'scale(1.1)',
  },
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  marginBottom: theme.spacing(2),
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f7fa',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 3px 6px rgba(0, 0, 0, 0.25)'
    : '0 3px 6px rgba(0, 0, 0, 0.1)',
  border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.1) translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 6px 12px rgba(0, 0, 0, 0.35)'
      : '0 6px 12px rgba(0, 0, 0, 0.15)',
    border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(33, 150, 243, 0.5)' : 'rgba(25, 118, 210, 0.3)'}`,
  },
}));

// Notification badge indicator with improved animation
const NotificationBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '4px',
  right: '4px',
  width: '10px',
  height: '10px',
  backgroundColor: theme.palette.error.main,
  borderRadius: '50%',
  boxShadow: `0 0 0 2px ${theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff'}`,
  animation: 'pulse 2s infinite',
  zIndex: 2,
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.95)',
      boxShadow: `0 0 0 0 ${theme.palette.mode === 'dark'
        ? 'rgba(244, 67, 54, 0.7)'
        : 'rgba(211, 47, 47, 0.7)'}`,
    },
    '70%': {
      transform: 'scale(1)',
      boxShadow: `0 0 0 6px ${theme.palette.mode === 'dark'
        ? 'rgba(244, 67, 54, 0)'
        : 'rgba(211, 47, 47, 0)'}`,
    },
    '100%': {
      transform: 'scale(0.95)',
      boxShadow: `0 0 0 0 ${theme.palette.mode === 'dark'
        ? 'rgba(244, 67, 54, 0)'
        : 'rgba(211, 47, 47, 0)'}`,
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
      <LogoContainer>
        <img
          src="/images/logo.png"
          alt="Ino Logo"
          width="28"
          height="28"
          style={{
            filter: mode === 'dark' ? 'brightness(1.2) contrast(1.2)' : 'none',
            transition: 'all 0.3s ease'
          }}
        />
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

        {/* Theme toggle button */}
        <ThemeToggle tooltipPlacement="right" />
      </Box>

      <Tooltip title="Your Profile" placement="right" arrow>
        <AvatarContainer>
          <img
            src="/images/avatar.png"
            alt="User Avatar"
            width="40"
            height="40"
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              transition: 'all 0.3s ease'
            }}
          />
        </AvatarContainer>
      </Tooltip>
    </SidebarContainer>
  );
};

export default Sidebar; 