import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define notification types
export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  timeAgo: string;
  logoSrc: string;
  expanded: boolean;
  isNew?: boolean;
  isExiting?: boolean;
  type: 'account' | 'system' | 'alert';
  severity: 'success' | 'error' | 'info' | 'warning';
  accountId?: string | null;
}

// Context interface
interface NotificationContextType {
  notifications: NotificationItem[];
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timeAgo' | 'expanded' | 'isNew' | 'isExiting'>) => void;
  dismissNotification: (id: string) => void;
  toggleExpand: (id: string) => void;
  markAllAsRead: () => void;
  clearAllNotifications: () => void;
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Generate a unique ID
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Calculate timeAgo from current time
  const getTimeAgo = () => {
    return 'just now';
  };

  // Add a new notification
  const addNotification = (notification: Omit<NotificationItem, 'id' | 'timeAgo' | 'expanded' | 'isNew' | 'isExiting'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: generateId(),
      timeAgo: getTimeAgo(),
      expanded: false,
      isNew: true,
      isExiting: false
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  // Dismiss a notification
  const dismissNotification = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, isExiting: true }
        : notification
    ));

    setTimeout(() => {
      setNotifications(notifications.filter((notification) => notification.id !== id));
    }, 300);
  };

  // Toggle expand state of a notification
  const toggleExpand = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, expanded: !notification.expanded, isNew: false }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isNew: false,
      }))
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        dismissNotification,
        toggleExpand,
        markAllAsRead,
        clearAllNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext; 