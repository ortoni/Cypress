/// <reference types="Cypress" />
require('cypress-xpath')
context("First Cypress script", () => {
    beforeEach('turn off uncaught exception', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })
    it("Login into leaftaps", () => {
        cy.visit('http://leaftaps.com/opentaps/control/main')
        cy.title().then((title) => { console.log(`Title: ${title}`) })
        cy.title().should('contain', 'Leaftaps')
        cy.get('#username').type('DemoCSR')
        cy.get('#password').type('crmsfa')
        cy.get('.decorativeSubmit').click();
    })
    it('click on CRM/SFA', () => {
        cy.get('div#label > a').as('crm');
        cy.get('@crm').invoke('text').then((text) => {
            console.log('Link text is: ' + text.trim())
        });
        cy.get('@crm').click();
    })
    it('click on Leads', () => {
        cy.xpath("//a[@href='/crmsfa/control/leadsMain']").click();
        // cy.pause()
        cy.get('a').contains('Create Lead').should('contain.text', 'Create Lead').click();
    })
    const type = (locator, value) => cy.get(locator).type(value)
    it('Create a Lead by submitting form', () => {
        type('input#createLeadForm_companyName', 'TestLeaf')
        type('input#createLeadForm_firstName', 'Koushik')
        type('input#createLeadForm_lastName', 'Chatterjee')
        cy.get('.smallSubmit').click();
        cy.pause()
    })
    it('verify Lead is created', () => {
        cy.get('#viewLead_companyName_sp').should('contain.text', 'TestLeaf');
    })
})