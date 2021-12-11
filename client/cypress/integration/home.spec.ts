before(() => {
  cy.visit('/')
})

it('homepage should create room and redirect', () => {
  cy.url().should('contain', '/room')
  Cypress.env('ci') || cy.screenshot('screenshot')
})
