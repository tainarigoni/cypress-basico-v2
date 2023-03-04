Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Tainá')
    cy.get('#lastName').type('Rigoni')
    cy.get('#email').type('tainarigoni@teste.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    
})