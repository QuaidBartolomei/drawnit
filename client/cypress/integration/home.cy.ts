it('homepage should create room and redirect', () => {
  cy.visit('http://localhost:3000')
  cy.url().should('contain', '/room')
})
