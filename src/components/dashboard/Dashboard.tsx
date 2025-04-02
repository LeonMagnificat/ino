import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  ButtonGroup,
  Chip,
  styled,
  useTheme as useMuiTheme,
} from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardContainer = styled(Box)(({ theme }) => ({
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

const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '3px',
  padding: theme.spacing(0.5, 2),
  width: '300px',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : '#e0e0e0'}`,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark' ? '0 1px 4px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.05)',
    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : '#d0d0d0',
  },
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}30`,
  },
}));

const FilterButton = styled(Button)<{ active: boolean }>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.secondary.main : 'transparent',
  color: active ? theme.palette.secondary.contrastText : theme.palette.text.primary,
  borderRadius: '3px',
  padding: theme.spacing(0.5, 3),
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: active ? theme.palette.secondary.main : theme.palette.action.hover,
    transform: active ? 'none' : 'translateY(-1px)',
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ViewAllLink = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.dark,
    transform: 'translateX(2px)',
  },
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '3px',
  marginBottom: theme.spacing(4),
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.07)',
  transition: 'all 0.2s ease-in-out',
  overflow: 'hidden',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
}));

const AnalysisContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '3px',
  marginBottom: theme.spacing(2),
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.07)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
}));

const SuggestionChip = styled(Chip)(({ theme }) => ({
  borderRadius: '3px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0',
  margin: theme.spacing(0, 1, 1, 0),
  fontWeight: 600,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : '#e0e0e0',
    transform: 'scale(1.02)',
  },
}));

const Dashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'below' | 'above'>('all');
  const theme = useMuiTheme();
  const { mode } = useTheme();

  const handleFilterChange = (filter: 'all' | 'below' | 'above') => {
    setActiveFilter(filter);
  };

  // Chart data
  const chartData = {
    labels: ['Bank', 'Assets', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Value ($k)',
        data: [2.8, 1.2, 2.3, 1.5, 3.0, 2.0, 2.5],
        backgroundColor: [
          mode === 'dark' ? 'rgba(150, 150, 150, 0.7)' : 'rgba(200, 200, 200, 0.7)',
          mode === 'dark' ? 'rgba(150, 150, 150, 0.7)' : 'rgba(200, 200, 200, 0.7)',
          mode === 'dark' ? 'rgba(150, 150, 150, 0.7)' : 'rgba(200, 200, 200, 0.7)',
          mode === 'dark' ? 'rgba(150, 150, 150, 0.7)' : 'rgba(200, 200, 200, 0.7)',
          'rgba(26, 115, 232, 0.9)',
          mode === 'dark' ? 'rgba(150, 150, 150, 0.7)' : 'rgba(200, 200, 200, 0.7)',
          mode === 'dark' ? 'rgba(150, 150, 150, 0.7)' : 'rgba(200, 200, 200, 0.7)',
        ],
        borderRadius: 3,
        borderWidth: 0,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: mode === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: mode === 'dark' ? '#e0e0e0' : '#202124',
        bodyColor: mode === 'dark' ? '#a0a0a0' : '#5f6368',
        borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 3.5,
        ticks: {
          stepSize: 0.5,
          callback: function(value: any) {
            return value + 'k$';
          },
          color: mode === 'dark' ? '#a0a0a0' : '#5f6368',
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: mode === 'dark' ? '#a0a0a0' : '#5f6368',
        },
      },
    },
  };

  return (
    <DashboardContainer>
      <Header>
        <Typography variant="h5" fontWeight={600}>
          Eyo Zee, Waguani!
        </Typography>
        <SearchBar>
          <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
          <input
            type="text"
            placeholder="Search"
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              backgroundColor: 'transparent',
              fontFamily: "'Nunito', sans-serif",
              fontSize: '0.875rem',
              color: theme.palette.text.primary,
            }}
          />
        </SearchBar>
      </Header>

      <Typography 
        variant="h4" 
        fontWeight={800} 
        mb={3}
        sx={{ 
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: 40,
            height: 4,
            backgroundColor: '#1a73e8',
            borderRadius: 2,
          }
        }}
      >
        Accounts Overview
      </Typography>

      <Box mb={4}>
        <ButtonGroup variant="outlined" sx={{ mb: 3 }}>
          <FilterButton 
            active={activeFilter === 'all'} 
            onClick={() => handleFilterChange('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'below'} 
            onClick={() => handleFilterChange('below')}
          >
            Below 5K
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'above'} 
            onClick={() => handleFilterChange('above')}
          >
            Above 5K
          </FilterButton>
          <FilterButton 
            active={false}
          >
            0/no exit rate
          </FilterButton>
        </ButtonGroup>
      </Box>

      <SectionHeader>
        <Typography variant="h6" fontWeight={700}>
          Exit rate/Organization type
        </Typography>
        <ViewAllLink>
          <Typography variant="body2" mr={1}>View all</Typography>
          <ArrowForwardIcon fontSize="small" />
        </ViewAllLink>
      </SectionHeader>

      <ChartContainer>
        <Box sx={{ height: 300, position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translate(-50%, -50%) scale(1.05)',
              }
            }}
          >
            <Box
              sx={{
                backgroundColor: '#1a73e8',
                borderRadius: '3px',
                height: '200px',
                width: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <Chip
                label="+$32.45"
                sx={{
                  backgroundColor: '#fff',
                  color: '#1a73e8',
                  fontWeight: 'bold',
                  mb: 1,
                  borderRadius: '3px',
                }}
              />
            </Box>
          </Box>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </ChartContainer>

      <SectionHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700} mr={2}>
            Current Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary">
            10 mins ago
          </Typography>
        </Box>
      </SectionHeader>

      <AnalysisContainer>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          Monitor your income regularly to stay on track and allocate a portion to savings each month for better
          financial growth. Monitor your income regularly to stay on track and allocate a portion to savings each
          month for better financial growth. Monitor your income regularly to stay on track and allocate a portion to
          savings each month for better financial growth.
        </Typography>

        <Box mt={3}>
          <SuggestionChip label="Suggested campaigns" />
          <SuggestionChip label="Suggested campaigns" />
          <SuggestionChip label="Suggested campaigns" />
        </Box>
      </AnalysisContainer>
    </DashboardContainer>
  );
};

export default Dashboard; 