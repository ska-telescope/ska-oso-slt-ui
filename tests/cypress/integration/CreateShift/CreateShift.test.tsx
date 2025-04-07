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
  });

  it('should add shift summary', { jiraKey: 'XTP-75132' }, () => {
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

  it('should end shift', { jiraKey: 'XTP-75132' }, () => {
    cy.get('[data-testid="shiftEndButton"]').should('not.be.disabled');
    EndShift();
    cy.get('.MuiChip-label').contains('Shift not started yet');
    cy.get('[data-testid="addShiftComments"]').should('be.disabled');
    cy.get('[data-testid="shiftEndButton"]').should('be.disabled');
  });
});
