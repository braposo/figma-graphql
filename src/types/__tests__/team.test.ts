/* eslint-env jest */

import { graphql } from "graphql";
import { schema } from "../../schema";

const figmaFile = "cLp23bR627jcuNSoBGkhL04E";

jest.setTimeout(10000);

describe("Team query", () => {
    test("returns team name", async () => {
        const query = `
            query {
                team(id: "707291103567524770") {
                    name
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).not.toBeUndefined();

        const name = response.data?.team.name;
        expect(name).toBe("Figma-GraphQL");
    });

    test("returns projects", async () => {
        const query = `
            query {
                team(id: "707291103567524770") {
                    projects {
                        name
                    }
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).not.toBeUndefined();

        const projects = response.data?.team.projects;
        expect(projects).toHaveLength(3);
    });

    test("returns filtered projects", async () => {
        const query = `
            query {
                team(id: "707291103567524770") {
                    projects(name: "test") {
                        name
                    }
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).not.toBeUndefined();

        const projects = response.data?.team.projects;
        expect(projects).toHaveLength(1);
    });
});
