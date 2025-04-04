import React, { useState } from 'react';
import { Box, Typography, Paper, Switch, FormControlLabel, Button, Divider, TextField, MenuItem, Select, FormControl, InputLabel, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const SettingsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

const SettingsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const Settings = () => {
  const { mode, toggleColorMode } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <SettingsContainer>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Settings
      </Typography>
      
      <SettingsCard>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Appearance
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={mode === 'dark'}
                onChange={toggleColorMode}
                color="primary"
              />
            }
            label="Dark Mode"
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="de">German</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="timezone-select-label">Timezone</InputLabel>
            <Select
              labelId="timezone-select-label"
              id="timezone-select"
              value={timezone}
              label="Timezone"
              onChange={(e) => setTimezone(e.target.value)}
            >
              <MenuItem value="UTC">UTC</MenuItem>
              <MenuItem value="EST">Eastern Standard Time (EST)</MenuItem>
              <MenuItem value="CST">Central Standard Time (CST)</MenuItem>
              <MenuItem value="PST">Pacific Standard Time (PST)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </SettingsCard>
      
      <SettingsCard>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Notifications
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                color="primary"
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
                color="primary"
              />
            }
            label="Push Notifications"
          />
        </Box>
      </SettingsCard>
      
      <SettingsCard>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Security
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Change Password
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Current Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <TextField
                label="New Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Confirm New Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <Button variant="contained" color="primary" sx={{ alignSelf: 'flex-start' }}>
                Update Password
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Two-Factor Authentication
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                />
              }
              label="Enable Two-Factor Authentication"
            />
          </Box>
        </Box>
      </SettingsCard>

      <SettingsCard>
        <Typography variant="h6" fontWeight="bold" color="error" gutterBottom>
          Account Actions
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Logging out will end your current session. You will need to log in again to access your account.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ mt: 1 }}
            >
              Logout
            </Button>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box>
            <Typography variant="subtitle1" fontWeight="medium" color="error" gutterBottom>
              Delete Account
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Permanently delete your account and all associated data. This action cannot be undone.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              sx={{ mt: 1 }}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      </SettingsCard>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button variant="outlined" color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </SettingsContainer>
  );
};

export default Settings;