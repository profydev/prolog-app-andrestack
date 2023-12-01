import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects and the correct status in project cards", () => {
      const languageNames = ["React", "Node.js", "Python"];

      const expectedStatus = {
        error: "Critical",
        warning: "Warning",
        info: "Stable",
      };

      const expectedColor = {
        error: "rgb(180, 35, 24)",
        warning: "rgb(181, 71, 8)",
        info: "rgb(2, 122, 72)",
      };

      const expectedBackground = {
        error: "rgb(254, 243, 242)",
        warning: "rgb(255, 250, 235)",
        info: "rgb(236, 253, 243)",
      };

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          type StatusKey = "error" | "warning" | "info";
          const status: StatusKey = mockProjects[index].status as StatusKey;
          const projects = mockProjects[index];

          // check the color and text of the status badges
          cy.get("[data-testid='project-card_badge']")
            .eq(0)
            .should("have.text", expectedStatus.error)
            .should("have.css", "background-color", expectedBackground.error)
            .and("have.css", "color", expectedColor.error);
          cy.get("[data-testid='project-card_badge']")
            .eq(1)
            .should("have.text", expectedStatus.warning)
            .should("have.css", "background-color", expectedBackground.warning)
            .and("have.css", "color", expectedColor.warning);

          cy.get("[data-testid='project-card_badge']")
            .eq(2)
            .should("have.text", expectedStatus.info)
            .should("have.css", "background-color", expectedBackground.info)
            .and("have.css", "color", expectedColor.info);

          // check that project data is rendered
          cy.wrap($el).contains(projects.name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(projects.numIssues);
          cy.wrap($el).contains(projects.numEvents24h);
          cy.wrap($el).contains(expectedStatus[status]);
          // cy.wrap($el).contains(capitalize(mockProjects[index].status));
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });
});
