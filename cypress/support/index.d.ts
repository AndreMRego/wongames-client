/* eslint-disable @typescript-eslint/no-namespace */
// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

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
  }
}
