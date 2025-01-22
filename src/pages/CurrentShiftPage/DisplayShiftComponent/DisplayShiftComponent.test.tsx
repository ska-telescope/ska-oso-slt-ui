/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../../services/theme/theme';
import DisplayShiftComponent from './DisplayShiftComponent';
import { viewPort } from '../../../utils/constants';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { BrowserRouter } from 'react-router-dom';
import SHIFT_DATA_LIST from '../../../DataModels/DataFiles/ShiftDataList';

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

  // beforeEach(() => {
  //   const data = [...SHIFT_DATA_LIST[0].comments];

  //   cy.intercept('POST', `${window.env.BACKEND_URL}/shift_comment`, {
  //     statusCode: 200,
  //     body: { ...data }
  //   }).as('postComment');
  // });

  beforeEach(() => {
    const data = [...SHIFT_DATA_LIST];
    cy.intercept('POST', `${window.env.BACKEND_URL}/shifts/create`, {
      statusCode: 200,
      body: { ...data }
    }).as('startNewShift');
  });
  // beforeEach(() => {
  //   const data = [...SHIFT_DATA_LIST[0].comments];
  //   cy.intercept('PUT', `http://127.0.0.1:8000/ska-oso-slt-services/slt/api/v0/shift_comment/2`, {
  //     statusCode: 200,
  //     body: { ...data }
  //   }).as('putComment');
  // });
  // beforeEach(() => {
  //   const data = [SHIFT_DATA_LIST[0]];
  //   cy.intercept(
  //     'GET',
  //     `http://127.0.0.1:8000/ska-oso-slt-services/slt/api/v0/shift?shift_id=slt-20250106-11785506`,
  //     {
  //       statusCode: 200,
  //       body: data
  //     }
  //   ).as('getDataById');
  // });

  it('shiftStartButton', () => {
    cy.get('body').then((element) => {
      if (element.find('[data-testid="shiftStartButton"]').length) {
        cy.get('[data-testid="operatorName"]').type('DefaultUser');
        cy.get('[data-testid="operatorName"]').type('{downarrow}');
        cy.get('[data-testid="operatorName"]').type('{enter}');
        cy.get('[data-testid="shiftStartButton"]').click({ force: true });
        cy.wait(2000);
        cy.get('[data-testid="confirmationDialogYes"]').click({ force: true });
        cy.wait('@startNewShift');
        cy.wait(2000);
        cy.get('[data-testid="addShiftComments"]').click({ force: true });
        cy.wait(2000);
        cy.get('[data-testid="operatorShiftComment"]').type('This is dummy comments');
        cy.get('[data-testid="shiftCommentButton"]').click({ force: true });
        // cy.wait('@getDataById');
        // cy.wait('@postComment');
        // cy.get('[data-testid="successCommentStatusMsg"]').contains('msg.commentSubmit');
        // cy.get('[data-testid="shiftCommentModalClose"]').click({ force: true });
        // cy.get('[data-testid="editShifComment"]').click({ force: true, multiple: true });
        // cy.get('[data-testid="shiftCommentButton"]').click({ force: true });
        // cy.wait('@putComment');
        // cy.get('[data-testid="shiftCommentModalClose"]').click({ force: true });
        //
      }
    });
  });
});
