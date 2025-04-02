import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Notifications from './components/notifications/Notifications';
import Accounts from './components/accounts/Accounts';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f5f5f5',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function App() {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', height: '100vh', flexDirection: isMobile ? 'column' : 'row' }}>
          <Sidebar toggleNotifications={toggleNotifications} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: 'flex',
              position: 'relative',
              overflow: 'hidden',
              flexDirection: isMobile && notificationsOpen ? 'column' : 'row',
            }}
          >
            {notificationsOpen && (
              <Box 
                sx={{ 
                  width: isMobile ? '100%' : 'auto',
                  height: isMobile ? 'auto' : '100%',
                  maxHeight: isMobile ? '50vh' : '100%',
                  overflow: 'auto',
                  borderBottom: isMobile ? '1px solid #e0e0e0' : 'none',
                }}
              >
                <Notifications />
              </Box>
            )}
            <Box 
              sx={{ 
                flexGrow: 1,
                width: isMobile ? '100%' : notificationsOpen ? 'calc(100% - 450px)' : '100%',
                height: isMobile ? (notificationsOpen ? 'calc(100% - 50vh)' : '100%') : '100%',
                overflow: 'auto',
              }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/accounts" element={<Accounts />} />
                {/* Add more routes here */}
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
