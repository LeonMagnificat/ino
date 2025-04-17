// This file contains global type definitions that help fix TypeScript errors

// For Chart.js easing functions
interface Window {
  Chart: {
    easing: {
      easeOutQuart: string;
      easeInOutQuart: string;
      easeInOutSine: string;
      easeInOutCubic: string;
      easeInOutExpo: string;
      // Add other easing functions as needed
    }
  }
}

// MUI Types for SelectChangeEvent compatibility
declare namespace React {
  interface ChangeEvent<T = Element> {
    target: T & EventTarget;
    currentTarget: T & EventTarget;
    nativeEvent: Event;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
  }
}

// Allow compatibility between MUI Select changes and regular input changes
type HandleChangeFunction = (
  event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | 
         import('@mui/material').SelectChangeEvent<string | number | string[]>,
  child?: React.ReactNode
) => void;

// Define common types used across the application
interface RevenueForecastData {
  month: string;
  value: number;
  growth?: number;
}

interface RevenueForecastSummary {
  totalPipeline: number;
  totalCommitted: number;
  growthRate: number;
  forecastData: RevenueForecastData[];
}

interface Account {
  id: string;
  account_number: string;
  account_name: string;
  organisation_type: string;
  status: 'active' | 'pending' | 'inactive';
  industry: string;
  location: string;
  website: string;
  employees: number | string;
  revenue: number | string;
  primary_contact: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
  notes: string;
  tags: string[];
  logo?: string;
  accountName?: string; // Alias for account_name for backward compatibility
  [key: string]: any; // Allow additional properties
}

// Allow any properties on data objects
interface AnyObject {
  [key: string]: any;
} 