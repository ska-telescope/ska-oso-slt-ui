import enTranslations from '../../../../public/locales/en/translations.json';

const language = 'English';
const waitTime = 2000;

let translation;

if (language === 'English') {
  translation = enTranslations;
}

export const validateShiftLogDataTable = () => {
  cy.wait(waitTime);
  cy.get('body').then((ele) => {
    if (ele.find('[data-testid="sltHistoryTable"]').length > 0) {
      cy.get('[data-testid="sltHistoryTable"]').should('be.visible');
      cy.get('[data-testid="sltHistoryTable"]')
        .get('[data-field="shift_id"]')
        .contains(translation.label.shiftId);
      cy.get('[data-testid="sltHistoryTable"]')
        .get('[data-field="shift_start"]')
        .contains(translation.label.shiftStart);
      cy.get('[data-testid="sltHistoryTable"]')
        .get('[data-field="shift_end"]')
        .contains(translation.label.shiftEnd);
      cy.get('[data-testid="sltHistoryTable"]')
        .get('[data-field="operator_name"]')
        .contains(translation.label.operatorName);
    }
  });
};

export const CheckManageShiftPresentOrNot = () => {
  cy.get('[data-testid="manageShift"]').contains(translation.label.manageShift);
};

export const CheckHistoryButtonPresentOrNot = () => {
  cy.get('[data-testid="historyButton"]').contains(translation.label.history);
};

export const SelectOperatorName = () => {
  cy.get('[data-testid="operatorName"]').click({ force: true });
  cy.get('[data-testid="operatorName"]').type('DefaultUser');
  cy.get('[data-testid="operatorName"]').type('{downarrow}');
  cy.get('[data-testid="operatorName"]').type('{enter}');
};

export const PressShiftStartButton = () => {
  cy.get('[data-testid="shiftStartButton"]').contains(translation.label.shiftStart);
  cy.get('[data-testid="shiftStartButton"]').click({ force: true });
};

export const PressConfirmationDialog = () => {
  cy.get('[data-testid="confirmationDialogYes"]').click({ force: true });
};

export const ClickAddShiftComment = () => {
  cy.get('[data-testid="addShiftComments"]').contains(translation.label.addShiftComments);
  cy.get('[data-testid="addShiftComments"]').click({ force: true });
};

export const AddShiftComment = () => {
  cy.get('[data-testid="addShiftCommentTitle"]').contains(translation.label.addCommentsAndImages);
  cy.get('[data-testid="addShiftComment"]').contains(translation.label.addShiftComments);
  cy.get('[data-testid="operatorShiftComment"]').type('This is test shift comment by operator');
  cy.get('[data-testid="shiftCommentButton"]').contains(translation.label.add);
  cy.get('[data-testid="shiftCommentButton"]').click({ force: true });
  cy.get('[data-testid="shiftCommentModalClose"]').contains(translation.label.close);
  cy.get('[data-testid="shiftCommentModalClose"]').click({ force: true });
  cy.wait(waitTime);
};

export const ViewShiftComment = () => {
  cy.get('[data-testid="viewShiftComments"]').contains(translation.label.viewShiftComments);
  cy.get('[data-testid="shiftCommentItem"]').contains('This is test shift comment by operator');
};

export const editShiftComment = () => {
  cy.get('[data-testid="editShiftComment"]').click({ force: true, multiple: true });
  cy.get('body').then((element) => {
    if (
      element.find('[data-testid="addShiftCommentModal"]') &&
      element.find('[data-testid="addShiftCommentModal"]').length > 0
    ) {
      cy.get('[data-testid="addShiftCommentTitle"]').contains(
        translation.label.updateCommentsAndImages,
      );
      cy.get('[data-testid="operatorShiftComment"]').type('Update test shift comment by operator');
      cy.get('[data-testid="shiftCommentButton"]').contains(translation.label.add);
      cy.get('[data-testid="shiftCommentButton"]').click({ force: true });
      cy.get('[data-testid="shiftCommentModalClose"]').contains(translation.label.close);
      cy.get('[data-testid="shiftCommentModalClose"]').click({ force: true });
    }
  });
};

export const EndShift = () => {
  cy.get('[data-testid="shiftEndButton"]').click();
  cy.get('[data-testid="endShiftTitle"]').contains(translation.msg.endNewShiftLabel);
  cy.get('[data-testid="confirmationDialogYes"]').click();
};
