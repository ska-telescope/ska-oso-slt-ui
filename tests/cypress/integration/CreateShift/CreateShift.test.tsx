import enTranslations from '../../../../public/locales/en/translations.json';
import moment from 'moment';
import {
  CheckManageShiftPresentOrNot,
  CheckHistoryButtonPresentOrNot,
  SelectOperatorName,
  PressShiftStartButton,
  PressConfirmationDialog,
  ClickAddShiftComment,
  AddShiftComment,
  EndShift,
  validateShiftLogDataTable,
  ViewShiftComment,
  editShiftComment,
} from '../common/common';

const language = 'English';
let translation;

if (language === 'English') {
  translation = enTranslations;
}

const startDate = moment().utc().subtract(7, 'days').format('YYYY-MM-DD');
const endDate = moment().utc().format('YYYY-MM-DD');

describe('Creating Shift', () => {
  it('should create and view shift flow', { jiraKey: 'XTP-75132' }, () => {
    //header verify light/dark mode is available
    cy.get('[aria-label="light/dark mode"]').click();
    cy.get('[aria-label="light/dark mode"]').should('be.visible');
    cy.get('[aria-label="light/dark mode"]').click();
    cy.get('[aria-label="light/dark mode"]').should('be.visible');

    //create shift
    CheckManageShiftPresentOrNot();
    CheckHistoryButtonPresentOrNot();
    SelectOperatorName();
    PressShiftStartButton();
    cy.get('body').then((element) => {
      if (
        element.find('[data-testid="confirmationDialog"]') &&
        element.find('[data-testid="confirmationDialog"]').length > 0
      ) {
        PressConfirmationDialog();
      }
    });

    //add shift summary
    ClickAddShiftComment();
    cy.get('body').then((element) => {
      if (
        element.find('[data-testid="addShiftCommentModal"]') &&
        element.find('[data-testid="addShiftCommentModal"]').length > 0
      ) {
        AddShiftComment();

        //view shift summary
        ViewShiftComment();
      }
    });

    //edit shift summary
    editShiftComment();

    //end shift
    cy.get('[data-testid="shiftEndButton"]').should('not.be.disabled');
    EndShift();
    cy.get('.MuiChip-label').contains('Shift not started yet');
    cy.get('[data-testid="addShiftComments"]').should('be.disabled');
    cy.get('[data-testid="shiftEndButton"]').should('be.disabled');

    //view shift history
    cy.get('[data-testid="historyButton"]').click();
    cy.get('[data-testid="logHistoryLabel"]').contains(translation.label.logHistoryTitle);
    cy.get('[data-testid="logButton"]').contains(translation.label.logButton);
    validateShiftLogDataTable();

    //verify shift history search by dates
    cy.get('[data-testid="dateEntryStart"]').type(startDate);
    cy.get('[data-testid="dateEntryEnd"]').type(endDate);
    cy.get('[data-testid="logHistorySearch"]').click();
    cy.get('[data-testid="searchMessage"]').should(
      'include.text',
      'Showing records for selected dates',
    );

    //verify shift history search by operator
    cy.get('[data-testid="logSearchBy"]').click();
    cy.contains('Search by operator').click();
    cy.get('[data-testid="logHistorySearchByOperatorName"]').click({ force: true });
    cy.get('[data-testid="logHistorySearchByOperatorName"]').type('DefaultUser');
    cy.get('[data-testid="logHistorySearchByOperatorName"]').type('{downarrow}');
    cy.get('[data-testid="logHistorySearchByOperatorName"]').type('{enter}');
    cy.get('[data-testid="logHistorySearchByOperator"]').click({ force: true });
    cy.get('[data-testid="searchMessage"]').should('include.text', 'Showing records for operator');

    //verify shift history search by status
    cy.get('[data-testid="logSearchBy"]').click();
    cy.contains('Search by status').click();
    cy.get('[data-testid="sbiStatus"]').click({ force: true });
    cy.get('[data-testid="sbiStatus"]').type('Executing');
    cy.get('[data-testid="sbiStatus"]').type('{downarrow}');
    cy.get('[data-testid="sbiStatus"]').type('{enter}');
    cy.get('[data-testid="logHistorySearchByStatus"]').click({ force: true });
    cy.get('#msgStatus').contains('Showing records for status Executing');

    //verify shift history Search by EB ID
    cy.get('[data-testid="logSearchBy"]').click();
    cy.contains('Search by EB ID').click();
    cy.get('[data-testid="EbId"]').click({ force: true });
    cy.get('[data-testid="EbId"]').type('eb-t0001-20250408-00001');
    cy.get('[data-testid="EbId"]').type('{downarrow}');
    cy.get('[data-testid="EbId"]').type('{enter}');
    cy.get('[data-testid="logHistorySearchByEBID"]').click({ force: true });
    cy.get('[data-testid="searchMessage"]').should(
      'include.text',
      'Showing records for Execution block id',
    );

    //verify shift history Search by SBI ID
    cy.get('[data-testid="logSearchBy"]').click();
    cy.contains('Search by SBI ID').click();
    cy.get('[data-testid="sbiId"]').click({ force: true });
    cy.get('[data-testid="sbiId"]').type('sbi-t0001-20250408-00002');
    cy.get('[data-testid="sbiId"]').type('{downarrow}');
    cy.get('[data-testid="sbiId"]').type('{enter}');
    cy.get('[data-testid="logHistorySearchBySbiID"]').click({ force: true });
    cy.get('[data-testid="searchMessage"]').should(
      'include.text',
      'Showing records for Scheduling block id',
    );

    //add shift annotation
    cy.get('[data-testid="logSearchBy"]').click();
    cy.contains('Search by dates').click();
    cy.get('[data-testid="dateEntryStart"]').type(startDate);
    cy.get('[data-testid="dateEntryEnd"]').type(endDate);
    cy.get('[data-testid="logHistorySearch"]').click({ force: true });

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
      cy.get('[data-testid="operatorShiftAnnotation"]').type('dummy text added by the operator');
      cy.get('[data-testid="shiftAnnotationButton"]').click();
      cy.get('[data-testid="shiftAnnotationModalClose"]').click();
    });

    //view shift annotation
    cy.get('[data-testid="viewShiftAnnotations"]').contains(translation.label.viewShiftAnnotations);
    cy.get('[data-testid="shiftAnnotationItem"]').contains('dummy text added by the operator');

    //edit shift annotation
    cy.get('[data-testid="editShiftAnnotation0"]').click({ force: true, multiple: true });
    cy.get('[data-testid="operatorShiftAnnotation"]').clear();
    cy.get('[data-testid="operatorShiftAnnotation"]').type('Updated text added by the operator');
    cy.get('[data-testid="shiftAnnotationButton"]').click();
    cy.get('[data-testid="shiftAnnotationModalClose"]').click();
    cy.get('body').then((ele) => {
      if (ele.find('[data-testid="shiftAnnotationItem"]').length > 0) {
        cy.get('[data-testid="shiftAnnotationItem"]').contains(
          'Updated text added by the operator',
        );
      }
    });
  });
});
