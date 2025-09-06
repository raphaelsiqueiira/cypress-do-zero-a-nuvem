Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  (
    data = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@gmail.com",
      text: "Teste com cypress",
    }
  ) => {
    cy.get("#firstName")
      .as("campoNome")
      .should("be.visible")
      .type(data.firstName);
    cy.get("@campoNome").should("have.value", data.firstName);
    cy.get("#lastName")
      .as("campoSobrenome")
      .should("be.visible")
      .type(data.lastName);
    cy.get("@campoSobrenome").should("have.value", data.lastName);
    cy.get("#email").as("campoEmail").should("be.visible").type(data.email);
    cy.get("@campoEmail").should("have.value", data.email);
    cy.get("#open-text-area")
      .as("campoAreaTexto")
      .should("be.visible")
      .type(data.text);
    cy.get("@campoAreaTexto").invoke("val").should("not.be.empty");
    cy.contains("button", "Enviar").should("be.visible").click();
  }
);

Cypress.Commands.add("selectProductAndCheckVisibility", () => {
  cy.get("select#product").as("productSelect").should("be.visible");
});
