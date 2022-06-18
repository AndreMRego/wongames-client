/// <reference types="cypress" />

// Add Testing Library Commands
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('google', () => cy.visit('https://google.com'));

Cypress.Commands.add('shouldRenderBanner', () => {
  cy.get('.slick-slider').within(() => {
    cy.findByRole('heading', { name: /cyberpunk 2077/i })
    cy.findByRole('link', { name: /buy now/i })

    cy.get('.slick-dots > :nth-child(2) > button').click()
    cy.wait(500)

    cy.findByRole('heading', { name: /horizon zero dawn/i })
    cy.findAllByRole('link', { name: /buy now/i })

    cy.get('.slick-dots > :nth-child(3) > button').click()
    cy.wait(500)

    cy.findByRole('heading', { name: /huge promotion!/i })
    cy.findByRole('link', { name: /browse all games/i })
  })
})

Cypress.Commands.add('shouldRenderShowcase', ({ name, highlight = false, hasGames = false }) => {
  cy.get(`[data-cy="${name}"]`).within(() => {
    cy.findByRole('heading', { name }).should('exist');

    cy.get(`[data-cy="highlight"]`).should(highlight ? 'exist' : 'not.exist')

    if (highlight) {
      cy.get(`[data-cy="highlight"]`).within(() => {
        cy.findByRole('link').should('have.attr', 'href')
      })
    }

    cy.get(`[data-cy="gamecard"]`).should( hasGames ? 'have.length.gt' : 'have.length', 0)
  })
})
