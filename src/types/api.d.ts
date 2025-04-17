// API response type definitions

// Generic API response type
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Account API responses
interface AccountsResponse {
  accounts?: Account[];
  message?: string;
  ready_insights?: string[];
  failed_insights?: string[];
  id?: string;
  [key: string]: any;
}

// Insights API response
interface InsightsResponse {
  id: string;
  account_id: string;
  action_plan: {
    recommendation: string;
    description: string;
  }[];
  latest_updates: string;
  challenges: string;
  decision_makers: string;
  market_position: string;
  competitors: string[];
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  updatedAt: string;
}

// Type guard functions
function isAccountsResponse(data: any): data is AccountsResponse {
  return data && (
    Array.isArray(data.accounts) ||
    Array.isArray(data.ready_insights) ||
    Array.isArray(data.failed_insights) ||
    typeof data.id === 'string'
  );
}

function isInsightsResponse(data: any): data is InsightsResponse {
  return data && 
    typeof data.account_id === 'string' &&
    Array.isArray(data.action_plan);
} 