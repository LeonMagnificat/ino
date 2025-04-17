import React, { useState, useEffect } from 'react';
import * as FallbackIcons from './FallbackIcons';

// Define the props for the IconLoader component
interface IconLoaderProps {
  iconName: keyof typeof FallbackIcons;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
  animationVariant?: 'pulse' | 'bounce' | 'spin';
}

// This component will try to load the animated icon, but fall back to the non-animated version
const IconLoader: React.FC<IconLoaderProps> = ({
  iconName,
  ...props
}) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useAnimated, _setUseAnimated] = useState(false);
  const [_error, setError] = useState(false);

  useEffect(() => {
    const loadIconModule = async () => {
      try {
        const animatedModule = await import('./LucideIcons');
        
        // Check if the icon exists in the imported module using a type-safe approach
        if (animatedModule && Object.prototype.hasOwnProperty.call(animatedModule, iconName)) {
          setIconComponent(() => (animatedModule as any)[iconName]);
          setIsLoading(false);
        } else {
          // Fallback to the static/fallback version
          const fallbackModule = await import('./FallbackIcons');
          if (Object.prototype.hasOwnProperty.call(fallbackModule, iconName)) {
            setIconComponent(() => (fallbackModule as any)[iconName]);
          } else {
            console.warn(`Icon ${iconName} not found. Using default icon.`);
            setIconComponent(() => FallbackIcons[iconName]);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading icon:', error);
        setIsLoading(false);
        setError(true);
      }
    };

    loadIconModule();
  }, [iconName]);

  // While loading, show a placeholder or the fallback icon
  if (isLoading) {
    const FallbackIcon = FallbackIcons[iconName];
    return <FallbackIcon {...props} />;
  }

  // Once loaded, render the appropriate icon
  if (IconComponent) {
    return <IconComponent {...props} animate={useAnimated && props.animate} />;
  }

  // If something went wrong, render the fallback icon
  const FallbackIcon = FallbackIcons[iconName];
  return <FallbackIcon {...props} />;
};

export default IconLoader;