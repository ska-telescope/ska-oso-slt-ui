import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { mount } from 'cypress/react18';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../../../services/theme/theme';
import SearchByEbi from './SearchByEb';


import { viewPort } from '../../../../utils/constants';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { BrowserRouter } from 'react-router-dom';
import SearchByEb from './SearchByEb';
const THEME = [THEME_DARK, THEME_LIGHT];

function mounting(theTheme) {
  viewPort();
  const emmitData = {
    eb_id:'eb-t0001-20240822-00009'
  };
  cy.mount(
    <StoreProvider>
      <ThemeProvider theme={theme(theTheme)}>
        <CssBaseline />
        <BrowserRouter>
        <SearchByEb setFilterCriteria={emmitData} searchFilter={emmitData} />
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
              cy.get('[data-testid="EbId"]').should('be.visible');
              cy.get('[data-testid="EbId"]').type('eb-t0001-20240822-00009');
              cy.get('[data-testid="logHistorySearchBiEBID"]').click({ force: true });
            });
    });
  }
});

// describe('<SearchByEb />', () => {
//   it(`Theme ${THEME_DARK}: Renders SearchByEbId`, () => {
//     mount(
//       <ThemeProvider theme={theme(THEME_DARK)}>
//         <CssBaseline />
//         <SearchByEbi setFilterCriteria={undefined} searchFilter={undefined} />
//       </ThemeProvider>
//     );
//   });

//   it(`Theme ${THEME_LIGHT}: Renders SearchByEbId`, () => {
//     mount(
//       <ThemeProvider theme={theme(THEME_DARK)}>
//         <CssBaseline />
//         <SearchByEbi setFilterCriteria={undefined} searchFilter={undefined} />
//       </ThemeProvider>
//     );
//   });
// });
