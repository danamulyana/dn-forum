describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.get('button[type=submit]').contains(/^Login$/).click();

    cy.get('input[placeholder="Email"]')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('testemail@mail.com');

    cy.get('button[type=submit]').contains(/^Login$/).click();

    cy.get('input[placeholder="Password"]')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('testemail@mail.com');

    cy.get('input[placeholder="Password"]').type('Wrong_user');

    cy.get('button[type=submit]').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('danabontot@gmail.com');

    cy.get('input[placeholder="Password"]').type('dicoding');

    cy.get('button[type=submit]').contains(/^Login$/).click();

    cy.url().should('equal', 'http://localhost:3000/');
  });
});
