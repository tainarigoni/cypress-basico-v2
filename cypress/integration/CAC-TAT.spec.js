/* <reference types="Cypress" />*/

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
})
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, teste, teste, teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste.'
        cy.get('#firstName').type('Tainá')
        cy.get('#lastName').type('Rigoni')
        cy.get('#email').type('tainarigoni@teste.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('Verifica email inválido', function(){
        cy.get('#firstName').type('Tainá')
        cy.get('#lastName').type('Rigoni')
        cy.get('#email').type('tainarigoni@teste,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('Compo telefone continua vazio quando preenchido com valor não númerico', function(){
        cy.get('#phone')
        .type('abcdefgh')
        .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se tornar obrigatório mas não é preenchido', function(){
        cy.get('#firstName').type('Tainá')
        cy.get('#lastName').type('Rigoni')
        cy.get('#email').type('tainarigoni@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })
   
    it('Preenche e limpar os campos nome, sobrenome, email e telefone', function(){

        cy.get('#firstName')
            .type('Tainá')
            .should('have.value', 'Tainá')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
             .type('Rigoni')
             .should('have.value', 'Rigoni')
             .clear()
             .should('have.value', '')  

        cy.get('#email')
            .type('tainarigoni@teste.com')
            .should('have.value', 'tainarigoni@teste.com')
            .clear()
            .should('have.value', '')
        
         cy.get('#phone')
            .type('4899999999')
            .should('have.value', '4899999999')
            .clear()
            .should('have.value', '')

            cy.get('#open-text-area')
            .type('Teste, teste, teste')    
            .should('have.value', 'Teste, teste, teste')
            .clear()
            .should('have.value', '')

        })

    it('exibe mensagem de erro ao submeter formulario sem preencher os campos obrigatórios', function(){

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('envia formulario com sucesso usando um comando customizado', function(){

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto (YouTube) por seu texto', function(){

        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube')
    })

    it('Seleciona um produto (Mentoria) poelo seu valor', function(){

        cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')
    })
    it('Seleciona um produto (Blog) poelo seu indice', function(){

        cy.get('#product')
            .select(1)
            .should('have.value','blog')
    })
    it('Marcar tipo de atendimento Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
        })

    it('Marcar cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })

    it('Marcar ambos checkboxes, depois desmarcar o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Seleciona um arquivo da pasta fixtires', function(){
        cy.get('input[type="file"')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('Seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica que a politica de privacidade abre em outra aba sem necessedidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

   it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })

  })
  
