/// <reference path="../support/index.d.ts" />

describe('Home Page', () => {
  it('should render home sections', () => {
    // visitar a página
    cy.visit('/');

    cy.shouldRenderBanner();

    cy.shouldRenderShowcase({
      name: 'New Games',
      highlight: false,
      hasGames: true

    });

    cy.shouldRenderShowcase({
      name: 'Most Popular Games',
      highlight: true,
      hasGames: true
    });

    cy.shouldRenderShowcase({
      name: 'Upcoming Games',
      highlight: true,
      hasGames: false
    });

    cy.shouldRenderShowcase({
      name: 'Free Games',
      highlight: true,
      hasGames: false
    });
  });
});
