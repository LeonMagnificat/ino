import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const GoogleCallbackHandler: React.FC = () => {
  const navigate = useNavigate();
  const { getProfile } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the token from the URL parameters (sent by backend)
        const token = searchParams.get('token');
        
        if (!token) {
          throw new Error('No authentication token found in the URL');
        }

        // Store the token
        localStorage.setItem('token', token);
        
        // Fetch user profile using the token
        const response = await fetch('http://127.0.0.1:3000/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const userData = await response.json();
        
        // Transform the API response to match our User interface
        const userProfile = {
          id: userData.id || '',
          firstName: userData.first_name || '',
          lastName: userData.last_name || '',
          email: userData.email || '',
          jobTitle: userData.job_title || null,
          company: userData.company || null,
          location: userData.location || null,
          bio: userData.bio || null,
          website: userData.website || null,
        };
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(userProfile));
        
        // Refresh the profile in AuthContext
        await getProfile();
        
        // Redirect to dashboard after successful authentication
        navigate('/dashboard');
      } catch (error) {
        console.error('Google authentication failed:', error);
        // Clean up any stored data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login page with error message
        navigate('/login?error=google_auth_failed');
      }
    };

    handleCallback();
  }, [searchParams, navigate, getProfile]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
      <Typography variant="h6" color="text.secondary">
        Authenticating with Google...
      </Typography>
    </Box>
  );
};

export default GoogleCallbackHandler;
