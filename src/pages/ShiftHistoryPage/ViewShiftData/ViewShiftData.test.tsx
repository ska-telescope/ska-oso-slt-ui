/* eslint-disable no-restricted-syntax */
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../../services/theme/theme';
import ViewShiftData from './ViewShiftData';
import SHIFT_DATA_LIST from '../../../DataModels/DataFiles/shiftDataList';

import { viewPort } from '../../../utils/constants';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { BrowserRouter } from 'react-router-dom';

const THEME = [THEME_DARK, THEME_LIGHT];
function mounting(theTheme) {
  viewPort();

  cy.mount(
    <StoreProvider>
      <ThemeProvider theme={theme(theTheme)}>
        <CssBaseline />
        <BrowserRouter>
        <ViewShiftData data={SHIFT_DATA_LIST[0]} />
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
        cy.get('#operatorName').should('contain', 'label.operatorName');

              cy.get('#shiftStart').should('contain', 'label.shiftStartedAt');
        
              cy.get('#shiftEnd').should('contain', 'label.shiftEndsAt');
              cy.get('[data-testid="addShiftAnnotations"]').should('contain', 'label.addShiftAnnotations');
            });
    });
  }
});
// const THEME = [THEME_DARK, THEME_LIGHT];

// describe('<ViewShiftData />', () => {
//   for (const theTheme of THEME) {
//     it(`Theme ${theTheme}: Renders ViewShiftData`, () => {
//       const mockData = SHIFT_DATA_LIST[0];
//       mount(
//         <ThemeProvider theme={theme(THEME_DARK)}>
//           <CssBaseline />
//           <ViewShiftData data={mockData} />
//         </ThemeProvider>
//       );
//       cy.get('#operatorName').should('contain', 'label.operatorName');

//       cy.get('#shiftStart').should('contain', 'label.shiftStartedAt');

//       cy.get('#shiftEnd').should('contain', 'label.shiftEndsAt');

//       cy.get('body').then((element) => {
//         if (element.find('[testId="addShiftAnnotations"]').length) {
//           cy.get('[testId="addShiftAnnotations"]').should('contain', 'label.addShiftAnnotations');
//         }
//       });
//     });
//   }
// });
