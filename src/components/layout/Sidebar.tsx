import React from 'react';
import { Box, IconButton, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import { Link, useLocation } from 'react-router-dom';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '85px',
  height: '100%',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid #e0e0e0',
  padding: theme.spacing(2, 0),
}));

const LogoContainer = styled(Box)({
  marginBottom: '30px',
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const NavButton = styled(IconButton)<{ active?: boolean }>(({ theme, active }) => ({
  margin: theme.spacing(1, 0),
  color: active ? '#000' : '#757575',
  backgroundColor: active ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
  '&:hover': {
    color: '#000',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
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
});

interface SidebarProps {
  toggleNotifications: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleNotifications }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <SidebarContainer>
      <LogoContainer>
        <img src="/images/logo.png" alt="Ino Logo" width="30" height="30" />
      </LogoContainer>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Link to="/">
          <NavButton aria-label="Home" active={path === '/'}>
            <HomeIcon />
          </NavButton>
        </Link>
        <Link to="/accounts">
          <NavButton aria-label="Accounts" active={path === '/accounts'}>
            <PeopleIcon />
          </NavButton>
        </Link>
        <Link to="/profile">
          <NavButton aria-label="Profile" active={path === '/profile'}>
            <PersonIcon />
          </NavButton>
        </Link>
        <Link to="/documents">
          <NavButton aria-label="Documents" active={path === '/documents'}>
            <DescriptionIcon />
          </NavButton>
        </Link>
        <Link to="/settings">
          <NavButton aria-label="Settings" active={path === '/settings'}>
            <SettingsIcon />
          </NavButton>
        </Link>
        <NavButton onClick={toggleNotifications} aria-label="Notifications">
          <NotificationsIcon />
        </NavButton>
      </Box>

      <AvatarContainer>
        <img src="/images/avatar.png" alt="User Avatar" width="40" height="40" />
      </AvatarContainer>
    </SidebarContainer>
  );
};

export default Sidebar; 