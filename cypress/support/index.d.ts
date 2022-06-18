/* eslint-disable @typescript-eslint/no-namespace */
// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

type ShowcaseAttributes = {
  name: string;
  highlight?: boolean;
  hasGames?: boolean;
}
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to visit google page.
     * @example cy.google()
     */
    google(): Chainable<AUTWindow>;

    /**
     * Custom command to check banner in page
     * @example cy.shouldRenderBanner()
     */
    shouldRenderBanner(): Chainable<Element>;

    /**
     * Custom command to check showcase in page
     * @example cy.shouldRenderBanner()
     */
    shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Element>;
  }
}
