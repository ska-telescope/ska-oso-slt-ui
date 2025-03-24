/**
 * Authentication Configuration for MSAL (Microsoft Authentication Library)
 *
 * This file defines the configuration settings for MSAL, which is used to authenticate
 * users with Azure Active Directory in a React TypeScript application.
 * Sensitive data such as client ID and tenant ID are loaded from environment variables
 * to enhance security.
 */
import { MSENTRA_CLIENT_ID, MSENTRA_TENANT_ID, MSENTRA_REDIRECT_URI } from './utils/constants';
import { Configuration } from '@azure/msal-browser';

/**
 * MSAL Configuration Object
 *
 * This object contains authentication parameters and cache configuration for MSAL.
 * - `auth`: Contains authentication parameters like client ID, authority, and redirect URI.
 * - `cache`: Configures how tokens are stored in the browser.
 */
export const msalConfig: Configuration = {
  auth: {
    /**
     * Client ID of your Azure AD application.
     * Loaded from environment variable MSENTRA_CLIENT_ID.
     */
    clientId: MSENTRA_CLIENT_ID as string,
    /**
     * Authority URL for Azure AD.
     * Combines the Azure AD endpoint with your tenant ID from MSENTRA_TENANT_ID.
     */
    authority: `https://login.microsoftonline.com/${MSENTRA_TENANT_ID}`,
    /**
     * Redirect URI after successful login.
     * Uses the origin of the current window (e.g., http://localhost:3000).
     * Must match one of the redirect URIs configured in Azure AD.
     */
    redirectUri: `${MSENTRA_REDIRECT_URI}`
  },
  cache: {
    /**
     * Specifies where the cache will be stored.
     * Options are 'localStorage' or 'sessionStorage'.
     * - 'sessionStorage' is more secure as data is cleared when the session ends.
     * - 'localStorage' persists data across sessions but may pose security risks.
     */
    cacheLocation: 'sessionStorage',
    /**
     * If true, MSAL adds cookies to manage authentication state.
     * Useful for browsers that block third-party cookies.
     */
    storeAuthStateInCookie: true
  }
};

/**
 * Scopes for Login Request
 *
 * Defines the permissions that the application requests from the user during authentication.
 * - 'User.Read' allows the app to read the signed-in user's profile.
 * Additional scopes can be added as needed.
 */
export const loginRequest = {
  scopes: ['User.Read']
};
