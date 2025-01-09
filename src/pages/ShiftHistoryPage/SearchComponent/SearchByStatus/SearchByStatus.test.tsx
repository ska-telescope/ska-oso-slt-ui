import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { mount } from 'cypress/react18';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../../../services/theme/theme';
import SearchByStatus from './SearchByStatus';
import { viewPort } from '../../../../utils/constants';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { BrowserRouter } from 'react-router-dom';

const THEME = [THEME_DARK, THEME_LIGHT];

function mounting(theTheme) {
  viewPort();
  const emmitData = {
    status:'Draft'
  };
  cy.mount(
    <StoreProvider>
      <ThemeProvider theme={theme(theTheme)}>
        <CssBaseline />
        <BrowserRouter>
        <SearchByStatus setFilterCriteria={emmitData} searchFilter={emmitData} />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
}

describe('<DisplayShiftComponent />', () => {
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders`, () => {
      mounting(theTheme);
      cy.get('body').then(() => {
              cy.get('[data-testid="sbiStatus"]').should('be.visible');
              cy.get('[data-testid="sbiStatus"]').type('Draft');
              cy.get('[data-testid="logHistorySearchByStatus"]').click({ force: true });
            });
    });
  }
});

// describe('<SearchByStatus />', () => {
//   it(`Theme ${THEME_DARK}: Renders SearchByStatus`, () => {
//     mount(
//       <ThemeProvider theme={theme(THEME_DARK)}>
//         <CssBaseline />
//         <SearchByStatus setFilterCriteria={undefined} searchFilter={undefined} />
//       </ThemeProvider>
//     );
//   });

//   it(`Theme ${THEME_LIGHT}: Renders SearchByStatus`, () => {
//     mount(
//       <ThemeProvider theme={theme(THEME_DARK)}>
//         <CssBaseline />
//         <SearchByStatus setFilterCriteria={undefined} searchFilter={undefined} />
//       </ThemeProvider>
//     );
//   });
// });
