import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  styled,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const NotificationsContainer = styled(Paper)(({ theme }) => ({
  width: '450px',
  height: '100%',
  boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
  overflowY: 'auto',
  borderRight: '1px solid #e0e0e0',
}));

const NotificationHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  borderBottom: '1px solid #e0e0e0',
}));

const NotificationItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
}));

const NotificationContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 3, 2, 3),
}));

const CompanyLogo = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 'auto',
}));

interface NotificationItemData {
  id: number;
  title: string;
  content: string;
  timeAgo: string;
  logoSrc: string;
  expanded: boolean;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = React.useState<NotificationItemData[]>([
    {
      id: 1,
      title: 'Master Card',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      timeAgo: '10 mins ago',
      logoSrc: '/images/mastercard.png',
      expanded: false,
    },
    {
      id: 2,
      title: 'Twitter',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing.',
      timeAgo: '10 mins ago',
      logoSrc: '/images/twitter.png',
      expanded: false,
    },
    {
      id: 3,
      title: 'Apple',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing.',
      timeAgo: '10 mins ago',
      logoSrc: '/images/apple.png',
      expanded: false,
    },
    {
      id: 4,
      title: 'Star Bucks',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing.',
      timeAgo: '10 mins ago',
      logoSrc: '/images/starbucks.png',
      expanded: false,
    },
    {
      id: 5,
      title: 'Star Bucks',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing.',
      timeAgo: '10 mins ago',
      logoSrc: '/images/starbucks.png',
      expanded: false,
    },
  ]);

  const toggleExpand = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, expanded: !notification.expanded }
          : notification
      )
    );
  };

  const dismissNotification = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationsContainer>
      <NotificationHeader>
        <IconButton size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
          Notifications (23)
        </Typography>
      </NotificationHeader>

      <List disablePadding>
        {notifications.map((notification) => (
          <React.Fragment key={notification.id}>
            <NotificationItem onClick={() => toggleExpand(notification.id)}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {notification.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                      {notification.timeAgo}
                    </Typography>
                    <IconButton size="small" onClick={(e) => dismissNotification(notification.id, e)}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" noWrap={!notification.expanded}>
                  {notification.content}
                </Typography>
                {notification.expanded ? (
                  <IconButton size="small" sx={{ ml: -1, mt: 1 }}>
                    <ExpandLessIcon fontSize="small" />
                  </IconButton>
                ) : (
                  <IconButton size="small" sx={{ ml: -1, mt: 1 }}>
                    <ExpandMoreIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              <CompanyLogo>
                <img src={notification.logoSrc} alt={notification.title} width="30" height="30" />
              </CompanyLogo>
            </NotificationItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </NotificationsContainer>
  );
};

export default Notifications; 