import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Button, Typography, Alert, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Navigate } from 'react-router-dom';

const logo = require('../../assets/skao-logo-original.svg') as string;

const loginRequest = {
  scopes: ['User.Read']
};

/**
 * Login Component
 *
 * Renders a login screen with branding and a "Sign In" button.
 * If the user is authenticated, redirects to the home page.
 *
 * Uses MSAL for authentication with Azure AD and MUI for styling.
 */
const Login: React.FC = () => {
  const { t } = useTranslation('translations');
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();
  const [error, setError] = React.useState<string | null>(null);

  /**
   * Initiates login redirect using MSAL.
   * Sets an error message if login fails.
   */
  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(() => {
      setError('Login failed. Please try again.');
    });
  };

  if (isAuthenticated) {
    // User is already authenticated, redirect to home page
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      data-testid="login-page"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(315deg, #070068 50%, #E70068)'
      }}
    >
      <Box
        data-testid="login-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#ffffff',
          padding: 4,
          width: '365px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Box
          sx={{ mb: 4, pb: 2, marginBottom: '15px', paddingBottom: '0px' }}
          display="flex"
          justifyContent="center"
        >
          {/* Logo Display */}
          <img src={logo} alt="SKAO Logo" style={{ maxWidth: '150px' }} data-testid="logo" />
        </Box>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#000000',
            fontSize: '2rem',
            marginBottom: '50px'
          }}
          data-testid="portal-title"
        >
          {t('label.appTitle')}
        </Typography>
        {error && (
          // Displays error message if login fails
          <Alert severity="error" sx={{ mb: 2 }} data-testid="login-error">
            {error}
          </Alert>
        )}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#070068',
            width: '150px',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#2a003f'
            }
          }}
          onClick={handleLogin}
          data-testid="login-button"
        >
          {t('label.signin')}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
