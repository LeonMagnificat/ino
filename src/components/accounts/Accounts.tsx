import React, { useState, useRef } from 'react';
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
  Snackbar,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  FormHelperText,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContext';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BusinessIcon from '@mui/icons-material/Business';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

// Use the global theme from ThemeContext

const AccountsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(0, 3), // Add horizontal padding
  boxSizing: 'border-box',
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1.5, 0),
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '3px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '3px',
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
  borderRadius: '3px',
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
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
    borderRadius: '3px',
  },
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
  color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : '#666',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e0e0e0'}`,
  padding: theme.spacing(1.5, 2),
  fontSize: '0.875rem',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
  position: 'sticky',
  top: 0,
  zIndex: 3,
  backdropFilter: 'blur(4px)',
}));

const TableContent = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e0e0e0'}`,
  padding: theme.spacing(1.5, 2),
  color: theme.palette.mode === 'dark' ? theme.palette.text.primary : '#333',
  fontSize: '0.875rem',
}));

interface StatusChipProps {
  status: 'completed' | 'pending' | 'failed' | 'loading';
}

// Status indicator component
const StatusIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'completed' | 'pending' | 'failed' | 'loading' }>(({ theme, status }) => ({
  width: 10,
  height: 10,
  borderRadius: '2px',
  backgroundColor:
    status === 'completed' ? theme.palette.success.main :
    status === 'failed' ? theme.palette.error.main :
    status === 'loading' ? theme.palette.info.main :
    theme.palette.warning.main,
  marginRight: theme.spacing(0.75),
  display: 'inline-block',
  transition: 'all 0.2s ease-in-out',
}));

const StatusLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'completed' | 'pending' | 'failed' | 'loading' }>(({ theme, status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 6px',
  borderRadius: '3px',
  fontSize: '0.7rem',
  fontWeight: 700,
  lineHeight: 1,
  backgroundColor:
    status === 'completed'
      ? theme.palette.mode === 'dark' ? 'rgba(46, 204, 113, 0.3)' : theme.palette.success.light :
    status === 'failed'
      ? theme.palette.mode === 'dark' ? 'rgba(231, 76, 60, 0.3)' : theme.palette.error.light :
    status === 'loading'
      ? theme.palette.mode === 'dark' ? 'rgba(52, 152, 219, 0.3)' : theme.palette.info.light :
    theme.palette.mode === 'dark' ? 'rgba(241, 196, 15, 0.3)' : theme.palette.warning.light,
  color:
    status === 'completed'
      ? theme.palette.mode === 'dark' ? '#2ecc71' : theme.palette.success.main :
    status === 'failed'
      ? theme.palette.mode === 'dark' ? '#e74c3c' : theme.palette.error.main :
    status === 'loading'
      ? theme.palette.mode === 'dark' ? '#3498db' : theme.palette.info.main :
    theme.palette.mode === 'dark' ? '#f1c40f' : theme.palette.warning.main,
}));

interface Asset {
  id: number;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
}

interface Account {
  id: number;
  accountName: string;
  location: string;
  organisationType: string;
  activeAssets: string;
  assets: Asset[];
  productFamily: string;
  exitRate: string;
  updates: 'completed' | 'pending' | 'failed' | 'loading';
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

interface AIDescription {
  summary: string;
  strengths: string[];
  opportunities: string[];
  isLoading: boolean;
}

// Campaign interface for storing generated templates
interface Campaign {
  id: number;
  title: string;
  description: string;
  accountName: string;
  accountId: number;
  type: 'email' | 'call' | 'meeting';
  content: string;
  createdAt: string;
  isRead: boolean;
}

// Function to generate a stable color based on a string
const stringToColor = (string: string) => {
  // Safety check to avoid errors
  if (!string) return '#1A73E8'; // Default color for empty strings

  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Palette of vibrant but professional colors
  const colors = [
    '#1A73E8', // Google blue
    '#EA4335', // Google red
    '#34A853', // Google green
    '#FBBC05', // Google yellow
    '#7B1FA2', // purple
    '#0097A7', // cyan
    '#00796B', // teal
    '#C62828', // red
    '#AD1457', // pink
    '#6A1B9A', // deep purple
    '#4527A0', // dark indigo
    '#283593', // indigo
    '#1565C0', // blue
    '#0277BD', // light blue
    '#00838F', // cyan
    '#00695C', // teal
    '#2E7D32', // green
    '#558B2F', // light green
    '#F9A825', // amber
    '#EF6C00', // orange
    '#D84315', // deep orange
    '#4E342E', // brown
  ];

  return colors[Math.abs(hash) % colors.length];
};

// Function to fetch accounts from CSV
const fetchAccountsFromCSV = async (): Promise<Account[]> => {
  try {
    const response = await fetch('/accounts.csv');
    const csvText = await response.text();

    // Parse CSV
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');

    const accounts: Account[] = [];

    // Define asset names for different organization types
    const assetNamesByType: Record<string, string[]> = {
      'Finance': [
        'Financial Analytics', 'Risk Assessment Tool', 'Market Data Feed',
        'Compliance Monitor', 'Trading Platform', 'Portfolio Manager',
        'Investment Tracker', 'Fraud Detection System', 'Regulatory Reporting'
      ],
      'Technology': [
        'Software Development Kit', 'Cloud Infrastructure', 'Data Analytics Platform',
        'AI Development Tools', 'Mobile App Framework', 'Security Suite',
        'API Management', 'DevOps Pipeline', 'User Experience Testing'
      ],
      'Healthcare': [
        'Patient Management System', 'Clinical Analytics', 'Medical Records Database',
        'Telemedicine Platform', 'Health Monitoring', 'Prescription Management',
        'Lab Results Tracker', 'Healthcare Compliance', 'Medical Billing System'
      ],
      'Retail': [
        'Inventory Management', 'Point of Sale System', 'Customer Loyalty Program',
        'Supply Chain Tracker', 'Retail Analytics', 'E-commerce Platform',
        'Product Catalog', 'Order Management', 'Store Performance Dashboard'
      ],
      'Media': [
        'Content Management System', 'Media Analytics', 'Audience Engagement',
        'Ad Performance Tracker', 'Content Distribution', 'Social Media Integration',
        'Video Streaming Platform', 'Digital Rights Management', 'Subscriber Management'
      ],
      'Default': [
        'Business Intelligence', 'Data Management', 'Analytics Dashboard',
        'Reporting System', 'Workflow Automation', 'Customer Insights',
        'Performance Monitoring', 'Resource Planning', 'Project Management'
      ]
    };

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const values = lines[i].split(',');
      const account: any = {};

      headers.forEach((header, index) => {
        if (header === 'id') {
          account[header] = parseInt(values[index]);
        } else if (header === 'updates') {
          account[header] = values[index] as 'completed' | 'pending' | 'failed' | 'loading';
        } else {
          account[header] = values[index];
        }
      });

      // Format location to add comma if missing
      if (account.location && !account.location.includes(',')) {
        const parts = account.location.split(' ');
        const city = parts.slice(0, -1).join(' ');
        const country = parts[parts.length - 1];
        account.location = `${city}, ${country}`;
      }

      // Add default assets based on activeAssets count
      const assetCount = parseInt(account.activeAssets) || 4;
      account.activeAssets = `${assetCount} Assets`;

      // Get appropriate asset names based on organization type
      const orgType = account.organisationType;
      const assetNames = assetNamesByType[orgType] || assetNamesByType['Default'];

      // Create assets with realistic names based on organization type
      account.assets = Array.from({ length: assetCount }, (_, index) => {
        // Use modulo to cycle through available asset names if we have more assets than names
        const nameIndex = index % assetNames.length;
        return {
          id: account.id * 100 + index + 1,
          name: assetNames[nameIndex],
          type: index % 3 === 0 ? 'Data Service' : 'Software',
          status: 'active',
          lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
      });

      // Set default logo
      account.logoSrc = account.accountName === 'Master Card' ? '/images/mastercard.png' :
                        account.accountName === 'Twitter' ? '/images/twitter.png' :
                        account.accountName === 'Apple' ? '/images/apple.png' : '/images/avatar.png';

      accounts.push(account as Account);
    }

    return accounts;
  } catch (error) {
    console.error('Error fetching accounts from CSV:', error);
    return [];
  }
};

// Function to generate a large number of dummy accounts (fallback if CSV loading fails)
const generateDummyAccounts = (count: number, baseAccounts: Account[]): Account[] => {
  const dummyAccounts: Account[] = [...baseAccounts]; // Start with the base accounts

  // Company name prefixes and suffixes for generating unique names
  const prefixes = ['Global', 'Advanced', 'Premier', 'Elite', 'Future', 'Smart', 'Innovative', 'Strategic', 'Dynamic', 'Precision'];
  const industries = ['Tech', 'Finance', 'Health', 'Energy', 'Media', 'Retail', 'Logistics', 'Consulting', 'Manufacturing', 'Services'];
  const suffixes = ['Solutions', 'Systems', 'Group', 'Partners', 'Inc', 'Corp', 'Technologies', 'Enterprises', 'Networks', 'International'];

  // Locations for random assignment
  const locations = [
    'New York, USA',
    'London, UK',
    'Tokyo, Japan',
    'Berlin, Germany',
    'Paris, France',
    'Singapore',
    'Sydney, Australia',
    'Toronto, Canada',
    'Dubai, UAE',
    'Mumbai, India',
    'São Paulo, Brazil',
    'Amsterdam, Netherlands',
    'Stockholm, Sweden',
    'Hong Kong',
    'Seoul, South Korea'
  ];

  // Organization types
  const orgTypes = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Media', 'Consulting', 'Education', 'Energy', 'Transportation'];

  // Product families
  const productFamilies = [
    'Enterprise Solutions',
    'Cloud Services',
    'Data Analytics',
    'Security Systems',
    'Mobile Platforms',
    'Customer Experience',
    'Business Intelligence',
    'Infrastructure',
    'Digital Transformation',
    'IoT Solutions'
  ];

  // Update statuses
  const statuses: ('completed' | 'pending' | 'failed' | 'loading')[] = ['completed', 'pending', 'failed', 'loading'];

  // Generate additional accounts
  for (let i = baseAccounts.length; i < count; i++) {
    // Pick random elements to create a unique company name
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const companyName = `${prefix} ${industry} ${suffix}`;

    // Random number of assets between 2 and 15
    const assetCount = Math.floor(Math.random() * 14) + 2;

    // Generate assets based on a template account
    const templateAccount = baseAccounts[i % baseAccounts.length];
    const assets = Array.from({ length: assetCount }, (_, index) => {
      const templateAsset = templateAccount.assets[index % templateAccount.assets.length];
      return {
        id: i * 1000 + index,
        name: `${prefix} ${templateAsset.name}`,
        type: Math.random() > 0.7 ? 'Data Service' : 'Software',
        status: 'active',
        lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
    });

    // Create the account
    dummyAccounts.push({
      id: i + 1,
      accountName: companyName,
      location: locations[Math.floor(Math.random() * locations.length)],
      organisationType: orgTypes[Math.floor(Math.random() * orgTypes.length)],
      activeAssets: `${assetCount} Assets`,
      assets,
      productFamily: productFamilies[Math.floor(Math.random() * productFamilies.length)],
      exitRate: (Math.floor(Math.random() * 5000) + 500).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      updates: statuses[Math.floor(Math.random() * statuses.length)],
      logoSrc: '/images/avatar.png',
      color: stringToColor(companyName)
    });
  }

  return dummyAccounts;
};

// Function to generate initials from a name
const getInitials = (name: string) => {
  // Safety check to avoid errors
  if (!name) return '??';
  
  const words = name.split(' ');
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
};

// Base accounts that will be used as templates (fallback if CSV loading fails)
const baseAccounts: Account[] = [
  {
    id: 1,
    accountName: 'Master Card',
    location: 'London, United Kingdom',
    organisationType: 'Finance',
    activeAssets: '6 Assets',
    assets: [
      { id: 101, name: 'Financial Analytics', type: 'Software', status: 'active', lastUpdated: '2023-11-15' },
      { id: 102, name: 'Risk Assessment Tool', type: 'Software', status: 'active', lastUpdated: '2023-11-14' },
      { id: 103, name: 'Market Data Feed', type: 'Data Service', status: 'active', lastUpdated: '2023-11-12' },
      { id: 104, name: 'Compliance Monitor', type: 'Software', status: 'active', lastUpdated: '2023-11-08' },
      { id: 105, name: 'Trading Platform', type: 'Software', status: 'active', lastUpdated: '2023-11-05' },
      { id: 106, name: 'Portfolio Manager', type: 'Software', status: 'active', lastUpdated: '2023-11-01' }
    ],
    productFamily: 'Risk & Financial',
    exitRate: '2,343.09',
    updates: 'completed',
    logoSrc: '/images/mastercard.png',
    color: '#EB001B',
  },
  {
    id: 2,
    accountName: 'Twitter',
    location: 'San Francisco, USA',
    organisationType: 'Technology',
    activeAssets: '4 Assets',
    assets: [
      { id: 201, name: 'Social Media Analytics', type: 'Software', status: 'active', lastUpdated: '2023-11-14' },
      { id: 202, name: 'Engagement Tracker', type: 'Software', status: 'active', lastUpdated: '2023-11-09' },
      { id: 203, name: 'Sentiment Analysis', type: 'Data Service', status: 'active', lastUpdated: '2023-11-07' },
      { id: 204, name: 'Trend Predictor', type: 'Software', status: 'active', lastUpdated: '2023-11-03' }
    ],
    productFamily: 'Social Media',
    exitRate: '1,987.65',
    updates: 'loading',
    logoSrc: '/images/twitter.png',
    color: '#1DA1F2',
  },
  {
    id: 3,
    accountName: 'Apple',
    location: 'Cupertino, USA',
    organisationType: 'Technology',
    activeAssets: '8 Assets',
    assets: [
      { id: 301, name: 'Software Development Kit', type: 'Software', status: 'active', lastUpdated: '2023-11-15' },
      { id: 302, name: 'Cloud Infrastructure', type: 'Software', status: 'active', lastUpdated: '2023-11-14' },
      { id: 303, name: 'Data Analytics Platform', type: 'Data Service', status: 'active', lastUpdated: '2023-11-12' },
      { id: 304, name: 'AI Development Tools', type: 'Data Service', status: 'active', lastUpdated: '2023-11-10' },
      { id: 305, name: 'Mobile App Framework', type: 'Software', status: 'active', lastUpdated: '2023-11-08' },
      { id: 306, name: 'Security Suite', type: 'Software', status: 'active', lastUpdated: '2023-11-06' },
      { id: 307, name: 'API Management', type: 'Software', status: 'active', lastUpdated: '2023-11-04' },
      { id: 308, name: 'DevOps Pipeline', type: 'Data Service', status: 'active', lastUpdated: '2023-11-02' }
    ],
    productFamily: 'Hardware & Software',
    exitRate: '3,219.44',
    updates: 'completed',
    logoSrc: '/images/apple.png',
    color: '#555555',
  },
  {
    id: 4,
    accountName: 'Financial Solutions',
    location: 'London, UK',
    organisationType: 'Finance',
    activeAssets: '3 Assets',
    assets: [
      { id: 401, name: 'Financial Analytics', type: 'Software', status: 'active', lastUpdated: '2023-11-15' },
      { id: 402, name: 'Risk Assessment Tool', type: 'Software', status: 'active', lastUpdated: '2023-11-13' },
      { id: 403, name: 'Market Data Feed', type: 'Data Service', status: 'active', lastUpdated: '2023-11-11' }
    ],
    productFamily: 'Financial Services',
    exitRate: '1,850.75',
    updates: 'completed',
    logoSrc: '/images/avatar.png',
    color: '#4285F4',
  },
  {
    id: 5,
    accountName: 'Healthcare Plus',
    location: 'Boston, USA',
    organisationType: 'Healthcare',
    activeAssets: '7 Assets',
    assets: [
      { id: 501, name: 'Patient Management System', type: 'Software', status: 'active', lastUpdated: '2023-11-15' },
      { id: 502, name: 'Clinical Analytics', type: 'Software', status: 'active', lastUpdated: '2023-11-14' },
      { id: 503, name: 'Medical Records Database', type: 'Software', status: 'active', lastUpdated: '2023-11-13' },
      { id: 504, name: 'Telemedicine Platform', type: 'Software', status: 'active', lastUpdated: '2023-11-12' },
      { id: 505, name: 'Health Monitoring', type: 'Data Service', status: 'active', lastUpdated: '2023-11-11' },
      { id: 506, name: 'Prescription Management', type: 'Data Service', status: 'active', lastUpdated: '2023-11-10' },
      { id: 507, name: 'Lab Results Tracker', type: 'Software', status: 'active', lastUpdated: '2023-11-09' }
    ],
    productFamily: 'Healthcare IT',
    exitRate: '2,750.30',
    updates: 'completed',
    logoSrc: '/images/avatar.png',
    color: '#34A853',
  }
];

// We'll generate accounts dynamically in the component

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
    easing: theme.transitions.easing.easeInOut,
  }),
}));

const AnimatedContainer = styled(Box)(({ theme }) => ({
  transition: theme.transitions.create('all', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
}));

const BookmarkButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.warning.main,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 66, 66, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  boxShadow: theme.palette.mode === 'dark' ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.12)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 66, 66, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    transform: 'scale(1.05)',
  },
  transition: theme.transitions.create(['background-color', 'box-shadow', 'transform'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeOut,
  }),
}));

const AccountListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.75, 1.5),
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(2px)',
  },
}));

const AccountBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : theme.palette.action.hover,
  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(1),
  fontSize: '0.75rem',
  fontWeight: 600,
}));

const AssetsDropdown = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1000,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.5)'
    : '0 8px 32px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(2),
  minWidth: '250px',
  maxWidth: '300px',
  maxHeight: '300px',
  overflow: 'auto',
  border: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(1),
}));

const AssetItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.75),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& + &': {
    marginTop: theme.spacing(0.5),
  }
}));

const AssetTypeChip = styled(Box)(({ theme }) => ({
  fontSize: '0.7rem',
  fontWeight: 600,
  padding: theme.spacing(0.25, 0.75),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
  marginLeft: 'auto',
}));

// Adding a transition component for views
const PageTransition = styled(Box)(({ theme }) => ({
  transition: theme.transitions.create(['width', 'margin', 'opacity', 'transform'], {
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smoother ease-in-ease-out
    duration: '600ms', // Longer duration for smoother transition
  }),
}));

// Styled components for account creation and import
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    borderColor: theme.palette.primary.main,
  },
}));

const CSVPreviewTable = styled(TableContainer)(({ theme }) => ({
  maxHeight: '300px',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  '& .MuiTableCell-root': {
    padding: theme.spacing(1),
    fontSize: '0.75rem',
  },
}));

// Filter options for dropdowns
const filterOptions = {
  organisationTypes: [
    'Technology',
    'Finance',
    'Healthcare',
    'Manufacturing',
    'Retail',
    'Media',
    'Consulting',
    'Education',
    'Energy',
    'Transportation',
    'Broker',
    'Other'
  ],
  productFamilies: [
    'Enterprise Solutions',
    'Cloud Services',
    'Data Analytics',
    'Security Systems',
    'Mobile Platforms',
    'Customer Experience',
    'Business Intelligence',
    'Infrastructure',
    'Digital Transformation',
    'IoT Solutions',
    'Risk & Financial',
    'Social Media',
    'Hardware & Software',
    'Search & Advertising',
    'Other'
  ]
};

const Accounts: React.FC = () => {
  const { theme: appTheme } = useTheme();
  const muiTheme = useMuiTheme(); // Fallback to MUI theme if context theme is not available
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Account; direction: 'asc' | 'desc' } | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [detailsView, setDetailsView] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  const [loading, setLoading] = useState(false);
  const [assetsDropdownOpen, setAssetsDropdownOpen] = useState<number | null>(null);
  const assetsDropdownRef = React.useRef<HTMLDivElement>(null);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    accountId: number | null;
  }>({
    open: false,
    message: '',
    severity: 'info',
    accountId: null
  });
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [expandedInsights, setExpandedInsights] = useState<number[]>([]);
  const [filters, setFilters] = useState<{
    location: string[];
    organisationType: string[];
    productFamily: string[];
    status: ('completed' | 'pending' | 'failed' | 'loading')[];
  }>({
    location: [],
    organisationType: [],
    productFamily: [],
    status: []
  });

  // For infinite scrolling
  const [displayLimit, setDisplayLimit] = useState(30);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [animatingTransition, setAnimatingTransition] = useState(false);

  // Account creation and import states
  const [openAddAccountDialog, setOpenAddAccountDialog] = useState(false);
  const [addAccountStep, setAddAccountStep] = useState(0);
  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    accountName: '',
    location: '',
    organisationType: '',
    productFamily: '',
    updates: 'pending',
    assets: []
  });
  const [accountFormErrors, setAccountFormErrors] = useState<{
    accountName?: string;
    location?: string;
    organisationType?: string;
    productFamily?: string;
  }>({});

  // CSV import states
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvMapping, setCsvMapping] = useState<{[key: string]: string}>({});
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [importInProgress, setImportInProgress] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Accounts state
  const [accounts, setAccounts] = useState<Account[]>([]);

  // Selected accounts for multiple deletion
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([]);

  // AI-generated account description
  const [aiDescription, setAiDescription] = useState<AIDescription>({
    summary: '',
    strengths: [],
    opportunities: [],
    isLoading: false
  });

  // AI template generation
  const [templateDialog, setTemplateDialog] = useState<{
    open: boolean;
    type: 'email' | 'call' | 'meeting' | null;
    content: string;
    isLoading: boolean;
  }>({
    open: false,
    type: null,
    content: '',
    isLoading: false
  });

  // Campaigns state for storing generated templates
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Campaign view state
  const [campaignView, setCampaignView] = useState<{
    open: boolean;
    filter: 'all' | 'unread' | 'read';
    selectedCampaignId: number | null;
    hasNewNotification: boolean;
  }>({
    open: false,
    filter: 'all',
    selectedCampaignId: null,
    hasNewNotification: false
  });

  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<number | null>(null);
  const [multipleDeleteMode, setMultipleDeleteMode] = useState(false);

  // Initialize accounts with colorful avatars
  React.useEffect(() => {
    setLoading(true);
    // Generate a set of accounts with colorful avatars
    const generatedAccounts = generateDummyAccounts(50, baseAccounts);
    setAccounts(generatedAccounts);
    setLoading(false);
  }, []);

  // Handle click outside to close assets dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (assetsDropdownRef.current && !assetsDropdownRef.current.contains(event.target as Node)) {
        setAssetsDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // We'll move the infinite scrolling effect after sortedAccounts is defined

  // Simulate AI processing completion for Twitter account
  React.useEffect(() => {
    // Only run this effect once when the component mounts and when accounts are loaded
    if (accounts.length > 0) {
      const twitterAccount = accounts.find(account => account.id === 2);

      // Only proceed if Twitter account exists and is in loading state
      if (twitterAccount && twitterAccount.updates === 'loading') {
        const timer = setTimeout(() => {
          // Randomly decide if the AI processing was successful or not
          const success = Math.random() > 0.3; // 70% chance of success

          // Show notification
          setNotification({
            open: true,
            message: success
              ? "Analysis completed successfully for Twitter account"
              : "Analysis completed but no results found for Twitter account",
            severity: success ? 'success' : 'error',
            accountId: 2
          });

          // Update the accounts
          const updatedAccounts = accounts.map(account => {
            if (account.id === 2) {
              return {
                ...account,
                updates: success ? 'completed' : 'failed'
              };
            }
            return account;
          });

          setAccounts(updatedAccounts);

          // If the selected account is Twitter, update it too
          if (selectedAccount && selectedAccount.id === 2) {
            const updatedAccount = updatedAccounts.find(a => a.id === 2);
            if (updatedAccount) {
              setSelectedAccount(updatedAccount);
            }
          }
        }, 5000); // 5 seconds delay

        return () => clearTimeout(timer);
      }
    }
  }, [accounts, selectedAccount]);

  // Handle closing the notification
  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Toggle assets dropdown
  const handleToggleAssetsDropdown = (event: React.MouseEvent, accountId: number) => {
    event.stopPropagation();
    setAssetsDropdownOpen(prevState => prevState === accountId ? null : accountId);
  };

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

  // Get unique values for filter options
  const getUniqueFilterOptions = () => {
    const locations = new Set<string>();
    const organisationTypes = new Set<string>();
    const productFamilies = new Set<string>();

    accounts.forEach(account => {
      locations.add(account.location);
      organisationTypes.add(account.organisationType);
      productFamilies.add(account.productFamily);
    });

    return {
      locations: Array.from(locations).sort(),
      organisationTypes: Array.from(organisationTypes).sort(),
      productFamilies: Array.from(productFamilies).sort()
    };
  };

  // Update filter options when accounts change
  const [dynamicFilterOptions, setDynamicFilterOptions] = useState({
    locations: [] as string[],
    organisationTypes: [] as string[],
    productFamilies: [] as string[]
  });

  React.useEffect(() => {
    setDynamicFilterOptions(getUniqueFilterOptions());
  }, [accounts]);

  // Handle filter changes
  const handleFilterChange = (filterType: 'location' | 'organisationType' | 'productFamily' | 'status', value: string) => {
    setFilters(prev => {
      const currentValues = [...prev[filterType]];
      const valueIndex = currentValues.indexOf(value as any);

      if (valueIndex === -1) {
        // Add the value to the filter
        return {
          ...prev,
          [filterType]: [...currentValues, value]
        };
      } else {
        // Remove the value from the filter
        currentValues.splice(valueIndex, 1);
        return {
          ...prev,
          [filterType]: currentValues
        };
      }
    });

    // Don't close the filter menu when selecting options
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      location: [],
      organisationType: [],
      productFamily: [],
      status: []
    });
  };

  // Apply filters to accounts
  const filteredAccounts = accounts.filter(account => {
    // Text search filter
    const matchesSearch = !searchQuery ||
      account.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.organisationType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.productFamily.toLowerCase().includes(searchQuery.toLowerCase());

    // Location filter
    const matchesLocation = filters.location.length === 0 ||
      filters.location.includes(account.location);

    // Organisation type filter
    const matchesOrgType = filters.organisationType.length === 0 ||
      filters.organisationType.includes(account.organisationType);

    // Product family filter
    const matchesProductFamily = filters.productFamily.length === 0 ||
      filters.productFamily.includes(account.productFamily);

    // Status filter
    const matchesStatus = filters.status.length === 0 ||
      filters.status.includes(account.updates);

    return matchesSearch && matchesLocation && matchesOrgType && matchesProductFamily && matchesStatus;
  });

  const getFilteredAccountsByStatus = () => {
    if (tabValue === 0) return filteredAccounts; // All accounts
    if (tabValue === 1) return filteredAccounts.filter(account => account.updates === 'completed');
    if (tabValue === 2) return filteredAccounts.filter(account => account.updates === 'failed');
    if (tabValue === 3) return filteredAccounts.filter(account => account.updates === 'pending');
    return filteredAccounts;
  };

  const completedCount = accounts.filter(account => account.updates === 'completed').length;
  const failedCount = accounts.filter(account => account.updates === 'failed').length;
  const pendingCount = accounts.filter(account => account.updates === 'pending').length;

  const filteredByStatusAccounts = getFilteredAccountsByStatus();

  // Define mockAccounts as the filtered accounts for the account list view
  const mockAccounts = filteredByStatusAccounts;

  const sortedAccounts = React.useMemo(() => {
    let sortableAccounts = [...filteredByStatusAccounts];

    if (sortConfig !== null) {
      sortableAccounts.sort((a, b) => {
        // Check if properties exist on objects a and b
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Handle cases where values might be undefined
        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableAccounts;
  }, [filteredByStatusAccounts, sortConfig]);

  // Handle infinite scrolling
  React.useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;

        // When user scrolls to bottom (with a 100px threshold)
        if (scrollTop + clientHeight >= scrollHeight - 100) {
          // Load more accounts (increase limit by 20)
          setDisplayLimit(prevLimit => Math.min(prevLimit + 20, sortedAccounts.length));
        }
      }
    };

    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      tableContainer.addEventListener('scroll', handleScroll);
      return () => {
        tableContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [sortedAccounts.length]);

  // Handle account selection
  const handleAccountSelect = (account: Account) => {
    if (multipleDeleteMode) {
      // In multiple delete mode, toggle selection instead of showing details
      handleToggleAccountSelection(account.id);
    } else {
      setAnimatingTransition(true);
      setLoading(true);
      setSelectedAccount(account);

      // Generate AI description for the selected account
      generateAIDescription(account);

      // Delay for animation before displaying details
      setTimeout(() => {
        setDetailsView(true);
        setLoading(false);

        // Finish the animation
        setTimeout(() => {
          setAnimatingTransition(false);
        }, 500);
      }, 400);
    }
  };

  // Toggle account selection for multiple deletion
  const handleToggleAccountSelection = (accountId: number) => {
    setSelectedAccounts(prev =>
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  // Open delete confirmation dialog for a single account
  const handleDeleteAccount = (accountId: number, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setAccountToDelete(accountId);
    setMultipleDeleteMode(false);
    setDeleteDialogOpen(true);
  };

  // Open delete confirmation dialog for multiple accounts
  const handleDeleteMultipleAccounts = () => {
    setMultipleDeleteMode(true);
    setDeleteDialogOpen(true);
  };

  // Toggle multiple delete mode
  const toggleMultipleDeleteMode = () => {
    setMultipleDeleteMode(prev => !prev);
    if (multipleDeleteMode) {
      // Clear selections when exiting multiple delete mode
      setSelectedAccounts([]);
    }
  };

  // Confirm deletion of account(s)
  const confirmDeleteAccounts = () => {
    if (multipleDeleteMode) {
      // Delete multiple accounts
      if (selectedAccounts.length > 0) {
        setAccounts(prev => prev.filter(account => !selectedAccounts.includes(account.id)));
        setSelectedAccounts([]);
        setNotification({
          open: true,
          message: `${selectedAccounts.length} accounts deleted successfully`,
          severity: 'success',
          accountId: null
        });
      }
    } else if (accountToDelete) {
      // Delete single account
      setAccounts(prev => prev.filter(account => account.id !== accountToDelete));

      // If the deleted account was selected, clear the selection
      if (selectedAccount && selectedAccount.id === accountToDelete) {
        setSelectedAccount(null);
        setDetailsView(false);
      }

      setNotification({
        open: true,
        message: 'Account deleted successfully',
        severity: 'success',
        accountId: null
      });
    }

    // Close dialog and reset state
    setDeleteDialogOpen(false);
    setAccountToDelete(null);
    setMultipleDeleteMode(false);
  };

  const handleBackToAccounts = () => {
    setAnimatingTransition(true);

    // Delay for animation before returning to the list
    setTimeout(() => {
      setDetailsView(false);

      // Finish the animation
      setTimeout(() => {
        setAnimatingTransition(false);
      }, 500);
    }, 400);
  };

  const handleDetailTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Function to generate AI description for an account
  const generateAIDescription = (account: Account) => {
    // Reset previous description and set loading state
    setAiDescription({
      summary: '',
      strengths: [],
      opportunities: [],
      isLoading: true
    });

    // Simulate API call delay
    setTimeout(() => {
      // Generate description based on account data
      const industry = account.organisationType;
      const location = account.location;
      const assets = account.assets.length;

      // Generate a summary based on account details
      const summary = `${account.accountName} is a ${industry} company based in ${location} with ${assets} active assets. They are currently using our ${account.productFamily} solutions to optimize their operations.`;

      // Generate strengths based on account type
      const strengths = [
        `Strong presence in the ${industry} sector`,
        `Established operations in ${location}`,
        `Effective utilization of ${account.productFamily}`,
        `Consistent growth in asset utilization`
      ];

      // Generate opportunities based on account type
      const opportunities = [
        `Expand adoption of additional ${account.productFamily} features`,
        `Implement advanced analytics for better insights`,
        `Integrate with other business systems for improved workflow`,
        `Explore new market opportunities in related sectors`
      ];

      // Update state with generated description
      setAiDescription({
        summary,
        strengths,
        opportunities,
        isLoading: false
      });
    }, 1500); // Simulate 1.5 second delay for API call
  };

  // Function to generate AI template for email, call, or meeting
  const generateAITemplate = (type: 'email' | 'call' | 'meeting') => {
    if (!selectedAccount) return;

    // Open dialog and set loading state
    setTemplateDialog({
      open: true,
      type,
      content: '',
      isLoading: true
    });

    // Simulate API call delay
    setTimeout(() => {
      // Generate template based on account data and template type
      const accountName = selectedAccount.accountName;
      const industry = selectedAccount.organisationType;
      const productFamily = selectedAccount.productFamily;

      let content = '';

      if (type === 'email') {
        content = `Subject: ${productFamily} Solutions for ${accountName}\n\nDear [Contact Name],\n\nI hope this email finds you well. I wanted to reach out regarding how our ${productFamily} solutions can address the specific challenges that ${accountName} is facing in the ${industry} sector.\n\nBased on our analysis, we've identified several opportunities where our solutions could provide significant value:\n\n1. [Specific solution tailored to their industry needs]\n2. [ROI or efficiency improvement they could achieve]\n3. [Competitive advantage our solution provides]\n\nI'd be happy to schedule a brief call to discuss how these solutions align with your strategic objectives for the coming quarter.\n\nBest regards,\n[Your Name]\n[Your Position]\nLSEG`;
      } else if (type === 'call') {
        content = `# Cold Call Script for ${accountName}\n\nIntroduction:\n- Introduce yourself and LSEG\n- Mention any mutual connections or previous interactions\n\nValue Proposition:\n- "I'm reaching out because we've helped several ${industry} companies like yours improve their [specific metric] by implementing our ${productFamily} solutions."\n\nKey Talking Points:\n1. Address specific pain points in the ${industry} sector\n2. Highlight how our ${productFamily} solutions have helped similar companies\n3. Mention specific ROI metrics from case studies\n\nCall to Action:\n- Suggest a follow-up meeting with relevant stakeholders\n- Offer to send additional information on [specific solution]\n\nHandling Objections:\n- "Not interested": Acknowledge and ask about their current solutions for [specific challenge]\n- "No budget": Discuss ROI timeline and implementation options\n- "Bad timing": Suggest a specific future date to reconnect`;
      } else if (type === 'meeting') {
        content = `# Meeting Talking Points for ${accountName}\n\nMeeting Objective:\nDiscuss how LSEG's ${productFamily} solutions can address ${accountName}'s specific challenges in the ${industry} sector.\n\nAttendees:\n- [Key stakeholders from client side]\n- [Your team members with relevant expertise]\n\nAgenda:\n1. Introduction and relationship building (5 min)\n2. Understanding current challenges and goals (10 min)\n3. Presentation of relevant solutions (15 min)\n4. Discussion of implementation and timeline (10 min)\n5. Next steps and action items (5 min)\n\nKey Points to Emphasize:\n- Our experience with similar ${industry} companies\n- Specific features of our ${productFamily} that address their needs\n- Implementation timeline and resource requirements\n- Expected ROI and success metrics\n\nSupporting Materials:\n- Case study of similar ${industry} client\n- Product demo focusing on [specific feature]\n- Implementation roadmap\n- Pricing and ROI calculator`;
      }

      // Update state with generated template
      setTemplateDialog({
        open: true,
        type,
        content,
        isLoading: false
      });
    }, 2000); // Simulate 2 second delay for API call
  };

  // Function to handle dialog close
  const handleTemplateDialogClose = () => {
    setTemplateDialog({
      ...templateDialog,
      open: false
    });
  };

  // Function to save the generated template
  const handleSaveTemplate = () => {
    if (!selectedAccount || !templateDialog.type || !templateDialog.content) return;

    const templateType = templateDialog.type === 'email' ? 'Email' :
                         templateDialog.type === 'call' ? 'Cold Call Script' :
                         'Meeting Talking Points';

    // Create a new campaign from the template
    const newCampaign: Campaign = {
      id: Date.now(), // Use timestamp as a unique ID
      title: `${templateType} for ${selectedAccount.accountName}`,
      description: `AI-generated ${templateDialog.type} template for ${selectedAccount.accountName}`,
      accountName: selectedAccount.accountName,
      accountId: selectedAccount.id,
      type: templateDialog.type,
      content: templateDialog.content,
      createdAt: new Date().toISOString(),
      isRead: false
    };

    // Add the new campaign to the campaigns list
    setCampaigns(prevCampaigns => [newCampaign, ...prevCampaigns]);

    // Set the notification flag for the campaign view
    setCampaignView(prev => ({
      ...prev,
      hasNewNotification: true
    }));

    // Show notification
    setNotification({
      open: true,
      message: `${templateType} template saved successfully for ${selectedAccount.accountName}`,
      severity: 'success',
      accountId: selectedAccount.id
    });

    handleTemplateDialogClose();
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  // Function to open the campaign view
  const handleOpenCampaignView = () => {
    setCampaignView({
      ...campaignView,
      open: true,
      hasNewNotification: false // Clear notification when opening
    });
  };

  // Function to close the campaign view
  const handleCloseCampaignView = () => {
    setCampaignView({
      ...campaignView,
      open: false,
      selectedCampaignId: null
    });
  };

  // Function to change the campaign filter
  const handleCampaignFilterChange = (filter: 'all' | 'unread' | 'read') => {
    setCampaignView({
      ...campaignView,
      filter
    });
  };

  // Function to select a campaign
  const handleCampaignSelect = (campaignId: number) => {
    // Mark the campaign as read
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === campaignId
          ? { ...campaign, isRead: true }
          : campaign
      )
    );

    // Set the selected campaign
    setCampaignView({
      ...campaignView,
      selectedCampaignId: campaignId
    });
  };

  // Function to delete a campaign
  const handleDeleteCampaign = (campaignId: number) => {
    setCampaigns(prevCampaigns =>
      prevCampaigns.filter(campaign => campaign.id !== campaignId)
    );

    // If the deleted campaign was selected, clear the selection
    if (campaignView.selectedCampaignId === campaignId) {
      setCampaignView({
        ...campaignView,
        selectedCampaignId: null
      });
    }

    // Show notification
    setNotification({
      open: true,
      message: 'Campaign deleted successfully',
      severity: 'success',
      accountId: null
    });
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

  // Account creation and import handlers
  const handleOpenAddAccountDialog = () => {
    setOpenAddAccountDialog(true);
    setAddAccountStep(0);
    setNewAccount({
      accountName: '',
      location: '',
      organisationType: '',
      productFamily: '',
      updates: 'pending',
      assets: []
    });
    setAccountFormErrors({});
    setCsvFile(null);
    setCsvPreview([]);
    setCsvHeaders([]);
    setCsvMapping({});
    setImportErrors([]);
    setImportSuccess(null);
  };

  const handleCloseAddAccountDialog = () => {
    setOpenAddAccountDialog(false);
  };

  const handleAccountFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (accountFormErrors[name as keyof typeof accountFormErrors]) {
      setAccountFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAccountTypeChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (accountFormErrors[name as keyof typeof accountFormErrors]) {
      setAccountFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateAccountForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    if (!newAccount.accountName?.trim()) {
      errors.accountName = 'Account name is required';
    }

    if (!newAccount.location?.trim()) {
      errors.location = 'Location is required';
    }

    if (!newAccount.organisationType?.trim()) {
      errors.organisationType = 'Organization type is required';
    }

    if (!newAccount.productFamily?.trim()) {
      errors.productFamily = 'Product family is required';
    }

    setAccountFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (addAccountStep === 0) {
      // If on the first step (method selection), just go to next step
      setAddAccountStep(1);
    } else if (addAccountStep === 1) {
      // If on the second step (account details form), validate before proceeding
      if (validateAccountForm()) {
        setAddAccountStep(2);
      }
    }
  };

  const handlePreviousStep = () => {
    setAddAccountStep(prev => Math.max(0, prev - 1));
  };

  const handleCreateAccount = () => {
    // Final validation before creating the account
    if (!validateAccountForm()) return;

    // Generate a new ID (would be handled by backend in real app)
    const newId = Math.max(...accounts.map(a => a.id)) + 1;

    // Generate a vibrant color for the account
    const accountColor = stringToColor(newAccount.accountName || '');

    // Create new account object
    const accountToAdd: Account = {
      id: newId,
      accountName: newAccount.accountName || '',
      location: newAccount.location || '',
      organisationType: newAccount.organisationType || '',
      productFamily: newAccount.productFamily || '',
      activeAssets: '0 Assets',
      assets: [],
      exitRate: '0.00',
      updates: 'pending',
      logoSrc: '/images/avatar.png',
      color: accountColor
    };

    // Add to accounts state
    setAccounts(prevAccounts => [accountToAdd, ...prevAccounts]);

    // Show success notification
    setNotification({
      open: true,
      message: `Account "${accountToAdd.accountName}" has been created successfully`,
      severity: 'success',
      accountId: accountToAdd.id
    });

    // Close dialog
    handleCloseAddAccountDialog();
  };

  // CSV import handlers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setCsvFile(file);

    // Reset states
    setImportErrors([]);
    setCsvPreview([]);
    setCsvHeaders([]);
    setCsvMapping({});

    // Read the file
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (!content) {
          setImportErrors(['Could not read file content']);
          return;
        }

        // Parse CSV (simple implementation - would use a library in production)
        const lines = content.split('\n');
        if (lines.length < 2) {
          setImportErrors(['File must contain at least a header row and one data row']);
          return;
        }

        // Extract headers and create preview
        const headers = lines[0].split(',').map(h => h.trim());
        setCsvHeaders(headers);

        // Create initial mapping (try to match headers to account fields)
        const initialMapping: {[key: string]: string} = {};
        headers.forEach(header => {
          const lowerHeader = header.toLowerCase();
          if (lowerHeader.includes('name')) initialMapping[header] = 'accountName';
          else if (lowerHeader.includes('location')) initialMapping[header] = 'location';
          else if (lowerHeader.includes('type') || lowerHeader.includes('organization')) initialMapping[header] = 'organisationType';
          else if (lowerHeader.includes('product') || lowerHeader.includes('family')) initialMapping[header] = 'productFamily';
        });
        setCsvMapping(initialMapping);

        // Create preview (up to 5 rows)
        const preview: string[][] = [];
        for (let i = 0; i < Math.min(5, lines.length); i++) {
          if (lines[i].trim()) {
            preview.push(lines[i].split(',').map(cell => cell.trim()));
          }
        }
        setCsvPreview(preview);

      } catch (error) {
        setImportErrors(['Error parsing CSV file. Please check the format.']);
      }
    };

    reader.onerror = () => {
      setImportErrors(['Error reading file']);
    };

    reader.readAsText(file);
  };

  const handleMappingChange = (header: string, accountField: string) => {
    setCsvMapping(prev => ({
      ...prev,
      [header]: accountField
    }));
  };

  const handleImportAccounts = () => {
    if (!csvFile || csvPreview.length === 0) {
      setImportErrors(['No file selected or file is empty']);
      return;
    }

    setImportInProgress(true);
    setImportErrors([]);

    try {
      // Read the file again to process all rows
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          if (!content) {
            setImportErrors(['Could not read file content']);
            setImportInProgress(false);
            return;
          }

          const lines = content.split('\n');
          if (lines.length < 2) {
            setImportErrors(['File must contain at least a header row and one data row']);
            setImportInProgress(false);
            return;
          }

          const headers = lines[0].split(',').map(h => h.trim());
          const newAccounts: Account[] = [];
          const errors: string[] = [];

          // Start from index 1 to skip header row
          for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue; // Skip empty lines

            const values = lines[i].split(',').map(v => v.trim());
            if (values.length !== headers.length) {
              errors.push(`Row ${i + 1}: Column count mismatch`);
              continue;
            }

            // Create account object from mapped fields
            const accountData: Partial<Account> = {
              updates: 'pending',
              assets: []
            };

            // Map CSV values to account fields
            headers.forEach((header, index) => {
              const accountField = csvMapping[header];
              if (accountField && values[index]) {
                (accountData as any)[accountField] = values[index];
              }
            });

            // Validate required fields
            if (!accountData.accountName) {
              errors.push(`Row ${i + 1}: Account name is required`);
              continue;
            }

            // Generate ID and add other required fields
            const newId = Math.max(...accounts.map(a => a.id), ...newAccounts.map(a => a.id)) + 1;
            const newAccount: Account = {
              id: newId,
              accountName: accountData.accountName || '',
              location: accountData.location || 'Unknown',
              organisationType: accountData.organisationType || 'Other',
              productFamily: accountData.productFamily || 'Other',
              activeAssets: '0 Assets',
              assets: [],
              exitRate: '0.00',
              updates: 'pending',
              logoSrc: '/images/avatar.png',
              color: stringToColor(accountData.accountName || '')
            };

            newAccounts.push(newAccount);
          }

          if (errors.length > 0) {
            setImportErrors(errors);
            if (newAccounts.length === 0) {
              setImportInProgress(false);
              return;
            }
          }

          // Add accounts to the state
          setAccounts(prevAccounts => [...newAccounts, ...prevAccounts]);

          // Show success notification
          setImportSuccess(`Successfully imported ${newAccounts.length} accounts`);
          setNotification({
            open: true,
            message: `Successfully imported ${newAccounts.length} accounts`,
            severity: 'success',
            accountId: null
          });

          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }

          // Close dialog after a delay
          setTimeout(() => {
            handleCloseAddAccountDialog();
            setImportInProgress(false);
          }, 1500);

        } catch (error) {
          setImportErrors(['Error processing CSV file']);
          setImportInProgress(false);
        }
      };

      reader.onerror = () => {
        setImportErrors(['Error reading file']);
        setImportInProgress(false);
      };

      reader.readAsText(csvFile);

    } catch (error) {
      setImportErrors(['Unexpected error during import']);
      setImportInProgress(false);
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
              onClick={handleOpenAddAccountDialog}
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
          value={searchQuery}
          onChange={handleSearch}
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
          {accounts.map((account, index) => (
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
                      width: 28,
                      height: 28,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      backgroundColor: account.color || stringToColor(account.accountName),
                      mr: 1,
                      border: account.logoSrc !== '/images/avatar.png' ? '1px solid rgba(0,0,0,0.1)' : 'none'
                    }}
                    src={account.logoSrc !== '/images/avatar.png' ? account.logoSrc : undefined}
                  >
                    {getInitials(account.accountName)}
                  </Avatar>
                  <Box sx={{ flex: 1, overflow: 'hidden' }}>
                    <Typography variant="body2" fontWeight={600} noWrap>
                      {account.accountName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                      {account.organisationType}
                    </Typography>
                  </Box>
                  <StatusLabel status={account.updates} />
                  {bookmarked.includes(account.id) && (
                    <BookmarkIcon sx={{ ml: 1, fontSize: 16, color: (theme) => theme.palette.warning.main }} />
                  )}
                </Box>
              </AccountListItem>
              {index < accounts.length - 1 && <Divider />}
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
            backgroundColor: (theme) => theme.palette.background.paper,
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
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: selectedAccount.logoSrc !== '/images/avatar.png' ? '2px solid rgba(255,255,255,0.2)' : 'none'
              }}
              src={selectedAccount.logoSrc !== '/images/avatar.png' ? selectedAccount.logoSrc : undefined}
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
                {selectedAccount.updates === 'loading' ? (
                  <StatusLabel status={selectedAccount.updates}>
                    <CircularProgress size={14} thickness={4} sx={{ mr: 0.75 }} />
                    Processing
                  </StatusLabel>
                ) : (
                  <StatusLabel status={selectedAccount.updates}>
                    {selectedAccount.updates === 'completed' ? 'Analysis Complete' :
                     selectedAccount.updates === 'failed' ? 'No Results Found' :
                     selectedAccount.updates.charAt(0).toUpperCase() + selectedAccount.updates.slice(1)}
                  </StatusLabel>
                )}
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
                borderBottom: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#eee'}`,
                backgroundColor: (theme) => theme.palette.background.paper
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
                      <Box sx={{
                        mb: 2,
                        p: 2,
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
                        borderRadius: '3px'
                      }}>
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
                            sx={{ borderRadius: '3px', textTransform: 'none' }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={handleAddTask}
                            sx={{
                              borderRadius: '3px',
                              textTransform: 'none',
                              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                              color: (theme) => theme.palette.mode === 'dark' ? '#000' : '#fff',
                              '&:hover': {
                                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#333'
                              }
                            }}
                          >
                            Add Task
                          </Button>
                        </Box>
                      </Box>
                    </Collapse>
                    
                    <List sx={{
                      bgcolor: 'background.paper',
                      color: (theme) => theme.palette.mode === 'dark' ? 'text.primary' : 'inherit'
                    }}>
                      <ListItem alignItems="flex-start" sx={{ px: 2, py: 1.5, borderLeft: '3px solid #047857', mb: 1, borderRadius: '3px' }}>
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
                                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(185, 28, 28, 0.3)' : 'rgba(185, 28, 28, 0.1)',
                                  color: (theme) => theme.palette.mode === 'dark' ? '#ff6b6b' : '#B91C1C'
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
                      <ListItem alignItems="flex-start" sx={{ px: 2, py: 1.5, borderLeft: '3px solid #B45309', mb: 1, borderRadius: '3px' }}>
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
                                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(180, 83, 9, 0.3)' : 'rgba(180, 83, 9, 0.1)',
                                  color: (theme) => theme.palette.mode === 'dark' ? '#ffa94d' : '#B45309'
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
                    borderRadius: '3px',
                    textTransform: 'none',
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#333',
                    color: '#fff',
                    fontWeight: 500,
                    px: 2,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#666' : '#444',
                    }
                  }}
                  startIcon={<StarIcon sx={{ fontSize: 16 }} />}
                >
                  Risk
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '3px',
                    textTransform: 'none',
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : '#f5f5f5',
                    color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                    fontWeight: 500,
                    px: 2,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : '#e0e0e0'
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
            {/* AI-Generated Account Description Card */}
            <Paper elevation={0} sx={{ borderRadius: (theme) => theme.shape.borderRadius, overflow: 'hidden', mb: 3 }}>
              <Box sx={{ p: 2, bgcolor: '#0A2647', color: 'white' }}>
                <SectionTitle sx={{ mb: 1 }}>
                  <AssignmentIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography variant="h6" fontWeight={600} color="white">
                    AI Account Analysis
                  </Typography>
                </SectionTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" fontWeight={500} color="rgba(255,255,255,0.8)">
                    Generated by AI
                  </Typography>
                  <Chip
                    label="BETA"
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
                {aiDescription.isLoading ? (
                  <>
                    <Skeleton variant="text" width="100%" height={24} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width="90%" height={24} sx={{ mb: 3 }} />

                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                      Key Strengths
                    </Typography>
                    <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="95%" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="85%" height={20} sx={{ mb: 3 }} />

                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                      Opportunities
                    </Typography>
                    <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="95%" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="85%" height={20} sx={{ mb: 1 }} />
                  </>
                ) : (
                  <>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      {aiDescription.summary}
                    </Typography>

                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                      Key Strengths
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                      {aiDescription.strengths.map((strength, index) => (
                        <Box component="li" key={index} sx={{ mb: 0.5 }}>
                          <Typography variant="body2">
                            {strength}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                      Opportunities
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {aiDescription.opportunities.map((opportunity, index) => (
                        <Box component="li" key={index} sx={{ mb: 0.5 }}>
                          <Typography variant="body2">
                            {opportunity}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </Paper>

            {/* Insights Panel */}
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
                      borderLeft: '3px solid #1a73e8',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      }
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
                      borderLeft: '3px solid #1a73e8',
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
                      borderLeft: '3px solid #1a73e8',
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
                    startIcon={<EmailIcon />}
                    onClick={() => generateAITemplate('email')}
                    sx={{
                      borderRadius: '3px',
                      textTransform: 'none',
                      bgcolor: '#1565C0',
                      color: '#fff',
                      fontWeight: 500,
                      px: 2,
                      '&:hover': {
                        bgcolor: '#0D47A1'
                      }
                    }}
                  >
                    Email
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<CallIcon />}
                    onClick={() => generateAITemplate('call')}
                    sx={{
                      borderRadius: '3px',
                      textTransform: 'none',
                      bgcolor: '#2E7D32',
                      color: '#fff',
                      fontWeight: 500,
                      px: 2,
                      '&:hover': {
                        bgcolor: '#1B5E20'
                      }
                    }}
                  >
                    Cold Call
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<MeetingRoomIcon />}
                    onClick={() => generateAITemplate('meeting')}
                    sx={{
                      borderRadius: '3px',
                      textTransform: 'none',
                      bgcolor: '#6A1B9A',
                      color: '#fff',
                      fontWeight: 500,
                      px: 2,
                      '&:hover': {
                        bgcolor: '#4A148C'
                      }
                    }}
                  >
                    Meeting Points
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
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  {campaignView.hasNewNotification && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: 'error.main',
                        zIndex: 1,
                        border: '1px solid white'
                      }}
                    />
                  )}
                  <Chip
                    icon={<EmailIcon fontSize="small" />}
                    label={`Campaigns ${campaigns.filter(c => !c.isRead).length > 0 ? `(${campaigns.filter(c => !c.isRead).length})` : ''}`}
                    clickable
                    onClick={handleOpenCampaignView}
                    sx={{
                      borderRadius: '3px',
                      fontWeight: campaigns.filter(c => !c.isRead).length > 0 ? 'bold' : 'normal',
                      bgcolor: campaigns.filter(c => !c.isRead).length > 0 ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
                      '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.1)' }
                    }}
                  />
                </Box>
                <Chip
                  label="Account History"
                  clickable
                  sx={{
                    borderRadius: '3px',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                />
                <Chip
                  label="Meeting Notes"
                  clickable
                  sx={{
                    borderRadius: '3px',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                />
                <Chip
                  label="Contact List"
                  clickable
                  sx={{
                    borderRadius: '3px',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                />
                <Chip
                  label="Recent Orders"
                  clickable
                  sx={{
                    borderRadius: '3px',
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

  const theme = useMuiTheme();
  const { mode } = useTheme();

  return (
    <AccountsContainer>
      <PageTransition
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
          position: 'relative'
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
              {/* Removed subtitle text */}
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
                <ActionButton
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
                  sx={{
                    borderColor: Object.values(filters).some(arr => arr.length > 0) ? 'primary.main' : undefined,
                    color: Object.values(filters).some(arr => arr.length > 0) ? 'primary.main' : undefined,
                    fontWeight: Object.values(filters).some(arr => arr.length > 0) ? 600 : undefined,
                  }}
                >
                  Filter {Object.values(filters).some(arr => arr.length > 0) && `(${Object.values(filters).reduce((acc, arr) => acc + arr.length, 0)})`}
                </ActionButton>
                <Menu
                  anchorEl={filterMenuAnchor}
                  open={Boolean(filterMenuAnchor)}
                  onClose={() => setFilterMenuAnchor(null)}
                  TransitionComponent={Fade}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 1,
                        width: 300,
                        maxHeight: 500,
                        overflow: 'auto',
                      }
                    }
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Typography variant="subtitle2" fontWeight="bold">Filters</Typography>
                      {Object.values(filters).some(arr => arr.length > 0) && (
                        <Button
                          size="small"
                          onClick={clearAllFilters}
                          sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                        >
                          Clear All
                        </Button>
                      )}
                    </Box>

                    <Divider sx={{ mb: 1.5 }} />

                    {/* Status Filter */}
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Status</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {['completed', 'pending', 'failed', 'loading'].map((status) => (
                        <Chip
                          key={status}
                          label={status === 'completed' ? 'Complete' :
                                 status === 'pending' ? 'Pending' :
                                 status === 'failed' ? 'Failed' : 'Processing'}
                          size="small"
                          onClick={() => handleFilterChange('status', status)}
                          color={filters.status.includes(status as any) ? 'primary' : 'default'}
                          variant={filters.status.includes(status as any) ? 'filled' : 'outlined'}
                          sx={{
                            borderRadius: '4px',
                            height: '24px',
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Box>

                    {/* Location Filter */}
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Location</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2, maxHeight: 100, overflow: 'auto' }}>
                      {dynamicFilterOptions.locations.slice(0, 15).map((location) => (
                        <Chip
                          key={location}
                          label={location.split(',')[0]} // Show only city name to save space
                          size="small"
                          onClick={() => handleFilterChange('location', location)}
                          color={filters.location.includes(location) ? 'primary' : 'default'}
                          variant={filters.location.includes(location) ? 'filled' : 'outlined'}
                          sx={{
                            borderRadius: '4px',
                            height: '24px',
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Box>

                    {/* Organization Type Filter */}
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Organization Type</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {dynamicFilterOptions.organisationTypes.map((type) => (
                        <Chip
                          key={type}
                          label={type}
                          size="small"
                          onClick={() => handleFilterChange('organisationType', type)}
                          color={filters.organisationType.includes(type) ? 'primary' : 'default'}
                          variant={filters.organisationType.includes(type) ? 'filled' : 'outlined'}
                          sx={{
                            borderRadius: '4px',
                            height: '24px',
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Box>

                    {/* Product Family Filter */}
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Product Family</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1, maxHeight: 100, overflow: 'auto' }}>
                      {dynamicFilterOptions.productFamilies.map((family) => (
                        <Chip
                          key={family}
                          label={family}
                          size="small"
                          onClick={() => handleFilterChange('productFamily', family)}
                          color={filters.productFamily.includes(family) ? 'primary' : 'default'}
                          variant={filters.productFamily.includes(family) ? 'filled' : 'outlined'}
                          sx={{
                            borderRadius: '4px',
                            height: '24px',
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Divider />

                  <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      size="small"
                      onClick={() => setFilterMenuAnchor(null)}
                      variant="contained"
                      sx={{ textTransform: 'none' }}
                    >
                      Apply Filters
                    </Button>
                  </Box>
                </Menu>
                {multipleDeleteMode ? (
                  <>
                    <ActionButton
                      variant="outlined"
                      color="error"
                      disabled={selectedAccounts.length === 0}
                      onClick={handleDeleteMultipleAccounts}
                      startIcon={<DeleteIcon />}
                    >
                      Delete ({selectedAccounts.length})
                    </ActionButton>
                    <ActionButton
                      variant="outlined"
                      onClick={toggleMultipleDeleteMode}
                    >
                      Cancel
                    </ActionButton>
                  </>
                ) : (
                  <>
                    <ActionButton variant="outlined" startIcon={<DownloadIcon />}>
                      Export
                    </ActionButton>
                    <ActionButton
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={toggleMultipleDeleteMode}
                    >
                      Delete Accounts
                    </ActionButton>
                    <ActionButton
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleOpenAddAccountDialog}
                    >
                      Add Account
                    </ActionButton>
                  </>
                )}
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

          <Box sx={{
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
            mt: 0,
            pt: 0,
          }}>
            {/* Section de liste des comptes - réduite mais toujours visible en mode détails */}
            <PageTransition
              sx={{
                width: detailsView ? '280px' : '100%',
                transition: theme.transitions.create(['width'], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.standard,
                }),
                overflow: 'hidden',
                mr: detailsView ? 3 : 0,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {!detailsView ? (
                <>
                  {/* Removed Filters title */}

                  <TabsContainer
                    sx={{
                      position: 'sticky',
                      top: 0,
                      zIndex: 2,
                      backgroundColor: (theme) => theme.palette.background.default,
                      mt: 0,
                    }}
                  >
                    <Tabs 
                      value={tabValue} 
                      onChange={handleTabChange}
                      indicatorColor="primary"
                      textColor="primary"
                    >
                      <StyledTab 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            All Accounts <TabCount>{accounts.length}</TabCount>
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
                      overflow: 'hidden',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <TableContainer
                      ref={tableContainerRef}
                      sx={{
                        height: 'calc(100vh - 160px)',
                        flex: 1,
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                          width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                          borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      <Table size="small" stickyHeader>
                        <TableHead>
                          <TableRow>
                            {multipleDeleteMode && (
                              <TableHeader sx={{ width: 50, py: 1.5 }}>
                                <Checkbox
                                  size="small"
                                  indeterminate={selectedAccounts.length > 0 && selectedAccounts.length < sortedAccounts.length}
                                  checked={selectedAccounts.length > 0 && selectedAccounts.length === sortedAccounts.length}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      // Select all accounts
                                      setSelectedAccounts(sortedAccounts.map(account => account.id));
                                    } else {
                                      // Deselect all accounts
                                      setSelectedAccounts([]);
                                    }
                                  }}
                                />
                              </TableHeader>
                            )}
                            <TableHeader onClick={() => handleSort('accountName')} sx={{ cursor: 'pointer', pl: multipleDeleteMode ? 1 : 3, py: 1.5 }}>
                              <Box display="flex" alignItems="center">
                                Account Name {getSortIcon('accountName')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('location')} sx={{ cursor: 'pointer', py: 1.5 }}>
                              <Box display="flex" alignItems="center">
                                Location {getSortIcon('location')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('organisationType')} sx={{ cursor: 'pointer', py: 1.5 }}>
                              <Box display="flex" alignItems="center">
                                Organisation Type {getSortIcon('organisationType')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('activeAssets')} sx={{ cursor: 'pointer', py: 1.5 }}>
                              <Box display="flex" alignItems="center">
                                Active Assets {getSortIcon('activeAssets')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('productFamily')} sx={{ cursor: 'pointer', py: 1.5 }}>
                              <Box display="flex" alignItems="center">
                                Product Family {getSortIcon('productFamily')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('exitRate')} sx={{ cursor: 'pointer', py: 1.5 }}>
                              <Box display="flex" alignItems="center">
                                Exit Rate(GBP) {getSortIcon('exitRate')}
                              </Box>
                            </TableHeader>
                            <TableHeader onClick={() => handleSort('updates')} sx={{ cursor: 'pointer', pr: 3, py: 1.5 }}>
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
                                <TableContent sx={{ py: 1 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Skeleton variant="rounded" width={28} height={28} sx={{ mr: 2 }} />
                                    <Skeleton variant="text" width={120} />
                                  </Box>
                                </TableContent>
                                <TableContent sx={{ py: 1 }}><Skeleton variant="text" width={150} /></TableContent>
                                <TableContent sx={{ py: 1 }}><Skeleton variant="text" width={100} /></TableContent>
                                <TableContent sx={{ py: 1 }}><Skeleton variant="text" width={80} /></TableContent>
                                <TableContent sx={{ py: 1 }}><Skeleton variant="text" width={120} /></TableContent>
                                <TableContent sx={{ py: 1 }}><Skeleton variant="text" width={70} /></TableContent>
                                <TableContent sx={{ py: 1 }}><Skeleton variant="rounded" width={80} height={24} /></TableContent>
                              </TableRow>
                            ))
                          ) : (
                            sortedAccounts.slice(0, displayLimit).map((account) => (
                              <TableRow
                                key={account.id}
                                hover
                                onClick={() => handleAccountSelect(account)}
                                sx={{
                                  cursor: 'pointer',
                                  transition: (theme) => theme.transitions.create(['background-color'], {
                                    duration: theme.transitions.duration.shortest,
                                  }),
                                  bgcolor: multipleDeleteMode && selectedAccounts.includes(account.id)
                                    ? (theme) => theme.palette.action.selected
                                    : selectedAccount?.id === account.id
                                      ? (theme) => theme.palette.action.selected
                                      : 'transparent',
                                }}
                              >
                                {multipleDeleteMode && (
                                  <TableContent sx={{ width: 50, py: 1 }}>
                                    <Checkbox
                                      size="small"
                                      checked={selectedAccounts.includes(account.id)}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        handleToggleAccountSelection(account.id);
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </TableContent>
                                )}
                                <TableContent sx={{ pl: multipleDeleteMode ? 1 : 3, py: 1 }}>
                                  <Box display="flex" alignItems="center" sx={{ position: 'relative' }}>
                                    <Avatar
                                      sx={{
                                        width: 28,
                                        height: 28,
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        backgroundColor: account.color || stringToColor(account.accountName),
                                        mr: 1.5,
                                        border: account.logoSrc !== '/images/avatar.png' ? '1px solid rgba(0,0,0,0.1)' : 'none'
                                      }}
                                      src={account.logoSrc !== '/images/avatar.png' ? account.logoSrc : undefined}
                                    >
                                      {getInitials(account.accountName)}
                                    </Avatar>
                                    <Box sx={{ maxWidth: 150, minWidth: 120 }}>
                                      <Typography variant="body2" fontWeight={600} noWrap>
                                        {account.accountName}
                                      </Typography>
                                    </Box>
                                    <IconButton
                                      size="small"
                                      sx={{ ml: 1, p: 0.5 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleBookmark(account.id, e);
                                      }}
                                    >
                                      {bookmarked.includes(account.id) ?
                                        <BookmarkIcon fontSize="small" color="warning" /> :
                                        <BookmarkBorderIcon fontSize="small" color="disabled" />
                                      }
                                    </IconButton>
                                  </Box>
                                </TableContent>
                                <TableContent sx={{ py: 1 }}>
                                  <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                                    {account.location}
                                  </Typography>
                                </TableContent>
                                <TableContent sx={{ py: 1 }}>{account.organisationType}</TableContent>
                                <TableContent sx={{ py: 1 }}>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    onClick={(e) => handleToggleAssetsDropdown(e, account.id)}
                                    sx={{
                                      cursor: 'pointer',
                                      position: 'relative',
                                      '&:hover': {
                                        color: (theme) => theme.palette.primary.main,
                                      }
                                    }}
                                  >
                                    {account.activeAssets}
                                    <KeyboardArrowDownIcon
                                      fontSize="small"
                                      sx={{
                                        ml: 0.5,
                                        color: (theme) => theme.palette.text.secondary,
                                        transform: assetsDropdownOpen === account.id ? 'rotate(180deg)' : 'rotate(0)',
                                        transition: 'transform 0.2s ease'
                                      }}
                                    />

                                    {/* Assets Dropdown */}
                                    {assetsDropdownOpen === account.id && (
                                      <AssetsDropdown ref={assetsDropdownRef}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                          <Typography variant="subtitle2" fontWeight="bold">
                                            Active Assets ({account.assets.length})
                                          </Typography>
                                          <IconButton
                                            size="small"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setAssetsDropdownOpen(null);
                                            }}
                                            sx={{
                                              padding: 0.5,
                                              '&:hover': {
                                                backgroundColor: (theme) => theme.palette.action.hover
                                              }
                                            }}
                                          >
                                            <CloseIcon fontSize="small" />
                                          </IconButton>
                                        </Box>

                                        <Divider sx={{ mb: 1.5 }} />

                                        {account.assets.map((asset) => (
                                          <AssetItem key={asset.id}>
                                            <Box>
                                              <Typography variant="body2" fontWeight="medium" sx={{ fontSize: '0.85rem' }}>
                                                {asset.name}
                                              </Typography>
                                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                                Updated: {new Date(asset.lastUpdated).toLocaleDateString()}
                                              </Typography>
                                            </Box>
                                            <AssetTypeChip>
                                              {asset.type}
                                            </AssetTypeChip>
                                          </AssetItem>
                                        ))}
                                      </AssetsDropdown>
                                    )}
                                  </Box>
                                </TableContent>
                                <TableContent sx={{ py: 1 }}>
                                  <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                                    {account.productFamily}
                                  </Typography>
                                </TableContent>
                                <TableContent sx={{ py: 1 }}>{account.exitRate}</TableContent>
                                <TableContent sx={{ pr: 3, py: 1 }}>
                                  {account.updates === 'loading' ? (
                                    <StatusLabel status={account.updates}>
                                      <CircularProgress size={12} thickness={4} sx={{ mr: 0.75 }} />
                                      Processing
                                    </StatusLabel>
                                  ) : (
                                    <StatusLabel status={account.updates}>
                                      <StatusIndicator status={account.updates} />
                                      {account.updates === 'completed' ? 'Analysis Complete' :
                                       account.updates === 'failed' ? 'No Results Found' :
                                       account.updates.charAt(0).toUpperCase() + account.updates.slice(1)}
                                    </StatusLabel>
                                  )}
                                </TableContent>
                              </TableRow>
                            ))
                          )}
                          {!loading && displayLimit < sortedAccounts.length && (
                            <TableRow>
                              <TableCell colSpan={7} align="center" sx={{ py: 2 }}>
                                <CircularProgress size={24} thickness={4} />
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                  Loading more accounts...
                                </Typography>
                              </TableCell>
                            </TableRow>
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
                    easing: theme.transitions.easing.easeInOut,
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

        {/* Campaign Inbox Dialog */}
        <Dialog
          open={campaignView.open}
          onClose={handleCloseCampaignView}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: (theme) => theme.shape.borderRadius,
              height: '80vh',
              maxHeight: '80vh'
            }
          }}
        >
          <DialogTitle sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            pb: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                Campaign Inbox
              </Typography>
              {campaigns.filter(c => !c.isRead).length > 0 && (
                <Chip
                  label={campaigns.filter(c => !c.isRead).length}
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    height: 20,
                    minWidth: 20
                  }}
                />
              )}
            </Box>
            <Box>
              <Button
                variant={campaignView.filter === 'all' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => handleCampaignFilterChange('all')}
                sx={{ mr: 1, textTransform: 'none' }}
              >
                All
              </Button>
              <Button
                variant={campaignView.filter === 'unread' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => handleCampaignFilterChange('unread')}
                sx={{ mr: 1, textTransform: 'none' }}
              >
                Unread
              </Button>
              <Button
                variant={campaignView.filter === 'read' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => handleCampaignFilterChange('read')}
                sx={{ mr: 1, textTransform: 'none' }}
              >
                Read
              </Button>
              <IconButton edge="end" onClick={handleCloseCampaignView} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 0, display: 'flex', height: '100%' }}>
            <Box sx={{ width: '300px', borderRight: (theme) => `1px solid ${theme.palette.divider}`, height: '100%', overflow: 'auto' }}>
              {/* Campaign List */}
              <List disablePadding>
                {campaigns.length === 0 ? (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No campaigns yet. Generate templates to see them here.
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {/* Unread Campaigns Section */}
                    {campaigns.filter(c => !c.isRead).length > 0 &&
                     (campaignView.filter === 'all' || campaignView.filter === 'unread') && (
                      <>
                        <Box sx={{
                          p: 1.5,
                          bgcolor: 'rgba(25, 118, 210, 0.05)',
                          borderBottom: (theme) => `1px solid ${theme.palette.divider}`
                        }}>
                          <Typography variant="caption" fontWeight="bold" color="primary">
                            NEW ({campaigns.filter(c => !c.isRead).length})
                          </Typography>
                        </Box>
                        {campaigns
                          .filter(campaign => !campaign.isRead)
                          .map(campaign => (
                            <ListItem
                              key={campaign.id}
                              button
                              selected={campaignView.selectedCampaignId === campaign.id}
                              onClick={() => handleCampaignSelect(campaign.id)}
                              sx={{
                                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                                bgcolor: 'rgba(25, 118, 210, 0.05)',
                                py: 1.5
                              }}
                            >
                              <ListItemAvatar sx={{ minWidth: 40 }}>
                                {campaign.type === 'email' && <EmailIcon color="primary" />}
                                {campaign.type === 'call' && <CallIcon color="success" />}
                                {campaign.type === 'meeting' && <MeetingRoomIcon color="warning" />}
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    sx={{
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {campaign.title}
                                  </Typography>
                                }
                                secondary={
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{
                                        display: 'block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {campaign.description}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {new Date(campaign.createdAt).toLocaleDateString()}
                                    </Typography>
                                  </Box>
                                }
                              />
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: 'error.main',
                                  ml: 1
                                }}
                              />
                            </ListItem>
                          ))
                        }
                      </>
                    )}

                    {/* Read Campaigns Section */}
                    {campaigns.filter(c => c.isRead).length > 0 &&
                     (campaignView.filter === 'all' || campaignView.filter === 'read') && (
                      <>
                        <Box sx={{
                          p: 1.5,
                          bgcolor: 'rgba(0, 0, 0, 0.02)',
                          borderBottom: (theme) => `1px solid ${theme.palette.divider}`
                        }}>
                          <Typography variant="caption" fontWeight="bold" color="text.secondary">
                            EARLIER ({campaigns.filter(c => c.isRead).length})
                          </Typography>
                        </Box>
                        {campaigns
                          .filter(campaign => campaign.isRead)
                          .map(campaign => (
                            <ListItem
                              key={campaign.id}
                              button
                              selected={campaignView.selectedCampaignId === campaign.id}
                              onClick={() => handleCampaignSelect(campaign.id)}
                              sx={{
                                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                                py: 1.5
                              }}
                            >
                              <ListItemAvatar sx={{ minWidth: 40 }}>
                                {campaign.type === 'email' && <EmailIcon color="primary" />}
                                {campaign.type === 'call' && <CallIcon color="success" />}
                                {campaign.type === 'meeting' && <MeetingRoomIcon color="warning" />}
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {campaign.title}
                                  </Typography>
                                }
                                secondary={
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{
                                        display: 'block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {campaign.description}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {new Date(campaign.createdAt).toLocaleDateString()}
                                    </Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))
                        }
                      </>
                    )}

                    {/* No Results Message */}
                    {((campaignView.filter === 'unread' && campaigns.filter(c => !c.isRead).length === 0) ||
                      (campaignView.filter === 'read' && campaigns.filter(c => c.isRead).length === 0)) && (
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          No {campaignView.filter} campaigns found.
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
              </List>
            </Box>
            <Box sx={{ flexGrow: 1, height: '100%', overflow: 'auto', p: 0 }}>
              {/* Campaign Detail */}
              {campaignView.selectedCampaignId ? (
                (() => {
                  const selectedCampaign = campaigns.find(c => c.id === campaignView.selectedCampaignId);
                  if (!selectedCampaign) return null;

                  return (
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ p: 3, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              {selectedCampaign.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {selectedCampaign.description}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Chip
                                label={selectedCampaign.type === 'email' ? 'Email Template' :
                                       selectedCampaign.type === 'call' ? 'Call Script' :
                                       'Meeting Points'}
                                size="small"
                                sx={{
                                  mr: 1,
                                  bgcolor: selectedCampaign.type === 'email' ? 'rgba(25, 118, 210, 0.1)' :
                                          selectedCampaign.type === 'call' ? 'rgba(46, 125, 50, 0.1)' :
                                          'rgba(106, 27, 154, 0.1)',
                                  color: selectedCampaign.type === 'email' ? 'primary.main' :
                                         selectedCampaign.type === 'call' ? 'success.main' :
                                         'secondary.main'
                                }}
                              />
                              <Chip
                                label={selectedCampaign.accountName}
                                size="small"
                                sx={{ mr: 1 }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                Created on {new Date(selectedCampaign.createdAt).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </Box>
                          <IconButton onClick={() => handleDeleteCampaign(selectedCampaign.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 3,
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            lineHeight: 1.6
                          }}
                        >
                          {selectedCampaign.content}
                        </Paper>
                      </Box>
                      <Box sx={{ p: 2, borderTop: (theme) => `1px solid ${theme.palette.divider}`, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="outlined"
                          startIcon={<CloudUploadIcon />}
                          sx={{ mr: 1 }}
                        >
                          Use Template
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<EmailIcon />}
                        >
                          Send Email
                        </Button>
                      </Box>
                    </Box>
                  );
                })()
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Box sx={{ textAlign: 'center', p: 3 }}>
                    <EmailIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.3 }} />
                    <Typography variant="h6" color="text.secondary">
                      Select a campaign to view
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your AI-generated templates will appear here
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </DialogContent>
        </Dialog>

        {/* Template Generation Dialog */}
        <Dialog
          open={templateDialog.open}
          onClose={handleTemplateDialogClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: (theme) => theme.shape.borderRadius,
              maxHeight: '80vh'
            }
          }}
        >
          <DialogTitle sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            pb: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {templateDialog.type === 'email' && <EmailIcon sx={{ mr: 1 }} />}
              {templateDialog.type === 'call' && <CallIcon sx={{ mr: 1 }} />}
              {templateDialog.type === 'meeting' && <MeetingRoomIcon sx={{ mr: 1 }} />}
              <Typography variant="h6">
                {templateDialog.type === 'email' ? 'Email Template' :
                 templateDialog.type === 'call' ? 'Cold Call Script' :
                 'Meeting Talking Points'}
              </Typography>
            </Box>
            <IconButton edge="end" onClick={handleTemplateDialogClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {templateDialog.isLoading ? (
              <Box sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Generating AI template for {selectedAccount?.accountName}...
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4 }}>
                  <CircularProgress size={40} />
                </Box>
                <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="95%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="90%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="85%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="95%" height={24} sx={{ mb: 1 }} />
              </Box>
            ) : (
              <TextField
                multiline
                fullWidth
                minRows={12}
                maxRows={20}
                value={templateDialog.content}
                onChange={(e) => setTemplateDialog({
                  ...templateDialog,
                  content: e.target.value
                })}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    lineHeight: 1.6
                  }
                }}
              />
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
            <Button
              onClick={handleTemplateDialogClose}
              variant="outlined"
              sx={{ borderRadius: '3px', textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveTemplate}
              variant="contained"
              disabled={templateDialog.isLoading}
              startIcon={<CloudUploadIcon />}
              sx={{
                borderRadius: '3px',
                textTransform: 'none',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                color: (theme) => theme.palette.mode === 'dark' ? '#000' : '#fff',
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#333'
                }
              }}
            >
              Save Template
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notification for AI processing completion */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            minWidth: '320px',
            maxWidth: '400px'
          }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            variant="filled"
            sx={{
              width: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              padding: '12px 16px',
              '& .MuiAlert-icon': {
                display: 'none'
              },
              '& .MuiAlert-action': {
                padding: '0 0 0 8px',
                marginRight: 0
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              {notification.accountId && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    backgroundColor: (theme) => {
                      const account = accounts.find(a => a.id === notification.accountId);
                      return account?.color || stringToColor(account?.accountName || '');
                    },
                    mr: 1.5,
                    mt: 0.5,
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                  src={accounts.find(a => a.id === notification.accountId)?.logoSrc !== '/images/avatar.png'
                    ? accounts.find(a => a.id === notification.accountId)?.logoSrc
                    : undefined}
                >
                  {getInitials(accounts.find(a => a.id === notification.accountId)?.accountName || '')}
                </Avatar>
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                  {notification.message}
                </Typography>
                {notification.accountId && (
                  <Box sx={{ mt: 1 }}>
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => {
                        const account = accounts.find(a => a.id === notification.accountId);
                        if (account) {
                          handleAccountSelect(account);
                          handleCloseNotification();
                        }
                      }}
                      sx={{
                        color: 'inherit',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        minWidth: 'auto',
                        opacity: 0.9,
                        '&:hover': {
                          opacity: 1,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                      startIcon={<VisibilityIcon sx={{ fontSize: '0.875rem' }} />}
                    >
                      View Account Details
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Alert>
        </Snackbar>

        {/* Add Account Dialog */}
        <Dialog
          open={openAddAccountDialog}
          onClose={handleCloseAddAccountDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: (appTheme || muiTheme).shape.borderRadius,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          <DialogTitle sx={{
            borderBottom: `1px solid ${(appTheme || muiTheme).palette.divider}`,
            px: 3,
            py: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight="600">
                Add New Account
              </Typography>
              <IconButton onClick={handleCloseAddAccountDialog} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ p: 3 }}>
            <Stepper activeStep={addAccountStep} sx={{ mb: 4, mt: 1 }}>
              <Step>
                <StepLabel>Select Method</StepLabel>
              </Step>
              <Step>
                <StepLabel>Account Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Review & Create</StepLabel>
              </Step>
            </Stepper>

            {/* Step 1: Select Method */}
            {addAccountStep === 0 && (
              <Box>
                <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                  How would you like to add accounts?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Choose whether to add a single account or import multiple accounts from a CSV file.
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        border: `1px solid ${(appTheme || muiTheme).palette.divider}`,
                        borderRadius: (appTheme || muiTheme).shape.borderRadius,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: (appTheme || muiTheme).palette.primary.main,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                        }
                      }}
                      onClick={() => setAddAccountStep(1)}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            backgroundColor: 'rgba(25, 118, 210, 0.1)',
                            color: (appTheme || muiTheme).palette.primary.main,
                            mb: 2
                          }}
                        >
                          <BusinessIcon />
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                          Add Single Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Create a new account by filling out a form with account details.
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        border: `1px solid ${(appTheme || muiTheme).palette.divider}`,
                        borderRadius: (appTheme || muiTheme).shape.borderRadius,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: (appTheme || muiTheme).palette.primary.main,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                        }
                      }}
                      onClick={() => {
                        setAddAccountStep(1);
                        // Trigger file input click
                        if (fileInputRef.current) {
                          fileInputRef.current.click();
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            backgroundColor: 'rgba(25, 118, 210, 0.1)',
                            color: (appTheme || muiTheme).palette.primary.main,
                            mb: 2
                          }}
                        >
                          <CloudUploadIcon />
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                          Import from CSV
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Upload a CSV file to import multiple accounts at once.
                        </Typography>
                        <VisuallyHiddenInput
                          type="file"
                          accept=".csv"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Step 2: Account Details Form */}
            {addAccountStep === 1 && !csvFile && (
              <Box>
                <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                  Enter Account Details
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Fill out the form below with the account information.
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Account Name"
                      name="accountName"
                      value={newAccount.accountName || ''}
                      onChange={handleAccountFormChange}
                      fullWidth
                      required
                      error={!!accountFormErrors.accountName}
                      helperText={accountFormErrors.accountName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Location"
                      name="location"
                      value={newAccount.location || ''}
                      onChange={handleAccountFormChange}
                      fullWidth
                      required
                      error={!!accountFormErrors.location}
                      helperText={accountFormErrors.location}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={!!accountFormErrors.organisationType}>
                      <InputLabel>Organization Type</InputLabel>
                      <Select
                        name="organisationType"
                        value={newAccount.organisationType || ''}
                        onChange={handleAccountTypeChange}
                        label="Organization Type"
                      >
                        {dynamicFilterOptions.organisationTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {accountFormErrors.organisationType && (
                        <FormHelperText>{accountFormErrors.organisationType}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth required error={!!accountFormErrors.productFamily}>
                      <InputLabel>Product Family</InputLabel>
                      <Select
                        name="productFamily"
                        value={newAccount.productFamily || ''}
                        onChange={handleAccountTypeChange}
                        label="Product Family"
                      >
                        {dynamicFilterOptions.productFamilies.map((family) => (
                          <MenuItem key={family} value={family}>
                            {family}
                          </MenuItem>
                        ))}
                      </Select>
                      {accountFormErrors.productFamily && (
                        <FormHelperText>{accountFormErrors.productFamily}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Step 2 (Alternative): CSV Import */}
            {addAccountStep === 1 && csvFile && (
              <Box>
                <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                  CSV Import
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Map the columns from your CSV file to account fields.
                </Typography>

                {importErrors.length > 0 && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight="medium">
                      There were errors with your CSV file:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
                      {importErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </Box>
                  </Alert>
                )}

                {csvPreview.length > 0 && (
                  <>
                    <Typography variant="subtitle2" fontWeight="600" sx={{ mt: 3, mb: 1 }}>
                      File Preview
                    </Typography>

                    <CSVPreviewTable>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            {csvPreview[0].map((header, index) => (
                              <TableCell key={index}>
                                <Box>
                                  <Typography variant="caption" fontWeight="bold">
                                    {header}
                                  </Typography>
                                  <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                                    <InputLabel>Map to</InputLabel>
                                    <Select
                                      value={csvMapping[header] || ''}
                                      onChange={(e) => handleMappingChange(header, e.target.value)}
                                      label="Map to"
                                      size="small"
                                    >
                                      <MenuItem value="">
                                        <em>Skip</em>
                                      </MenuItem>
                                      <MenuItem value="accountName">Account Name</MenuItem>
                                      <MenuItem value="location">Location</MenuItem>
                                      <MenuItem value="organisationType">Organization Type</MenuItem>
                                      <MenuItem value="productFamily">Product Family</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {csvPreview.slice(1).map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>{cell}</TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CSVPreviewTable>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<UploadFileIcon />}
                        onClick={() => fileInputRef.current?.click()}
                        sx={{ mr: 2 }}
                      >
                        Change File
                      </Button>
                      <Typography variant="body2" color="text.secondary">
                        {csvFile.name} ({(csvFile.size / 1024).toFixed(1)} KB)
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            )}

            {/* Step 3: Review & Create */}
            {addAccountStep === 2 && !csvFile && (
              <Box>
                <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                  Review Account Details
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Please review the account information before creating.
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: `1px solid ${(appTheme || muiTheme).palette.divider}`,
                    borderRadius: (appTheme || muiTheme).shape.borderRadius,
                    mb: 3
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} display="flex" alignItems="center" sx={{ mb: 1 }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          fontWeight: 600,
                          fontSize: '1rem',
                          backgroundColor: stringToColor(newAccount.accountName || ''),
                          mr: 2,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        {getInitials(newAccount.accountName || '')}
                      </Avatar>
                      <Typography variant="h6" fontWeight="600">
                        {newAccount.accountName}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Location
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {newAccount.location}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Organization Type
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {newAccount.organisationType}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Product Family
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {newAccount.productFamily}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            )}
          </DialogContent>

          <DialogActions sx={{
            px: 3,
            py: 2,
            borderTop: `1px solid ${(appTheme || muiTheme).palette.divider}`
          }}>
            {addAccountStep > 0 && (
              <Button onClick={handlePreviousStep} sx={{ mr: 1 }}>
                Back
              </Button>
            )}

            <Box sx={{ flex: 1 }} />

            <Button onClick={handleCloseAddAccountDialog} sx={{ mr: 1 }}>
              Cancel
            </Button>

            {addAccountStep < 2 && (
              <Button
                variant="contained"
                onClick={handleNextStep}
                disabled={addAccountStep === 1 && csvFile && csvPreview.length === 0}
              >
                Next
              </Button>
            )}

            {addAccountStep === 2 && !csvFile && (
              <Button
                variant="contained"
                onClick={handleCreateAccount}
                startIcon={<AddIcon />}
              >
                Create Account
              </Button>
            )}

            {addAccountStep === 2 && csvFile && (
              <Button
                variant="contained"
                onClick={handleImportAccounts}
                startIcon={importInProgress ? <CircularProgress size={16} color="inherit" /> : <FileUploadIcon />}
                disabled={importInProgress}
              >
                {importInProgress ? 'Importing...' : 'Import Accounts'}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </AccountsContainer>
  );
};

export default Accounts; 