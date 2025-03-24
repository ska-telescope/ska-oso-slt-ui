describe('login page', () => {
  it('should render skao image', () => {
    cy.visit('http://localhost:8090/login');
    cy.get('[data-testid="login-container"] img').should('have.length', 1);
  });

  it('should display the page title', () => {
    cy.visit('http://localhost:8090/login');
    cy.get('h3').should('have.length', 1);
    cy.get('h3').contains('Shift Log Tool');
  });

  it('should login button', () => {
    cy.visit('http://localhost:8090/login');
    cy.get('button').should('have.length', 1);
  });
});
