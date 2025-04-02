import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Notifications from './components/notifications/Notifications';
import Accounts from './components/accounts/Accounts';
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
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/accounts" element={<Accounts />} />
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
