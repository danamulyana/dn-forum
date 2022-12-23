/**
 * skenario testing
 *
 * - Login spec
 *    - should display login page correctly
 *    - should display alert when email is empty
 *    - should display alert when email is invalid
 *    - should display alert when password is empty
 *    - should display alert when password is less than 6
 *    - should display alert when email and password are wrong
 *    - should display homepage when email and password are correct
 *
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button[type=submit]').contains(/^Login$/).click();

    cy.get('.invalid-feedback').contains('email wajib di isi').should('be.visible');
  });

  it('should display alert when email is invalid', () => {
    cy.get('input[placeholder="Email"]').type('danabontot');

    cy.get('button[type=submit]').contains(/^Login$/).click();

    cy.get('.invalid-feedback').contains('email tidak valid').should('be.visible');
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('testemail@mail.com');

    cy.get('button[type=submit]').contains(/^Login$/).click();

    cy.get('.invalid-feedback').contains('password wajib di isi').should('be.visible');
  });

  it('should display alert when password is less than 6', () => {
    cy.get('input[placeholder="Email"]').type('testemail@mail.com');
    cy.get('input[placeholder="Password"]').type('1234');

    cy.get('button[type=submit]').contains(/^Login$/).click();

    cy.get('.invalid-feedback').contains('password harus lebih dari 6 huruf').should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('danabontot@gmail.com');

    cy.get('input[placeholder="Password"]').type('Wrong_user');

    cy.get('button[type=submit]').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', async () => {
    cy.get('input[placeholder="Email"]').type('danabontot@gmail.com');

    cy.get('input[placeholder="Password"]').type('dicoding');

    cy.get('button[type=submit]').contains(/^Login$/).click();

    await cy.url().should('equal', 'http://localhost:3000/');
  });
});
