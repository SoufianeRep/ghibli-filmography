describe('template spec', () => {
  it('Loads the page sucessfully', () => {
    cy.visit('/');
    cy.title().should('contain', 'Ghibli Filmography')
  })

  it('checks the navbar', () => {
    cy.visit('/');
    cy.get('[data-cy="nav-bar"]');
  })

  it('checks the searchbar', () => {
    cy.visit('/');
    cy.get('[data-cy="search-bar"]').should('be.visible');
  })
})
