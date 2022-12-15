describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.get('button').contains(/^Login$/).click();

    await cy.get('div.invalid-feedback').should('be.visible').contains(/^email wajib di isi$/);
  });
});
