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
    cy.get("#lastName")
      .as("campoSobrenome")
      .should("be.visible")
      .type("Sobrenome");
    cy.get("@campoSobrenome").should("have.value", "Sobrenome");
    cy.get("#email")
      .as("campoEmail")
      .should("be.visible")
      .type("emailteste@gmail.com");
    cy.get("@campoEmail").should("have.value", "emailteste@gmail.com");
    cy.get("#open-text-area")
      .as("campoAreaTexto")
      .should("be.visible")
      .type(longText, { delay: 0 });
    cy.get("@campoAreaTexto").invoke("val").should("not.be.empty");
    cy.contains("button", "Enviar").should("be.visible").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").as("campoNome").should("be.visible").type("Nome");
    cy.get("@campoNome").should("have.value", "Nome");
    cy.get("#lastName")
      .as("campoSobrenome")
      .should("be.visible")
      .type("Sobrenome");
    cy.get("@campoSobrenome").should("have.value", "Sobrenome");
    cy.get("#email")
      .as("campoEmail")
      .should("be.visible")
      .type("emailtestegmail.com");
    cy.get("@campoEmail").should("have.value", "emailtestegmail.com");
    cy.get("#open-text-area")
      .as("campoAreaTexto")
      .should("be.visible")
      .type("Lorem ipsum dolor sit amet", { delay: 0 });
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
    cy.get("#lastName")
      .as("campoSobrenome")
      .should("be.visible")
      .type("Sobrenome");
    cy.get("@campoSobrenome").should("have.value", "Sobrenome");
    cy.get("#email")
      .as("campoEmail")
      .should("be.visible")
      .type("emailteste@gmail.com");
    cy.get("@campoEmail").should("have.value", "emailteste@gmail.com");
    cy.get("#phone-checkbox")
      .as("caixaSelecaoTelefone")
      .should("be.visible")
      .check();
    cy.get("@caixaSelecaoTelefone").should("be.checked");
    cy.get("#open-text-area")
      .as("campoAreaTexto")
      .should("be.visible")
      .type("Lorem ipsum ");
    cy.get("@campoAreaTexto").invoke("val").should("not.be.empty");
    cy.contains("button", "Enviar").should("be.visible").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").as("campoNome").should("be.visible").type("Nome");
    cy.get("@campoNome").should("have.value", "Nome");
    cy.get("@campoNome").clear().should("have.value", "");
    cy.get("#lastName")
      .as("campoSobrenome")
      .should("be.visible")
      .type("Sobrenome");
    cy.get("@campoSobrenome").should("have.value", "Sobrenome");
    cy.get("@campoSobrenome").clear().should("have.value", "");
    cy.get("#email")
      .as("campoEmail")
      .should("be.visible")
      .type("emailteste@gmail.com");
    cy.get("@campoEmail").should("have.value", "emailteste@gmail.com");
    cy.get("@campoEmail").clear().should("have.value", "");
    cy.get("#open-text-area")
      .as("campoAreaTexto")
      .should("be.visible")
      .type("Lorem ipsum ");
    cy.get("@campoAreaTexto").invoke("val").should("not.be.empty");
    cy.get("@campoAreaTexto").clear().should("have.value", "");
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
  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.selectProductAndCheckVisibility().select("YouTube");
    cy.get("@productSelect").should("have.value", "youtube");
  });
  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.selectProductAndCheckVisibility().select("mentoria");
    cy.get("@productSelect").should("have.value", "mentoria");
  });
  it("seleciona um produto (Blog) por seu índice", () => {
    cy.selectProductAndCheckVisibility().select(1);

    cy.get("@productSelect").should("have.value", "blog");
  });
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .as("radioFeedback")
      .should("be.visible")
      .check();

    cy.get("@radioFeedback").should("be.checked");
  });
  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });
  });
  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .as("inputsCheckbox")
      .should("be.visible")
      .check();

    cy.get("@inputsCheckbox").should("be.checked");

    cy.get("@inputsCheckbox").last().uncheck();

    cy.get("@inputsCheckbox").last().should("not.be.checked");
  });
  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json", { encoding: null }).as("exampleFile");
    cy.get("#file-upload")
      .selectFile("@exampleFile")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");
  });
  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "href", "privacy.html")
      .invoke("removeAttr", "target")
      .click();

    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible");
  });
});
