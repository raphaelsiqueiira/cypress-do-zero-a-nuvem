/// <reference types="cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = Cypress._.repeat("Lorem", 20);
    cy.get("#firstName").as("campoNome").should("be.visible").type("Nome");
    cy.get("@campoNome").should("have.value", "Nome");
    cy.get("#lastName").as("campoSobrenome").should("be.visible").type("Sobrenome");
    cy.get("@campoSobrenome").should("have.value", "Sobrenome");
    cy.get("#email").as("campoEmail").should("be.visible").type("emailteste@gmail.com");
    cy.get("@campoEmail").should("have.value", "emailteste@gmail.com");
    cy.get("#open-text-area").as("campoAreaTexto").should("be.visible").type(longText, { delay: 0 });
    cy.get("@campoAreaTexto").invoke("val").should("not.be.empty");
    cy.contains("button", "Enviar").should("be.visible").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").as("campoNome").should("be.visible").type("Nome");
    cy.get("@campoNome").should("have.value", "Nome");
    cy.get("#lastName").as("campoSobrenome").should("be.visible").type("Sobrenome");
    cy.get("@campoSobrenome").should("have.value", "Sobrenome");
    cy.get("#email").as("campoEmail").should("be.visible").type("emailtestegmail.com");
    cy.get("@campoEmail").should("have.value", "emailtestegmail.com");
    cy.get("#open-text-area").as("campoAreaTexto").should("be.visible").type("Lorem ipsum dolor sit amet", { delay: 0 });
    cy.get("@campoAreaTexto").invoke("val").should("not.be.empty");
    cy.contains("button", "Enviar").should("be.visible").click();

    cy.get(".error").should("be.visible");
  });

  it("passando valor não-numérico para o campo de telefone", () => {
    cy.get("#phone").as("campoTelefone").should("be.visible").type("letras");

    cy.get("@campoTelefone").invoke("val").should("be.empty");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").as("campoNome").should("be.visible").type("Nome");
    cy.get("@campoNome").should("have.value", "Nome");
    cy.get("#lastName").as("campoSobrenome").should("be.visible").type("Sobrenome");
    cy.get("@campoSobrenome").should("have.value", "Sobrenome");
    cy.get("#email").as("campoEmail").should("be.visible").type("emailteste@gmail.com");
    cy.get("@campoEmail").should("have.value", "emailteste@gmail.com");
    cy.get("#phone-checkbox").as("caixaSelecaoTelefone").should("be.visible").click();
    cy.get("@caixaSelecaoTelefone").should("be.checked");
    cy.get("#open-text-area").as("campoAreaTexto").should("be.visible").type("Lorem ipsum ");
    cy.get("@campoAreaTexto").invoke("val").should("not.be.empty");
    cy.contains("button", "Enviar").should("be.visible").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").as("campoNome").should("be.visible").type("Nome");
    cy.get("@campoNome").should("have.value", "Nome");
    cy.get("@campoNome").clear().should("be.empty");
    cy.get("#lastName").as("campoSobrenome").should("be.visible").type("Sobrenome");
    cy.get("@campoSobrenome").should("have.value", "Sobrenome");
    cy.get("@campoSobrenome").clear().should("be.empty");
    cy.get("#email").as("campoEmail").should("be.visible").type("emailteste@gmail.com");
    cy.get("@campoEmail").should("have.value", "emailteste@gmail.com");
    cy.get("@campoEmail").clear().should("be.empty");
    cy.get("#open-text-area").as("campoAreaTexto").should("be.visible").type("Lorem ipsum ");
    cy.get("@campoAreaTexto").invoke("val").should("not.be.empty");
    cy.get("@campoAreaTexto").clear().should("be.empty");
    cy.contains("button", "Enviar").should("be.visible").click();

    cy.get(".error").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").should("be.visible").click();

    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    const data = {
      firstName: "Fulano",
      lastName: "de Tal",
      email: "usuarioteste@gmail.com",
      text: "Teste com Cypress",
    };
    cy.fillMandatoryFieldsAndSubmit(data);

    cy.get(".success").should("be.visible");
  });
});
