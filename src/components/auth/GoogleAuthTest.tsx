import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';

const GoogleAuthTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testGoogleCallback = async () => {
    setLoading(true);
    setTestResult('');
    
    try {
      // Test the Google callback endpoint with a dummy code
      const response = await fetch('http://127.0.0.1:3000/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: 'test_code_123' }),
      });

      if (response.status === 404) {
        setTestResult(`❌ Callback Endpoint Missing\nStatus: 404 Not Found\nThe POST /auth/google/callback endpoint is not implemented in your backend.`);
      } else {
        const data = await response.json();
        if (response.status === 400 || response.status === 500) {
          setTestResult(`✅ Callback Endpoint Exists (but test failed as expected)\nStatus: ${response.status}\nResponse: ${JSON.stringify(data, null, 2)}`);
        } else {
          setTestResult(`✅ Callback Endpoint Working!\nStatus: ${response.status}\nResponse: ${JSON.stringify(data, null, 2)}`);
        }
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setTestResult(`❌ Backend not running\nError: Cannot connect to http://127.0.0.1:3000/`);
      } else {
        setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testGoogleAuth = async () => {
    setLoading(true);
    setTestResult('');
    
    try {
      // Test if the Google auth endpoint exists
      const response = await fetch('http://127.0.0.1:3000/auth/google', {
        method: 'GET',
        redirect: 'manual' // Don't follow redirects
      });

      if (response.status === 302 || response.status === 301) {
        const location = response.headers.get('location');
        setTestResult(`✅ Google Auth Endpoint Working!\nStatus: ${response.status}\nRedirects to: ${location}`);
      } else {
        setTestResult(`❌ Unexpected response\nStatus: ${response.status}\nExpected: 302 redirect to Google`);
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setTestResult(`❌ Backend not running or endpoint missing\nError: Cannot connect to http://127.0.0.1:3000/auth/google`);
      } else {
        setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, m: 2, maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        🔧 Backend Google Auth Test
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Use these buttons to test if your backend has the required Google OAuth endpoints.
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button 
          variant="outlined" 
          onClick={testGoogleAuth}
          disabled={loading}
        >
          Test Google Auth Endpoint
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={testGoogleCallback}
          disabled={loading}
        >
          Test Google Callback Endpoint
        </Button>
      </Box>

      {testResult && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
            {testResult}
          </pre>
        </Alert>
      )}
    </Paper>
  );
};

export default GoogleAuthTest;
