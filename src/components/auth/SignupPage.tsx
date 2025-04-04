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
  Grid,
} from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { BORDER_RADIUS, TRANSITIONS } from '../ui/common/constants';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Styled components
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

const SignupPage: React.FC = () => {
  const { mode } = useTheme();
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  // Form states
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  // Form errors
  const [signupErrors, setSignupErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: '',
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: name === 'agreeToTerms' ? checked : value,
    });
    
    // Clear error when user types
    if (signupErrors[name as keyof typeof signupErrors]) {
      setSignupErrors({
        ...signupErrors,
        [name]: '',
      });
    }
    
    // Check password match when typing confirm password
    if (name === 'confirmPassword' && signupForm.password !== value) {
      setSignupErrors({
        ...signupErrors,
        confirmPassword: 'Passwords do not match',
      });
    } else if (name === 'confirmPassword') {
      setSignupErrors({
        ...signupErrors,
        confirmPassword: '',
      });
    }
    
    // Update confirm password error when password changes
    if (name === 'password' && signupForm.confirmPassword && signupForm.confirmPassword !== value) {
      setSignupErrors({
        ...signupErrors,
        confirmPassword: 'Passwords do not match',
      });
    } else if (name === 'password' && signupForm.confirmPassword && signupForm.confirmPassword === value) {
      setSignupErrors({
        ...signupErrors,
        confirmPassword: '',
      });
    }
  };

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateSignupForm = () => {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: '',
    };
    let isValid = true;

    if (!signupForm.firstName) {
      errors.firstName = 'First name is required';
      isValid = false;
    }

    if (!signupForm.lastName) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!signupForm.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(signupForm.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!signupForm.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (signupForm.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (!signupForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (signupForm.password !== signupForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!signupForm.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
      isValid = false;
    }

    setSignupErrors(errors);
    return isValid;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignupForm()) {
      setIsSubmitting(true);
      setAuthError('');

      try {
        await signup(
          signupForm.firstName,
          signupForm.lastName,
          signupForm.email,
          signupForm.password
        );
        // Redirect will happen automatically via the useEffect
      } catch (error) {
        console.error('Signup error:', error);
        setAuthError('Failed to create account. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Signup with ${provider}`);
    // Implement social login logic here
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <AuthContainer>
      {/* Hero Section */}
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
            Create Your Account
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            Join our platform to manage client accounts, track interactions, and grow your business relationships.
          </Typography>
          
          {/* Auth Card */}
          <AuthCard>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
              Sign Up
            </Typography>
            
            <form onSubmit={handleSignup}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    name="firstName"
                    value={signupForm.firstName}
                    onChange={handleSignupChange}
                    error={!!signupErrors.firstName}
                    helperText={signupErrors.firstName}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    value={signupForm.lastName}
                    onChange={handleSignupChange}
                    error={!!signupErrors.lastName}
                    helperText={signupErrors.lastName}
                    required
                  />
                </Grid>
              </Grid>
              
              <StyledTextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={signupForm.email}
                onChange={handleSignupChange}
                error={!!signupErrors.email}
                helperText={signupErrors.email}
                required
              />
              
              <StyledTextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={signupForm.password}
                onChange={handleSignupChange}
                error={!!signupErrors.password}
                helperText={signupErrors.password || "Password must be at least 8 characters"}
                required
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
              
              <StyledTextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                error={!!signupErrors.confirmPassword}
                helperText={signupErrors.confirmPassword}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={signupForm.agreeToTerms}
                    onChange={handleSignupChange}
                    name="agreeToTerms"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link href="#" underline="hover">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="#" underline="hover">Privacy Policy</Link>
                  </Typography>
                }
                sx={{ mb: 2 }}
              />
              
              {signupErrors.agreeToTerms && (
                <Typography variant="caption" color="error" sx={{ mt: -2, mb: 2, display: 'block' }}>
                  {signupErrors.agreeToTerms}
                </Typography>
              )}
              
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
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
              </PrimaryButton>
              
              <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                  or sign up with
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
                  Already have an account?{' '}
                  <Link 
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={goToLogin}
                    sx={{ 
                      fontWeight: 600,
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Log in
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

export default SignupPage;