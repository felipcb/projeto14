/// <reference types="cypress" />
import contract from "../contracts/usuarios.contract"

describe('Testes da Funcionalidade Usuários', () => {
     let usuario = `Usuario Ebac ${Math.floor(Math.random() * 1000000)}`
     let email = `usuario${Math.floor(Math.random() * 1000000)}`

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contract.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               cy.log(response.body.usuarios)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": usuario,
                    "email": email + "@ebac.com.br",
                    "password": "teste",
                    "administrador": "true"
               },
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               cy.log(response.body._id)
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": usuario,
                    "email": "beatrizbarreto@ebac.com.br",
                    "password": "teste",
                    "administrador": "true"
               },
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[0]._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body: {
                         "nome": usuario + "1",
                         "email": email + "@" + email + "ebac.com.br",
                         "password": "teste",
                         "administrador": "true"
                    }
               }).then(response => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
               })
          })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[0]._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`
               }).then(response => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal("Registro excluído com sucesso")
               })
          })
     });
});
