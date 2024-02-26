describe("Footer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  it("footer container is visible", () => {
    cy.get("footer").should("be.visible");
  });

  it("footer container elements are visible", () => {
    cy.get("footer").find("div").should("be.visible");
  });
});
