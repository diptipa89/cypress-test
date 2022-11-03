describe("Homepage > Header elements", () => {
  it("User is able to visit the site", () => {
    cy.visit("https://www.bbc.co.uk/news");
  });

  it("User is able to see sign in button", () => {
    cy.get("#idcta-link").should("be.visible");
  });

})
describe("Sign In", () => {
  it("User is able to visit the site", () => {
    cy.visit("https://www.bbc.co.uk/news");
  });

  it("User is able to see sign in button", () => {
    cy.get("#idcta-link").should("be.visible");
  });

  it("User is able to click on sign in button", () => {
    cy.get("#idcta-link").click();
  });

  it("User is able to move to signIn page", () => {
    cy.location("pathname", { timeout: 60000 }).should("include", "/signin");
    cy.title().should("eq", "BBC – Sign in");
  });

  it("User is able to see all elements on sign in page", () => {
    cy.get("#user-identifier-input").should("be.visible");
    cy.get("#username-label > span")
      .should("be.visible")
      .contains("Email or username");

    cy.get("#password-input").should("be.visible");
    cy.get("#password-label > span").should("be.visible").contains("Password");

    cy.get("#submit-button").should("be.visible");
    cy.get("#submit-button > span").contains("Sign in");

    cy.get(".sb-link.sb-link--primary")
      .eq(0)
      .get("span")
      .contains("Need help signing in?");
  });

  it("User is able to see field errors", () => {
    cy.get("#user-identifier-input").type("test").clear();
    cy.get("#password-input").type("@@££");
    cy.get("#submit-button").click();

    cy.get("#form-message-username").contains(
      "Something's missing. Please check and try again."
    );
    cy.get("#form-message-password").contains(
      "Sorry, that password is too short. It needs to be eight characters or more."
    );
  });

  it("User is not able to login after wrong password", () => {
    cy.get("#password-input").clear().type("@@££@@££");
    cy.get("#submit-button").click();

    cy.get("#form-message-password").contains(
      "Sorry, that password isn't valid. Please include a letter."
    );
  });
});
