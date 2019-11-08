context('Service now application', () => {
    beforeEach('turn off uncaught exception', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            console.log(err);
            return false
        })
    })
    it('Login', () => {
        cy.visit('https://dev62652.service-now.com/');
        cy.wait(30000)
        cy.get('input#user_name').type('admin');
    })
})