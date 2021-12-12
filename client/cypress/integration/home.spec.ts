before(() => {
  cy.visit('/')
})

it('homepage should create room and redirect', () => {
  cy.url().should('contain', '/room')
  cy.get('canvas')
    .trigger('mousedown', { offsetX: 500, offsetY: 400, which: 1 })
    .trigger('mousemove', { offsetX: 500, offsetY: 500 })
    .trigger('mousemove', { offsetX: 510, offsetY: 500 })
    .trigger('mouseup', { force: true })
})
