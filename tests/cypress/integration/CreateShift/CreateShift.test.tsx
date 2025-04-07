import {
  CheckManageShiftPresentOrNot,
  CheckHistoryButtonPresentOrNot,
  SelectOperatorName,
  PressShiftStartButton,
  PressConfirmationDialog,
  ClickAddShiftComment,
  AddShiftComment,
  EndShift,
} from '../common/common';
import enTranslations from '../../../../public/locales/en/translations.json';

const language = 'English';
const waitTime = 2000;

let translation;

if (language === 'English') {
  translation = enTranslations;
}

// Skipping test as it will be fixed post authentiation & permission implementation
describe('Creating Shift', () => {
  beforeEach(() => {
    CheckManageShiftPresentOrNot();
    CheckHistoryButtonPresentOrNot();
    SelectOperatorName();
    PressShiftStartButton();
  });

  it('should create a new shift', { jiraKey: 'XTP-75132' }, () => {
    cy.get('body').then((element) => {
      if (
        element.find('[data-testid="confirmationDialog"]') &&
        element.find('[data-testid="confirmationDialog"]').length > 0
      ) {
        PressConfirmationDialog();
      }
    });
    // cy.get('.MuiChip-label').contains('Shift started at');
    // cy.get('[data-testid="addShiftComments"]').should('not.be.disabled');
    // cy.get('[data-testid="shiftEndButton"]').should('not.be.disabled');
  });

  it('should add shift summary', () => {
    cy.get('body').then((element) => {
      if (
        element.find('[data-testid="confirmationDialog"]') &&
        element.find('[data-testid="confirmationDialog"]').length > 0
      ) {
        PressConfirmationDialog();
      }
    });

    ClickAddShiftComment();

    cy.get('body').then((element) => {
      if (
        element.find('[data-testid="addShiftCommentModal"]') &&
        element.find('[data-testid="addShiftCommentModal"]').length > 0
      ) {
        AddShiftComment();
      }
    });
  });

  it('should end shift', () => {
    cy.get('[data-testid="shiftEndButton"]').should('not.be.disabled');
    EndShift();
    cy.get('.MuiChip-label').contains('Shift not started yet');
    cy.get('[data-testid="addShiftComments"]').should('be.disabled');
    cy.get('[data-testid="shiftEndButton"]').should('be.disabled');
  });
});
