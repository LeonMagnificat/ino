import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Notifications from './components/notifications/Notifications';
import Accounts from './components/accounts/Accounts';
import Campaigns from './components/campaigns';
import Settings from './components/settings/Settings';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [showNotifications, setShowNotifications] = React.useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <ThemeProvider>
      <Router>
        <Box
          sx={{
            display: 'flex',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <Sidebar toggleNotifications={toggleNotifications} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              position: 'relative',
              width: 'calc(100% - 80px)',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Box>
          <div className={showNotifications ? 'open' : ''}>
            <Notifications />
          </div>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
