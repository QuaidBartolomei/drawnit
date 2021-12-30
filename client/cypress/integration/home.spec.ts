before(() => {
  cy.visit('/')
})

it('homepage should create room and redirect', () => {
  cy.url().should('contain', '/room')
  cy.get('canvas')
    .should('exist')
    .trigger('mousedown', { offsetX: 500, offsetY: 400, which: 1 })
    .trigger('mousemove', { offsetX: 500, offsetY: 500 })
    .trigger('mousemove', { offsetX: 510, offsetY: 500 })
    .trigger('mouseup', { force: true })

  cy.get('input[id=image-file-input]').attachFile('400x800.png')

  cy.get('canvas').should('have.css', 'width', '400px')
  cy.get('canvas').should('have.css', 'height', '800px')
})
