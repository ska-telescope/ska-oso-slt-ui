import enTranslations from '../../../../public/locales/en/translations.json';
import moment from 'moment';
const language = 'English';
const waitTime = 2000;
let translation;
if (language === 'English') {
  translation = enTranslations;
}

const startDate = moment().utc().subtract(7, 'days').format('YYYY-MM-DD');
const endDate = moment().utc().format('YYYY-MM-DD');

const validateShiftLogDataTable = () => {
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

const validateShiftLogView = () => {
  cy.wait(waitTime);
  cy.get('[data-testid="content"]').then((ele) => {
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

      cy.get('body').then((element) => {
        if (
          element.find('[data-testid="availableShiftData"]') &&
          element.find('[data-testid="availableShiftData"]').length > 0
        ) {
          if (
            element.find('[data-testid="shiftId1"]') &&
            element.find('[data-testid="shiftId1"]').length > 0
          ) {
            cy.get('[data-testid="shiftId1"]').click();
            cy.wait(waitTime);
            cy.get('body').then((element) => {
              if (
                element.find('[data-testid="viewHistoryTitle"]') &&
                element.find('[data-testid="viewHistoryTitle"]').length > 0
              ) {
                cy.get('[data-testid="viewHistoryTitle"]').should('be.visible');
                cy.get('#shiftStart').contains(translation.label.shiftStartedAt);
                cy.get('#shiftEnd').contains(translation.label.shiftEndsAt);
                cy.get('#operatorName').contains(translation.label.operatorName);
                cy.get('[data-testid="viewShiftCommentsHistory"]').contains(
                  translation.label.viewShiftComments,
                );
                cy.get('[data-testid="viewLogDataIDLabel"]').contains(translation.label.logSummary);
              }
            });
            cy.get('body').then((element) => {
              if (
                element.find('[data-testid="viewShiftCommentsHistoryData"]') &&
                element.find('[data-testid="viewShiftCommentsHistoryData"]').length > 0
              ) {
                cy.get('[data-testid="commentedAtHistory"]').contains(
                  translation.label.commentedAt,
                );
                cy.get('[data-testid="viewShiftHistoryImagesHistory"]').should('be.visible');
                cy.get('[data-testid="shiftCommentsHistory"]').contains(translation.label.comments);
                cy.get('[data-testid="addAnnotationLabel"]').contains(
                  translation.label.addAnnotationLabel,
                );
              }
            });

            cy.get('body').then((element) => {
              if (
                element.find('[data-testid="addAnnotation"]') &&
                element.find('[data-testid="addAnnotation"]').length > 0
              ) {
                cy.get('[data-testid="addAnnotation"]').type(
                  'This is test shift annotation by operator',
                );
                cy.get('[data-testid="addAnnotationBtn"]').contains(translation.label.add);
                cy.get('[data-testid="addAnnotationBtn"]').click({ force: true });
              }
            });
          }
        }
      });
    }
  });
};

describe('Shift History View and Search', () => {
  it('Content : Verify shift history search by dates', { jiraKey: 'XTP-75132' }, () => {
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);
    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    cy.get('[data-testid="dateEntryStart"]').type(startDate);
    cy.get('[data-testid="dateEntryEnd"]').type(endDate);
    cy.get('[data-testid="logHistorySearch"]').click();
    validateShiftLogDataTable();
  });

  it('Content : Verify shift history search by operator', { jiraKey: 'XTP-75132' }, () => {
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);
    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    cy.get('[data-testid="logSearchBy"]').click();
    cy.contains('Search by operator').click();
    cy.get('[data-testid="logHistorySearchByOperatorName"]').click({ force: true });
    cy.get('[data-testid="logHistorySearchByOperatorName"]').type('DefaultUser');
    cy.get('[data-testid="logHistorySearchByOperator"]').click({ force: true });
    validateShiftLogDataTable();
  });

  it('Content : Verify shift history search by status', { jiraKey: 'XTP-75132' }, () => {
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);
    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    cy.get('[data-testid="logSearchBy"]').click();
    cy.contains('Search by status').click();
    cy.get('[data-testid="sbiStatus"]').click({ force: true });
    cy.get('[data-testid="sbiStatus"]').type('Executing');
    cy.get('[data-testid="logHistorySearchByStatus"]').click({ force: true });
    validateShiftLogDataTable();
  });

  it('Content : Verify shift history Search by EB ID', { jiraKey: 'XTP-75132' }, () => {
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);
    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    cy.get('[data-testid="logSearchBy"]').click();
    cy.contains('Search by EB ID').click();
    cy.get('[data-testid="EbId"]').click({ force: true });
    cy.get('[data-testid="EbId"]').type('Executing');
    cy.get('[data-testid="logHistorySearchByEBID"]').click({ force: true });
    validateShiftLogDataTable();
  });

  it('Content : Verify shift history Search by SBI ID', { jiraKey: 'XTP-75132' }, () => {
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);
    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    cy.get('[data-testid="logSearchBy"]').click();
    cy.contains('Search by SBI ID').click();
    cy.get('[data-testid="sbiId"]').click({ force: true });
    cy.get('[data-testid="sbiId"]').type('Executing');
    cy.get('[data-testid="logHistorySearchBySbiID"]').click({ force: true });
    validateShiftLogDataTable();
  });

  it('should view shift history', { jiraKey: 'XTP-75132' }, () => {
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);
    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    cy.get('[data-testid="dateEntryStart"]').type(startDate);
    cy.get('[data-testid="dateEntryEnd"]').type(endDate);
    cy.get('[data-testid="logHistorySearch"]').click();
    validateShiftLogView();
  });

  it('should add shift annotation', { jiraKey: 'XTP-75132' }, () => {
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);

    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    cy.get('[data-testid="dateEntryStart"]').type(startDate);
    cy.get('[data-testid="dateEntryEnd"]').type(endDate);
    cy.get('[data-testid="logHistorySearch"]').click({ force: true });

    cy.wait(waitTime);

    cy.get('body').then((ele) => {
      if (ele.find('[data-testid="sltHistoryTable"]').length > 0) {
        cy.get('[data-testid="sltHistoryTable"]').should('be.visible');
        cy.get('[data-testid="sltHistoryTable"]').get('[data-field="shift_id"]');
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

      cy.get('[data-id="1"] > [data-field="shift_id"] > [data-testid="shiftId"]').click();
      cy.get('[data-testid="addShiftAnnotations"]').contains(translation.label.addShiftAnnotations);
      cy.get('[data-testid="addShiftAnnotations"]').click({ force: true });
      cy.get('[data-testid="operatorShiftAnnotation"]').type('dummy text added');
      cy.get('[data-testid="shiftAnnotationButton"]').click();
    });
  });
});
