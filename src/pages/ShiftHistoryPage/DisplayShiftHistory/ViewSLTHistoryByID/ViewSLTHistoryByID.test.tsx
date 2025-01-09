import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../../../services/theme/theme';
import SHIFT_DATA_LIST from '../../../../DataModels/DataFiles/shiftDataList';
import ViewSLTHistoryByID from './ViewSLTHistoryByID';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { viewPort } from '../../../../utils/constants';
import { BrowserRouter } from 'react-router-dom';


const THEME = [THEME_DARK, THEME_LIGHT];

function mounting(theTheme) {
  viewPort();
  cy.mount(
    <StoreProvider>
      <ThemeProvider theme={theme(theTheme)}>
        <CssBaseline />
        <BrowserRouter>
        <ViewSLTHistoryByID shiftData={SHIFT_DATA_LIST[0]} updatedList={SHIFT_DATA_LIST[0]} />
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
        cy.get('[data-testid="shiftId1"]').should('be.visible');
        cy.get('[data-testid="shiftId1"]').click({ force: true });
      });
    });
  }
});

// describe('<ShiftHistoryListComponent />', () => {
//   it(`Theme ${THEME_DARK}: Renders ShiftHistoryListComponent`, () => {
//     const mockData = SHIFT_DATA_LIST;
//     mount(
//       <ThemeProvider theme={theme(THEME_DARK)}>
//         <CssBaseline />
//         <ViewSLTHistoryByID shiftData={mockData} updatedList={undefined} />
//       </ThemeProvider>
//     );
//   });

//   it(`Theme ${THEME_LIGHT}: Renders SLTHistoryTableList`, () => {
//     const mockData = SHIFT_DATA_LIST;
//     mount(
//       <ThemeProvider theme={theme(THEME_LIGHT)}>
//         <CssBaseline />
//         <ViewSLTHistoryByID shiftData={mockData} updatedList={undefined} />
//       </ThemeProvider>
//     );
//   });
// });
