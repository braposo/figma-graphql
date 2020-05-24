import "reflect-metadata";
import { createTestClient, ApolloServerTestClient } from "apollo-server-testing";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { FigmaAPI } from "../../figma-datasource";
import resolvers from "../index";

jest.mock("../../figma-datasource");

describe("projects resolver", () => {
    let query: ApolloServerTestClient["query"];
    const figmaAPI = new FigmaAPI();
    const { getProjectDetails } = figmaAPI;

    beforeEach(async () => {
        const schema = await buildSchema({
            resolvers,
        });

        const server = new ApolloServer({
            schema,
            dataSources: () => ({ figmaAPI }),
        });

        query = createTestClient(server).query;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("resolves with correct data", async () => {
        const res = await query({
            query: gql`
                {
                    project(id: "project-1") {
                        id
                        name
                        files {
                            id
                        }
                    }
                }
            `,
        });

        expect(res.errors).toBeUndefined();
        expect(res.data?.project).toMatchInlineSnapshot(`
            Object {
              "files": Array [
                Object {
                  "id": "file-1",
                },
                Object {
                  "id": "file-2",
                },
                Object {
                  "id": "file-3",
                },
              ],
              "id": "project-1",
              "name": "Project 1",
            }
        `);
    });

    it("resolves simple fields without calling data source", async () => {
        const res = await query({
            query: gql`
                {
                    project(id: "project-1") {
                        id
                    }
                }
            `,
        });

        expect(res.errors).toBeUndefined();
        expect(getProjectDetails).toHaveBeenCalledTimes(0);
    });

    it("resolves complex fields with a data source call each time", async () => {
        const res = await query({
            query: gql`
                {
                    project(id: "project-1") {
                        name
                        files {
                            id
                        }
                    }
                }
            `,
        });

        expect(res.errors).toBeUndefined();
        expect(getProjectDetails).toHaveBeenCalledTimes(2);
    });
});
