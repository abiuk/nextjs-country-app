describe("Home page", () => {
  it("should render page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Countries App");
  });

  it("should go to country details page", () => {
    cy.get(":nth-child(1) > .CountryCard__AElement-sc-187yvkl-2").click();
  });
});
