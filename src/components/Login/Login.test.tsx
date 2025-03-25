import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../services/theme/theme';
import { viewPort } from '../../utils/constants';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

const THEME = [THEME_DARK, THEME_LIGHT];

function mount(theTheme) {
  viewPort();
  cy.mount(
    <StoreProvider>
      <ThemeProvider theme={theme(theTheme)}>
        <CssBaseline />
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
}

describe('<Login/>', () => {
  beforeEach(() => {
    viewPort();
    mount(THEME[1]);
  });

  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders`, () => {
      mount(theTheme);
    });
  }
  it('should render skao image', () => {
    cy.get('[data-testid="login-container"] img').should('have.length', 1);
  });

  it('should display the page title', () => {
    cy.get('h3').should('have.length', 1);
    cy.get('h3').contains('label.appTitle');
  });

  it('should login button', () => {
    cy.get('button').should('have.length', 1);
  });
});
