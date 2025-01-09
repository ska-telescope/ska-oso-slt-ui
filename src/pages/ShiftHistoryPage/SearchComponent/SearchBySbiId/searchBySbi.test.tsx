import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { mount } from 'cypress/react18';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../../../services/theme/theme';
import SearchBySbi from './SearchBySbi';
import { viewPort } from '../../../../utils/constants';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { BrowserRouter } from 'react-router-dom';
const THEME = [THEME_DARK, THEME_LIGHT];

function mounting(theTheme) {
  viewPort();
  const emmitData = {
    sbi_id:'sbi-t0001-20240822-00009'
  };
  cy.mount(
    <StoreProvider>
      <ThemeProvider theme={theme(theTheme)}>
        <CssBaseline />
        <BrowserRouter>
        <SearchBySbi setFilterCriteria={emmitData} searchFilter={emmitData} />
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
              cy.get('[data-testid="sbiId"]').should('be.visible');
              cy.get('[data-testid="sbiId"]').type('sbi-t0001-20240822-00009');
              cy.get('[data-testid="logHistorySearchBiSbiID"]').click({ force: true });
            });
    });
  }
});
// describe('<SearchByEb />', () => {
//   it(`Theme ${THEME_DARK}: Renders SearchBySbi`, () => {
//     mount(
//       <ThemeProvider theme={theme(THEME_DARK)}>
//         <CssBaseline />
//         <SearchBySbi setFilterCriteria={undefined} searchFilter={undefined} />
//       </ThemeProvider>
//     );
//   });

//   it(`Theme ${THEME_LIGHT}: Renders SearchBySbi`, () => {
//     mount(
//       <ThemeProvider theme={theme(THEME_DARK)}>
//         <CssBaseline />
//         <SearchBySbi setFilterCriteria={undefined} searchFilter={undefined} />
//       </ThemeProvider>
//     );
//   });
// });
