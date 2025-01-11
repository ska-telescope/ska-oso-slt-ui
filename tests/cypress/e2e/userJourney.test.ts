import enTranslations from '../../../public/locales/en/translations.json';
import moment from 'moment';
const language = 'English';
const waitTime = 2000;
let translation;
if (language === 'English') {
  translation = enTranslations;
}

const startDate = moment().utc().subtract(7, 'days').format('YYYY-MM-DD');
const endDate = moment().utc().format('YYYY-MM-DD');

context('Shift Log Tool', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8090/');
  });

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

  const validateLogDataTable = () => {
    cy.wait(waitTime);
    cy.get('body').then((element) => {
      if (element.find('[data-testid="sltLogTableView"]').length > 0) {
        cy.get('[data-testid="sltLogTableView"]').should('be.visible');
        cy.get('[data-testid="sltLogTableView"]')
          .get('[data-field="source"]')
          .contains(translation.label.source);
        cy.get('[data-testid="sltLogTableView"]')
          .get('[data-field="info"]')
          .contains(translation.label.info);
        cy.get('[data-testid="sltLogTableView"]')
          .get('[data-field="sbiStatus"]')
          .contains(translation.label.sbiStatus);
        cy.get('[data-testid="sltLogTableView"]')
          .get('[data-field="logTime"]')
          .contains(translation.label.dateTime);
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
                  cy.get('[data-testid="viewLogDataIDLabel"]').contains(
                    translation.label.logSummary,
                  );
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
                  cy.get('[data-testid="shiftCommentsHistory"]').contains(
                    translation.label.comments,
                  );
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

  it('Header : Verify external link to skao site', () => {
    cy.get('[data-testid="skaoLogo"]').click();
  });

  it('Header : Verify light/dark mode is available', () => {
    cy.get('[data-testid="Brightness7Icon"]').click();
    cy.get('[data-testid="Brightness4Icon"]').should('be.visible');
    cy.get('[data-testid="Brightness4Icon"]').click();
    cy.get('[data-testid="Brightness7Icon"]').should('be.visible');
  });

  it('Content : Verify current shift log flow', () => {
    cy.get('[data-testid="manageShift"]').contains(translation.label.manageShift);
    cy.get('[data-testid="historyButton"]').contains(translation.label.history);
    cy.get('[data-testid="operatorName"]').click({ force: true });
    cy.get('[data-testid="operatorName"]').type('DefaultUser');
    cy.get('[data-testid="shiftStartButton"]').contains(translation.label.shiftStart);
    cy.get('[data-testid="shiftStartButton"]').click({ force: true });

    cy.get('body').then((element) => {
      if (
        element.find('[data-testid="confirmationDialog"]') &&
        element.find('[data-testid="confirmationDialog"]').length > 0
      ) {
        cy.get('[data-testid="confirmationDialogYes"]').contains(translation.label.YES);
        cy.get('[data-testid="confirmationDialogYes"]').click({ force: true });
      }
    });

    cy.get('[data-testid="addShiftComments"]').contains(translation.label.addShiftComments);
    cy.get('[data-testid="addShiftComments"]').click({ force: true });

    cy.get('body').then((element) => {
      if (
        element.find('[data-testid="addShiftCommentModal"]') &&
        element.find('[data-testid="addShiftCommentModal"]').length > 0
      ) {
        cy.get('[data-testid="addShiftCommentTitle"]').contains(
          translation.label.addCommentsAndImages,
        );
        cy.get('[data-testid="addShiftComment"]').contains(translation.label.addShiftComments);

        cy.get('[data-testid="operatorShiftComment"]').type(
          'This is test shift comment by operator',
        );
        cy.get('[data-testid="shiftCommentButton"]').contains(translation.label.add);
        cy.get('[data-testid="shiftCommentButton"]').click({ force: true });
        cy.get('[data-testid="shiftCommentModalClose"]').contains(translation.label.close);
        cy.get('[data-testid="shiftCommentModalClose"]').click({ force: true });
        cy.wait(waitTime);
      }
    });
    cy.get('body').then((element) => {
      if (
        element.find('[data-testid="viewShiftComments"]') &&
        element.find('[data-testid="viewShiftComments"]').length > 0
      ) {
        cy.get('[data-testid="viewShiftComments"]').contains(translation.label.viewShiftComments);
        cy.get('[data-testid="commentedAt"]').contains(translation.label.commentedAt);
        cy.get('[data-testid="viewShiftCommentImages"]').should('be.visible');
        cy.get('[data-testid="shiftComment"]').contains(translation.label.comments);
      }
    });

    cy.get('[data-testid="logSummary"]').contains(translation.label.logSummary);
    cy.get('[data-testid="noShiftLogFound"]').contains(translation.label.noLogsFound);
    cy.get('[data-testid="shiftEndButton"]').contains(translation.label.shiftEnd);
    cy.get('[data-testid="shiftEndButton"]').click({ force: true });

    cy.get('body').then((element) => {
      if (
        element.find('[data-testid="confirmationDialog"]') &&
        element.find('[data-testid="confirmationDialog"]').length > 0
      ) {
        cy.get('[data-testid="confirmationDialogYes"]').contains(translation.label.YES);
        cy.get('[data-testid="confirmationDialogYes"]').click({ force: true });
      }
    });
  });

  it('Content : Verify shift history search by dates', () => {
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);
    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    cy.get('[data-testid="dateEntryStart"]').type(startDate);
    cy.get('[data-testid="dateEntryEnd"]').type(endDate);
    cy.get('[data-testid="logHistorySearchByDates"]').click();
    validateShiftLogDataTable();
  });

  it('Content : Verify shift history search by operator', () => {
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);
    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    cy.get('[data-testid="logSearchBy"]').click();
    cy.contains('Search by operator').click();
    cy.get('[data-testid="operatorName"]').click({ force: true });
    cy.get('[data-testid="operatorName"]').type('DefaultUser');
    cy.get('[data-testid="logHistorySearchByOperator"]').click({ force: true });
    validateShiftLogDataTable();
  });

  it('Content : Verify shift history search by status', () => {
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

  it('Content : Verify shift history view', () => {
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);
    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    cy.get('[data-testid="dateEntryStart"]').type(startDate);
    cy.get('[data-testid="dateEntryEnd"]').type(endDate);
    cy.get('[data-testid="logHistorySearchByDates"]').click();
    validateShiftLogView();
  });

  it('Content : Verify shift annotation flow', () => {
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);

    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    cy.get('[data-testid="dateEntryStart"]').type(startDate);
    cy.get('[data-testid="dateEntryEnd"]').type(endDate);
    cy.get('[data-testid="logHistorySearchByDates"]').click({ force: true });

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

      if (ele.find('[data-testid="addShiftAnnotations"]').length > 0) {
        cy.get('[data-testid="addShiftAnnotations"]').contains(
          translation.label.addShiftAnnotations,
        );
        cy.get('[data-testid="addShiftAnnotations"]').click({ force: true });
      }
    });
  });

  it('Content : Verify shift history Search by EB ID', () => {
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

  it('Content : Verify shift history Search by SBI ID', () => {
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
});
