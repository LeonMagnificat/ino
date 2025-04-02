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

const NotificationsContainer = styled(Box)({
  width: '350px',
  position: 'fixed',
  top: '0',
  right: '0',
  height: '100vh',
  backgroundColor: '#fff',
  boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
  zIndex: 1300,
  transform: 'translateX(100%)',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&.open': {
    transform: 'translateX(0)',
  },
});

const NotificationHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  borderBottom: '1px solid #e0e0e0',
  backgroundColor: theme.palette.background.paper,
  position: 'sticky',
  top: 0,
  zIndex: 10,
}));

const NotificationItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  cursor: 'pointer',
  borderLeft: '3px solid transparent',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(26, 115, 232, 0.04)',
    borderLeft: `3px solid #1a73e8`,
    transform: 'translateX(2px)',
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
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
  },
}));

const DismissButton = styled(IconButton)(({ theme }) => ({
  padding: 4,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    transform: 'rotate(90deg)',
  },
}));

const ContentCollapse = styled(Box)<{ expanded: boolean }>(({ expanded }) => ({
  maxHeight: expanded ? '500px' : '20px',
  overflow: 'hidden',
  transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const NewBadge = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#1a73e8',
  position: 'absolute',
  top: '50%',
  left: '-12px',
  transform: 'translateY(-50%)',
}));

interface NotificationItemData {
  id: number;
  title: string;
  content: string;
  timeAgo: string;
  logoSrc: string;
  expanded: boolean;
  isNew?: boolean;
  isExiting?: boolean;
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
      isNew: true,
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
      isNew: true,
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
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, isExiting: true } 
        : notification
    ));
    
    setTimeout(() => {
      setNotifications(notifications.filter((notification) => notification.id !== id));
    }, 300);
  };

  return (
    <NotificationsContainer>
      <NotificationHeader>
        <IconButton size="small" sx={{ 
          transition: 'all 0.2s ease-in-out',
          '&:hover': { transform: 'translateX(-2px)' } 
        }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 2, fontWeight: 700 }}>
          Notifications <Box component="span" sx={{ color: '#1a73e8', fontWeight: 900 }}>(23)</Box>
        </Typography>
      </NotificationHeader>

      <List disablePadding sx={{ overflow: 'auto', height: 'calc(100vh - 60px)' }}>
        {notifications.map((notification) => (
          <React.Fragment key={notification.id}>
            <NotificationItem 
              onClick={() => toggleExpand(notification.id)}
              sx={{
                position: 'relative',
                opacity: notification.isExiting ? 0 : 1,
                height: notification.isExiting ? 0 : 'auto',
                padding: notification.isExiting ? '0 24px' : undefined,
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {notification.isNew && <NewBadge />}
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                    {notification.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mr: 1, fontWeight: 500 }}>
                      {notification.timeAgo}
                    </Typography>
                    <DismissButton size="small" onClick={(e) => dismissNotification(notification.id, e)}>
                      <CloseIcon fontSize="small" />
                    </DismissButton>
                  </Box>
                </Box>
                <ContentCollapse expanded={notification.expanded}>
                  <Typography variant="body2" color="text.secondary" noWrap={!notification.expanded}>
                    {notification.content}
                  </Typography>
                </ContentCollapse>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  {notification.expanded ? (
                    <IconButton size="small" sx={{ ml: -1, p: 0.5, color: '#1a73e8' }}>
                      <ExpandLessIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton size="small" sx={{ ml: -1, p: 0.5, color: 'text.secondary' }}>
                      <ExpandMoreIcon fontSize="small" />
                    </IconButton>
                  )}
                  <Typography 
                    variant="caption" 
                    color="primary" 
                    sx={{ 
                      ml: 1, 
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    {notification.expanded ? 'Show less' : 'Read more'}
                  </Typography>
                </Box>
              </Box>
              <CompanyLogo>
                <img src={notification.logoSrc} alt={notification.title} width="30" height="30" />
              </CompanyLogo>
            </NotificationItem>
            <Divider variant="inset" component="li" sx={{ ml: 3, mr: 3 }} />
          </React.Fragment>
        ))}
      </List>
    </NotificationsContainer>
  );
};

export default Notifications; 