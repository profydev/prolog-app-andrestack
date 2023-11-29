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

      const statusMapping = {
        error: {
          background: "rgba(254, 243, 242, 1)",
          color: "rgba(180, 35, 24, 1)",
          text: "Critical",
        },
        warning: {
          background: "rgba(255, 250, 235, 1)",
          color: "rgba(181, 71, 8, 1)",
          text: "Warning",
        },
        info: {
          background: "rgba(236, 253, 243, 1)",
          color: "rgba(2, 122, 72, 1)",
          text: "Stable",
        },
      };

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          type StatusKey = "error" | "warning" | "info";
          const status: StatusKey = mockProjects[index].status as StatusKey;
          const { background, color, text } = statusMapping[status];
          const projects = mockProjects[index];
          // check the color and text of the status badge
          cy.wrap($el)
            .find(".status-badge")
            .should("have.css", "background-color", background)
            .and("have.css", "color", color)
            .and("contain", text);

          // check that project data is rendered
          cy.wrap($el).contains(projects.name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(projects.numIssues);
          cy.wrap($el).contains(projects.numEvents24h);
          cy.wrap($el).contains(projects.status);
          // cy.wrap($el).contains(capitalize(mockProjects[index].status));
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });
});
