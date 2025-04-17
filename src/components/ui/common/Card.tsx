// @ts-nocheck
import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps, styled } from '@mui/material';
import { BORDER_RADIUS, TRANSITIONS, SHADOWS } from './constants';

type CustomElevation = 'none' | 'sm' | 'md' | 'lg';

// Extended card props
export interface CardProps extends Omit<MuiCardProps, 'elevation'> {
  rounded?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  elevation?: CustomElevation;
  hoverable?: boolean;
  interactive?: boolean;
}

// Helper to convert our custom elevation to MUI's numeric elevation
const getNumericElevation = (elevation?: CustomElevation): number => {
  if (!elevation || elevation === 'none') return 0;
  switch (elevation) {
    case 'sm': return 1;
    case 'md': return 3;
    case 'lg': return 6;
    default: return 1;
  }
};

// Styled card component
const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => 
    !['rounded', 'hoverable', 'interactive', 'elevation'].includes(prop as string),
})<CardProps & { numericElevation?: number }>(({ 
  theme, 
  rounded = 'md', 
  elevation = 'sm',
  hoverable = false,
  interactive = false,
}) => {
  const mode = theme.palette.mode;
  
  // Determine border radius
  let borderRadius;
  switch (rounded) {
    case 'xs': borderRadius = BORDER_RADIUS.xs; break;
    case 'sm': borderRadius = BORDER_RADIUS.sm; break;
    case 'md': borderRadius = BORDER_RADIUS.md; break;
    case 'lg': borderRadius = BORDER_RADIUS.lg; break;
    case 'xl': borderRadius = BORDER_RADIUS.xl; break;
    default: borderRadius = BORDER_RADIUS.md;
  }
  
  // Determine shadow
  let boxShadow = 'none';
  if (elevation !== 'none') {
    switch (elevation) {
      case 'sm': boxShadow = mode === 'dark' ? SHADOWS.sm.dark : SHADOWS.sm.light; break;
      case 'md': boxShadow = mode === 'dark' ? SHADOWS.md.dark : SHADOWS.md.light; break;
      case 'lg': boxShadow = mode === 'dark' ? SHADOWS.lg.dark : SHADOWS.lg.light; break;
      default: boxShadow = mode === 'dark' ? SHADOWS.sm.dark : SHADOWS.sm.light;
    }
  }
  
  return {
    borderRadius,
    boxShadow,
    transition: TRANSITIONS.medium,
    overflow: 'hidden',
    backgroundImage: 'none',
    
    ...(hoverable && {
      '&:hover': {
        boxShadow: mode === 'dark' ? SHADOWS.hover.dark : SHADOWS.hover.light,
        transform: 'translateY(-2px)',
      },
    }),
    
    ...(interactive && {
      cursor: 'pointer',
      '&:hover': {
        boxShadow: mode === 'dark' ? SHADOWS.hover.dark : SHADOWS.hover.light,
        transform: 'translateY(-2px)',
        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
    }),
  };
});

// Card component with enhanced props
export const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { elevation, ...otherProps } = props;
  const numericElevation = getNumericElevation(elevation);
  
  return (
    <StyledCard
      ref={ref}
      {...otherProps}
      elevation={numericElevation as any}
    />
  );
});

export default Card;