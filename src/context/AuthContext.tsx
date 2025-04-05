import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  bio?: string;
  website?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<User>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = 'https://ino-by-sam-be-production.up.railway.app';

  // Initial fetch of stored user data
  useEffect(() => {
    const initializeAuth = async () => {
      // Check if user is already logged in (e.g., from localStorage)
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.warn('No authentication token found in localStorage');
      return {
        'Content-Type': 'application/json',
        'Authorization': '' // Empty string, but ensures the property exists
      };
    }
    
    console.log('Using token for authentication:', token.substring(0, 15) + '...');
    
    return {
      'Content-Type': 'application/json',
      'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
    };
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log("Login response:", data);

      // Save token
      if (data.token) {
        localStorage.setItem('token', data.token);
      } else {
        throw new Error('Authentication token is missing from the response');
      }

      try {
        // After login with token, we can now fetch the user profile
        const userProfile = await getProfile();
        
        // Store user in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userProfile));
        setUser(userProfile);
      } catch (profileError) {
        console.error('Failed to fetch profile after login:', profileError);
        
        // Create a basic user profile if we can't fetch from server
        const basicProfile: User = {
          id: data.id || '',
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: email,
        };
        
        localStorage.setItem('user', JSON.stringify(basicProfile));
        setUser(basicProfile);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      console.log("Signup response:", data);

      // Save token
      if (data.token) {
        localStorage.setItem('token', data.token);
      } else {
        console.warn('Registration successful but token is missing from the response');
      }

      // Create a user profile
      try {
        // If we have a token, try to fetch the profile
        if (localStorage.getItem('token')) {
          const userProfile = await getProfile();
          
          // Store user in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(userProfile));
          setUser(userProfile);
        } else {
          // Fallback to basic user object if there's no token
          const basicProfile: User = {
            id: data.id || '',
            firstName,
            lastName,
            email,
          };
          
          localStorage.setItem('user', JSON.stringify(basicProfile));
          setUser(basicProfile);
        }
      } catch (profileError) {
        console.error('Failed to fetch profile after signup:', profileError);
        
        // Create a basic user profile
        const basicProfile: User = {
          id: data.id || '',
          firstName,
          lastName,
          email,
        };
        
        localStorage.setItem('user', JSON.stringify(basicProfile));
        setUser(basicProfile);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async (): Promise<User> => {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const userData = await response.json();

      if (!response.ok) {
        throw new Error(userData.message || 'Failed to fetch profile');
      }

      // Log the response for debugging
      console.log('Profile response:', userData);

      // Ensure we have valid data
      if (!userData || typeof userData !== 'object') {
        throw new Error('Invalid user data format received from the server');
      }

      // Transform the API response to match our User interface
      const userProfile: User = {
        id: userData.id || '',
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        email: userData.email || '',
        jobTitle: userData.job_title || null,
        company: userData.company || null,
        location: userData.location || null,
        bio: userData.bio || null,
        website: userData.website || null,
      };
      
      // Update the current user state
      setUser(userProfile);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(userProfile));
      
      return userProfile;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      throw error;
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      console.log('Start of updateProfile function with data:', profileData);
      
      // Convert from camelCase to snake_case for API
      const apiProfileData = {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        email: profileData.email,
        job_title: profileData.jobTitle,
        company: profileData.company,
        location: profileData.location,
        bio: profileData.bio,
        website: profileData.website
      };

      console.log('Updating profile with data:', apiProfileData);
      console.log('Using auth headers:', getAuthHeaders());

      // Attempt with /profile endpoint first (from router)
      let response;
      try {
        response = await fetch(`${API_URL}auth/profile`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(apiProfileData),
        });
      } catch (error) {
        console.error('Error with /profile endpoint:', error);
        // If that fails, try with /auth/profile as fallback
        response = await fetch(`${API_URL}/auth/profile`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(apiProfileData),
        });
      }

      const data = await response.json();
      console.log('Profile update response:', data);
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Refresh the profile data
      console.log('Refreshing profile data after update');
      await getProfile();
      
      return data;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      console.log('Updating password');
      
      // Attempt with /password endpoint first (from router)
      let response;
      try {
        response = await fetch(`${API_URL}/password`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword
          }),
        });
      } catch (error) {
        console.error('Error with /password endpoint:', error);
        // If that fails, try with /auth/password as fallback
        response = await fetch(`${API_URL}/auth/password`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword
          }),
        });
      }

      const data = await response.json();
      console.log('Password update response:', data);
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password');
      }

      return data;
    } catch (error) {
      console.error('Failed to update password:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    getProfile,
    updateProfile,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;