import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { mount } from 'cypress/react18';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../../../services/theme/theme';
import SearchByOperator from './SearchByOperator';
import { viewPort } from '../../../../utils/constants';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { BrowserRouter } from 'react-router-dom';
const THEME = [THEME_DARK, THEME_LIGHT];

function mounting(theTheme) {
  viewPort();
  const emmitData = {
    shift_operator:'DefaultUser'
  };
  cy.mount(
    <StoreProvider>
      <ThemeProvider theme={theme(theTheme)}>
        <CssBaseline />
        <BrowserRouter>
        <SearchByOperator setFilterCriteria={emmitData} searchFilter={emmitData} />
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
              cy.get('[data-testid="operatorName"]').should('be.visible');
              cy.get('[data-testid="operatorName"]').type('DefaultUser');
              cy.get('[data-testid="operatorName"]').type('{downarrow}');
              cy.get('[data-testid="operatorName"]').type('{enter}');
              cy.get('[data-testid="logHistorySearchByOperator"]').click({ force: true });
            });
    });
  }
});

// describe('<SearchByOperator />', () => {
//   it(`Theme ${THEME_DARK}: Renders SearchByOperator`, () => {
//     mount(
//       <ThemeProvider theme={theme(THEME_DARK)}>
//         <CssBaseline />
//         <SearchByOperator setFilterCriteria={undefined} searchFilter={undefined} />
//       </ThemeProvider>
//     );
//   });

//   it(`Theme ${THEME_LIGHT}: Renders SearchByOperator`, () => {
//     mount(
//       <ThemeProvider theme={theme(THEME_DARK)}>
//         <CssBaseline />
//         <SearchByOperator setFilterCriteria={undefined} searchFilter={undefined} />
//       </ThemeProvider>
//     );
//   });
// });
