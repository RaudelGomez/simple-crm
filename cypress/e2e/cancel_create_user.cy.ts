describe('Menu', () => {
  it('create a new User', () => {
    cy.visit('/')
    cy.get('[data-cy=link-user]').click()
    cy.get('[data-cy=btn-create-user]').click()
    cy.get('input[name="firstName"]').type('Erika', { force: true });
    cy.get('input[name="lastName"]').type('Musterfrau', { force: true })
    cy.get('input[name="email"]').type('erika@gmail.com', { force: true })
    cy.get('[data-cy=select-date]').click()

    cy.get('.mat-calendar-period-button').click();
    cy.get('.mat-calendar-previous-button').click({ multiple: true });
    cy.get('.mat-calendar-body-cell-content').contains('1993').click();  // Selecciona el año 2023
    cy.get('.mat-calendar-body-cell-content').contains('MAR').click();  // Selecciona agosto
    cy.get('.mat-calendar-body-cell-content').contains('10').click();  // Selecciona el día 15
    cy.get('input[name="address"]').type('Villegas', { force: true });
    cy.get('input[name="zipCode"]').clear({ force: true }).type('10600', { force: true })
    cy.get('input[name="city"]').type('Havanna', { force: true })
    cy.get('[data-cy=cancel-user-data]').click()
  })
})