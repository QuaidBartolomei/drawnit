before(() => {
  cy.visit('http://localhost:3000')
})

it('homepage should create room and redirect', () => {
  cy.url().should('contain', '/room')
  cy.get('canvas')
  cy.screenshot('screenshot')
})
