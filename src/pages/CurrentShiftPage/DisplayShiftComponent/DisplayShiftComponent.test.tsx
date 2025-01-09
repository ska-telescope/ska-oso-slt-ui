/* eslint-disable no-restricted-syntax */
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../../services/theme/theme';
import DisplayShiftComponent from './DisplayShiftComponent';
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
        <DisplayShiftComponent />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
}

describe('<DisplayShiftComponent />', () => {
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders`, () => {
      mounting(theTheme);
    });
  }
});

describe('<DisplayShiftComponent />', () => {
  beforeEach(() => {
    mounting(THEME[1]);
  });

    it('shiftStartButton', () => {
      cy.get('body').then((element) => {
              if (element.find('[data-testid="shiftStartButton"]').length) {
                cy.get('[data-testid="operatorName"]').type('DefaultUser');
                cy.get('[data-testid="operatorName"]').type('{downarrow}');
                cy.get('[data-testid="operatorName"]').type('{enter}');
               cy.get('[data-testid="shiftStartButton"]').click({force: true});
               cy.get('[data-testid="confirmationDialogYes"]').click({force: true});
              }
            });

      
    });
  });

  // for (const theTheme of THEME) {
  //   it(`Theme ${theTheme}: Renders DisplayShiftComponent`, () => {
  //     mount(
  //       <ThemeProvider theme={theme(THEME_DARK)}>
  //         <CssBaseline />
  //         <DisplayShiftComponent />
  //       </ThemeProvider>
  //     );

  //     cy.get('body').then((element) => {
  //       if (element.find('[testId="historyButton"]').length) {
  //         cy.get('[testId="historyButton"]').should('contain', 'label.history');
  //       }
  //     });

  //     cy.get('body').then((element) => {
  //       if (element.find('[data-testid="operatorName"]').length) {
  //         cy.get('[data-testid="operatorName"]').should('contain', 'label.operatorName');
  //       }
  //     });

  //     cy.get('body').then((element) => {
  //       if (element.find('[testId="shiftStartButton"]').length) {
  //         cy.get('[testId="shiftStartButton"]').should('contain', 'label.shiftStartButton');
  //       }
  //     });

  //     cy.get('body').then((element) => {
  //       if (element.find('[data-testid="manageShift"]').length) {
  //         cy.get('[data-testid="manageShift"]').should('contain', 'label.manageShift');
  //       }
  //     });
  //   });
  // }
