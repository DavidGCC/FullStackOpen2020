// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#loginButton').click()
})
Cypress.Commands.add('createBlog', (title, author, url) => {
    cy.contains('Create New Blog').click()
    cy.get('#titleInput').type(title)
    cy.get('#authorInput').type(author)
    cy.get('#urlInput').type(url)
    cy.get('#createButton').click()
})
