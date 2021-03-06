describe('Gallery', () => {
  before(() => {
    cy.visit('http://localhost:3000')
      .get('input[type="email"]').type('sam@turing.io')
      .get('input[type="password"]').type('123456')
      .get('button').click()
  })

  it('should display the proper URL when the Gallery is visited', () => {
    cy.get('.gallery')
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('should display movie cards within the gallery', () => {
    cy.get('.movie-card')
      // .get('img')
      .should('be.visible')
  })

  it('should display movie details when a movie card is clicked', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
      body : {
        "movie": {
          "id": 694919,
          "title": "Money Plane",
          "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
          "release_date": "2020-09-29",
          "overview": "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
          "genres": [
              "Action"
          ],
          "budget": 0,
          "revenue": 0,
          "runtime": 82,
          "tagline": "",
          "average_rating": 6.142857142857143
        }
      }
    })
    .get('.movie-card').first().click()
    .url().should('include', '/movies/694919')
  })

  it('should display an error message when server is down', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'
    }, {
      statusCode: 500,
      ok: false
    })
      .get('button').click()
      .get('.movie-card').first().click()
      .get('.message')
        .contains('We\'re having issues on our end. Please try again later.')
  })
})
