import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Chip, Avatar, Divider, Menu, MenuItem, ButtonGroup } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AnalyticsIcon from '@mui/icons-material/Analytics';

// Define a simple interface for account data
interface Account {
  id: string;
  account_name: string;
  tag?: string;
  description?: string;
  organisation_type?: string;
}

// Sample accounts data with organization types
const sampleAccounts: Account[] = [
  {
    id: '1',
    account_name: 'Acme Corporation',
    organisation_type: 'Technology',
    tag: 'Tech'
  },
  {
    id: '2',
    account_name: 'Global Industries',
    organisation_type: 'Manufacturing',
    tag: 'Finance'
  },
  {
    id: '3',
    account_name: 'Tech Innovators',
    organisation_type: 'Technology',
    tag: 'Tech'
  },
  {
    id: '4',
    account_name: 'Financial Solutions',
    organisation_type: 'Finance',
    tag: 'Finance'
  },
  {
    id: '5',
    account_name: 'Healthcare Plus',
    organisation_type: 'Healthcare',
    tag: 'Risk'
  },
  {
    id: '6',
    account_name: 'Retail Experts',
    organisation_type: 'Retail',
    tag: 'Tech'
  },
  {
    id: '7',
    account_name: 'Media Group',
    organisation_type: 'Media',
    tag: 'Finance'
  },
  {
    id: '8',
    account_name: 'Construction Partners',
    organisation_type: 'Construction',
    tag: 'Risk'
  }
];

// Sample data
const mockSolutions = [
  {
    title: 'Regulatory Compliance Solution',
    description: 'A comprehensive solution to help manage regulatory compliance across multiple jurisdictions.',
    tag: 'Risk'
  },
  {
    title: 'Market Intelligence Platform',
    description: 'Real-time market data and competitive intelligence to inform strategic decisions.',
    tag: 'Finance'
  },
  {
    title: 'Digital Transformation Suite',
    description: 'End-to-end digital transformation tools to modernize operations and enhance customer experience.',
    tag: 'Tech'
  }
];

const AccountsWithAnalyse: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<number | null>(null);
  const [selectedOrgType, setSelectedOrgType] = useState<string>('All');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Get unique organization types from sample accounts
  const orgTypes = ['All', ...Array.from(new Set(sampleAccounts.map(account => account.organisation_type || ''))).filter(type => type !== '')];

  // Handle opening the dropdown menu
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle selecting an organization type
  const handleOrgTypeSelect = (orgType: string) => {
    setSelectedOrgType(orgType);
    handleClose();
    // Here you would add the logic to filter or process based on the selected organization type
    console.log(`Selected organization type: ${orgType}`);
  };

  const renderAccountDetails = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6">Account Details</Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          Currently analyzing: <strong>{selectedOrgType}</strong>
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Accounts Dashboard</Typography>
      
      {/* Add the Analyse button at the top of the page, before the Paper component */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <ButtonGroup variant="contained" aria-label="analyse button group" color="primary">
          <Button
            startIcon={<AnalyticsIcon />}
            sx={{ 
              textTransform: 'none',
              borderRadius: '4px 0 0 4px',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
            onClick={() => handleOrgTypeSelect('All')}
          >
            Analyse
          </Button>
          <Button
            size="small"
            aria-controls={open ? 'analyse-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ 
              borderRadius: '0 4px 4px 0',
              padding: '4px 8px',
            }}
          >
            <KeyboardArrowDownIcon />
          </Button>
        </ButtonGroup>
        <Menu
          id="analyse-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'analyse-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {orgTypes.map((orgType) => (
            <MenuItem 
              key={orgType} 
              onClick={() => handleOrgTypeSelect(orgType)}
              selected={selectedOrgType === orgType}
            >
              {orgType}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      
      <Paper elevation={0} sx={{ borderRadius: 2, p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Suggested Solutions to Pitch
          </Typography>
        </Box>

        {/* Display a message when no solutions are available for the selected organization type */}
        {mockSolutions
          .filter(solution => selectedOrgType === 'All' || 
            sampleAccounts.some(account => 
              account.organisation_type === selectedOrgType && account.tag === solution.tag
            )
          ).length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No solutions available for {selectedOrgType} organization type.
              </Typography>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => handleOrgTypeSelect('All')}
                sx={{ mt: 2, textTransform: 'none' }}
              >
                View All Solutions
              </Button>
            </Box>
          ) : (
            mockSolutions
              .filter(solution => selectedOrgType === 'All' || 
                sampleAccounts.some(account => 
                  account.organisation_type === selectedOrgType && account.tag === solution.tag
                )
              )
              .map((solution, index) => (
                <Paper 
                  key={index} 
                  elevation={0}
                  sx={{ 
                    mb: 2, 
                    p: 3, 
                    borderRadius: 2, 
                    border: '1px solid #eee',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      borderColor: '#ddd'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Solution Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Box 
                        component="span" 
                        sx={{ 
                          display: 'inline-block',
                          width: 12,
                          height: 12,
                          bgcolor: solution.tag === 'Risk' ? '#B91C1C' : solution.tag === 'Finance' ? '#0C4A6E' : '#047857',
                          borderRadius: '50%',
                          mr: 1.5
                        }} 
                      />
                      <Typography variant="subtitle1" fontWeight={600}>
                        {solution.title}
                      </Typography>
                    </Box>
                    
                    {/* Solution Description with structured format */}
                    <Box sx={{ ml: 3.5, mb: 2 }}>
                      <Typography 
                        variant="body2" 
                        color="text.primary"
                        sx={{ 
                          mb: 1.5,
                          lineHeight: 1.6
                        }}
                      >
                        {solution.description}
                      </Typography>
                      
                      {/* Key Benefits Section */}
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                        Key Benefits:
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mt: 0, mb: 1.5 }}>
                        <Box component="li" sx={{ mb: 0.5 }}>
                          <Typography variant="body2">
                            {solution.tag === 'Risk' ? 
                              'Reduces compliance risks by up to 45%' : 
                              solution.tag === 'Finance' ? 
                              'Increases operational efficiency by 30%' : 
                              'Accelerates digital initiatives by 40%'}
                          </Typography>
                        </Box>
                        <Box component="li" sx={{ mb: 0.5 }}>
                          <Typography variant="body2">
                            {solution.tag === 'Risk' ? 
                              'Automated regulatory updates across multiple jurisdictions' : 
                              solution.tag === 'Finance' ? 
                              'Real-time data visualization and competitive insights' : 
                              'Seamless integration with existing systems and workflows'}
                          </Typography>
                        </Box>
                        <Box component="li" sx={{ mb: 0.5 }}>
                          <Typography variant="body2">
                            {solution.tag === 'Risk' ? 
                              'Customizable risk assessment framework' : 
                              solution.tag === 'Finance' ? 
                              'Predictive analytics for market trends' : 
                              'Enhanced customer experience through digital channels'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    {/* Footer with tag and action button */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Chip 
                        label={solution.tag} 
                        size="small"
                        sx={{ 
                          height: 24, 
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          bgcolor: solution.tag === 'Risk' ? 'rgba(185, 28, 28, 0.1)' : solution.tag === 'Finance' ? 'rgba(12, 74, 110, 0.1)' : 'rgba(4, 120, 87, 0.1)',
                          color: solution.tag === 'Risk' ? '#B91C1C' : solution.tag === 'Finance' ? '#0C4A6E' : '#047857',
                          px: 1
                        }} 
                      />
                      <Button 
                        variant="outlined" 
                        size="small"
                        startIcon={<VisibilityIcon fontSize="small" />}
                        sx={{ 
                          textTransform: 'none',
                          borderRadius: '4px',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          borderColor: solution.tag === 'Risk' ? '#B91C1C' : solution.tag === 'Finance' ? '#0C4A6E' : '#047857',
                          color: solution.tag === 'Risk' ? '#B91C1C' : solution.tag === 'Finance' ? '#0C4A6E' : '#047857',
                          '&:hover': {
                            borderColor: solution.tag === 'Risk' ? '#B91C1C' : solution.tag === 'Finance' ? '#0C4A6E' : '#047857',
                            backgroundColor: solution.tag === 'Risk' ? 'rgba(185, 28, 28, 0.04)' : solution.tag === 'Finance' ? 'rgba(12, 74, 110, 0.04)' : 'rgba(4, 120, 87, 0.04)'
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              ))
          )
        }
      </Paper>

      {renderAccountDetails()}
    </Box>
  );
};

export default AccountsWithAnalyse;