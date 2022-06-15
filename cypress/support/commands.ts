/// <reference types="cypress" />

// Add Testing Library Commands
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('google', () => cy.visit('https://google.com'));
