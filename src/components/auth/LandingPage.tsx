import React, { useState, useRef, useEffect } from 'react';
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
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Fade,
  Slide,
  Zoom,
  Grow,
  useMediaQuery,
  Stack,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { BORDER_RADIUS, TRANSITIONS } from '../ui/common/constants';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Styled components
const AuthContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  overflowX: 'hidden',
  overflowY: 'auto',
  position: 'relative',
  height: 'auto',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  minHeight: '90vh',
  height: 'auto',
  position: 'relative',
  overflow: 'visible',
  backgroundImage: theme.palette.mode === 'dark'
    ? 'radial-gradient(circle at 30% 20%, rgba(60, 60, 60, 0.3) 0%, rgba(0, 0, 0, 0) 70%), radial-gradient(circle at 70% 80%, rgba(60, 60, 60, 0.3) 0%, rgba(0, 0, 0, 0) 70%)'
    : 'radial-gradient(circle at 30% 20%, rgba(200, 200, 200, 0.3) 0%, rgba(255, 255, 255, 0) 70%), radial-gradient(circle at 70% 80%, rgba(200, 200, 200, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
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
  backdropFilter: 'blur(10px)',
  backgroundColor: theme.palette.mode === 'dark'
    ? 'rgba(30, 30, 30, 0.8)'
    : 'rgba(255, 255, 255, 0.8)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
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
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  borderRadius: BORDER_RADIUS.md,
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  border: `2px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`,
  color: theme.palette.mode === 'dark' ? 'white' : 'black',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  borderRadius: BORDER_RADIUS.md,
  padding: theme.spacing(4),
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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  position: 'relative',
  overflow: 'hidden',
}));

const FeatureIconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
    : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 4),
  position: 'relative',
  height: 'auto',
  overflow: 'visible',
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(90deg, #FFFFFF 0%, #B8B8B8 100%)'
    : 'linear-gradient(90deg, #000000 0%, #555555 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
}));

const DashboardPreview = styled(Box)(({ theme }) => ({
  borderRadius: BORDER_RADIUS.lg,
  overflow: 'hidden',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 20px 80px rgba(0, 0, 0, 0.5)'
    : '0 20px 80px rgba(0, 0, 0, 0.15)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
  transition: 'all 0.5s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 30px 100px rgba(0, 0, 0, 0.6)'
      : '0 30px 100px rgba(0, 0, 0, 0.2)',
  },
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  borderRadius: BORDER_RADIUS.md,
  padding: theme.spacing(4),
  height: '100%',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(0, 0, 0, 0.2)'
    : '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: TRANSITIONS.medium,
  position: 'relative',
  '&:before': {
    content: '"""',
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: '4rem',
    lineHeight: 1,
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    fontFamily: 'Georgia, serif',
  },
}));

const PricingCard = styled(Paper)(({ theme }) => ({
  borderRadius: BORDER_RADIUS.md,
  padding: theme.spacing(4),
  height: '100%',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(0, 0, 0, 0.2)'
    : '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: TRANSITIONS.medium,
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 30px rgba(0, 0, 0, 0.3)'
      : '0 8px 30px rgba(0, 0, 0, 0.1)',
  },
}));

const VideoButton = styled(IconButton)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'black',
  color: theme.palette.mode === 'dark' ? 'black' : 'white',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
    transform: 'scale(1.1)',
  },
  transition: 'all 0.3s ease',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(255, 255, 255, 0.2)'
    : '0 4px 20px rgba(0, 0, 0, 0.2)',
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
  const [showVideo, setShowVideo] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<string | false>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const dashboardRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  // Animation states
  const [animateHero, setAnimateHero] = useState(false);
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const [animateDashboard, setAnimateDashboard] = useState(false);
  const [animateTestimonials, setAnimateTestimonials] = useState(false);
  const [animatePricing, setAnimatePricing] = useState(false);

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

  // Scroll animations with Intersection Observer
  useEffect(() => {
    // Always animate hero section immediately
    setAnimateHero(true);

    // Create observers for each section
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // trigger when 10% of the element is visible
    };

    // Features section observer
    const featuresObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimateFeatures(true);
          featuresObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Dashboard section observer
    const dashboardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimateDashboard(true);
          dashboardObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Testimonials section observer
    const testimonialsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimateTestimonials(true);
          testimonialsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Pricing section observer
    const pricingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimatePricing(true);
          pricingObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Start observing elements if they exist
    if (featuresRef.current) {
      featuresObserver.observe(featuresRef.current);
    }

    if (dashboardRef.current) {
      dashboardObserver.observe(dashboardRef.current);
    }

    // For testimonials, we'll find it by its ID
    const testimonialSection = document.querySelector('#testimonials-section');
    if (testimonialSection) {
      testimonialsObserver.observe(testimonialSection);
    }

    if (pricingRef.current) {
      pricingObserver.observe(pricingRef.current);
    }

    // Cleanup
    return () => {
      if (featuresRef.current) featuresObserver.unobserve(featuresRef.current);
      if (dashboardRef.current) dashboardObserver.unobserve(dashboardRef.current);
      if (testimonialSection) testimonialsObserver.unobserve(testimonialSection);
      if (pricingRef.current) pricingObserver.unobserve(pricingRef.current);
    };
  }, []);

  const handleFaqChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    // Ensure body allows scrolling
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
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
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={animateHero} timeout={1000}>
                <Box sx={{ position: 'relative', zIndex: 2, textAlign: { xs: 'center', md: 'left' } }}>
                  <GradientText
                    variant="h1"
                    component="h1"
                    fontWeight="900"
                    gutterBottom
                    sx={{
                      mb: 3,
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                    }}
                  >
                    Transform How You Connect With Clients
                  </GradientText>

                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{
                      mb: 4,
                      maxWidth: { xs: '100%', md: '90%' },
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    Our platform helps businesses build stronger relationships, make data-driven decisions, and grow revenue.
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: 6,
                      maxWidth: { xs: '100%', md: '90%' },
                      fontWeight: 400,
                      lineHeight: 1.7,
                    }}
                  >
                    Meet Sarah, a sales manager who struggled with scattered client data and missed opportunities.
                    After switching to our platform, her team increased client retention by 40% and boosted revenue by 25% in just three months.
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2, mb: 6, flexWrap: 'wrap' }}>
                    <PrimaryButton
                      variant="contained"
                      size="large"
                      sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                      onClick={() => navigate('/signup')}
                    >
                      Get Started Free
                    </PrimaryButton>

                    <SecondaryButton
                      variant="outlined"
                      size="large"
                      sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                      onClick={() => setShowVideo(true)}
                      startIcon={<PlayArrowIcon />}
                    >
                      Watch Demo
                    </SecondaryButton>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                    <Chip
                      label="No credit card required"
                      icon={<CheckCircleIcon fontSize="small" />}
                      sx={{
                        borderRadius: '50px',
                        px: 2,
                        py: 3,
                        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                        border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                      }}
                    />
                    <Chip
                      label="14-day free trial"
                      icon={<CheckCircleIcon fontSize="small" />}
                      sx={{
                        borderRadius: '50px',
                        px: 2,
                        py: 3,
                        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                        border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                      }}
                    />
                    <Chip
                      label="Cancel anytime"
                      icon={<CheckCircleIcon fontSize="small" />}
                      sx={{
                        borderRadius: '50px',
                        px: 2,
                        py: 3,
                        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                        border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                      }}
                    />
                  </Box>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Zoom in={animateHero} style={{ transitionDelay: '300ms' }}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  p: 2
                }}>
                  {/* Flat illustration using emojis and styled divs */}
                  <Box sx={{
                    position: 'relative',
                    width: { xs: '280px', sm: '350px', md: '400px' },
                    height: { xs: '280px', sm: '350px', md: '400px' },
                    borderRadius: '50%',
                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                    boxShadow: mode === 'dark' ? '0 10px 40px rgba(0, 0, 0, 0.3)' : '0 10px 40px rgba(0, 0, 0, 0.1)',
                  }}>
                    {/* Person emoji */}
                    <Box sx={{
                      position: 'absolute',
                      fontSize: { xs: '120px', sm: '150px', md: '180px' },
                      zIndex: 2,
                      transform: 'translateY(-10px)',
                    }}>
                      <span role="img" aria-label="business person">👩‍💼</span>
                    </Box>

                    {/* Thought bubbles with icons */}
                    <Box sx={{
                      position: 'absolute',
                      top: '15%',
                      right: '10%',
                      backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      borderRadius: '50%',
                      width: '70px',
                      height: '70px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '2rem',
                      border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                    }}>
                      <span role="img" aria-label="chart">�</span>
                    </Box>

                    <Box sx={{
                      position: 'absolute',
                      bottom: '20%',
                      left: '10%',
                      backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '1.8rem',
                      border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                    }}>
                      <span role="img" aria-label="handshake">🤝</span>
                    </Box>

                    <Box sx={{
                      position: 'absolute',
                      top: '30%',
                      left: '5%',
                      backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '1.5rem',
                      border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                    }}>
                      <span role="img" aria-label="calendar">📅</span>
                    </Box>

                    <Box sx={{
                      position: 'absolute',
                      bottom: '25%',
                      right: '15%',
                      backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      borderRadius: '50%',
                      width: '55px',
                      height: '55px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '1.7rem',
                      border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                    }}>
                      <span role="img" aria-label="rocket">🚀</span>
                    </Box>
                  </Box>
                </Box>
              </Zoom>
            </Grid>
          </Grid>


        </Container>
      </HeroSection>

      {/* Story & Features Section */}
      <Section
        ref={featuresRef}
        sx={{
          bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Fade in={animateFeatures} timeout={1000}>
            <Box>
              <Typography
                variant="overline"
                component="p"
                align="center"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: mode === 'dark' ? 'primary.light' : 'primary.main',
                }}
              >
                THE PLATFORM STORY
              </Typography>

              <GradientText
                variant="h2"
                component="h2"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                sx={{ mb: 2 }}
              >
                How We Transform Client Relationships
              </GradientText>

              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
                sx={{ mb: 6, maxWidth: 800, mx: 'auto', fontWeight: 400 }}
              >
                Our platform was born from a simple observation: businesses were losing valuable client relationships due to disorganized data and missed opportunities.
              </Typography>

              {/* Story Timeline */}
              <Box sx={{ mb: 10, position: 'relative' }}>
                <Box sx={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: 4,
                  backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  transform: 'translateX(-50%)',
                  display: { xs: 'none', md: 'block' }
                }} />

                <Grid container spacing={4}>
                  {/* Story Point 1 */}
                  <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' }, position: 'relative' }}>
                    <Grow in={animateFeatures} style={{ transformOrigin: '100% 0', transitionDelay: '200ms' }}>
                      <Box>
                        <Box sx={{
                          display: 'inline-flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                          border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                          mb: 2,
                          fontSize: '2rem'
                        }}>
                          <span role="img" aria-label="confused">😕</span>
                        </Box>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          The Challenge
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                          Sarah's sales team was struggling with scattered client information across spreadsheets, emails, and personal notes. Important follow-ups were missed, and client relationships suffered.
                        </Typography>
                      </Box>
                    </Grow>
                    <Box sx={{
                      position: 'absolute',
                      right: -12,
                      top: 30,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: mode === 'dark' ? 'white' : 'black',
                      display: { xs: 'none', md: 'block' },
                      zIndex: 1
                    }} />
                  </Grid>

                  <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }} />

                  {/* Story Point 2 */}
                  <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }} />

                  <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' }, position: 'relative' }}>
                    <Grow in={animateFeatures} style={{ transformOrigin: '0 0', transitionDelay: '400ms' }}>
                      <Box>
                        <Box sx={{
                          display: 'inline-flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                          border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                          mb: 2,
                          fontSize: '2rem'
                        }}>
                          <span role="img" aria-label="lightbulb">💡</span>
                        </Box>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          The Solution
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                          Our platform provided a centralized hub for all client information, automated follow-ups, and delivered data-driven insights that helped identify opportunities and risks.
                        </Typography>
                      </Box>
                    </Grow>
                    <Box sx={{
                      position: 'absolute',
                      left: -12,
                      top: 30,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: mode === 'dark' ? 'white' : 'black',
                      display: { xs: 'none', md: 'block' },
                      zIndex: 1
                    }} />
                  </Grid>

                  {/* Story Point 3 */}
                  <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' }, position: 'relative' }}>
                    <Grow in={animateFeatures} style={{ transformOrigin: '100% 0', transitionDelay: '600ms' }}>
                      <Box>
                        <Box sx={{
                          display: 'inline-flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                          border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                          mb: 2,
                          fontSize: '2rem'
                        }}>
                          <span role="img" aria-label="chart">📈</span>
                        </Box>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          The Results
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                          Within three months, Sarah's team increased client retention by 40%, boosted revenue by 25%, and saved 15 hours per week on administrative tasks.
                        </Typography>
                      </Box>
                    </Grow>
                    <Box sx={{
                      position: 'absolute',
                      right: -12,
                      top: 30,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: mode === 'dark' ? 'white' : 'black',
                      display: { xs: 'none', md: 'block' },
                      zIndex: 1
                    }} />
                  </Grid>
                </Grid>
              </Box>

              {/* Main Features Heading */}
              <Typography
                variant="overline"
                component="p"
                align="center"
                sx={{
                  mt: 10,
                  mb: 1,
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: mode === 'dark' ? 'primary.light' : 'primary.main',
                }}
              >
                CORE FEATURES
              </Typography>

              <GradientText
                variant="h2"
                component="h2"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                sx={{ mb: 2 }}
              >
                What Makes Us Different
              </GradientText>

              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
                sx={{ mb: 8, maxWidth: 700, mx: 'auto', fontWeight: 400 }}
              >
                Our platform combines powerful features with an intuitive interface to help you build stronger client relationships.
              </Typography>

              {/* Main Features */}
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Grow in={animateFeatures} style={{ transformOrigin: '0 0 0', transitionDelay: '200ms' }}>
                    <FeatureCard>
                      <FeatureIconWrapper>
                        <span role="img" aria-label="handshake" style={{ fontSize: '2rem' }}>🤝</span>
                      </FeatureIconWrapper>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Relationship Intelligence
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Our AI analyzes client interactions to identify relationship health, suggest next steps, and predict future needs.
                      </Typography>
                      <Box sx={{ mt: 'auto', pt: 2 }}>
                        <Button
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            p: 0,
                            '&:hover': {
                              backgroundColor: 'transparent',
                              transform: 'translateX(4px)',
                            },
                            transition: 'transform 0.3s ease',
                          }}
                        >
                          Learn more
                        </Button>
                      </Box>
                    </FeatureCard>
                  </Grow>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Grow in={animateFeatures} style={{ transformOrigin: '0 0 0', transitionDelay: '400ms' }}>
                    <FeatureCard>
                      <FeatureIconWrapper>
                        <span role="img" aria-label="calendar" style={{ fontSize: '2rem' }}>📅</span>
                      </FeatureIconWrapper>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Smart Scheduling
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Automated follow-up reminders, meeting scheduling, and task management ensure nothing falls through the cracks.
                      </Typography>
                      <Box sx={{ mt: 'auto', pt: 2 }}>
                        <Button
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            p: 0,
                            '&:hover': {
                              backgroundColor: 'transparent',
                              transform: 'translateX(4px)',
                            },
                            transition: 'transform 0.3s ease',
                          }}
                        >
                          Learn more
                        </Button>
                      </Box>
                    </FeatureCard>
                  </Grow>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Grow in={animateFeatures} style={{ transformOrigin: '0 0 0', transitionDelay: '600ms' }}>
                    <FeatureCard>
                      <FeatureIconWrapper>
                        <span role="img" aria-label="chart" style={{ fontSize: '2rem' }}>📊</span>
                      </FeatureIconWrapper>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Actionable Analytics
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Visual dashboards show client health scores, revenue forecasts, and engagement metrics with recommended actions.
                      </Typography>
                      <Box sx={{ mt: 'auto', pt: 2 }}>
                        <Button
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            p: 0,
                            '&:hover': {
                              backgroundColor: 'transparent',
                              transform: 'translateX(4px)',
                            },
                            transition: 'transform 0.3s ease',
                          }}
                        >
                          Learn more
                        </Button>
                      </Box>
                    </FeatureCard>
                  </Grow>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Section>

      {/* Dashboard Preview Section */}
      <Section
        ref={dashboardRef}
        sx={{
          bgcolor: mode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.02)',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Fade in={animateDashboard} timeout={1000}>
            <Box>
              <Typography
                variant="overline"
                component="p"
                align="center"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: mode === 'dark' ? 'primary.light' : 'primary.main',
                }}
              >
                POWERFUL ANALYTICS
              </Typography>

              <GradientText
                variant="h2"
                component="h2"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                sx={{ mb: 2 }}
              >
                Make Data-Driven Decisions
              </GradientText>

              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
                sx={{ mb: 8, maxWidth: 700, mx: 'auto', fontWeight: 400 }}
              >
                Our intuitive dashboard provides real-time insights into your business performance, helping you make informed decisions.
              </Typography>

              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Slide direction="right" in={animateDashboard} timeout={1000}>
                    <Box>
                      <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Comprehensive Analytics
                      </Typography>

                      <Typography variant="body1" color="text.secondary" paragraph>
                        Track key metrics like client lifetime value, revenue forecasts, and exit rates to understand your business health at a glance.
                      </Typography>

                      <Box sx={{ my: 4 }}>
                        {[
                          { icon: <BarChartIcon />, text: 'Interactive data visualizations' },
                          { icon: <SpeedIcon />, text: 'Real-time performance metrics' },
                          { icon: <TrendingUpIcon />, text: 'Predictive analytics and forecasting' },
                        ].map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{
                              mr: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                            }}>
                              {item.icon}
                            </Box>
                            <Typography variant="body1">{item.text}</Typography>
                          </Box>
                        ))}
                      </Box>

                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          mt: 2,
                          borderRadius: BORDER_RADIUS.md,
                          textTransform: 'none',
                          fontWeight: 600,
                          px: 3,
                          py: 1,
                          borderWidth: 2,
                        }}
                      >
                        Explore Analytics
                      </Button>
                    </Box>
                  </Slide>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Zoom in={animateDashboard} timeout={1000}>
                    <DashboardPreview sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{
                        fontSize: { xs: '3rem', md: '5rem' },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        mb: 3
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                          <span role="img" aria-label="bar chart">📊</span>
                          <span role="img" aria-label="line chart">📈</span>
                          <span role="img" aria-label="pie chart">🧩</span>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                          <span role="img" aria-label="magnifying glass">🔍</span>
                          <span role="img" aria-label="light bulb">💡</span>
                          <span role="img" aria-label="target">🎯</span>
                        </Box>
                      </Box>
                      <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                        Interactive Data Visualization
                      </Typography>
                      <Typography variant="body2" color="text.secondary" textAlign="center">
                        Customizable dashboards that bring your data to life
                      </Typography>
                    </DashboardPreview>
                  </Zoom>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section id="testimonials-section" sx={{ bgcolor: mode === 'dark' ? 'background.default' : 'background.paper' }}>
        <Container maxWidth="lg">
          <Fade in={animateTestimonials} timeout={1000}>
            <Box>
              <Typography
                variant="overline"
                component="p"
                align="center"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: mode === 'dark' ? 'primary.light' : 'primary.main',
                }}
              >
                TESTIMONIALS
              </Typography>

              <GradientText
                variant="h2"
                component="h2"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                sx={{ mb: 2 }}
              >
                What Our Customers Say
              </GradientText>

              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
                sx={{ mb: 8, maxWidth: 700, mx: 'auto', fontWeight: 400 }}
              >
                Don't just take our word for it. Here's what our customers have to say about our platform.
              </Typography>

              <Grid container spacing={4}>
                {[
                  {
                    quote: "This platform has transformed how we manage client relationships. The analytics dashboard gives us insights we never had before.",
                    author: "Sarah Johnson",
                    position: "Account Director, TechCorp",
                    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                    rating: 5
                  },
                  {
                    quote: "The campaign management tools have saved us countless hours. The AI suggestions are surprisingly accurate and helpful.",
                    author: "Michael Chen",
                    position: "Marketing Manager, GrowthCo",
                    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                    rating: 5
                  },
                  {
                    quote: "We've seen a 40% increase in client retention since implementing this platform. The insights and automation are game-changers.",
                    author: "Emily Rodriguez",
                    position: "CEO, ConsultPro",
                    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Grow in={animateTestimonials} style={{ transformOrigin: '0 0 0', transitionDelay: `${200 * index}ms` }}>
                      <TestimonialCard>
                        <Rating value={testimonial.rating} readOnly sx={{ mb: 3 }} />
                        <Typography variant="body1" paragraph sx={{ mb: 4, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                          "{testimonial.quote}"
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 50, height: 50, mr: 2, fontSize: '1.5rem', bgcolor: 'transparent' }}>
                            <span role="img" aria-label="person">
                              {index === 0 ? '👩‍💼' : index === 1 ? '👨‍💻' : '👩‍💻'}
                            </span>
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {testimonial.author}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {testimonial.position}
                            </Typography>
                          </Box>
                        </Box>
                      </TestimonialCard>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Section>

      {/* Pricing Section */}
      <Section
        ref={pricingRef}
        sx={{
          bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
        }}
      >
        <Container maxWidth="lg">
          <Fade in={animatePricing} timeout={1000}>
            <Box>
              <Typography
                variant="overline"
                component="p"
                align="center"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: mode === 'dark' ? 'primary.light' : 'primary.main',
                }}
              >
                PRICING
              </Typography>

              <GradientText
                variant="h2"
                component="h2"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                sx={{ mb: 2 }}
              >
                Simple, Transparent Pricing
              </GradientText>

              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
                sx={{ mb: 8, maxWidth: 700, mx: 'auto', fontWeight: 400 }}
              >
                Choose the plan that works best for your business. All plans include a 14-day free trial.
              </Typography>

              <Grid container spacing={4} justifyContent="center">
                {[
                  {
                    title: "Starter",
                    price: "$29",
                    description: "Perfect for small businesses and freelancers",
                    features: [
                      "Up to 50 accounts",
                      "Basic analytics",
                      "Email templates",
                      "5GB storage",
                      "Email support"
                    ],
                    buttonText: "Get Started",
                    highlighted: false
                  },
                  {
                    title: "Professional",
                    price: "$79",
                    description: "Ideal for growing businesses and teams",
                    features: [
                      "Unlimited accounts",
                      "Advanced analytics",
                      "All communication tools",
                      "50GB storage",
                      "Priority support",
                      "Team collaboration",
                      "API access"
                    ],
                    buttonText: "Get Started",
                    highlighted: true
                  },
                  {
                    title: "Enterprise",
                    price: "$199",
                    description: "For large organizations with complex needs",
                    features: [
                      "Unlimited everything",
                      "Custom analytics",
                      "Dedicated account manager",
                      "500GB storage",
                      "24/7 phone support",
                      "Advanced security",
                      "Custom integrations"
                    ],
                    buttonText: "Contact Sales",
                    highlighted: false
                  }
                ].map((plan, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Grow in={animatePricing} style={{ transformOrigin: '0 0 0', transitionDelay: `${200 * index}ms` }}>
                      <PricingCard
                        sx={{
                          border: plan.highlighted ? `2px solid ${mode === 'dark' ? 'white' : 'black'}` : undefined,
                          transform: plan.highlighted ? 'scale(1.05)' : undefined,
                          zIndex: plan.highlighted ? 1 : 0,
                          position: 'relative',
                        }}
                      >
                        {plan.highlighted && (
                          <Chip
                            label="Most Popular"
                            color="primary"
                            sx={{
                              position: 'absolute',
                              top: -15,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              fontWeight: 'bold',
                            }}
                          />
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ mr: 2, fontSize: '2rem' }}>
                            <span role="img" aria-label={plan.title.toLowerCase()}>
                              {index === 0 ? '🌱' : index === 1 ? '🚀' : '🏢'}
                            </span>
                          </Box>
                          <Typography variant="h5" fontWeight="bold">
                            {plan.title}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                          <Typography variant="h3" fontWeight="bold">
                            {plan.price}
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                            /month
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                          {plan.description}
                        </Typography>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ mb: 4 }}>
                          {plan.features.map((feature, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <CheckCircleIcon sx={{ mr: 1, fontSize: 20, color: mode === 'dark' ? 'primary.light' : 'primary.main' }} />
                              <Typography variant="body2">{feature}</Typography>
                            </Box>
                          ))}
                        </Box>
                        <Box sx={{ mt: 'auto' }}>
                          <PrimaryButton
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                              backgroundColor: plan.highlighted ? (mode === 'dark' ? 'white' : 'black') : undefined,
                              color: plan.highlighted ? (mode === 'dark' ? 'black' : 'white') : undefined,
                            }}
                          >
                            {plan.buttonText}
                          </PrimaryButton>
                        </Box>
                      </PricingCard>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section sx={{ bgcolor: mode === 'dark' ? 'background.default' : 'background.paper' }}>
        <Container maxWidth="md">
          <Typography
            variant="overline"
            component="p"
            align="center"
            sx={{
              mb: 1,
              fontWeight: 600,
              letterSpacing: 2,
              color: mode === 'dark' ? 'primary.light' : 'primary.main',
            }}
          >
            FAQ
          </Typography>

          <GradientText
            variant="h2"
            component="h2"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Frequently Asked Questions
          </GradientText>

          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 6, maxWidth: 700, mx: 'auto', fontWeight: 400 }}
          >
            Find answers to common questions about our platform.
          </Typography>

          <Box sx={{ mt: 4 }}>
            {[
              {
                question: "How does the 14-day free trial work?",
                answer: "You can sign up for a free 14-day trial with no credit card required. You'll have access to all features during the trial period. At the end of the trial, you can choose a plan that works for you or cancel with no obligation."
              },
              {
                question: "Can I export my data if I decide to cancel?",
                answer: "Yes, you can export all your data at any time, including if you decide to cancel your subscription. We provide easy export options in CSV and Excel formats."
              },
              {
                question: "Do you offer discounts for annual billing?",
                answer: "Yes, we offer a 20% discount when you choose annual billing instead of monthly billing. This discount is applied to all plans."
              },
              {
                question: "How secure is my data?",
                answer: "We take security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security practices and regular security audits to ensure your data is protected."
              },
              {
                question: "Can I upgrade or downgrade my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new pricing takes effect immediately. When downgrading, the new pricing takes effect at the start of your next billing cycle."
              }
            ].map((faq, index) => (
              <Accordion
                key={index}
                expanded={expandedFaq === `panel${index}`}
                onChange={handleFaqChange(`panel${index}`)}
                sx={{
                  mb: 2,
                  boxShadow: 'none',
                  border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  borderRadius: '8px !important',
                  '&:before': {
                    display: 'none',
                  },
                  overflow: 'hidden',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    borderRadius: '8px',
                    '&.Mui-expanded': {
                      borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                    }
                  }}
                >
                  <Typography variant="h6" fontWeight="600">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section sx={{
        bgcolor: mode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.02)',
        textAlign: 'center',
      }}>
        <Container maxWidth="md">
          <GradientText
            variant="h2"
            component="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Ready to Transform Your Business?
          </GradientText>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 700, mx: 'auto', fontWeight: 400 }}
          >
            Join thousands of businesses that use our platform to manage client relationships and drive growth.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <PrimaryButton
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              onClick={() => navigate('/signup')}
            >
              Get Started Free
            </PrimaryButton>

            <SecondaryButton
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              onClick={() => navigate('/contact')}
            >
              Contact Sales
            </SecondaryButton>
          </Box>
        </Container>
      </Section>

      {/* Auth Card - Login/Signup */}
      <Section sx={{
        bgcolor: mode === 'dark' ? 'background.default' : 'background.paper',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
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
      </Section>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 6,
          mt: 'auto',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Account Management System
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                A powerful platform for managing client relationships and growing your business.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <LinkedInIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <GitHubIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <EmailIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Product
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {['Features', 'Pricing', 'Integrations', 'Roadmap', 'Changelog'].map((item) => (
                  <Box component="li" key={item} sx={{ mb: 1 }}>
                    <Link href="#" underline="hover" color="text.secondary">
                      {item}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Resources
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {['Documentation', 'Tutorials', 'Blog', 'API', 'Community'].map((item) => (
                  <Box component="li" key={item} sx={{ mb: 1 }}>
                    <Link href="#" underline="hover" color="text.secondary">
                      {item}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Company
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {['About', 'Careers', 'Contact', 'Press', 'Partners'].map((item) => (
                  <Box component="li" key={item} sx={{ mb: 1 }}>
                    <Link href="#" underline="hover" color="text.secondary">
                      {item}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Legal
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {['Terms', 'Privacy', 'Cookies', 'Licenses', 'Settings'].map((item) => (
                  <Box component="li" key={item} sx={{ mb: 1 }}>
                    <Link href="#" underline="hover" color="text.secondary">
                      {item}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 6, pt: 3, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Account Management System. All rights reserved.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Made with ❤️ for better client relationships
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Video Modal */}
      {/* This would be implemented with a modal component showing a video */}
    </AuthContainer>
  );
};

export default LandingPage;