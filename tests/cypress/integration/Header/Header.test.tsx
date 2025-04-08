describe('Header', () => {
  it('Header : Verify external link to skao site', { jiraKey: 'XTP-75132' }, () => {
    cy.get('[data-testid="skaoLogo"]').click();
  });

  it('Header : Verify light/dark mode is available', { jiraKey: 'XTP-75132' }, () => {
    cy.get('[aria-label="light/dark mode"]').click();
    cy.get('[aria-label="light/dark mode"]').should('be.visible');
    cy.get('[aria-label="light/dark mode"]').click();
    cy.get('[aria-label="light/dark mode"]').should('be.visible');
  });
});
