describe('Header', () => {
  it('Header : Verify external link to skao site', () => {
    cy.get('[data-testid="skaoLogo"]').click();
  });

  it('Header : Verify light/dark mode is available', () => {
    cy.get('[aria-label="light/dark mode"]').click();
    cy.get('[aria-label="light/dark mode"]').should('be.visible');
    cy.get('[aria-label="light/dark mode"]').click();
    cy.get('[aria-label="light/dark mode"]').should('be.visible');
  });
});
