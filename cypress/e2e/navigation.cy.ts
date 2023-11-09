describe("Sidebar Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("links are working", () => {
      // check that each link leads to the correct page
      cy.get("nav")
        .contains("Projects")
        .should("have.attr", "href", "/dashboard");

      cy.get("nav")
        .contains("Issues")
        .should("have.attr", "href", "/dashboard/issues");

      cy.get("nav")
        .contains("Alerts")
        .should("have.attr", "href", "/dashboard/alerts");

      cy.get("nav")
        .contains("Users")
        .should("have.attr", "href", "/dashboard/users");

      cy.get("nav")
        .contains("Settings")
        .should("have.attr", "href", "/dashboard/settings");
    });

    it("is collapsible", () => {
      // collapse navigation
      cy.get("nav").contains("Collapse").click();

      // check that links still exist and are functionable
      cy.get("nav").find("a").should("have.length", 5).eq(1).click();
      cy.url().should("eq", "http://localhost:3000/dashboard/issues");

      // check that text is not rendered
      cy.get("nav").contains("Issues").should("not.exist");
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });

    function isInViewport(el: string) {
      cy.get(el).then(($el) => {
        // navigation should cover the whole screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.right).to.be.equal(rect.width);
        expect(rect.left).to.be.equal(0);
      });
    }

    function isNotInViewport(el: string) {
      cy.get(el).then(($el) => {
        // naviation should be outside of the screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.left).to.be.equal(-rect.width);
        expect(rect.right).to.be.equal(0);
      });
    }

    it("toggles sidebar navigation by clicking the menu icon", () => {
      // wait for animation to finish
      cy.wait(500);
      isNotInViewport("nav");

      // open mobile navigation
      cy.get("img[alt='open menu']").click();

      // wait for animation to finish
      cy.wait(500);
      isInViewport("nav");

      // check that all links are rendered
      cy.get("nav").find("a").should("have.length", 5);

      // Support button should be rendered but Collapse button not
      cy.get("nav").contains("Support").should("exist");
      cy.get("nav").contains("Collapse").should("not.be.visible");

      // close mobile navigation and check that it disappears
      cy.get("img[alt='close menu']").click();
      cy.wait(500);
      isNotInViewport("nav");
    });

    //write a test that checks that the support button forwards you to the mailto link

    it("client email app opens when clicking support button", () => {
      cy.get(
        "a[href='mailto:support@prolog-app.com?Subject=Support%20Request']",
      ).click();
      cy.url().should(
        "include",
        "mailto:support@prolog-app.com?Subject=Support%20Request",
      );
    });
  });
});
