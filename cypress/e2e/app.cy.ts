describe('dashboard', () => {
  it('amount users check', () => {
    cy.viewport(1440, 1050) 
    cy.visit('/')
    cy.get('[data-cy=amount]').click()
    cy.get('[data-cy=user-name]').first().click()
    cy.get('[data-cy=edit-name-pin]').click()
    cy.get('[data-cy=open-edit-name]').click()
    cy.get('input[name="user-name"]').clear({ force: true })
    .type('Test', { force: true });
    cy.get('input[name="user-lastname"]').clear({ force: true })
    .type('Test last name', { force: true })
    cy.get('input[name="user-email"]').clear({ force: true })
    .type('max@gmail.com', { force: true })
    cy.get('[data-cy=select-date]').click()

    cy.get('.mat-calendar-period-button').click();
    cy.get('.mat-calendar-body-cell-content').contains('1986').click();  // Selecciona el año 2023

    cy.get('.mat-calendar-body-cell-content').contains('SEP').click();  // Selecciona agosto
    cy.get('.mat-calendar-body-cell-content').contains('21').click();  // Selecciona el día 15
    cy.get('[data-cy=save-user-data]').click()

    cy.get('[data-cy=edit-address-pin]').click()
    cy.get('[data-cy=open-edit-address]').click()

    cy.get('input[name="address"]').clear({ force: true })
    .type('Berlin straße test', { force: true });
    cy.get('input[name="zipCode"]').clear({ force: true })
    .type('11223', { force: true })
    cy.get('input[name="city"]').clear({ force: true })
    .type('Berlin', { force: true })
    cy.get('[data-cy=save-user-data]').click()
    
  })
})

