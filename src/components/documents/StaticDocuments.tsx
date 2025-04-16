import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContext';
import { BORDER_RADIUS, TRANSITIONS } from '../ui/common/constants';
import { DialogTitle as CustomDialogTitle } from '../ui/common/Dialog';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Import our fallback Lucide icons
import {
  CampaignIcon,
  GroupIcon,
  TrendingUpIcon,
  FilterListIcon,
  SearchIcon,
  AddIcon,
  MoreVertIcon,
  ShareIcon,
  VisibilityIcon,
  EmailIcon,
  VideocamIcon,
  PhoneIcon,
  SmartToyIcon,
  AutoAwesomeIcon,
  ContentCopyIcon,
  EditIcon,
  DeleteIcon
} from '../icons/FallbackIcons';

// Create a styled list item with proper typing
interface StyledListItemProps {
  selected?: boolean;
}

const ListItemStyled = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'selected'
})<StyledListItemProps>(({ theme, selected }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: selected ?
    (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)') :
    'transparent',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
  }
}));

// Define TypeBadge props interface
interface TypeBadgeProps {
  type: 'email' | 'call' | 'meeting' | string;
  label: string;
  size?: 'small' | 'medium';
  [key: string]: any;
}

// Custom TypeBadge component that uses our fallback Lucide icons
const TypeBadge: React.FC<TypeBadgeProps> = ({ type, label, size = 'small', ...props }) => {
  const { mode } = useTheme();
  let color: string, IconComponent: React.ElementType;

  switch(type) {
    case 'email':
      color = '#3498db'; // info blue
      IconComponent = EmailIcon;
      break;
    case 'call':
      color = '#2ecc71'; // success green
      IconComponent = PhoneIcon;
      break;
    case 'meeting':
      color = '#f39c12'; // warning orange
      IconComponent = VideocamIcon;
      break;
    default:
      color = '#95a5a6'; // grey
      IconComponent = CampaignIcon;
  }

  return (
    <Chip
      icon={<IconComponent size={16} color={color} />}
      label={label}
      size={size}
      sx={{
        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        color: color,
        fontWeight: 'bold',
        height: size === 'small' ? 20 : 32,
        fontSize: size === 'small' ? '0.7rem' : '0.8125rem',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}
      {...props}
    />
  );
};

// Define Campaign interface
interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string;
  clientGroup: string;
  solution: string;
  type: 'email' | 'call' | 'meeting' | string;
  status: string;
  progress: number;
  engagement: number;
  createdAt: string;
  aiGenerated: boolean;
  content: string;
  owner: {
    name: string;
    avatar: string;
  };
}

const StaticDocuments: React.FC = () => {
  const { mode } = useTheme();
  const [tabValue, setTabValue] = useState<number>(0);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>('');
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

  // Sample campaigns data (abbreviated for brevity)
  const campaigns = [
    {
      id: 1,
      title: 'Cloud Migration Email for Enterprise',
      description: 'Personalized email template for enterprise clients considering cloud migration.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      clientGroup: 'Enterprise',
      solution: 'Cloud Infrastructure',
      type: 'email',
      status: 'active',
      progress: 100,
      engagement: 89,
      createdAt: '2023-11-01',
      aiGenerated: true,
      content: 'Sample content here',
      owner: {
        name: 'Alex Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    },
    {
      id: 2,
      title: 'Cybersecurity Call Script',
      description: 'Talking points for calls with financial institutions about security solutions.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
      clientGroup: 'Financial',
      solution: 'Cybersecurity',
      type: 'call',
      status: 'active',
      progress: 100,
      engagement: 72,
      createdAt: '2023-10-15',
      aiGenerated: true,
      content: 'Sample content here',
      owner: {
        name: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleCampaignSelect = (id: number) => {
    setSelectedCampaignId(id);
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      setEditedContent(campaign.content);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(event.target.value);
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  // Filter campaigns based on search query and selected tab
  const filteredCampaigns = campaigns.filter(campaign => {
    // Filter by search query
    const matchesSearch = searchQuery === '' ||
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.clientGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.solution.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by tab
    const matchesTab =
      tabValue === 0 || // All types
      (tabValue === 1 && campaign.type === 'email') || // Email templates
      (tabValue === 2 && campaign.type === 'call') || // Call scripts
      (tabValue === 3 && campaign.type === 'meeting'); // Meeting points

    return matchesSearch && matchesTab;
  });

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: mode === 'dark' ? '#121212' : '#f5f7fa',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            Documents
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse and manage your documents and templates
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon size={20} />}
            onClick={handleOpenCreateDialog}
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
            New Document
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ px: 3 }}>
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
          <Tab label="All Documents" />
          <Tab label="Email Templates" />
          <Tab label="Call Scripts" />
          <Tab label="Meeting Points" />
        </Tabs>
      </Box>

      {/* Main content */}
      <div style={{
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',
        borderTop: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`
      }}>
        {/* List of documents */}
        <div style={{
          width: '350px',
          borderRight: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          {/* Search and filter */}
          <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
            <TextField
              placeholder="Search documents..."
              variant="outlined"
              size="small"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size={20} color={mode === 'dark' ? '#aaaaaa' : '#666666'} />
                  </InputAdornment>
                )
              }}
            />
          </Box>

          {/* List of campaigns */}
          <List sx={{ flexGrow: 1, overflow: 'auto', py: 0 }}>
            {filteredCampaigns.map((campaign) => (
              <ListItemStyled key={campaign.id}>
                <ListItemButton
                  selected={campaign.id === selectedCampaign?.id}
                  onClick={() => handleCampaignSelect(campaign.id)}
                  sx={{
                    borderRadius: '8px',
                    mb: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <ListItemText
                    primary={campaign.title}
                    secondary={campaign.description}
                  />
                </ListItemButton>
              </ListItemStyled>
            ))}
          </List>
        </div>

        {/* Document detail */}
        <div style={{
          flexGrow: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {selectedCampaign ? (
            <>
              {/* Document header */}
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h5" fontWeight="bold">
                  {selectedCampaign.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {selectedCampaign.description}
                </Typography>
              </Box>

              {/* Document content */}
              <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
                {isEditing ? (
                  <TextField
                    multiline
                    fullWidth
                    variant="outlined"
                    value={editedContent}
                    onChange={handleContentChange}
                    minRows={20}
                  />
                ) : (
                  <Paper elevation={0}>
                    {selectedCampaign.content}
                  </Paper>
                )}
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Select a document to view
              </Typography>
            </Box>
          )}
        </div>
      </div>

      {/* Create Document Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        maxWidth="md"
      >
        <DialogTitle>Create New Document</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField
              label="Document Title"
              fullWidth
              variant="outlined"
              placeholder="Enter document title"
            />
            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              placeholder="Enter document description"
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>Cancel</Button>
          <Button variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StaticDocuments;