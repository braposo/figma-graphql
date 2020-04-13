/* eslint-env jest */

import { graphql } from "graphql";
import { schema } from "../../schema";

const figmaFile = "cLp23bR627jcuNSoBGkhL04E";

jest.setTimeout(10000);

describe("Project query", () => {
    test("returns id and name", async () => {
        const query = `
            query {
                project(id: "2482707") {
                    id
                    name
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).not.toBeUndefined();

        const { name, id } = response.data?.project;
        expect(id).toBe("2482707");
        expect(name).toBe("Test");
    });

    test("returns files", async () => {
        const query = `
        query {
            project(id: "2482707") {
                id
                name
                files {
                    name
                }
            }
        }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).not.toBeUndefined();

        const files = response.data?.project.files;
        expect(files).toHaveLength(3);
    });
});

describe("Team projects", () => {
    test("returns files", async () => {
        const query = `
            query {
                team(id: "707291103567524770") {
                    projects {
                        files {
                            name
                        }
                    }
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).not.toBeUndefined();

        const projects = response.data?.team.projects;
        expect(projects).toHaveLength(3);
        expect(projects[0].files).toHaveLength(5);
    });

    test("returns filtered files", async () => {
        const query = `
            query {
                team(id: "707291103567524770") {
                    projects {
                        files(name: "test") {
                            name
                        }
                    }
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).not.toBeUndefined();

        const projects = response.data?.team.projects;
        expect(projects).toHaveLength(3);
        expect(projects[0].files).toHaveLength(1);
    });
});
