import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import ShiftHistoryPage from './ShiftHistoryPage';
import theme from '../../services/theme/theme';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { BrowserRouter } from 'react-router-dom';
import SHIFT_DATA_LIST from '../../DataModels/DataFiles/ShiftDataList';
import { viewPort } from '../../utils/constants';

const THEME = [THEME_DARK, THEME_LIGHT];

function mounting(theTheme) {
  viewPort();
  cy.mount(
    <StoreProvider>
      <ThemeProvider theme={theme(theTheme)}>
        <CssBaseline />
        <BrowserRouter>
          <ShiftHistoryPage />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
}

describe('<ShiftHistoryPage />', () => {
  const data = [SHIFT_DATA_LIST];
  beforeEach(() => {
    cy.intercept(
      'GET',
      `http://127.0.0.1:8000/ska-oso-slt-services/slt/api/v0/shifts?query_type=created_between&shift_start=2025-01-09%2018:30:00.000000&shift_end=2025-01-10%2018:29:59.999000`,
      {
        statusCode: 200,
        body: data
      }
    ).as('getDataByToday');
  });

  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders`, () => {
      mounting(theTheme);
      cy.get('body').then(() => {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(3000);
        cy.get('[data-testid="logSearchBy"]').click();
        cy.contains('Search by operator').click({ force: true });
        cy.get('[data-testid="operatorName"]').type('DefaultUser');
        cy.get('[data-testid="logHistorySearchByOperator"]').click({ force: true });

        cy.get('[data-testid="logSearchBy"]').click();
        cy.contains('Search by status').click({ force: true });
        cy.get('[data-testid="sbiStatus"]').type('Created');
        cy.get('[data-testid="logHistorySearchByStatus"]').click({ force: true });

        cy.get('[data-testid="logSearchBy"]').click();
        cy.contains('Search by EB ID').click({ force: true });
        cy.get('[data-testid="EbId"]').type('eb-t0001-20240822-00009');
        cy.get('[data-testid="logHistorySearchByEBID"]').click({ force: true });

        cy.get('[data-testid="logSearchBy"]').click();
        cy.contains('Search by SBI ID').click({ force: true });
        cy.get('[data-testid="sbiId"]').type('sbi-t0001-20240822-00009');
        cy.get('[data-testid="logHistorySearchBySbiID"]').click({ force: true });
      });
    });
  }
});
