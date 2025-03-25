import React, { useEffect } from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  CopyrightModal,
  Footer,
  Header,
  Spacer,
  SPACER_VERTICAL
} from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import theme from '../../services/theme/theme';
import Loader from '../Loader/Loader';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import DisplayShiftComponent from '../../pages/CurrentShiftPage/DisplayShiftComponent/DisplayShiftComponent';
import { USE_LOCAL_DATA } from '../../utils/constants';

const HEADER_HEIGHT = 90;
const FOOTER_HEIGHT = 20;

const AppContent = () => {
  const { t } = useTranslation('translations');
  const [showCopyright, setShowCopyright] = React.useState(false);
  const isAuthenticated = useIsAuthenticated();
  const { inProgress, accounts, instance } = useMsal();
  const { help, helpToggle, telescope, themeMode, toggleTheme, updateTelescope } =
    storageObject.useStore();
  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const headerTip = t('toolTip.button.docs');
  const headerURL = t('toolTip.button.docsURL');
  const docs = { tooltip: headerTip, url: headerURL };
  const toolTip = { skao, mode };
  const version = process.env.VERSION;
  const theStorage = {
    help,
    helpToggle,
    telescope,
    themeMode: themeMode.mode,
    toggleTheme,
    updateTelescope
  };

  // Ensure the user account is set after login
  useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  // Wait for MSAL to fully initialize before making redirect decisions
  if (inProgress !== 'none') {
    return <div>Loading...</div>; // Prevents premature redirection
  }

  // If the user is not authenticated, show the login page
  if (inProgress === 'none' && !isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Compute subtitle dynamically based on user role access
  // const computedSubtitle = hasValidRoles
  //   ? subtitle // Use specific subtitle if roles exist
  //   : 'Some sections may be restricted based on your role'; // Default message for users with no roles

  return (
    <>
      {
        // Header container :
        // Even distribution of the children is built in
        // Logo with URL link included
        // Button for light/dark mode included, and sample implementation provided.
        // TelescopeSelector build in, displayed as determined by selectTelescope property
      }
      <CopyrightModal copyrightFunc={setShowCopyright} show={showCopyright} />
      <Header
        docs={docs}
        testId="headerId"
        title="Shift Log Tool"
        toolTip={toolTip}
        selectTelescope={false}
        storage={theStorage}
      />
      {
        // Example of the spacer being used to shift content from behind the Header component
      }
      <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
      {
        // This is the ONLY component that is accessible via micro-frontend implementation
      }
      <DisplayShiftComponent isLocalData={USE_LOCAL_DATA} />
      {
        // Example of the spacer being used to stop content from being hidden behind the Footer component
      }
      <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
      {
        // Footer container :
        // Even distribution of the children is built in
      }
      <Footer copyrightFunc={setShowCopyright} testId="footerId" version={version} />;
    </>
  );
};

const App = () => {
  const { themeMode } = storageObject.useStore();
  return (
    <ThemeProvider theme={theme(themeMode.mode)}>
      <CssBaseline enableColorScheme />
      <Router basename={window.env.BASE_URL || '/'}>
        <React.Suspense fallback={<Loader />}>
          <AppContent />
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
