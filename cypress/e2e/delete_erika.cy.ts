describe('Delete User', () => {
  it('should delete the user named Erika', () => {
    // Visita la página principal donde se encuentra la tabla de usuarios
    cy.visit('/');
    cy.get('[data-cy=link-user]').click()
    // Encuentra la fila que contiene el nombre "Erika"
    cy.contains('[data-cy="user-name"]', 'Erika').then(($row) => {
      // Una vez que encuentra la fila, encuentra el ícono de eliminación en esa misma fila
      cy.wrap($row)
        .parent('tr') // Navega al elemento <tr> padre
        .find('[data-cy="user-delete"]') // Busca el ícono de eliminación dentro de la fila
        .click(); // Haz clic para eliminar el usuario
    });

    // Agrega una validación para asegurarte de que el usuario ha sido eliminado
    cy.contains('[data-cy="user-name"]', 'Erika').should('not.exist');
  });
});