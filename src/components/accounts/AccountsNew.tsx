// @ts-nocheck
// This file has TypeScript issues that need to be fixed separately

import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Tooltip,
  Divider,
  Alert,
  Snackbar,
  styled,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import { CloseIcon, ContentCopyIcon } from '../icons/FallbackIcons';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '../../context/ThemeContext';
import { BORDER_RADIUS, TRANSITIONS } from '../ui/common/constants';
import { SelectChangeEvent } from '@mui/material/Select';

// Define the Account interface
interface Account {
  id: number;
  name: string;
  industry: string;
  location: string;
  size: string;
  status: 'active' | 'inactive' | 'pending';
  contacts: number;
  dateAdded: string;
  logo?: string;
}

// Generate a color based on the account name
const getAccountColor = (name: string): string => {
  const colors = [
    '#4285F4', // Google Blue
    '#EA4335', // Google Red
    '#FBBC05', // Google Yellow
    '#34A853', // Google Green
    '#8A2BE2', // Purple
    '#FF6347', // Tomato
    '#2E8B57', // Sea Green
    '#4682B4', // Steel Blue
    '#D2691E', // Chocolate
    '#9370DB', // Medium Purple
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

// Get initials from name
const getInitials = (name: string): string => {
  if (!name) return '';
  
  const parts = name.split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Sample data
const sampleAccounts: Account[] = [
  {
    id: 1,
    name: 'Acme Corporation',
    industry: 'Technology',
    location: 'New York, USA',
    size: 'Enterprise',
    status: 'active',
    contacts: 12,
    dateAdded: '2023-10-15',
    logo: 'https://via.placeholder.com/40'
  },
  {
    id: 2,
    name: 'Global Industries',
    industry: 'Manufacturing',
    location: 'Chicago, USA',
    size: 'Enterprise',
    status: 'active',
    contacts: 8,
    dateAdded: '2023-09-22'
  },
  {
    id: 3,
    name: 'Tech Innovators',
    industry: 'Technology',
    location: 'San Francisco, USA',
    size: 'Mid-Market',
    status: 'active',
    contacts: 5,
    dateAdded: '2023-11-05'
  },
  {
    id: 4,
    name: 'Financial Solutions',
    industry: 'Finance',
    location: 'London, UK',
    size: 'Enterprise',
    status: 'inactive',
    contacts: 3,
    dateAdded: '2023-08-30'
  },
  {
    id: 5,
    name: 'Healthcare Plus',
    industry: 'Healthcare',
    location: 'Boston, USA',
    size: 'Mid-Market',
    status: 'active',
    contacts: 7,
    dateAdded: '2023-10-10'
  },
  {
    id: 6,
    name: 'Retail Experts',
    industry: 'Retail',
    location: 'Seattle, USA',
    size: 'Small Business',
    status: 'pending',
    contacts: 2,
    dateAdded: '2023-11-12'
  },
  {
    id: 7,
    name: 'Media Group',
    industry: 'Media',
    location: 'Los Angeles, USA',
    size: 'Mid-Market',
    status: 'active',
    contacts: 6,
    dateAdded: '2023-09-15'
  },
  {
    id: 8,
    name: 'Construction Partners',
    industry: 'Construction',
    location: 'Dallas, USA',
    size: 'Small Business',
    status: 'inactive',
    contacts: 4,
    dateAdded: '2023-07-20'
  }
];

// Styled components
const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'accountStatus'
})<{ accountStatus: 'active' | 'inactive' | 'pending' }>(({ theme, accountStatus }) => ({
  borderRadius: BORDER_RADIUS.pill,
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 24,
  backgroundColor: 
    accountStatus === 'active' 
      ? theme.palette.mode === 'dark' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(46, 204, 113, 0.1)'
      : accountStatus === 'inactive'
        ? theme.palette.mode === 'dark' ? 'rgba(231, 76, 60, 0.2)' : 'rgba(231, 76, 60, 0.1)'
        : theme.palette.mode === 'dark' ? 'rgba(241, 196, 15, 0.2)' : 'rgba(241, 196, 15, 0.1)',
  color: 
    accountStatus === 'active' 
      ? '#2ecc71'
      : accountStatus === 'inactive'
        ? '#e74c3c'
        : '#f1c40f',
  '& .MuiChip-label': {
    padding: '0 8px'
  }
}));

const AccountsNew: React.FC = () => {
  const { mode } = useTheme();
  const [accounts, setAccounts] = useState<Account[]>(sampleAccounts);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    name: '',
    industry: '',
    location: '',
    size: '',
    status: 'active'
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][]>([]);
  const [importError, setImportError] = useState<string | null>(null);
  
  // New state for upload progress
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStage, setUploadStage] = useState<'idle' | 'uploading' | 'processing' | 'complete' | 'error'>('idle');
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  // Pulsing effect for progress bar during processing
  const [pulseEffect, setPulseEffect] = useState<boolean>(false);
  
  // Create pulsing effect during processing
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (uploadStage === 'processing') {
      interval = setInterval(() => {
        setPulseEffect(prev => !prev);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [uploadStage]);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, accountId: number) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedAccountId(accountId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedAccountId(null);
  };

  // Handle opening the add account dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  // Handle closing the add account dialog
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewAccount({
      name: '',
      industry: '',
      location: '',
      size: '',
      status: 'active'
    });
  };

  // Handle opening the import dialog
  const handleOpenImportDialog = () => {
    setOpenImportDialog(true);
  };

  // Handle closing the import dialog
  const handleCloseImportDialog = () => {
    setOpenImportDialog(false);
    setCsvFile(null);
    setCsvPreview([]);
    setImportError(null);
  };

  // Handle input change for new account
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setNewAccount({
      ...newAccount,
      [name as string]: value
    });
  };

  // Handle adding a new account
  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.industry || !newAccount.location || !newAccount.size) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    const newId = Math.max(...accounts.map(account => account.id), 0) + 1;
    const today = new Date().toISOString().split('T')[0];
    
    const accountToAdd: Account = {
      id: newId,
      name: newAccount.name,
      industry: newAccount.industry,
      location: newAccount.location,
      size: newAccount.size as string,
      status: newAccount.status as 'active' | 'inactive' | 'pending',
      contacts: 0,
      dateAdded: today
    };

    setAccounts([...accounts, accountToAdd]);
    handleCloseAddDialog();
    
    setSnackbar({
      open: true,
      message: 'Account added successfully',
      severity: 'success'
    });
  };

  // Handle deleting an account
  const handleDeleteAccount = () => {
    if (selectedAccountId) {
      setAccounts(accounts.filter(account => account.id !== selectedAccountId));
      handleMenuClose();
      
      setSnackbar({
        open: true,
        message: 'Account deleted successfully',
        severity: 'success'
      });
    }
  };

  // Handle closing the snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);
  
  // Handle drop event
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        handleFileProcessing(file);
      } else {
        setImportError('Please upload a CSV file');
      }
    }
  }, []);

  // Handle file selection for CSV import
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      handleFileProcessing(file);
    }
  };
  
  // Process the selected file
  const handleFileProcessing = (file: File) => {
    setCsvFile(file);
    setUploadStage('uploading');
    setIsUploading(true);
    setUploadProgress(0);
    setImportError(null);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    
    // Read the file using FileReader
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        clearInterval(progressInterval);
        setUploadProgress(100);
        setUploadStage('processing');
        
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const parsedData = lines.map(line => line.split(',').map(cell => cell.trim()));
        
        // Validate CSV format
        if (parsedData.length < 2) {
          setImportError('CSV file must contain at least a header row and one data row');
          setCsvPreview([]);
          setUploadStage('error');
          setIsUploading(false);
          return;
        }
        
        const headers = parsedData[0].map(h => h.toLowerCase());
        const requiredHeaders = ['name', 'industry', 'location', 'size', 'status'];
        const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
        
        if (missingHeaders.length > 0) {
          setImportError(`Missing required headers: ${missingHeaders.join(', ')}`);
          setCsvPreview([]);
          setUploadStage('error');
          setIsUploading(false);
          return;
        }
        
        setImportError(null);
        setCsvPreview(parsedData.slice(0, 6)); // Show first 5 rows plus header
        setUploadStage('complete');
        setIsUploading(false);
      } catch (error) {
        clearInterval(progressInterval);
        setImportError('Error parsing CSV file');
        setCsvPreview([]);
        setUploadStage('error');
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      clearInterval(progressInterval);
      setImportError('Error reading CSV file');
      setCsvPreview([]);
      setUploadStage('error');
      setIsUploading(false);
    };
    
    reader.readAsText(file);
  };

  // Handle importing accounts from CSV
  const handleImportAccounts = () => {
    if (!csvFile || csvPreview.length < 2) {
      setImportError('Please select a valid CSV file');
      return;
    }
    
    setUploadStage('processing');
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const headers = csvPreview[0].map(header => header.toLowerCase());
      const nameIndex = headers.indexOf('name');
      const industryIndex = headers.indexOf('industry');
      const locationIndex = headers.indexOf('location');
      const sizeIndex = headers.indexOf('size');
      const statusIndex = headers.indexOf('status');
      
      if (nameIndex === -1 || industryIndex === -1 || locationIndex === -1 || sizeIndex === -1 || statusIndex === -1) {
        setImportError('CSV file must contain name, industry, location, size, and status columns');
        setUploadStage('error');
        setIsUploading(false);
        return;
      }
      
      // Read the file using FileReader
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split('\n');
          const parsedData = lines.map(line => line.split(',').map(cell => cell.trim()));
          
          // Simulate progress updates
          let currentProgress = 0;
          const totalRows = parsedData.length;
          const progressInterval = setInterval(() => {
            currentProgress += 5;
            if (currentProgress >= 95) {
              clearInterval(progressInterval);
              setUploadProgress(95);
            } else {
              setUploadProgress(currentProgress);
            }
          }, 100);
          
          // Skip header row
          const dataRows = parsedData.slice(1).filter(row => 
            row.length >= Math.max(nameIndex, industryIndex, locationIndex, sizeIndex, statusIndex) + 1
          );
          
          const newAccounts: Account[] = dataRows.map((row, index) => {
            const status = row[statusIndex].toLowerCase();
            const validStatus: 'active' | 'inactive' | 'pending' = 
              status === 'active' ? 'active' : 
              status === 'inactive' ? 'inactive' : 'pending';
            
            return {
              id: Math.max(...accounts.map(account => account.id), 0) + index + 1,
              name: row[nameIndex],
              industry: row[industryIndex],
              location: row[locationIndex],
              size: row[sizeIndex],
              status: validStatus,
              contacts: 0,
              dateAdded: new Date().toISOString().split('T')[0]
            };
          });
          
          // Simulate final processing
          setTimeout(() => {
            clearInterval(progressInterval);
            setUploadProgress(100);
            setAccounts([...accounts, ...newAccounts]);
            
            // Show success message and close dialog
            setSnackbar({
              open: true,
              message: `Successfully imported ${newAccounts.length} accounts`,
              severity: 'success'
            });
            
            setUploadStage('complete');
            setIsUploading(false);
            
            // Close dialog after a short delay to show completion
            setTimeout(() => {
              handleCloseImportDialog();
            }, 1000);
          }, 500);
        } catch (error) {
          setImportError('Error processing CSV data');
          setUploadStage('error');
          setIsUploading(false);
        }
      };
      
      reader.onerror = () => {
        setImportError('Error reading CSV file');
        setUploadStage('error');
        setIsUploading(false);
      };
      
      reader.readAsText(csvFile);
    } catch (error) {
      setImportError('Error importing accounts from CSV');
      setUploadStage('error');
      setIsUploading(false);
    }
  };

  // Filter accounts based on search query and tab
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = 
      tabValue === 0 || // All accounts
      (tabValue === 1 && account.status === 'active') || // Active accounts
      (tabValue === 2 && account.status === 'inactive') || // Inactive accounts
      (tabValue === 3 && account.status === 'pending'); // Pending accounts
    
    return matchesSearch && matchesTab;
  });

  // Fix for onChange in Select components
  const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    const { name, value } = event.target;
    setNewAccount({
      ...newAccount,
      [name]: value,
    });
  };

  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      backgroundColor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '0 24px', // Add consistent horizontal padding
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            Accounts
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your client accounts and organizations
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon sx={{ fontSize: 20 }} />}
            onClick={handleOpenImportDialog}
            sx={{
              borderRadius: BORDER_RADIUS.md,
              textTransform: 'none',
              fontWeight: 'bold',
              borderColor: mode === 'dark' ? 'white' : 'black',
              color: mode === 'dark' ? 'white' : 'black',
              borderWidth: '1.5px',
              transition: TRANSITIONS.medium,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                borderColor: mode === 'dark' ? 'white' : 'black',
                borderWidth: '1.5px',
                bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              }
            }}
          >
            Import CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: 20 }} />}
            onClick={handleOpenAddDialog}
            sx={{
              borderRadius: BORDER_RADIUS.md,
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: 'none',
              transition: TRANSITIONS.medium,
              bgcolor: mode === 'dark' ? 'white' : 'black',
              color: mode === 'dark' ? 'black' : 'white',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
              }
            }}
          >
            Add Account
          </Button>
        </Box>
      </Box>

      {/* Analyse Banner */}
      <Box sx={{ 
        px: 3, 
        py: 2,
        mb: 2,
        backgroundColor: '#FF5722',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(255, 87, 34, 0.3)'
      }}>
        <Box>
          <Typography variant="h6" fontWeight="bold" color="white">
            Analyse Your Accounts
          </Typography>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
            Get insights and recommendations for your client accounts
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={() => {
            // Handle analyse action
            setSnackbar({
              open: true,
              message: 'Analysis started for selected accounts',
              severity: 'info'
            });
          }}
          sx={{
            borderRadius: BORDER_RADIUS.md,
            textTransform: 'none',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            bgcolor: 'white',
            color: '#FF5722',
            py: 1,
            px: 3,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            }
          }}
        >
          Start Analysis
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ 
        px: 3, 
        borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`
      }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0'
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              minWidth: 100,
              transition: 'all 0.2s ease',
              '&:hover': {
                color: 'primary.main',
                opacity: 1
              }
            }
          }}
        >
          <Tab label={`All Accounts (${accounts.length})`} />
          <Tab label={`Active (${accounts.filter(a => a.status === 'active').length})`} />
          <Tab label={`Inactive (${accounts.filter(a => a.status === 'inactive').length})`} />
          <Tab label={`Pending (${accounts.filter(a => a.status === 'pending').length})`} />
        </Tabs>
      </Box>

      {/* Main content */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden'
      }}>
        {/* Search and filter */}
        <Box sx={{ p: 2, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
            <TextField
              placeholder="Search accounts..."
              variant="outlined"
              size="small"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 20, color: mode === 'dark' ? '#aaaaaa' : '#666666' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: BORDER_RADIUS.md,
                  backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  transition: TRANSITIONS.medium,
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                    transition: 'border-color 0.2s ease-in-out',
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: mode === 'dark' ? 'white' : 'black',
                    borderWidth: '1.5px',
                  },
                }
              }}
            />
            <IconButton
              sx={{
                borderRadius: BORDER_RADIUS.md,
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                transition: TRANSITIONS.medium,
                padding: '8px',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <FilterListIcon sx={{ fontSize: 20, color: mode === 'dark' ? '#ffffff' : '#000000' }} />
            </IconButton>
          </Box>
          
          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Add Account Button */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={(e) => setMenuAnchorEl(e.currentTarget)}
              sx={{
                borderRadius: BORDER_RADIUS.md,
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: 'none',
                bgcolor: mode === 'dark' ? 'white' : 'black',
                color: mode === 'dark' ? 'black' : 'white',
                '&:hover': {
                  bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                  boxShadow: 'none',
                }
              }}
            >
              Add Account
            </Button>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl) && selectedAccountId === null}
              onClose={() => setMenuAnchorEl(null)}
              PaperProps={{
                sx: {
                  borderRadius: BORDER_RADIUS.md,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  mt: 1
                }
              }}
            >
              <MenuItem 
                onClick={() => {
                  setMenuAnchorEl(null);
                  handleOpenAddDialog();
                }}
                sx={{ 
                  py: 1.5, 
                  px: 2,
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <AddIcon sx={{ mr: 1.5, fontSize: 20 }} />
                <Typography variant="body2">Add Single Account</Typography>
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  setMenuAnchorEl(null);
                  handleOpenImportDialog();
                }}
                sx={{ 
                  py: 1.5, 
                  px: 2,
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <CloudUploadIcon sx={{ mr: 1.5, fontSize: 20 }} />
                <Typography variant="body2">Import from CSV</Typography>
              </MenuItem>
              <Divider sx={{ my: 1 }} />
              <MenuItem 
                onClick={() => {
                  setMenuAnchorEl(null);
                  // Handle analyse action
                  setSnackbar({
                    open: true,
                    message: 'Analysis started for selected accounts',
                    severity: 'info'
                  });
                }}
                sx={{ 
                  py: 1.5, 
                  px: 2,
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <SearchIcon sx={{ mr: 1.5, fontSize: 20 }} />
                <Typography variant="body2">Analyse Accounts</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Analyse Button above table - Large and prominent */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 2, 
          mt: 1,
          px: 2
        }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SearchIcon />}
            onClick={() => {
              // Handle analyse action
              setSnackbar({
                open: true,
                message: 'Analysis started for selected accounts',
                severity: 'info'
              });
            }}
            sx={{
              borderRadius: BORDER_RADIUS.md,
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(255, 87, 34, 0.4)',
              bgcolor: '#FF5722', // Orange for high visibility
              color: 'white',
              py: 1.5,
              px: 4,
              width: '50%', // Make it wider
              '&:hover': {
                bgcolor: '#E64A19',
                boxShadow: '0 6px 16px rgba(255, 87, 34, 0.5)',
                transform: 'translateY(-2px)'
              },
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  boxShadow: '0 0 0 0 rgba(255, 87, 34, 0.7)'
                },
                '70%': {
                  boxShadow: '0 0 0 10px rgba(255, 87, 34, 0)'
                },
                '100%': {
                  boxShadow: '0 0 0 0 rgba(255, 87, 34, 0)'
                }
              }
            }}
          >
            ANALYSE ACCOUNTS
          </Button>
        </Box>
        
        {/* Accounts table */}
        <TableContainer 
          component={Paper} 
          sx={{ 
            flexGrow: 1, 
            overflow: 'auto',
            boxShadow: 'none',
            backgroundColor: 'transparent'
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="accounts table">
            {/* Special header row for Analyse button */}
            <TableHead>
              <TableRow sx={{ backgroundColor: '#FFF3E0' }}>
                <TableCell colSpan={8} align="center" sx={{ py: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<SearchIcon />}
                    onClick={() => {
                      // Handle analyse action
                      setSnackbar({
                        open: true,
                        message: 'Analysis started for selected accounts',
                        severity: 'info'
                      });
                    }}
                    sx={{
                      borderRadius: BORDER_RADIUS.md,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 12px rgba(255, 87, 34, 0.4)',
                      bgcolor: '#FF5722', // Orange for high visibility
                      color: 'white',
                      py: 1.5,
                      px: 4,
                      '&:hover': {
                        bgcolor: '#E64A19',
                        boxShadow: '0 6px 16px rgba(255, 87, 34, 0.5)',
                      }
                    }}
                  >
                    ANALYSE ACCOUNTS
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Account</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Industry</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contacts</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date Added</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAccounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No accounts found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAccounts.map((account) => (
                  <TableRow
                    key={account.id}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                      },
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {account.logo ? (
                          <Avatar src={account.logo} alt={account.name} />
                        ) : (
                          <Avatar 
                            sx={{ 
                              bgcolor: getAccountColor(account.name),
                              color: '#fff',
                              fontWeight: 'bold'
                            }}
                          >
                            {getInitials(account.name)}
                          </Avatar>
                        )}
                        <Typography variant="body1" fontWeight="medium">
                          {account.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel>Industry</InputLabel>
                        <Select
                          name="industry"
                          value={account.industry || ''}
                          label="Industry"
                          onChange={(event) => {
                            handleSelectChange(event, null);
                          }}
                        >
                          <MenuItem value="technology">Technology</MenuItem>
                          <MenuItem value="healthcare">Healthcare</MenuItem>
                          <MenuItem value="finance">Finance</MenuItem>
                          <MenuItem value="education">Education</MenuItem>
                          <MenuItem value="manufacturing">Manufacturing</MenuItem>
                          <MenuItem value="retail">Retail</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>{account.location}</TableCell>
                    <TableCell>{account.size}</TableCell>
                    <TableCell>
                      <StatusChip 
                        label={account.status.charAt(0).toUpperCase() + account.status.slice(1)} 
                        accountStatus={account.status}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PeopleIcon sx={{ fontSize: 16 }} />
                        <Typography variant="body2">{account.contacts}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(account.dateAdded).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title="View Details">
                          <IconButton size="small" sx={{ mr: 1 }}>
                            <VisibilityIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small" sx={{ mr: 1 }}>
                            <EditIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Tooltip>
                        <IconButton 
                          size="small"
                          onClick={(e) => handleMenuOpen(e, account.id)}
                        >
                          <MoreVertIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Account actions menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            boxShadow: mode === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.5)' : '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: BORDER_RADIUS.md,
            minWidth: 180
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <VisibilityIcon sx={{ fontSize: 18, mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ fontSize: 18, mr: 1 }} />
          Edit Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteAccount} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ fontSize: 18, mr: 1 }} />
          Delete Account
        </MenuItem>
      </Menu>

      {/* Add Account Dialog */}
      <Dialog 
        open={openAddDialog} 
        onClose={handleCloseAddDialog}
        PaperProps={{
          sx: {
            borderRadius: BORDER_RADIUS.lg,
            width: '100%',
            maxWidth: 500
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6" fontWeight="bold">Add New Account</Typography>
          <IconButton onClick={handleCloseAddDialog} size="small">
            <CloseIcon size={18} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Account Name"
              name="name"
              value={newAccount.name}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: BORDER_RADIUS.md,
                  '& fieldset': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: mode === 'dark' ? 'white' : 'black',
                    borderWidth: '1.5px',
                  },
                }
              }}
            />
            <TextField
              label="Industry"
              name="industry"
              value={newAccount.industry}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: BORDER_RADIUS.md,
                  '& fieldset': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: mode === 'dark' ? 'white' : 'black',
                    borderWidth: '1.5px',
                  },
                }
              }}
            />
            <TextField
              label="Location"
              name="location"
              value={newAccount.location}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: BORDER_RADIUS.md,
                  '& fieldset': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: mode === 'dark' ? 'white' : 'black',
                    borderWidth: '1.5px',
                  },
                }
              }}
            />
            <FormControl fullWidth required>
              <InputLabel>Size</InputLabel>
              <Select
                name="size"
                value={newAccount.size}
                onChange={handleInputChange}
                label="Size"
                sx={{
                  borderRadius: BORDER_RADIUS.md,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: mode === 'dark' ? 'white' : 'black',
                    borderWidth: '1.5px',
                  },
                }}
              >
                <MenuItem value="Enterprise">Enterprise</MenuItem>
                <MenuItem value="Mid-Market">Mid-Market</MenuItem>
                <MenuItem value="Small Business">Small Business</MenuItem>
                <MenuItem value="Startup">Startup</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={newAccount.status}
                onChange={handleSelectChange}
                label="Status"
                sx={{
                  borderRadius: BORDER_RADIUS.md,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: mode === 'dark' ? 'white' : 'black',
                    borderWidth: '1.5px',
                  },
                }}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleCloseAddDialog}
            sx={{
              borderRadius: BORDER_RADIUS.md,
              textTransform: 'none',
              fontWeight: 'bold',
              color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleAddAccount}
            sx={{
              borderRadius: BORDER_RADIUS.md,
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: 'none',
              bgcolor: mode === 'dark' ? 'white' : 'black',
              color: mode === 'dark' ? 'black' : 'white',
              '&:hover': {
                bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                boxShadow: 'none',
              }
            }}
          >
            Add Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* Import CSV Dialog */}
      <Dialog 
        open={openImportDialog} 
        onClose={!isUploading ? handleCloseImportDialog : undefined}
        PaperProps={{
          sx: {
            borderRadius: BORDER_RADIUS.lg,
            width: '100%',
            maxWidth: 600
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6" fontWeight="bold">Import Accounts from CSV</Typography>
          {!isUploading && (
            <IconButton onClick={handleCloseImportDialog} size="small">
              <CloseIcon size={18} />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Upload a CSV file with the following columns: name, industry, location, size, status
            </Typography>
            
            {/* Upload progress indicator */}
            {isUploading && (
              <Box sx={{ mb: 2, mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {uploadStage === 'error' ? (
                      <DeleteIcon sx={{ mr: 1, fontSize: 18, color: '#e74c3c' }} />
                    ) : uploadStage === 'complete' ? (
                      <CheckCircleIcon sx={{ mr: 1, fontSize: 18, color: '#2ecc71' }} />
                    ) : (
                      <CircularProgress size={16} sx={{ mr: 1 }} />
                    )}
                    <Typography variant="body2" fontWeight="medium" color={
                      uploadStage === 'error' ? '#e74c3c' : 
                      uploadStage === 'complete' ? '#2ecc71' : 
                      'primary'
                    }>
                      {uploadStage === 'uploading' ? 'Uploading file...' : 
                       uploadStage === 'processing' ? 'Processing data...' : 
                       uploadStage === 'error' ? 'Error processing file' :
                       'Completing import...'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {uploadProgress}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant={uploadStage === 'processing' ? (pulseEffect ? "indeterminate" : "determinate") : "determinate"}
                  value={uploadProgress} 
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      backgroundColor: uploadStage === 'error' 
                        ? '#e74c3c' 
                        : uploadStage === 'complete' 
                          ? '#2ecc71' 
                          : mode === 'dark' ? 'white' : 'black',
                      transition: 'transform 0.4s linear',
                    },
                    '@keyframes pulse': {
                      '0%': {
                        opacity: 0.6,
                      },
                      '50%': {
                        opacity: 1,
                      },
                      '100%': {
                        opacity: 0.6,
                      },
                    },
                    animation: uploadStage === 'processing' ? 'pulse 1.5s infinite ease-in-out' : 'none',
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  {uploadStage === 'uploading' ? 'Reading file contents...' : 
                   uploadStage === 'processing' ? 'Validating and processing data...' : 
                   'Finalizing import...'}
                </Typography>
              </Box>
            )}
            
            {/* File upload area */}
            {!isUploading && (
              <Box 
                sx={{ 
                  border: `2px dashed ${dragActive 
                    ? (mode === 'dark' ? 'white' : 'black')
                    : csvFile 
                      ? (mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)')
                      : (mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
                  }`,
                  borderRadius: BORDER_RADIUS.md,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: dragActive
                    ? (mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)')
                    : csvFile
                      ? (mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)')
                      : 'transparent',
                  '&:hover': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                  {csvFile ? (
                    <>
                      <Box sx={{ 
                        width: 60, 
                        height: 60, 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        mb: 1
                      }}>
                        <CheckCircleIcon sx={{ fontSize: 32, color: mode === 'dark' ? 'white' : 'black' }} />
                      </Box>
                      <Typography variant="body1" fontWeight="medium">
                        {csvFile.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`${(csvFile.size / 1024).toFixed(2)} KB • ${new Date().toLocaleDateString()}`}
                      </Typography>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCsvFile(null);
                          setCsvPreview([]);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        sx={{ 
                          mt: 1, 
                          borderRadius: BORDER_RADIUS.md,
                          textTransform: 'none',
                          borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                          color: mode === 'dark' ? 'white' : 'black',
                        }}
                      >
                        Change File
                      </Button>
                    </>
                  ) : (
                    <>
                      <CloudUploadIcon sx={{ fontSize: 48, color: mode === 'dark' ? '#aaaaaa' : '#666666', mb: 1 }} />
                      <Typography variant="body1" fontWeight="medium">
                        Drag and drop your CSV file here
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        or click to browse files
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                        Supported format: CSV
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            )}
            
            {/* Error message */}
            {importError && (
              <Alert 
                severity="error" 
                sx={{ 
                  borderRadius: BORDER_RADIUS.md,
                  '& .MuiAlert-icon': {
                    alignItems: 'center'
                  }
                }}
              >
                {importError}
              </Alert>
            )}
            
            {/* Success message when upload is complete */}
            {uploadStage === 'complete' && !importError && (
              <Alert 
                severity="success" 
                sx={{ 
                  borderRadius: BORDER_RADIUS.md,
                  '& .MuiAlert-icon': {
                    alignItems: 'center'
                  }
                }}
              >
                File successfully processed and ready to import.
              </Alert>
            )}
            
            {/* CSV Preview */}
            {csvPreview.length > 0 && !isUploading && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                  Preview:
                </Typography>
                <TableContainer 
                  component={Paper} 
                  sx={{ 
                    maxHeight: 200,
                    boxShadow: 'none',
                    border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                    borderRadius: BORDER_RADIUS.md
                  }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {csvPreview[0].map((header, index) => (
                          <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                            {header}
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
                </TableContainer>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  Showing {csvPreview.length - 1} of {csvFile ? 'many' : '0'} rows
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          {!isUploading ? (
            <>
              <Button 
                onClick={handleCloseImportDialog}
                sx={{
                  borderRadius: BORDER_RADIUS.md,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained"
                onClick={handleImportAccounts}
                disabled={!csvFile || csvPreview.length === 0 || importError !== null}
                sx={{
                  borderRadius: BORDER_RADIUS.md,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  boxShadow: 'none',
                  bgcolor: mode === 'dark' ? 'white' : 'black',
                  color: mode === 'dark' ? 'black' : 'white',
                  '&:hover': {
                    bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                    boxShadow: 'none',
                  },
                  '&.Mui-disabled': {
                    bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                  }
                }}
              >
                Import Accounts
              </Button>
            </>
          ) : (
            <Button 
              variant="text"
              disabled
              startIcon={<CircularProgress size={16} />}
              sx={{
                borderRadius: BORDER_RADIUS.md,
                textTransform: 'none',
                fontWeight: 'bold',
                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
              }}
            >
              {uploadStage === 'uploading' ? 'Uploading...' : 
               uploadStage === 'processing' ? 'Processing...' : 
               'Completing...'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Floating Action Button for Analyse */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SearchIcon />}
          onClick={() => {
            // Handle analyse action
            setSnackbar({
              open: true,
              message: 'Analysis started for selected accounts',
              severity: 'info'
            });
          }}
          sx={{
            borderRadius: BORDER_RADIUS.md,
            textTransform: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(255, 87, 34, 0.5)',
            bgcolor: '#FF5722', // Orange for high visibility
            color: 'white',
            py: 1.5,
            px: 3,
            '&:hover': {
              bgcolor: '#E64A19',
              boxShadow: '0 6px 25px rgba(255, 87, 34, 0.6)',
              transform: 'translateY(-3px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Analyse Accounts
        </Button>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            borderRadius: BORDER_RADIUS.md,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AccountsNew;