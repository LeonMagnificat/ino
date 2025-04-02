import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  ButtonGroup,
  Chip,
  styled,
  useTheme,
} from '@mui/material';
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
  backgroundColor: '#f5f5f5',
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
  backgroundColor: '#fff',
  borderRadius: '50px',
  padding: theme.spacing(0.5, 2),
  width: '300px',
  border: '1px solid #e0e0e0',
}));

const FilterButton = styled(Button)<{ active: boolean }>(({ theme, active }) => ({
  backgroundColor: active ? '#000' : 'transparent',
  color: active ? '#fff' : '#000',
  borderRadius: '20px',
  padding: theme.spacing(0.5, 3),
  textTransform: 'none',
  '&:hover': {
    backgroundColor: active ? '#000' : 'rgba(0, 0, 0, 0.04)',
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
  color: '#888',
  cursor: 'pointer',
  '&:hover': {
    color: '#000',
  },
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  marginBottom: theme.spacing(4),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
}));

const AnalysisContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  marginBottom: theme.spacing(2),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
}));

const SuggestionChip = styled(Chip)(({ theme }) => ({
  borderRadius: '20px',
  backgroundColor: '#f0f0f0',
  margin: theme.spacing(0, 1, 1, 0),
}));

const Dashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'below' | 'above'>('all');
  const theme = useTheme();

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
          'rgba(200, 200, 200, 0.7)',
          'rgba(200, 200, 200, 0.7)',
          'rgba(200, 200, 200, 0.7)',
          'rgba(200, 200, 200, 0.7)',
          'rgba(0, 0, 0, 0.9)',
          'rgba(200, 200, 200, 0.7)',
          'rgba(200, 200, 200, 0.7)',
        ],
        borderRadius: 10,
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
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <DashboardContainer>
      <Header>
        <Typography variant="h5">
          Eyo Zee, Waguani!
        </Typography>
        <SearchBar>
          <SearchIcon sx={{ color: '#888', mr: 1 }} />
          <input
            type="text"
            placeholder="Search"
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              backgroundColor: 'transparent',
            }}
          />
        </SearchBar>
      </Header>

      <Typography variant="h4" fontWeight={600} mb={3}>
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
        <Typography variant="h6" fontWeight={500}>
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
            }}
          >
            <Box
              sx={{
                backgroundColor: '#000',
                borderRadius: '20px',
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
                  color: '#000',
                  fontWeight: 'bold',
                  mb: 1,
                }}
              />
            </Box>
          </Box>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </ChartContainer>

      <SectionHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={500} mr={2}>
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
          savings each month for better financial growth. Monitor your income regularly to stay on track and allocate a
          portion to savings each month for better financial growth. Monitor your income regularly to stay on track and
          allocate a portion to savings each month for better financial growth. Monitor your income regularly to stay on
          track and allocate a portion to savings each month for better financial growth.
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