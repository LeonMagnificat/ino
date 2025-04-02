import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme, responsiveFontSizes, PaletteMode } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Vérifier si le mode est stocké dans localStorage ou utiliser les préférences du système
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      return savedMode;
    }
    
    // Sinon, utiliser les préférences du système
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Mettre à jour localStorage lorsque le mode change
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Fonction pour basculer entre les modes
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Créer le thème avec les palettes de couleurs appropriées
  const theme = useMemo(() => 
    responsiveFontSizes(createTheme({
      palette: {
        mode,
        primary: {
          main: '#1a73e8',
          dark: mode === 'dark' ? '#4791db' : '#0d47a1',
          light: mode === 'dark' ? '#0d47a1' : '#4791db',
          contrastText: '#ffffff',
        },
        secondary: {
          main: mode === 'dark' ? '#b0bec5' : '#202124',
          dark: mode === 'dark' ? '#808e95' : '#000000',
          light: mode === 'dark' ? '#e2f1f8' : '#484848',
          contrastText: mode === 'dark' ? '#000000' : '#ffffff',
        },
        success: {
          main: '#047857',
          light: mode === 'dark' ? 'rgba(4, 120, 87, 0.15)' : 'rgba(4, 120, 87, 0.1)',
        },
        error: {
          main: '#B91C1C',
          light: mode === 'dark' ? 'rgba(185, 28, 28, 0.15)' : 'rgba(185, 28, 28, 0.1)',
        },
        warning: {
          main: '#B45309',
          light: mode === 'dark' ? 'rgba(180, 83, 9, 0.15)' : 'rgba(180, 83, 9, 0.1)',
        },
        background: {
          default: mode === 'dark' ? '#121212' : '#f8f9fa',
          paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
        },
        text: {
          primary: mode === 'dark' ? '#e0e0e0' : '#202124',
          secondary: mode === 'dark' ? '#a0a0a0' : '#5f6368',
        },
        action: {
          hover: mode === 'dark' ? 'rgba(26, 115, 232, 0.08)' : 'rgba(26, 115, 232, 0.04)',
          selected: mode === 'dark' ? 'rgba(26, 115, 232, 0.16)' : 'rgba(26, 115, 232, 0.08)',
          disabled: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)',
          disabledBackground: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        },
      },
      typography: {
        fontFamily: "'Nunito', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h4: {
          fontWeight: 800,
          fontSize: '1.75rem',
          letterSpacing: '-0.01em',
        },
        h5: {
          fontWeight: 700,
          fontSize: '1.3rem',
          letterSpacing: '-0.01em',
        },
        h6: {
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: '-0.01em',
        },
        subtitle1: {
          fontWeight: 600,
          fontSize: '0.95rem',
        },
        subtitle2: {
          fontWeight: 600,
          fontSize: '0.875rem',
        },
        body1: {
          fontWeight: 400,
          fontSize: '0.95rem',
        },
        body2: {
          fontWeight: 400,
          fontSize: '0.875rem',
          lineHeight: 1.5,
        },
        button: {
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '0.875rem',
        },
        caption: {
          fontSize: '0.75rem',
          fontWeight: 400,
        },
      },
      shape: {
        borderRadius: 3,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');
            
            body {
              font-family: 'Nunito', sans-serif;
              background-color: ${mode === 'dark' ? '#121212' : '#f8f9fa'};
              color: ${mode === 'dark' ? '#e0e0e0' : '#202124'};
            }
            
            ::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            
            ::-webkit-scrollbar-track {
              background: ${mode === 'dark' ? '#2d2d2d' : '#f1f1f1'};
              border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb {
              background: ${mode === 'dark' ? '#555' : '#c1c1c1'};
              border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: ${mode === 'dark' ? '#666' : '#a8a8a8'};
            }
          `,
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: '3px',
              padding: '6px 16px',
              fontWeight: 600,
              transition: 'all 0.2s ease-in-out',
            },
            contained: {
              boxShadow: mode === 'dark' ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.08)',
              '&:hover': {
                boxShadow: mode === 'dark' ? '0 2px 5px rgba(0,0,0,0.4)' : '0 2px 4px rgba(0,0,0,0.12)',
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow: mode === 'dark' ? '0 1px 4px 0 rgba(0, 0, 0, 0.4)' : '0 1px 3px 0 rgba(0, 0, 0, 0.07)',
              transition: 'box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
            },
            elevation1: {
              boxShadow: mode === 'dark' ? '0 1px 4px 0 rgba(0, 0, 0, 0.4)' : '0 1px 3px 0 rgba(0, 0, 0, 0.07)',
            },
            elevation2: {
              boxShadow: mode === 'dark' ? '0 2px 8px 0 rgba(0, 0, 0, 0.5)' : '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              fontSize: '0.875rem',
              padding: '12px 16px',
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(224, 224, 224, 0.7)',
            },
            head: {
              fontWeight: 700,
              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
            },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              '&:last-child td': {
                borderBottom: 0,
              },
            },
            hover: {
              '&:hover': {
                backgroundColor: mode === 'dark' 
                  ? 'rgba(26, 115, 232, 0.08) !important' 
                  : 'rgba(26, 115, 232, 0.04) !important',
              },
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              fontWeight: 600,
              transition: 'background-color 0.2s ease-in-out',
            },
            clickable: {
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
              },
              '&:active': {
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              transition: 'all 0.2s ease-in-out',
            },
          },
        },
        MuiAlert: {
          styleOverrides: {
            root: {
              borderRadius: '3px',
            },
            standardInfo: {
              color: mode === 'dark' ? '#4791db' : '#0d47a1',
              backgroundColor: mode === 'dark' ? 'rgba(26, 115, 232, 0.15)' : 'rgba(26, 115, 232, 0.08)',
            },
          },
        },
        MuiDivider: {
          styleOverrides: {
            root: {
              margin: '16px 0',
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            },
          },
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
    })),
  [mode]);

  // Fournir le mode et la fonction de bascule via le contexte
  const contextValue = useMemo(() => ({
    mode,
    toggleColorMode,
  }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}; 