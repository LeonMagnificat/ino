import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Avatar,
  styled,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
  Fade,
  Skeleton,
  Collapse,
  Badge,
  Breadcrumbs,
  Link,
  Alert,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

// Create a theme with Nunito font
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8',
      dark: '#0d47a1',
      light: '#4791db',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#202124',
      dark: '#000000',
      light: '#484848',
      contrastText: '#ffffff',
    },
    success: {
      main: '#047857',
      light: 'rgba(4, 120, 87, 0.1)',
    },
    error: {
      main: '#B91C1C',
      light: 'rgba(185, 28, 28, 0.1)',
    },
    warning: {
      main: '#B45309',
      light: 'rgba(180, 83, 9, 0.1)',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#202124',
      secondary: '#5f6368',
    },
  },
  typography: {
    fontFamily: "'Nunito', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 800,
      fontSize: '1.75rem',
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.3rem',
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 700,
      fontSize: '1rem',
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '0.95rem',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '0.95rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Nunito', sans-serif;
          background-color: #f8f9fa;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '6px 16px',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.07)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          padding: '12px 16px',
        },
        head: {
          fontWeight: 700,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

const AccountsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(3, 4),
  overflow: 'auto',
  backgroundColor: theme.palette.background.default,
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '50px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.divider,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  width: '300px',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  textTransform: 'none',
  padding: theme.spacing(0.75, 2.5),
  marginLeft: theme.spacing(1.5),
  boxShadow: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: 'none',
    },
  },
  '&.MuiButton-outlined': {
    borderColor: theme.palette.divider,
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      borderColor: theme.palette.divider,
    },
  },
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  minWidth: 'auto',
  padding: theme.spacing(2, 3),
  '&.Mui-selected': {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
}));

const TabCount = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.secondary,
  borderRadius: '50%',
  width: '22px',
  height: '22px',
  fontSize: '0.75rem',
  marginLeft: theme.spacing(1),
  fontWeight: 700,
}));

const TableHeader = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: '#666',
  borderBottom: '1px solid #e0e0e0',
  padding: theme.spacing(1.5, 2),
  fontSize: '0.875rem',
}));

const TableContent = styled(TableCell)(({ theme }) => ({
  borderBottom: '1px solid #e0e0e0',
  padding: theme.spacing(1.5, 2),
  color: '#333',
  fontSize: '0.875rem',
}));

interface StatusChipProps {
  status: 'completed' | 'pending' | 'failed';
}

const StatusLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'completed' | 'pending' | 'failed' }>(({ theme, status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '3px 8px',
  borderRadius: '16px',
  fontSize: '0.75rem',
  fontWeight: 700,
  lineHeight: 1,
  backgroundColor: 
    status === 'completed' ? theme.palette.success.light : 
    status === 'failed' ? theme.palette.error.light : 
    theme.palette.warning.light,
  color: 
    status === 'completed' ? theme.palette.success.main : 
    status === 'failed' ? theme.palette.error.main : 
    theme.palette.warning.main,
  '&::before': {
    content: '""',
    display: 'block',
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: 
      status === 'completed' ? theme.palette.success.main : 
      status === 'failed' ? theme.palette.error.main : 
      theme.palette.warning.main,
    marginRight: theme.spacing(0.75)
  }
}));

interface Account {
  id: number;
  accountName: string;
  location: string;
  organisationType: string;
  activeAssets: string;
  productFamily: string;
  exitRate: string;
  updates: 'completed' | 'pending' | 'failed';
  logoSrc: string;
  color?: string;
}

interface CompanyInsight {
  question: string;
  points: string[];
}

interface SuggestedSolution {
  title: string;
  description: string;
  tag: string;
}

// Fonction pour générer une couleur stable basée sur une chaîne
const stringToColor = (string: string) => {
  // Vérification de sécurité pour éviter les erreurs
  if (!string) return '#1A73E8'; // Couleur par défaut en cas de chaîne vide
  
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Palette de couleurs vives mais professionnelles
  const colors = [
    '#1A73E8', // bleu Google
    '#EA4335', // rouge Google
    '#34A853', // vert Google
    '#FBBC05', // jaune Google
    '#7B1FA2', // violet
    '#0097A7', // cyan
    '#00796B', // teal
    '#C62828', // rouge
    '#AD1457', // rose
    '#6A1B9A', // pourpre
    '#4527A0', // indigo foncé
    '#283593', // indigo
    '#1565C0', // bleu
    '#0277BD', // bleu clair
    '#00838F', // cyan
    '#00695C', // teal
    '#2E7D32', // vert
    '#558B2F', // vert clair
    '#F9A825', // ambre
    '#EF6C00', // orange
    '#D84315', // orange foncé
    '#4E342E', // marron
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

// Fonction pour générer les initiales à partir d'un nom
const getInitials = (name: string) => {
  // Vérification de sécurité pour éviter les erreurs
  if (!name) return '??';
  
  const words = name.split(' ');
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
};

const mockAccounts: Account[] = [
  {
    id: 1,
    accountName: 'Master Card',
    location: 'London, United Kingdom',
    organisationType: 'Broker',
    activeAssets: '6 Assets',
    productFamily: 'Risk & Financial',
    exitRate: '2,343.09',
    updates: 'completed',
    logoSrc: '/images/mastercard.png',
    color: '#EB001B', // Couleur officielle de Mastercard
  },
  {
    id: 2,
    accountName: 'Twitter',
    location: 'San Francisco, USA',
    organisationType: 'Technology',
    activeAssets: '4 Assets',
    productFamily: 'Social Media',
    exitRate: '1,987.65',
    updates: 'pending',
    logoSrc: '/images/twitter.png',
    color: '#1DA1F2', // Couleur officielle de Twitter
  },
  {
    id: 3,
    accountName: 'Apple',
    location: 'Cupertino, USA',
    organisationType: 'Technology',
    activeAssets: '8 Assets',
    productFamily: 'Hardware & Software',
    exitRate: '3,219.44',
    updates: 'completed',
    logoSrc: '/images/apple.png',
    color: '#555555', // Couleur sobre pour Apple
  },
  {
    id: 4,
    accountName: 'Starbucks',
    location: 'Seattle, USA',
    organisationType: 'Food & Beverage',
    activeAssets: '5 Assets',
    productFamily: 'Consumer Goods',
    exitRate: '1,456.32',
    updates: 'failed',
    logoSrc: '/images/starbucks.png',
    color: '#00704A', // Couleur officielle de Starbucks
  },
  {
    id: 5,
    accountName: 'Google',
    location: 'Mountain View, USA',
    organisationType: 'Technology',
    activeAssets: '10 Assets',
    productFamily: 'Search & Advertising',
    exitRate: '4,123.77',
    updates: 'completed',
    logoSrc: '/images/avatar.png',
    color: '#4285F4', // Couleur officielle de Google
  },
  {
    id: 6,
    accountName: 'Amazon',
    location: 'Seattle, USA',
    organisationType: 'E-commerce',
    activeAssets: '7 Assets',
    productFamily: 'Retail & Cloud',
    exitRate: '3,678.90',
    updates: 'completed',
    logoSrc: '/images/avatar.png',
    color: '#FF9900', // Couleur officielle d'Amazon
  },
];

const mockInsights: CompanyInsight[] = [
  {
    question: "What are the latest company updates, including leadership changes, financial health, and strategic moves?",
    points: [
      "XYZ Corp recently raised $50M in Series B funding, led by ABC Ventures, to expand its AI-powered analytics platform.",
      "CEO Jane Doe stepped down last month, with John Smith, former CTO, taking over as interim CEO.",
      "The company announced a 5% workforce reduction as part of cost-cutting measures despite steady revenue growth."
    ]
  },
  {
    question: "What are the company's biggest challenges, priorities, or inefficiencies right now?",
    points: [
      "Struggling to integrate their new customer data platform, leading to inefficiencies in sales and marketing.",
      "Facing regulatory pressure due to new industry compliance rules, which could delay product launches.",
      "Recent customer feedback suggests poor user experience on their mobile app, with complaints about slow performance."
    ]
  },
  {
    question: "Who are the key decision-makers, and how are they shaping the company's direction?",
    points: [
      "John Smith (CEO) is prioritizing AI-driven automation and expanding into international markets.",
      "Emma Chen (CFO) is focused on improving profitability and optimizing operational costs.",
      "New VP of Product, David Patel, was hired from a top competitor and is expected to introduce a major product revamp."
    ]
  },
  {
    question: "How does the company position itself against competitors, and what market trends are affecting them?",
    points: [
      "Positions as the premium, enterprise-focused solution in the market with higher pricing but better support.",
      "Facing increasing competition from new startups offering similar solutions at lower price points.",
      "Industry shift toward integrated platforms is favorable for their all-in-one solution approach."
    ]
  }
];

const mockSolutions: SuggestedSolution[] = [
  {
    title: "LSEG AI-Powered Financial Compliance Suite",
    description: "Automates compliance checks, reducing regulatory risks for companies expanding into new markets.",
    tag: "Risk"
  },
  {
    title: "LSEG Competitive Intelligence Dashboard",
    description: "Real-time benchmarking of XYZ Corp vs. competitors, offering strategic insights on pricing, market share, and tech adoption.",
    tag: "Finance"
  },
  {
    title: "LSEG Emerging Market Expansion Toolkit",
    description: "A set of localized data, financial insights, and risk assessment tools tailored for Latin America.",
    tag: "Risk"
  }
];

const InformationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& .MuiTypography-root': {
    fontSize: '1.1rem',
    fontWeight: 700,
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
  }
}));

const DetailTab = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  textTransform: 'none',
  borderBottom: active ? `2px solid ${theme.palette.primary.main}` : 'none',
  borderRadius: 0,
  padding: theme.spacing(1.5, 2),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: active ? 700 : 600,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
  transition: theme.transitions.create(['color', 'border-bottom'], {
    duration: theme.transitions.duration.shorter,
  }),
}));

const AnimatedContainer = styled(Box)(({ theme }) => ({
  transition: theme.transitions.create('all', {
    duration: theme.transitions.duration.standard,
  }),
}));

const BookmarkButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: '#FFA000',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
}));

const AccountListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const AccountBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(1),
  fontSize: '0.75rem',
  fontWeight: 600,
}));

// Ajout d'un composant de transition pour les vues
const PageTransition = styled(Box)(({ theme }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
}));

const Accounts: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Account; direction: 'asc' | 'desc' } | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [detailsView, setDetailsView] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  const [loading, setLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [expandedInsights, setExpandedInsights] = useState<number[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [animatingTransition, setAnimatingTransition] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (key: keyof Account) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Account) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    
    return sortConfig.direction === 'asc' ? 
      <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
      <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />;
  };

  const filteredAccounts = mockAccounts.filter(account => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      account.accountName.toLowerCase().includes(query) ||
      account.location.toLowerCase().includes(query) ||
      account.organisationType.toLowerCase().includes(query) ||
      account.productFamily.toLowerCase().includes(query)
    );
  });

  const getFilteredAccountsByStatus = () => {
    if (tabValue === 0) return filteredAccounts; // All accounts
    if (tabValue === 1) return filteredAccounts.filter(account => account.updates === 'completed');
    if (tabValue === 2) return filteredAccounts.filter(account => account.updates === 'failed');
    if (tabValue === 3) return filteredAccounts.filter(account => account.updates === 'pending');
    return filteredAccounts;
  };

  const completedCount = mockAccounts.filter(account => account.updates === 'completed').length;
  const failedCount = mockAccounts.filter(account => account.updates === 'failed').length;
  const pendingCount = mockAccounts.filter(account => account.updates === 'pending').length;

  const filteredByStatusAccounts = getFilteredAccountsByStatus();

  const sortedAccounts = React.useMemo(() => {
    let sortableAccounts = [...filteredByStatusAccounts];
    
    if (sortConfig !== null) {
      sortableAccounts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableAccounts;
  }, [filteredByStatusAccounts, sortConfig]);

  const handleAccountSelect = (account: Account) => {
    setAnimatingTransition(true);
    setLoading(true);
    setSelectedAccount(account);
    
    // Délai pour l'animation avant d'afficher les détails
    setTimeout(() => {
      setDetailsView(true);
      setLoading(false);
      
      // Terminer l'animation
      setTimeout(() => {
        setAnimatingTransition(false);
      }, 300);
    }, 300);
  };

  const handleBackToAccounts = () => {
    setAnimatingTransition(true);
    
    // Délai pour l'animation avant de revenir à la liste
    setTimeout(() => {
      setDetailsView(false);
      
      // Terminer l'animation
      setTimeout(() => {
        setAnimatingTransition(false);
      }, 300);
    }, 300);
  };

  const handleDetailTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  const toggleBookmark = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setBookmarked(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const toggleInsight = (index: number) => {
    setExpandedInsights(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleShowTaskForm = () => {
    setShowTaskForm(true);
  };

  const handleHideTaskForm = () => {
    setShowTaskForm(false);
    setNewTaskText('');
  };

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  };

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      console.log("Adding task:", newTaskText);
      setNewTaskText('');
      setShowTaskForm(false);
    }
  };

  const renderAccountList = () => {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {detailsView && (
              <IconButton 
                onClick={handleBackToAccounts} 
                sx={{ mr: 1 }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" fontWeight="inherit">
              Accounts
            </Typography>
          </Box>
          <Tooltip title="Add new account">
            <IconButton 
              sx={{ 
                backgroundColor: (theme) => theme.palette.primary.main, 
                color: '#fff',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark
                },
                width: 32,
                height: 32
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <TextField
          placeholder="Search accounts"
          variant="outlined"
          fullWidth
          size="small"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: (theme) => theme.shape.borderRadius,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: (theme) => theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ mb: 1 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: (theme) => theme.palette.text.secondary,
              mb: 0.5
            }}
          >
            Account Name
          </Typography>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            overflow: 'hidden',
            mb: 3,
            maxHeight: 'calc(100vh - 240px)',
            overflowY: 'auto'
          }}
        >
          {mockAccounts.map((account, index) => (
            <React.Fragment key={account.id}>
              <AccountListItem
                onClick={() => handleAccountSelect(account)}
                sx={{ 
                  bgcolor: selectedAccount?.id === account.id ? (theme) => theme.palette.action.selected : 'transparent',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 40 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      backgroundColor: account.color || stringToColor(account.accountName),
                      mr: 1.5
                    }}
                  >
                    {getInitials(account.accountName)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {account.accountName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {account.organisationType}
                    </Typography>
                  </Box>
                  <StatusLabel status={account.updates} />
                  {bookmarked.includes(account.id) && (
                    <BookmarkIcon sx={{ ml: 1, fontSize: 16, color: '#FFA000' }} />
                  )}
                </Box>
              </AccountListItem>
              {index < mockAccounts.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Paper>
      </>
    );
  };

  const renderAccountDetails = () => {
    if (!selectedAccount) return null;

    const accountColor = selectedAccount.color || stringToColor(selectedAccount.accountName);
    const accountInitials = getInitials(selectedAccount.accountName);

    return (
      <AnimatedContainer sx={{ width: '100%' }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center', color: 'text.primary', cursor: 'pointer' }}
            onClick={handleBackToAccounts}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Accounts
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            {selectedAccount.accountName}
          </Typography>
        </Breadcrumbs>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: (theme) => theme.shape.borderRadius,
            position: 'relative',
            borderLeft: '4px solid',
            borderColor: (theme) => 
              selectedAccount.updates === 'completed' ? theme.palette.success.main : 
              selectedAccount.updates === 'failed' ? theme.palette.error.main : theme.palette.warning.main
          }}
        >
          <BookmarkButton 
            size="small" 
            onClick={(e) => toggleBookmark(selectedAccount.id, e)}
            aria-label={bookmarked.includes(selectedAccount.id) ? "Remove bookmark" : "Add bookmark"}
          >
            {bookmarked.includes(selectedAccount.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </BookmarkButton>

          <Box sx={{ display: 'flex', width: '100%' }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                fontSize: '2rem',
                fontWeight: 700,
                backgroundColor: accountColor,
                mr: 3,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {accountInitials}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h5" fontWeight="inherit" gutterBottom>
                    {selectedAccount.accountName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedAccount.location}
                  </Typography>
                </Box>
                
                <Box>
                  <Tooltip title="Account settings">
                    <IconButton onClick={handleAccountMenuOpen} size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={accountMenuAnchor}
                    open={Boolean(accountMenuAnchor)}
                    onClose={handleAccountMenuClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleAccountMenuClose}>Edit Account</MenuItem>
                    <MenuItem onClick={handleAccountMenuClose}>Account History</MenuItem>
                    <MenuItem onClick={handleAccountMenuClose}>Export Data</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleAccountMenuClose} sx={{ color: 'error.main' }}>
                      Delete Account
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
              
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <StatusLabel status={selectedAccount.updates}>
                  {selectedAccount.updates.charAt(0).toUpperCase() + selectedAccount.updates.slice(1)}
                </StatusLabel>
                <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '20px' }} />
                <Typography variant="body2" fontWeight={600}>
                  {selectedAccount.organisationType}
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '20px' }} />
                <Typography variant="body2" fontWeight={600}>
                  {selectedAccount.productFamily}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <AccountBadge>
                  {selectedAccount.activeAssets}
                </AccountBadge>
                <AccountBadge>
                  6 WC STAN
                </AccountBadge>
                <AccountBadge>
                  2 Workspace
                </AccountBadge>
              </Box>
            </Box>
            
            <Box sx={{ textAlign: 'right', minWidth: '140px' }}>
              <Typography variant="subtitle2" color="text.secondary">Exit Rate</Typography>
              <Typography variant="h6" fontWeight="inherit">
                {selectedAccount.exitRate} GBP
              </Typography>
              <Tooltip title="Last updated: Today at 10:23 AM">
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Updated today
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            width: '60%', 
            pr: 3
          }}>
            <Paper elevation={0} sx={{ borderRadius: (theme) => theme.shape.borderRadius, mb: 3, overflow: 'hidden' }}>
              <Box sx={{ 
                display: 'flex', 
                borderBottom: '1px solid #eee',
                backgroundColor: '#fff'
              }}>
                <DetailTab 
                  active={activeTab === 'tasks'}
                  onClick={() => handleDetailTabChange('tasks')}
                >
                  Tasks
                </DetailTab>
                <DetailTab 
                  active={activeTab === 'notes'} 
                  onClick={() => handleDetailTabChange('notes')}
                >
                  Notes
                </DetailTab>
                <DetailTab 
                  active={activeTab === 'comments'} 
                  onClick={() => handleDetailTabChange('comments')}
                >
                  Comments
                </DetailTab>
                
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', pr: 2 }}>
                  <Tooltip title="Add new task">
                    <IconButton size="small" onClick={handleShowTaskForm}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Box sx={{ p: 2 }}>
                {activeTab === 'tasks' && (
                  <>
                    <Collapse in={showTaskForm}>
                      <Box sx={{ mb: 2, p: 2, bgcolor: '#f9f9f9', borderRadius: '8px' }}>
                        <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 1 }}>
                          New Task
                        </Typography>
                        <TextField
                          placeholder="Task description"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={newTaskText}
                          onChange={handleNewTaskChange}
                          sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                          <Button 
                            variant="outlined" 
                            size="small" 
                            onClick={handleHideTaskForm}
                            sx={{ borderRadius: '20px', textTransform: 'none' }}
                          >
                            Cancel
                          </Button>
                          <Button 
                            variant="contained" 
                            size="small" 
                            onClick={handleAddTask}
                            sx={{ 
                              borderRadius: '20px', 
                              textTransform: 'none', 
                              bgcolor: '#000',
                              '&:hover': { bgcolor: '#333' }
                            }}
                          >
                            Add Task
                          </Button>
                        </Box>
                      </Box>
                    </Collapse>
                    
                    <List sx={{ bgcolor: 'background.paper' }}>
                      <ListItem alignItems="flex-start" sx={{ px: 2, py: 1.5, borderLeft: '3px solid #047857', mb: 1, borderRadius: '4px' }}>
                        <ListItemAvatar sx={{ minWidth: 30, mt: 0.5 }}>
                          <KeyboardArrowDownIcon fontSize="small" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Create a campaign for risk products before"
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                Due: 12th Jan 2025
                              </Typography>
                              <Chip 
                                label="High Priority" 
                                size="small" 
                                sx={{ 
                                  height: 20, 
                                  fontSize: '0.625rem',
                                  bgcolor: 'rgba(185, 28, 28, 0.1)',
                                  color: '#B91C1C'
                                }} 
                              />
                            </Box>
                          }
                          primaryTypographyProps={{
                            variant: 'body2',
                            fontWeight: 500
                          }}
                        />
                        <CheckCircleIcon fontSize="small" sx={{ color: '#047857', ml: 1 }} />
                      </ListItem>
                      <ListItem alignItems="flex-start" sx={{ px: 2, py: 1.5, borderLeft: '3px solid #B45309', mb: 1, borderRadius: '4px' }}>
                        <ListItemAvatar sx={{ minWidth: 30, mt: 0.5 }}>
                          <KeyboardArrowDownIcon fontSize="small" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Schedule quarterly review meeting with client"
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                Due: 30th Nov 2023
                              </Typography>
                              <Chip 
                                label="Medium Priority" 
                                size="small" 
                                sx={{ 
                                  height: 20, 
                                  fontSize: '0.625rem',
                                  bgcolor: 'rgba(180, 83, 9, 0.1)',
                                  color: '#B45309'
                                }} 
                              />
                            </Box>
                          }
                          primaryTypographyProps={{
                            variant: 'body2',
                            fontWeight: 500
                          }}
                        />
                      </ListItem>
                    </List>
                  </>
                )}

                {activeTab === 'notes' && (
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2 }}>
                      Last call notes (Oct 15, 2023)
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Client expressed interest in our compliance solution. They're particularly concerned about the regulatory changes coming in Q1 2024. 
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Key decision makers: John (CTO) and Sarah (Head of Risk). Sarah seems very interested in our real-time monitoring tools.
                    </Typography>
                    <Typography variant="body2">
                      Follow-up needed on pricing structure and implementation timeline.
                    </Typography>
                  </Box>
                )}

                {activeTab === 'comments' && (
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ my: 3 }}>
                      No comments yet. Be the first to add a comment.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ borderRadius: (theme) => theme.shape.borderRadius, p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Suggested Solutions to Pitch
                </Typography>
                <Tooltip title="Filter solutions">
                  <IconButton size="small" onClick={handleFilterMenuOpen}>
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={filterMenuAnchor}
                  open={Boolean(filterMenuAnchor)}
                  onClose={handleFilterMenuClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={handleFilterMenuClose}>All Solutions</MenuItem>
                  <MenuItem onClick={handleFilterMenuClose}>Risk</MenuItem>
                  <MenuItem onClick={handleFilterMenuClose}>Finance</MenuItem>
                  <MenuItem onClick={handleFilterMenuClose}>Tech</MenuItem>
                </Menu>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Button 
                  variant="contained" 
                  sx={{ 
                    borderRadius: '20px', 
                    textTransform: 'none', 
                    bgcolor: '#333', 
                    color: '#fff',
                    fontWeight: 500,
                    px: 2
                  }}
                  startIcon={<StarIcon sx={{ fontSize: 16 }} />}
                >
                  Risk
                </Button>
                <Button 
                  variant="contained" 
                  sx={{ 
                    borderRadius: '20px', 
                    textTransform: 'none', 
                    bgcolor: '#f5f5f5', 
                    color: '#000',
                    fontWeight: 500,
                    px: 2,
                    '&:hover': {
                      bgcolor: '#e0e0e0'
                    }
                  }}
                >
                  Finance
                </Button>
              </Box>

              {mockSolutions.map((solution, index) => (
                <Paper 
                  key={index} 
                  elevation={0}
                  sx={{ 
                    mb: 2, 
                    p: 2, 
                    borderRadius: (theme) => theme.shape.borderRadius, 
                    border: '1px solid #eee',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      borderColor: '#ddd'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box 
                      component="span" 
                      sx={{ 
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        bgcolor: '#B91C1C',
                        borderRadius: '50%',
                        mr: 1.5,
                        mt: 0.7
                      }} 
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        {solution.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {solution.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Chip 
                          label={solution.tag} 
                          size="small"
                          sx={{ 
                            height: 20, 
                            fontSize: '0.625rem',
                            bgcolor: solution.tag === 'Risk' ? 'rgba(185, 28, 28, 0.1)' : 'rgba(12, 74, 110, 0.1)',
                            color: solution.tag === 'Risk' ? '#B91C1C' : '#0C4A6E'
                          }} 
                        />
                        <Button 
                          variant="text" 
                          size="small"
                          sx={{ 
                            textTransform: 'none', 
                            fontSize: '0.75rem',
                            color: '#000',
                            p: 0
                          }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Paper>
          </Box>

          <Box sx={{ width: '40%' }}>
            <Paper elevation={0} sx={{ borderRadius: (theme) => theme.shape.borderRadius, overflow: 'hidden', mb: 3 }}>
              <Box sx={{ p: 2, bgcolor: '#212121', color: 'white' }}>
                <SectionTitle sx={{ mb: 1 }}>
                  <BarChartIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography variant="h6" fontWeight={600} color="white">
                    Insights Panel
                  </Typography>
                </SectionTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" fontWeight={500} color="rgba(255,255,255,0.8)">
                    {selectedAccount.location}
                  </Typography>
                  <Chip 
                    label="LIVE DATA" 
                    size="small"
                    sx={{ 
                      height: 20,
                      fontSize: '0.625rem',
                      bgcolor: 'rgba(255,255,255,0.15)',
                      color: 'white'
                    }}
                  />
                </Box>
              </Box>
              
              <Box sx={{ p: 3 }}>
                {mockInsights.map((insight, index) => (
                  <Paper 
                    key={index} 
                    elevation={0} 
                    sx={{ 
                      mb: 2, 
                      overflow: 'hidden', 
                      borderRadius: (theme) => theme.shape.borderRadius,
                      border: '1px solid #eee'
                    }}
                  >
                    <Box 
                      sx={{ 
                        p: 2, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        bgcolor: expandedInsights.includes(index) ? '#f5f5f5' : 'transparent',
                        '&:hover': { bgcolor: '#f5f5f5' }
                      }}
                      onClick={() => toggleInsight(index)}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        {index + 1}. {insight.question.length > 60 
                          ? `${insight.question.substring(0, 60)}...` 
                          : insight.question}
                      </Typography>
                      <ExpandMoreIcon 
                        sx={{ 
                          transform: expandedInsights.includes(index) ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s'
                        }} 
                      />
                    </Box>
                    <Collapse in={expandedInsights.includes(index)}>
                      <Box sx={{ px: 2, pb: 2 }}>
                        <List dense sx={{ pl: 2, mt: 0 }}>
                          {insight.points.map((point, i) => (
                            <ListItem key={i} sx={{ display: 'list-item', listStyleType: 'disc', pl: 0, py: 0.5 }}>
                              <Typography variant="body2">
                                {point}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Collapse>
                  </Paper>
                ))}
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ borderRadius: (theme) => theme.shape.borderRadius, overflow: 'hidden', mb: 3 }}>
              <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <SectionTitle sx={{ mb: 0 }}>
                  <AssignmentIcon sx={{ color: '#666', mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Action Plan
                  </Typography>
                </SectionTitle>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Alert 
                  severity="info" 
                  sx={{ 
                    mb: 3, 
                    '& .MuiAlert-icon': { alignItems: 'center' },
                    borderRadius: (theme) => theme.shape.borderRadius
                  }}
                >
                  Personalized recommendations based on recent client activity and market trends.
                </Alert>

                <Box sx={{ mb: 3 }}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      mb: 2, 
                      p: 3, 
                      bgcolor: '#fff', 
                      borderRadius: (theme) => theme.shape.borderRadius, 
                      borderLeft: '3px solid #000',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                  >
                    <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1, fontWeight: 500 }}>
                      "We see that integrating your new customer data platform has been a challenge. LSEG has a proven AI-based solution that can accelerate the process by 30%."
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right' }}>
                      Based on recent technology adoption
                    </Typography>
                  </Paper>
                  
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      mb: 2, 
                      p: 3, 
                      bgcolor: '#fff', 
                      borderRadius: (theme) => theme.shape.borderRadius, 
                      borderLeft: '3px solid #000',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                  >
                    <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1, fontWeight: 500 }}>
                      "Given the rising regulatory compliance risks, LSEG's compliance monitoring tools could help you stay ahead of upcoming changes."
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right' }}>
                      Addressing regulatory pressure
                    </Typography>
                  </Paper>
                  
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      mb: 2, 
                      p: 3, 
                      bgcolor: '#fff', 
                      borderRadius: (theme) => theme.shape.borderRadius, 
                      borderLeft: '3px solid #000',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                  >
                    <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1, fontWeight: 500 }}>
                      "We noticed your upcoming expansion into Latin America—LSEG provides tailored financial data solutions for emerging markets that can enhance your market entry strategy."
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right' }}>
                      Strategic market expansion
                    </Typography>
                  </Paper>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      borderRadius: '20px', 
                      textTransform: 'none', 
                      bgcolor: '#f5f5f5', 
                      color: '#000',
                      fontWeight: 500,
                      px: 2,
                      '&:hover': {
                        bgcolor: '#e0e0e0'
                      }
                    }}
                  >
                    Recommended Campaigns
                  </Button>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      borderRadius: '20px', 
                      textTransform: 'none', 
                      bgcolor: '#000', 
                      color: '#fff',
                      fontWeight: 500,
                      px: 2
                    }}
                  >
                    Talking Points
                  </Button>
                </Box>
              </Box>
            </Paper>
            
            {/* Quick Access Tools */}
            <Paper elevation={0} sx={{ borderRadius: (theme) => theme.shape.borderRadius, p: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Quick Access
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip 
                  label="Account History" 
                  clickable 
                  sx={{ 
                    borderRadius: '16px',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }} 
                />
                <Chip 
                  label="Meeting Notes" 
                  clickable 
                  sx={{ 
                    borderRadius: '16px',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }} 
                />
                <Chip 
                  label="Contact List" 
                  clickable 
                  sx={{ 
                    borderRadius: '16px',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }} 
                />
                <Chip 
                  label="Recent Orders" 
                  clickable 
                  sx={{ 
                    borderRadius: '16px',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }} 
                />
              </Box>
            </Paper>
          </Box>
        </Box>
      </AnimatedContainer>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AccountsContainer>
        <PageTransition 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            height: 'calc(100vh - 80px)',
            overflow: 'hidden'
          }}
        >
          {/* Header commun qui reste toujours visible */}
          <Header>
            <Box>
              <Typography 
                variant="h4" 
                fontWeight="inherit" 
                sx={{ 
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 4,
                    backgroundColor: 'primary.main',
                    borderRadius: 2,
                  }
                }}
              >
                Accounts
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                sx={{ mt: 2 }}
              >
                Manage your client accounts and view detailed insights
              </Typography>
            </Box>
            
            {!detailsView ? (
              <Box display="flex" alignItems="center">
                <SearchBar
                  placeholder="Search accounts"
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: (theme) => theme.palette.text.secondary }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <ActionButton variant="outlined" startIcon={<FilterListIcon />}>
                  Filter
                </ActionButton>
                <ActionButton variant="outlined" startIcon={<DownloadIcon />}>
                  Export
                </ActionButton>
                <ActionButton 
                  variant="contained" 
                  color="primary" 
                  startIcon={<AddIcon />}
                >
                  Add Account
                </ActionButton>
              </Box>
            ) : (
              <IconButton 
                onClick={handleBackToAccounts}
                sx={{ 
                  bgcolor: 'action.hover',
                  '&:hover': {
                    bgcolor: 'action.focus',
                  }
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
          </Header>

          <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Section de liste des comptes - réduite mais toujours visible en mode détails */}
            <PageTransition
              sx={{ 
                width: detailsView ? '280px' : '100%',
                transition: theme.transitions.create(['width'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.standard,
                }),
                overflow: 'hidden',
                mr: detailsView ? 3 : 0,
              }}
            >
              {!detailsView ? (
                <>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      color: (theme) => theme.palette.text.secondary,
                      fontWeight: 600
                    }}
                  >
                    Filters
                  </Typography>

                  <TabsContainer>
                    <Tabs 
                      value={tabValue} 
                      onChange={handleTabChange}
                      indicatorColor="primary"
                      textColor="primary"
                    >
                      <StyledTab 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            All Accounts <TabCount>{mockAccounts.length}</TabCount>
                          </Box>
                        } 
                      />
                      <StyledTab 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Completed <TabCount>{completedCount}</TabCount>
                          </Box>
                        } 
                      />
                      <StyledTab 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Failed <TabCount>{failedCount}</TabCount>
                          </Box>
                        } 
                      />
                      <StyledTab 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Pending <TabCount>{pendingCount}</TabCount>
                          </Box>
                        } 
                      />
                    </Tabs>
                  </TabsContainer>

                  <Paper 
                    elevation={0} 
                    sx={{ 
                      borderRadius: (theme) => theme.shape.borderRadius, 
                      overflow: 'hidden'
                    }}
                  >
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeader onClick={() => handleSort('accountName')} sx={{ cursor: 'pointer', pl: 3 }}>
                              <Box display="flex" alignItems="center">
                                Account Name {getSortIcon('accountName')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('location')} sx={{ cursor: 'pointer' }}>
                              <Box display="flex" alignItems="center">
                                Location {getSortIcon('location')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('organisationType')} sx={{ cursor: 'pointer' }}>
                              <Box display="flex" alignItems="center">
                                Organisation Type {getSortIcon('organisationType')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('activeAssets')} sx={{ cursor: 'pointer' }}>
                              <Box display="flex" alignItems="center">
                                Active Assets {getSortIcon('activeAssets')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('productFamily')} sx={{ cursor: 'pointer' }}>
                              <Box display="flex" alignItems="center">
                                Product Family {getSortIcon('productFamily')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('exitRate')} sx={{ cursor: 'pointer' }}>
                              <Box display="flex" alignItems="center">
                                Exit Rate(GBP) {getSortIcon('exitRate')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('updates')} sx={{ cursor: 'pointer', pr: 3 }}>
                              <Box display="flex" alignItems="center">
                                Updates {getSortIcon('updates')}
                              </Box>
                            </TableHeader>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            Array.from(new Array(5)).map((_, index) => (
                              <TableRow key={index}>
                                <TableContent>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Skeleton variant="rounded" width={36} height={36} sx={{ mr: 2 }} />
                                    <Skeleton variant="text" width={120} />
                                  </Box>
                                </TableContent>
                                <TableContent><Skeleton variant="text" width={150} /></TableContent>
                                <TableContent><Skeleton variant="text" width={100} /></TableContent>
                                <TableContent><Skeleton variant="text" width={80} /></TableContent>
                                <TableContent><Skeleton variant="text" width={120} /></TableContent>
                                <TableContent><Skeleton variant="text" width={70} /></TableContent>
                                <TableContent><Skeleton variant="rounded" width={80} height={24} /></TableContent>
                              </TableRow>
                            ))
                          ) : (
                            sortedAccounts.map((account) => (
                              <TableRow 
                                key={account.id} 
                                hover
                                onClick={() => handleAccountSelect(account)}
                                sx={{ 
                                  cursor: 'pointer',
                                  transition: (theme) => theme.transitions.create(['background-color'], {
                                    duration: theme.transitions.duration.shortest,
                                  }),
                                  bgcolor: selectedAccount?.id === account.id ? (theme) => theme.palette.action.selected : 'transparent',
                                }}
                              >
                                <TableContent sx={{ pl: 3 }}>
                                  <Box display="flex" alignItems="center" sx={{ position: 'relative' }}>
                                    <Avatar
                                      sx={{
                                        width: 36,
                                        height: 36,
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        backgroundColor: account.color || stringToColor(account.accountName),
                                        mr: 2
                                      }}
                                    >
                                      {getInitials(account.accountName)}
                                    </Avatar>
                                    <Box>
                                      <Typography variant="body2" fontWeight={600}>
                                        {account.accountName}
                                      </Typography>
                                    </Box>
                                    {bookmarked.includes(account.id) && (
                                      <BookmarkIcon 
                                        sx={{ 
                                          position: 'absolute', 
                                          top: -2, 
                                          right: -8, 
                                          color: '#FFA000', 
                                          fontSize: 14 
                                        }} 
                                      />
                                    )}
                                  </Box>
                                </TableContent>
                                <TableContent>{account.location}</TableContent>
                                <TableContent>{account.organisationType}</TableContent>
                                <TableContent>
                                  <Box display="flex" alignItems="center">
                                    {account.activeAssets}
                                    <KeyboardArrowDownIcon fontSize="small" sx={{ ml: 0.5, color: (theme) => theme.palette.text.secondary }} />
                                  </Box>
                                </TableContent>
                                <TableContent>{account.productFamily}</TableContent>
                                <TableContent>{account.exitRate}</TableContent>
                                <TableContent sx={{ pr: 3 }}>
                                  <StatusLabel status={account.updates}>
                                    {account.updates.charAt(0).toUpperCase() + account.updates.slice(1)}
                                  </StatusLabel>
                                </TableContent>
                              </TableRow>
                            ))
                          )}
                          {!loading && sortedAccounts.length === 0 && (
                            <TableRow>
                              <TableContent colSpan={7} align="center" sx={{ py: 4 }}>
                                <Typography variant="body2" color="text.secondary">
                                  No accounts found
                                </Typography>
                              </TableContent>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </>
              ) : (
                <Paper 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    borderRadius: (theme) => theme.shape.borderRadius,
                    p: 3,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {renderAccountList()}
                </Paper>
              )}
            </PageTransition>

            {/* Section de détails du compte - visible uniquement en mode détails */}
            {detailsView && (
              <PageTransition
                sx={{ 
                  flex: 1,
                  opacity: animatingTransition ? 0 : 1,
                  transform: animatingTransition ? 'translateX(20px)' : 'translateX(0)',
                  transition: theme.transitions.create(['opacity', 'transform'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.standard,
                  }),
                  overflow: 'auto',
                  height: '100%'
                }}
              >
                {loading ? (
                  <Box sx={{ p: 3 }}>
                    <Skeleton variant="rectangular" height={140} sx={{ borderRadius: (theme) => theme.shape.borderRadius, mb: 3 }} />
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Box sx={{ width: '60%' }}>
                        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: (theme) => theme.shape.borderRadius, mb: 3 }} />
                        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: (theme) => theme.shape.borderRadius }} />
                      </Box>
                      <Box sx={{ width: '40%' }}>
                        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: (theme) => theme.shape.borderRadius, mb: 3 }} />
                        <Skeleton variant="rectangular" height={100} sx={{ borderRadius: (theme) => theme.shape.borderRadius }} />
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  renderAccountDetails()
                )}
              </PageTransition>
            )}
          </Box>
        </PageTransition>
      </AccountsContainer>
    </ThemeProvider>
  );
};

export default Accounts; 