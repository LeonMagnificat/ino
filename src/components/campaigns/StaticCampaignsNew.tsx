import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel,
  Paper,
  ListItemIcon,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContext';
import { BORDER_RADIUS, TRANSITIONS } from '../ui/common/constants';
import { Dialog } from '../ui/common/Dialog';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FavoriteIcon from '@mui/icons-material/Favorite';
import fetchClient from '../../utils/fetchClient.js';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
      icon={<IconComponent style={{ width: 20, height: 20 }} color={color} />}
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
  allContents: CampaignContent[];
}

// Update interfaces for API data
interface ActionPlan {
  benefit: string;
  description: string;
  recommendation: string;
}

interface CompanyInsight {
  id: string;
  account_id: string;
  solution: {
    text: string;
  };
  action_plan: ActionPlan[];
  latest_updates: string;
  challenges: string;
  decision_makers: string;
  market_position: string;
  future_plans: string;
  email: string;
  call: string | null;
  meeting: string | null;
  status: number;
  fetched_at: string;
  createdAt: string;
  updatedAt: string;
}

interface Account {
  id: string;
  account_number: string;
  account_name: string;
  organisation_type: string;
  location: string;
  quantity: number | null;
  last_billed_price_total: string | null;
  sbu_and_sub_sbu: string;
  product_family: string;
  risk_product_category: string | null;
  exit_rate_usd: string;
  industry: string;
  company_info: string;
  linkedin: string;
  status: number;
  news: string;
  opportunities: string;
  strength: string;
  assets: string;
  createdAt: string;
  updatedAt: string;
  CompanyInsights: CompanyInsight[];
}

// Add interface for profile response
interface UserProfile {
  id: string;
  // Add other profile fields as needed
}

// Add interface for campaign content types
interface CampaignContent {
  type: 'email' | 'call' | 'meeting';
  content: string;
}

const accountToCampaign = (account: Account, insight: CompanyInsight): Campaign => {
  // Determine campaign type and content
  let campaignContents: CampaignContent[] = [];
  
  if (insight.email) {
    campaignContents.push({ type: 'email', content: insight.email });
  }
  if (insight.call) {
    campaignContents.push({ type: 'call', content: insight.call });
  }
  if (insight.meeting) {
    campaignContents.push({ type: 'meeting', content: insight.meeting });
  }

  return {
    id: parseInt(account.id.slice(0, 8), 16),
    title: account.account_name,
    description: `${account.organisation_type} - ${account.industry}`,
    image: `https://logo.clearbit.com/${account.account_name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}.com`,
    clientGroup: account.organisation_type,
    solution: account.product_family,
    type: campaignContents[0]?.type || 'email',
    status: account.status === 1 ? 'active' : 'inactive',
      progress: 100,
    engagement: Math.floor(Math.random() * 30) + 70,
    createdAt: account.createdAt,
      aiGenerated: true,
    content: campaignContents[0]?.content || '',
      owner: {
      name: 'AI Assistant',
      avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    },
    allContents: campaignContents
  };
};

// Add email templates interface
interface EmailTemplate {
  id: number;
  title: string;
  subject: string;
  content: string;
}

// Add interface for parsed email template
interface ParsedEmailTemplate {
  id: string;
  subject: string;
  content: string;
  type: string;
  category: string;
}

// Function to parse email content and extract subject
const parseEmailContent = (content: string): ParsedEmailTemplate | null => {
  try {
    // Look for "Subject:" line
    const subjectMatch = content.match(/Subject:\s*([^\n]+)/);
    if (!subjectMatch) return null;

    const subject = subjectMatch[1].trim();
    // Get content after the subject
    const emailContent = content.slice(content.indexOf(subjectMatch[0]) + subjectMatch[0].length).trim();
    
    // Determine template type based on subject keywords
    let type = 'general';
    let category = 'General';
    
    if (subject.toLowerCase().includes('strategic')) {
      type = 'strategic';
      category = 'Strategic Communications';
    } else if (subject.toLowerCase().includes('partnership')) {
      type = 'partnership';
      category = 'Partnership Proposals';
    } else if (subject.toLowerCase().includes('opportunity')) {
      type = 'opportunity';
      category = 'Opportunity Discussion';
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      subject,
      content: emailContent,
      type,
      category
    };
  } catch (error) {
    console.error('Error parsing email content:', error);
    return null;
  }
};

// Add interface for parsed script
interface ParsedScript {
  id: string;
  type: 'email' | 'call' | 'meeting';
  scriptNumber: number;
  content: string;
  subject?: string;
}

// Function to detect and parse scripts from content
const parseScriptsFromContent = (content: string, type: 'email' | 'call' | 'meeting'): ParsedScript[] => {
  try {
    // Regular expression to match Script followed by a number
    const scriptPattern = /Script(\d+)\s+(.*?)(?=Script\d+|$)/gs;
    const scripts: ParsedScript[] = [];
    let match;

    while ((match = scriptPattern.exec(content)) !== null) {
      const scriptNumber = parseInt(match[1]);
      const scriptContent = match[2].trim();

      // Try to extract subject if it exists
      const subjectMatch = scriptContent.match(/\*\*Subject:\*\*\s*([^\n]+)/);
      const subject = subjectMatch ? subjectMatch[1].trim() : undefined;

      scripts.push({
        id: `${type}-script-${scriptNumber}`,
        type,
        scriptNumber,
        content: scriptContent,
        subject
      });
    }

    return scripts.sort((a, b) => a.scriptNumber - b.scriptNumber);
  } catch (error) {
    console.error('Error parsing scripts:', error);
    return [];
  }
};

// Function to parse all content types from campaign
const parseAllScriptsFromCampaign = (campaign: Campaign): ParsedScript[] => {
  const allScripts: ParsedScript[] = [];

  campaign.allContents.forEach(content => {
    const scripts = parseScriptsFromContent(content.content, content.type);
    allScripts.push(...scripts);
  });

  return allScripts;
};

// Add filter types
interface FilterState {
  type: 'all' | 'email' | 'call' | 'meeting';
  hasScripts: boolean;
  scriptType?: string;
}

const StaticCampaignsNew: React.FC = () => {
  const { mode } = useTheme();
  const [tabValue, setTabValue] = useState<number>(0);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>('');
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<'email' | 'call' | 'meeting'>('email');
  const [parsedTemplates, setParsedTemplates] = useState<ParsedEmailTemplate[]>([]);
  const [templateCategory, setTemplateCategory] = useState<string>('All');
  const [filterState, setFilterState] = useState<FilterState>({
    type: 'all',
    hasScripts: false
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const profileResponse = await fetchClient.get<UserProfile>('/auth/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!profileResponse.data?.id) {
          throw new Error('User profile not found');
        }

        const response = await fetchClient.get<Account[]>(`/accounts/${profileResponse.data.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data) {
          const accounts = response.data;
          // Create campaigns for each account's insights that have content
          const allCampaigns = accounts.flatMap(account => 
            account.CompanyInsights
              .filter(insight => insight.email || insight.call || insight.meeting)
              .map(insight => accountToCampaign(account, insight))
          );
          
          setCampaigns(allCampaigns);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch campaigns';
        setError(`${errorMessage}. Please try again later.`);
        console.error('Error fetching campaigns:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

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

  // Function to extract templates from campaign content
  const extractTemplatesFromCampaign = (campaign: Campaign) => {
    const emailContent = campaign.allContents.find(content => content.type === 'email');
    if (!emailContent) return;

    // Split content by multiple dashes (---) to separate templates
    const templates = emailContent.content.split(/\n---+\n/)
      .map(template => parseEmailContent(template))
      .filter((template): template is ParsedEmailTemplate => template !== null);

    setParsedTemplates(templates);
  };

  // Effect to process templates when campaign changes
  useEffect(() => {
    if (selectedCampaignId) {
      extractTemplatesFromCampaign(campaigns.find(c => c.id === selectedCampaignId)!);
    }
  }, [selectedCampaignId, campaigns]);

  // Update the renderTemplateSlider to use the new script parsing
  const renderTemplateSlider = () => {
    if (!selectedCampaignId) return null;
    
    const campaign = campaigns.find(c => c.id === selectedCampaignId);
    if (!campaign) return null;

    const allScripts = parseAllScriptsFromCampaign(campaign);
    const scriptsByType = allScripts.reduce((acc, script) => {
      if (!acc[script.type]) {
        acc[script.type] = [];
      }
      acc[script.type].push(script);
      return acc;
    }, {} as Record<string, ParsedScript[]>);

    const contentTypes = Object.keys(scriptsByType).map(type => ({
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      count: scriptsByType[type].length,
      icon: type === 'email' ? <EmailIcon style={{ width: 20, height: 20 }} /> :
            type === 'call' ? <PhoneIcon style={{ width: 20, height: 20 }} /> :
            <VideocamIcon style={{ width: 20, height: 20 }} />
    }));

    const currentScripts = scriptsByType[selectedContentType] || [];
    if (currentScripts.length === 0) return null;

    return (
      <Box sx={{ 
        p: 3, 
        borderBottom: 1, 
        borderColor: 'divider',
        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Templates</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {contentTypes.map(({ type, label, count, icon }) => (
              <Chip
                key={type}
                icon={icon}
                label={`${label} (${count})`}
                onClick={() => {
                  setSelectedContentType(type as 'email' | 'call' | 'meeting');
                  setCurrentTemplateIndex(0);
                }}
                variant={selectedContentType === type ? 'filled' : 'outlined'}
                sx={{
                  borderRadius: BORDER_RADIUS.md,
                  backgroundColor: selectedContentType === type 
                    ? (mode === 'dark' ? 'white' : 'black')
                    : 'transparent',
                  color: selectedContentType === type
                    ? (mode === 'dark' ? 'black' : 'white')
                    : 'inherit',
                  '&:hover': {
                    backgroundColor: selectedContentType === type
                      ? (mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)')
                      : (mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ position: 'relative', mt: 2 }}>
          <IconButton
            onClick={() => setCurrentTemplateIndex(prev => 
              prev > 0 ? prev - 1 : currentScripts.length - 1
            )}
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            <ArrowBackIcon style={{ width: 20, height: 20 }} />
          </IconButton>

          <IconButton
            onClick={() => setCurrentTemplateIndex(prev => 
              prev < currentScripts.length - 1 ? prev + 1 : 0
            )}
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            <ArrowForwardIcon style={{ width: 20, height: 20 }} />
          </IconButton>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: BORDER_RADIUS.md,
              backgroundColor: mode === 'dark' ? 'background.paper' : 'white',
              border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              minHeight: '200px',
              position: 'relative'
            }}
          >
            {currentScripts.length > 0 && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Script {currentScripts[currentTemplateIndex].scriptNumber}
                    </Typography>
                    {currentScripts[currentTemplateIndex].subject && (
                      <Typography variant="caption" color="text.secondary">
                        {currentScripts[currentTemplateIndex].subject}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {currentTemplateIndex + 1} of {currentScripts.length}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    maxHeight: '400px',
                    overflow: 'auto'
                  }}
                >
                  {currentScripts[currentTemplateIndex].content}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  mt: 2,
                  pt: 2,
                  borderTop: 1,
                  borderColor: 'divider'
                }}>
                  <Button
                    variant="contained"
                    startIcon={<ContentCopyIcon style={{ width: 16, height: 16 }} />}
                    onClick={() => {
                      navigator.clipboard.writeText(currentScripts[currentTemplateIndex].content);
                      setShowCopySuccess(true);
                      setTimeout(() => setShowCopySuccess(false), 2000);
                    }}
                    size="small"
                    sx={{
                      borderRadius: BORDER_RADIUS.md,
                      bgcolor: mode === 'dark' ? 'white' : 'black',
                      color: mode === 'dark' ? 'black' : 'white',
                      '&:hover': {
                        bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                      }
                    }}
                  >
                    {showCopySuccess ? 'Copied!' : 'Copy Template'}
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Box>
      </Box>
    );
  };

  // Modify the campaign content display section
  const renderCampaignContent = (campaign: Campaign) => {
    const currentContent = campaign.allContents.find(content => content.type === selectedContentType);
    
    return (
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          p: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)'
        }}>
          <Tabs
            value={selectedContentType}
            onChange={(_, newValue) => setSelectedContentType(newValue)}
            sx={{
              '& .MuiTab-root': {
                minWidth: 120,
                textTransform: 'none',
                fontSize: '0.9rem',
                fontWeight: 'medium'
              }
            }}
          >
            {campaign.allContents.map(content => (
              <Tab
                key={content.type}
                value={content.type}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {content.type === 'email' ? <EmailIcon style={{ width: 20, height: 20 }} /> :
                     content.type === 'call' ? <PhoneIcon style={{ width: 20, height: 20 }} /> :
                     <VideocamIcon style={{ width: 20, height: 20 }} />}
                    {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>
        
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto',
          p: 3,
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'
        }}>
          {currentContent ? (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: BORDER_RADIUS.md,
                backgroundColor: mode === 'dark' ? 'background.paper' : 'white',
                border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                minHeight: '100%',
                boxShadow: mode === 'dark' ? 
                  '0 4px 20px rgba(0, 0, 0, 0.25)' : 
                  '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'
                }}
              >
                {currentContent.content}
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%'
            }}>
              <Typography variant="body1" color="text.secondary" align="center">
                No content available for {selectedContentType} type
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  // Separate the campaign content display from the template slider
  const renderCampaignDetail = (campaign: Campaign) => (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Campaign header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: 1, 
        borderColor: 'divider',
        backgroundColor: mode === 'dark' ? 'background.paper' : 'white'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
              {campaign.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {campaign.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {campaign.allContents.map(content => (
                <TypeBadge 
                  key={content.type}
                  type={content.type} 
                  label={content.type.toUpperCase()} 
                  size="medium" 
                />
              ))}
              <Chip
                label={campaign.solution}
                sx={{
                  backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
              {campaign.aiGenerated && (
                <Chip
                  icon={<SmartToyIcon style={{ width: 16, height: 16 }} />}
                  label="AI Generated"
                  sx={{
                    backgroundColor: mode === 'dark' ? 'rgba(138, 43, 226, 0.2)' : 'rgba(138, 43, 226, 0.1)',
                    color: '#8a2be2',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              sx={{
                borderRadius: BORDER_RADIUS.md,
                transition: TRANSITIONS.medium,
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <ShareIcon style={{ width: 20, height: 20 }} />
            </IconButton>
            <IconButton
              sx={{
                borderRadius: BORDER_RADIUS.md,
                transition: TRANSITIONS.medium,
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <FavoriteIcon style={{ width: 20, height: 20 }} />
            </IconButton>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                borderRadius: BORDER_RADIUS.md,
                transition: TRANSITIONS.medium,
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <MoreVertIcon style={{ width: 20, height: 20 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Template Slider */}
      {renderTemplateSlider()}

      {/* Campaign content */}
      <Box sx={{ 
        flexGrow: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {renderCampaignContent(campaign)}
      </Box>
    </Box>
  );

  // Update the filtering logic
  const filterCampaigns = (campaigns: Campaign[]): Campaign[] => {
    return campaigns.filter(campaign => {
      // Filter by search query
      const matchesSearch = searchQuery === '' ||
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.clientGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.solution.toLowerCase().includes(searchQuery.toLowerCase());

      // Get all scripts for this campaign
      const allScripts = parseAllScriptsFromCampaign(campaign);
      
      // Filter by tab value and script presence
      const matchesTab = (() => {
        switch (tabValue) {
          case 0: // All Campaigns
            return true;
          case 1: // Email Templates
            return filterState.hasScripts 
              ? allScripts.some(script => script.type === 'email')
              : campaign.allContents.some(content => content.type === 'email');
          case 2: // Call Scripts
            return filterState.hasScripts 
              ? allScripts.some(script => script.type === 'call')
              : campaign.allContents.some(content => content.type === 'call');
          case 3: // Meeting Points
            return filterState.hasScripts 
              ? allScripts.some(script => script.type === 'meeting')
              : campaign.allContents.some(content => content.type === 'meeting');
          default:
            return true;
        }
      })();

      // Filter by script presence if needed
      const matchesScriptFilter = !filterState.hasScripts || allScripts.length > 0;

      return matchesSearch && matchesTab && matchesScriptFilter;
    });
  };

  // Update the filter menu
  const renderFilterMenu = () => (
    <Menu
      anchorEl={filterAnchorEl}
      open={Boolean(filterAnchorEl)}
      onClose={handleFilterClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: '200px',
          boxShadow: mode === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.5)' : '0 4px 20px rgba(0, 0, 0, 0.15)',
          borderRadius: BORDER_RADIUS.md,
        }
      }}
    >
      <MenuItem>
        <FormControlLabel
          control={
            <Switch
              checked={filterState.hasScripts}
              onChange={(e) => setFilterState(prev => ({
                ...prev,
                hasScripts: e.target.checked
              }))}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: mode === 'dark' ? 'white' : 'black',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: mode === 'dark' ? 'white' : 'black',
                }
              }}
            />
          }
          label="Has Scripts"
        />
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => {
        setFilterState(prev => ({ ...prev, type: 'all' }));
        handleFilterClose();
      }}>
        <ListItemText primary="All Types" />
      </MenuItem>
      <MenuItem onClick={() => {
        setFilterState(prev => ({ ...prev, type: 'email' }));
        handleFilterClose();
      }}>
        <ListItemIcon>
          <EmailIcon style={{ width: 20, height: 20 }} />
        </ListItemIcon>
        <ListItemText primary="Email Templates" />
      </MenuItem>
      <MenuItem onClick={() => {
        setFilterState(prev => ({ ...prev, type: 'call' }));
        handleFilterClose();
      }}>
        <ListItemIcon>
          <PhoneIcon style={{ width: 20, height: 20 }} />
        </ListItemIcon>
        <ListItemText primary="Call Scripts" />
      </MenuItem>
      <MenuItem onClick={() => {
        setFilterState(prev => ({ ...prev, type: 'meeting' }));
        handleFilterClose();
      }}>
        <ListItemIcon>
          <VideocamIcon style={{ width: 20, height: 20 }} />
        </ListItemIcon>
        <ListItemText primary="Meeting Points" />
      </MenuItem>
    </Menu>
  );

  // Update the campaign list section
  const renderCampaignList = () => {
    const filteredCampaigns = filterCampaigns(campaigns);
    
    return (
      <List sx={{ overflow: 'auto', flexGrow: 1, p: 0 }}>
        {filteredCampaigns.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {searchQuery 
                ? 'No campaigns match your search criteria'
                : filterState.hasScripts 
                  ? 'No campaigns with scripts found'
                  : 'No campaigns found'}
            </Typography>
          </Box>
        ) : (
          filteredCampaigns.map(campaign => {
            const campaignScripts = parseAllScriptsFromCampaign(campaign);
            return (
              <ListItemStyled
                key={campaign.id}
                selected={selectedCampaignId === campaign.id}
                onClick={() => handleCampaignSelect(campaign.id)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ maxWidth: '200px' }}>
                        {campaign.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {campaignScripts.length > 0 && (
                          <Chip
                            size="small"
                            label={`${campaignScripts.length} Scripts`}
                            sx={{
                              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                              fontSize: '0.7rem'
                            }}
                          />
                        )}
                        <Typography variant="caption" color="text.secondary">
                          {new Date(campaign.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </Typography>
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 0.5 }}>
                        {campaign.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {campaign.allContents.map(content => (
                          <TypeBadge 
                            key={content.type}
                            type={content.type} 
                            label={campaignScripts.filter(s => s.type === content.type).length > 0 
                              ? `${content.type.toUpperCase()} (${campaignScripts.filter(s => s.type === content.type).length})`
                              : content.type.toUpperCase()} 
                          />
                        ))}
                      </Box>
                    </Box>
                  }
                />
              </ListItemStyled>
            );
          })
        )}
      </List>
    );
  };

  // Render loading state
  if (isLoading) {
    return (
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}>
        <Typography variant="h6" color="text.secondary">
          Loading campaigns...
        </Typography>
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        gap: 2
      }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{
            borderRadius: BORDER_RADIUS.md,
            bgcolor: mode === 'dark' ? 'white' : 'black',
            color: mode === 'dark' ? 'black' : 'white',
            '&:hover': {
              bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
            }
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      backgroundColor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      p: 3
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            Campaigns
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse and manage your campaigns and templates
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
            New Campaign
          </Button>
          <Button
            variant="outlined"
            startIcon={<SmartToyIcon size={20} />}
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
            AI Suggestions
          </Button>
        </Box>
      </Box>

      {/* White Container */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: '8px',
          backgroundColor: 'background.paper',
          boxShadow: mode === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.25)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Tabs */}
        <Box sx={{ px: 3, pt: 2 }}>
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
            <Tab label="All Campaigns" />
            <Tab label="Email Templates" />
            <Tab label="Call Scripts" />
            <Tab label="Meeting Points" />
            <Tab label="Proposals" />
          </Tabs>
        </Box>

        {/* Main content */}
        <Box sx={{
          display: 'flex',
          flexGrow: 1,
          overflow: 'hidden',
          borderTop: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`
        }}>
        {/* List of campaigns */}
        <Box sx={{
          width: '350px',
          borderRight: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          {/* Search and filter */}
          <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
            <TextField
              placeholder="Search campaigns..."
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
              onClick={handleFilterClick}
              sx={{
                borderRadius: BORDER_RADIUS.md,
                backgroundColor: filterState.hasScripts || filterState.type !== 'all'
                  ? (mode === 'dark' ? 'white' : 'black')
                  : (mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'),
                color: filterState.hasScripts || filterState.type !== 'all'
                  ? (mode === 'dark' ? 'black' : 'white')
                  : 'inherit',
                transition: TRANSITIONS.medium,
                padding: '8px',
                '&:hover': {
                  backgroundColor: filterState.hasScripts || filterState.type !== 'all'
                    ? (mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)')
                    : (mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'),
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <FilterListIcon size={20} />
            </IconButton>
          </Box>

          {/* Render the filter menu */}
          {renderFilterMenu()}

          {/* List of campaigns */}
          {renderCampaignList()}
        </Box>

        {/* Campaign detail */}
        <Box sx={{
          flexGrow: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {selectedCampaign ? (
            // Show actual campaign content when viewing a campaign
            renderCampaignDetail(selectedCampaign)
          ) : openCreateDialog ? (
            // Show email templates only when creating a new campaign
            renderTemplateSlider()
          ) : (
            // Show empty state
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', p: 3 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No campaign selected
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ maxWidth: '400px' }}>
                Choose a campaign from the list to view its details or create a new one using the button above.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      </Paper>

      {/* Create Campaign Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        title="Create New Campaign"
        maxWidth="md"
        actions={
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={handleCloseCreateDialog}
              sx={{
                borderRadius: BORDER_RADIUS.md,
                borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                color: mode === 'dark' ? 'white' : 'black',
                borderWidth: '1.5px',
                '&:hover': {
                  borderColor: mode === 'dark' ? 'white' : 'black',
                  borderWidth: '1.5px',
                }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: BORDER_RADIUS.md,
                bgcolor: mode === 'dark' ? 'white' : 'black',
                color: mode === 'dark' ? 'black' : 'white',
                '&:hover': {
                  bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                }
              }}
            >
              Create
            </Button>
          </Box>
        }
      >
        {/* Show email templates in the create dialog */}
        {renderTemplateSlider()}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Campaign Title"
            fullWidth
            variant="outlined"
            placeholder="Enter campaign title"
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
            label="Description"
            fullWidth
            variant="outlined"
            placeholder="Enter campaign description"
            multiline
            rows={2}
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
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Client Group"
              fullWidth
              variant="outlined"
              placeholder="e.g., Enterprise, SMB"
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
              label="Solution"
              fullWidth
              variant="outlined"
              placeholder="e.g., Cloud Infrastructure"
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
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={true}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: mode === 'dark' ? 'white' : 'black',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: mode === 'dark' ? 'white' : 'black',
                    }
                  }}
                />
              }
              label="AI Generated"
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Campaign Type:</Typography>
              <Chip
                label="Email"
                clickable
                sx={{
                  backgroundColor: '#3498db20',
                  color: '#3498db',
                  borderRadius: BORDER_RADIUS.pill,
                  fontWeight: 'bold',
                  mr: 1
                }}
              />
              <Chip
                label="Call"
                clickable
                sx={{
                  backgroundColor: '#2ecc7120',
                  color: '#2ecc71',
                  borderRadius: BORDER_RADIUS.pill,
                  fontWeight: 'bold',
                  mr: 1
                }}
              />
              <Chip
                label="Meeting"
                clickable
                sx={{
                  backgroundColor: '#f39c1220',
                  color: '#f39c12',
                  borderRadius: BORDER_RADIUS.pill,
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </Box>
          
          <TextField
            label="Content"
            fullWidth
            variant="outlined"
            placeholder="Enter campaign content"
            multiline
            rows={10}
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
        </Box>
      </Dialog>
    </Box>
  );
};

export default StaticCampaignsNew;