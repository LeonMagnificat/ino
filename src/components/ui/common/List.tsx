import React from 'react';
import { 
  List as MuiList, 
  ListProps as MuiListProps, 
  ListItem as MuiListItem, 
  ListItemProps as MuiListItemProps,
  styled 
} from '@mui/material';
import { BORDER_RADIUS, TRANSITIONS } from './constants';

// Extended list props
export interface ListProps extends MuiListProps {
  rounded?: 'xs' | 'sm' | 'md' | 'lg';
  spacing?: 'none' | 'xs' | 'sm' | 'md';
}

// Extended list item props
export interface ListItemProps extends MuiListItemProps {
  rounded?: 'xs' | 'sm' | 'md' | 'lg';
  selected?: boolean;
  hoverable?: boolean;
  interactive?: boolean;
  divider?: boolean;
}

// Styled list component
const StyledList = styled(MuiList, {
  shouldForwardProp: (prop) => 
    !['rounded', 'spacing'].includes(prop as string),
})<ListProps>(({ 
  rounded = 'md',
  spacing = 'none',
}) => {
  // Determine border radius
  let borderRadius;
  switch (rounded) {
    case 'xs': borderRadius = BORDER_RADIUS.xs; break;
    case 'sm': borderRadius = BORDER_RADIUS.sm; break;
    case 'md': borderRadius = BORDER_RADIUS.md; break;
    case 'lg': borderRadius = BORDER_RADIUS.lg; break;
    default: borderRadius = BORDER_RADIUS.md;
  }
  
  // Determine spacing
  let gap;
  switch (spacing) {
    case 'none': gap = 0; break;
    case 'xs': gap = 4; break;
    case 'sm': gap = 8; break;
    case 'md': gap = 16; break;
    default: gap = 0;
  }
  
  return {
    borderRadius,
    overflow: 'hidden',
    
    ...(spacing !== 'none' && {
      '& > .MuiListItem-root': {
        marginBottom: gap,
        '&:last-child': {
          marginBottom: 0,
        },
      },
    }),
  };
});

// Styled list item component
const StyledListItem = styled(MuiListItem, {
  shouldForwardProp: (prop) => 
    !['rounded', 'selected', 'hoverable', 'interactive', 'divider'].includes(prop as string),
})<ListItemProps>(({ 
  theme, 
  rounded = 'md',
  selected = false,
  hoverable = true,
  interactive = false,
  divider = false,
}) => {
  const mode = theme.palette.mode;
  
  // Determine border radius
  let borderRadius;
  switch (rounded) {
    case 'xs': borderRadius = BORDER_RADIUS.xs; break;
    case 'sm': borderRadius = BORDER_RADIUS.sm; break;
    case 'md': borderRadius = BORDER_RADIUS.md; break;
    case 'lg': borderRadius = BORDER_RADIUS.lg; break;
    default: borderRadius = BORDER_RADIUS.md;
  }
  
  return {
    borderRadius,
    transition: TRANSITIONS.medium,
    backgroundColor: selected
      ? mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
      : 'transparent',
    
    ...(divider && {
      borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}`,
      '&:last-child': {
        borderBottom: 'none',
      },
    }),
    
    ...(hoverable && {
      '&:hover': {
        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
      },
    }),
    
    ...(interactive && {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        transform: 'translateX(4px)',
      },
      '&:active': {
        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
      },
    }),
  };
});

// List component with enhanced props
export const List = React.forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  return <StyledList ref={ref} {...props} />;
});

// ListItem component with enhanced props
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  return <StyledListItem ref={ref} {...props} />;
});

export default { List, ListItem };