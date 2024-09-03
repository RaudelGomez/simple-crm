describe('delete first user', () => {
  it('delete first user', () => {
    cy.visit('/')
    cy.get('[data-cy=link-user]').click()
    cy.get('[data-cy=user-delete]').first().click()
  })
})