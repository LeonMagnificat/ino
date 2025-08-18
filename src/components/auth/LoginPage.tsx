import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  IconButton,
  InputAdornment,
  Link,
  Checkbox,
  FormControlLabel,
  styled,
  CircularProgress,
  Alert,
  Divider,
  Container,
} from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { BORDER_RADIUS } from '../ui/common/constants';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Styled components remain the same
const AuthContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}));

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  minHeight: '60vh',
}));

const AuthCard = styled(Paper)(({ theme }) => ({
  borderRadius: BORDER_RADIUS.lg,
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 480,
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  margin: '0 auto',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  '& .MuiOutlinedInput-root': {
    borderRadius: BORDER_RADIUS.md,
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
      borderWidth: '1.5px',
    },
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: BORDER_RADIUS.md,
  padding: theme.spacing(1.2, 2),
  textTransform: 'none',
  fontWeight: 600,
  border: `1.5px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'}`,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  borderRadius: BORDER_RADIUS.md,
  padding: theme.spacing(1.5, 0),
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  boxShadow: 'none',
  backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'black',
  color: theme.palette.mode === 'dark' ? 'black' : 'white',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
    boxShadow: 'none',
  },
}));

const LoginPage: React.FC = () => {
  const { mode } = useTheme();
  const navigate = useNavigate();
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // Form errors
  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: '',
  });

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: name === 'rememberMe' ? checked : value,
    });
    
    // Clear error when user types
    if (loginErrors[name as keyof typeof loginErrors]) {
      setLoginErrors({
        ...loginErrors,
        [name]: '',
      });
    }
  };

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateLoginForm = () => {
    const errors = {
      email: '',
      password: '',
    };
    let isValid = true;

    if (!loginForm.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(loginForm.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!loginForm.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsSubmitting(true);
    setAuthError('');

    try {
      console.log('Attempting login to:', 'http://127.0.0.1:3000/auth/login');
      
      const response = await fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Check if response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse.substring(0, 200));
        throw new Error('Server returned non-JSON response. Is the backend server running?');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Use AuthContext login instead of direct API call
      await login(loginForm.email, loginForm.password);

      // Redirect will happen automatically via useEffect
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message.includes('fetch')) {
        setAuthError('Unable to connect to server. Please check if the backend is running.');
      } else {
        setAuthError(error.message || 'Invalid email or password. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    if (provider === 'Google') {
      loginWithGoogle();
    }
    // Implement other social login logic here
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <AuthContainer>
      <HeroSection>
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{ 
              mb: 3,
              background: mode === 'dark' 
                ? 'linear-gradient(90deg, #FFFFFF 0%, #B8B8B8 100%)' 
                : 'linear-gradient(90deg, #000000 0%, #555555 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            Log in to your account to manage client accounts, track interactions, and grow your business relationships.
          </Typography>
          
          <AuthCard>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
              Login to Your Account
            </Typography>
            
            <form onSubmit={handleLogin}>
              <StyledTextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                error={!!loginErrors.email}
                helperText={loginErrors.email}
              />
              <StyledTextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={loginForm.password}
                onChange={handleLoginChange}
                error={!!loginErrors.password}
                helperText={loginErrors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={loginForm.rememberMe}
                      onChange={handleLoginChange}
                      name="rememberMe"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">Remember me</Typography>}
                />
                <Link 
                  href="#" 
                  underline="hover" 
                  variant="body2"
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Forgot password?
                </Link>
              </Box>
              
              {authError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {authError}
                </Alert>
              )}

              <PrimaryButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </PrimaryButton>
              
              <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                  or continue with
                </Typography>
                <Divider sx={{ flex: 1 }} />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <SocialButton
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={() => handleSocialLogin('Google')}
                >
                  Google
                </SocialButton>
                <SocialButton
                  fullWidth
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  onClick={() => handleSocialLogin('GitHub')}
                >
                  GitHub
                </SocialButton>
                <SocialButton
                  fullWidth
                  variant="outlined"
                  startIcon={<LinkedInIcon />}
                  onClick={() => handleSocialLogin('LinkedIn')}
                >
                  LinkedIn
                </SocialButton>
              </Box>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link 
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={goToSignup}
                    sx={{ 
                      fontWeight: 600,
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </form>
          </AuthCard>
        </Container>
      </HeroSection>
    </AuthContainer>
  );
};

export default LoginPage;