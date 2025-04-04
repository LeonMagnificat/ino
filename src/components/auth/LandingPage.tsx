import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Container,
  Tabs,
  Tab,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Checkbox,
  FormControlLabel,
  styled,
  useTheme as useMuiTheme,
  CircularProgress,
  Alert,
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

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  minWidth: 100,
  padding: theme.spacing(1.5),
  '&.Mui-selected': {
    fontWeight: 700,
  },
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

const FeatureCard = styled(Paper)(({ theme }) => ({
  borderRadius: BORDER_RADIUS.md,
  padding: theme.spacing(3),
  height: '100%',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 4px 20px rgba(0, 0, 0, 0.2)' 
    : '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: TRANSITIONS.medium,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 8px 30px rgba(0, 0, 0, 0.3)' 
      : '0 8px 30px rgba(0, 0, 0, 0.1)',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const LandingPage: React.FC = () => {
  const { mode } = useTheme();
  const theme = useMuiTheme();
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  // Form errors
  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: '',
  });

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLoginForm()) {
      setIsSubmitting(true);
      setAuthError('');

      try {
        await login(loginForm.email, loginForm.password);
        // Redirect will happen automatically via the useEffect
      } catch (error) {
        console.error('Login error:', error);
        setAuthError('Invalid email or password. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
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
    console.log(`Login with ${provider}`);
    // Implement social login logic here
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
            Manage Your Accounts with Ease
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            A powerful platform for managing client accounts, tracking interactions, and growing your business relationships.
          </Typography>
          
          {/* Auth Card */}
          <AuthCard>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="fullWidth" 
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                }
              }}
            >
              <StyledTab label="Login" />
              <StyledTab label="Sign Up" />
            </Tabs>
            
            {/* Login Form */}
            <TabPanel value={tabValue} index={0}>
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
                
                {authError && tabValue === 0 && (
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
                
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <SocialButton
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={() => handleSocialLogin('Google')}
                    >
                      Google
                    </SocialButton>
                  </Grid>
                  <Grid item xs={4}>
                    <SocialButton
                      fullWidth
                      startIcon={<GitHubIcon />}
                      onClick={() => handleSocialLogin('GitHub')}
                    >
                      GitHub
                    </SocialButton>
                  </Grid>
                  <Grid item xs={4}>
                    <SocialButton
                      fullWidth
                      startIcon={<LinkedInIcon />}
                      onClick={() => handleSocialLogin('LinkedIn')}
                    >
                      LinkedIn
                    </SocialButton>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
            
            {/* Signup Form */}
            <TabPanel value={tabValue} index={1}>
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
                
                <Box sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={signupForm.agreeToTerms}
                        onChange={handleSignupChange}
                        name="agreeToTerms"
                        color="primary"
                        size="small"
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
                  />
                  {signupErrors.agreeToTerms && (
                    <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
                      {signupErrors.agreeToTerms}
                    </Typography>
                  )}
                </Box>
                
                {authError && tabValue === 1 && (
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
                
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <SocialButton
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={() => handleSocialLogin('Google')}
                    >
                      Google
                    </SocialButton>
                  </Grid>
                  <Grid item xs={4}>
                    <SocialButton
                      fullWidth
                      startIcon={<GitHubIcon />}
                      onClick={() => handleSocialLogin('GitHub')}
                    >
                      GitHub
                    </SocialButton>
                  </Grid>
                  <Grid item xs={4}>
                    <SocialButton
                      fullWidth
                      startIcon={<LinkedInIcon />}
                      onClick={() => handleSocialLogin('LinkedIn')}
                    >
                      LinkedIn
                    </SocialButton>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
          </AuthCard>
        </Container>
      </HeroSection>
      
      {/* Features Section */}
      <Box sx={{ py: 8, px: 4, bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            component="h2" 
            fontWeight="bold" 
            textAlign="center" 
            gutterBottom
            sx={{ mb: 1 }}
          >
            Key Features
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            textAlign="center" 
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            Everything you need to manage your client relationships effectively
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Account Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Easily organize and track all your client accounts in one place. Add custom fields, categorize by industry, and monitor account health.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Contact Tracking
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Keep track of all your contacts within each account. Log interactions, set reminders, and never miss an important follow-up.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Data Import/Export
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seamlessly import existing account data from CSV files or export your data for reporting and analysis in other tools.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Customizable Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Personalize your dashboard to show the metrics and information that matter most to you and your team.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Team Collaboration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Work together with your team on accounts. Share notes, assign tasks, and maintain a unified view of client relationships.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Secure & Reliable
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your data is protected with enterprise-grade security. Role-based access controls ensure information is only available to authorized users.
                </Typography>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 4, 
          mt: 'auto',
          borderTop: 1, 
          borderColor: 'divider',
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Account Management System. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </AuthContainer>
  );
};

export default LandingPage;