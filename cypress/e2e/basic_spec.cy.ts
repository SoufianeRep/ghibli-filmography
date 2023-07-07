describe('main page spec', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Loads the page sucessfully.', () => {
    cy.title().should('contain', 'Ghibli Filmography')
    cy.get('[data-cy="nav-bar"]');
    cy.get('[data-cy="search-bar"]').should('be.visible');
  })

  it('Should display at least 10 movies in the main page.', () => {
    cy.get('[data-cy="movie-list"]').children().should(($films) => {
      expect($films.length).to.be.at.within(1, 10);
    });
  })

  it('Should filter movies based on search input by name.', () => {
    const searchValue = "Princess";

    cy.get('[data-cy="select-input"]').select("name");
    cy.get('[data-cy="search-input"]').type(searchValue);
    cy.get('[data-cy="search-button"]').click();
    cy.get('[data-cy="movie-list"] [data-cy="film-title"]').each(($title) => {
      cy.wrap($title).should('contain.text', searchValue);
    })

    cy.get('[data-cy="movie-list"] [data-cy="film-title"]').should(($films) => {
      expect($films.length).to.be.at.least(2)
    })
  })

  it('Should filter movies based on search input by year.', () => {
    const searchValue = "2016";

    cy.get('[data-cy="select-input"]').select("year");
    cy.get('[data-cy="search-input"]').type(searchValue);
    cy.get('[data-cy="search-button"]').click();
    cy.get('[data-cy="movie-list"] [data-cy="film-year"]').each(($year) => {
      cy.wrap($year).should('contain.text', searchValue);
    })

    cy.get('[data-cy="movie-list"] [data-cy="film-title"]').should(($films) => {
      expect($films.length).to.be.at.least(1);
    })
  })

  it('Should display a no result message if no match is found.', () => {
    const searchValue = "giberish";

    cy.get('[data-cy="select-input"]').select("name");
    cy.get('[data-cy="search-input"]').type(searchValue);
    cy.get('[data-cy="search-button"]').click();

    cy.get('[data-cy="no-result"]').should('be.visible').and('contain.text', searchValue);

  })

})

describe('Movie show page spec', () => {
  const movieId = "2baf70d1-42bb-4437-b551-e5fed5a87abe";

  beforeEach(() => {
    cy.visit(`/films/${movieId}`)
  })

  it('Should load the film show page', () => {
    cy.title().should('contain', 'Ghibli Filmography');
    cy.get('[data-cy="nav-bar"]');
    cy.get('[data-cy="film-info"]').should('be.visible');
  })

  it('Should load the picture successfuly', () => {
    cy.get('[data-cy="film-info"] img').should('be.visible')
      .then(($img) => {
        const imgElement = $img[0] as HTMLImageElement;
        expect(imgElement.naturalWidth).to.be.greaterThan(0);
        expect(imgElement.naturalHeight).to.be.greaterThan(0);
      });
  })

  it('Should display the film\'s necessary informations', () => {
    cy.get('[data-cy="film-info"] [data-cy="film-data"]').each(($data) => {
      cy.wrap($data).should('be.visible');
    })
  })
})
