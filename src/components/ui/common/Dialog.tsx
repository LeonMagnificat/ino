import React from 'react';
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  DialogContentText as MuiDialogContentText,
  Typography,
  IconButton,
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BORDER_RADIUS, TRANSITIONS } from './constants';

// Extended dialog props
export interface DialogProps extends MuiDialogProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
}

// Custom dialog title component props
export interface DialogTitleProps {
  id?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

// Styled dialog component
const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2, 3),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiPaper-root': {
    borderRadius: BORDER_RADIUS.md,
    transition: TRANSITIONS.medium,
    backgroundImage: 'none',
  },
}));

// Styled dialog title component
const StyledDialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Custom dialog title with close button
export const DialogTitle = ({ children, onClose, ...props }: DialogTitleProps) => {
  return (
    <StyledDialogTitle {...props}>
      <Typography variant="h6" component="div">
        {children}
      </Typography>
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{
            marginLeft: 2,
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </StyledDialogTitle>
  );
};

// Re-export styled MUI dialog components
export const Dialog = StyledDialog;
export const DialogContent = MuiDialogContent;
export const DialogActions = MuiDialogActions;
export const DialogContentText = MuiDialogContentText;

export default {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
};