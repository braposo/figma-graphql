import "reflect-metadata";
import { createTestClient, ApolloServerTestClient } from "apollo-server-testing";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { FigmaAPI } from "../../figma-datasource";
import resolvers from "../index";

jest.mock("../../figma-datasource");

describe("teams resolver", () => {
    let query: ApolloServerTestClient["query"];
    const figmaAPI = new FigmaAPI();
    const { getTeamDetails } = figmaAPI;

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
                    team(id: "team-1") {
                        id
                        name
                        projects {
                            id
                        }
                    }
                }
            `,
        });

        expect(res.errors).toBeUndefined();
        expect(res.data?.team).toMatchInlineSnapshot(`
            Object {
              "id": "team-1",
              "name": "Team Name",
              "projects": Array [
                Object {
                  "id": "project-1",
                },
                Object {
                  "id": "project-2",
                },
                Object {
                  "id": "project-3",
                },
              ],
            }
        `);
    });

    it("resolves simple fields without calling data source", async () => {
        const res = await query({
            query: gql`
                {
                    team(id: "team-1") {
                        id
                    }
                }
            `,
        });

        expect(res.errors).toBeUndefined();
        expect(getTeamDetails).toHaveBeenCalledTimes(0);
    });

    it("resolves complex fields with a data source call each time", async () => {
        const res = await query({
            query: gql`
                {
                    team(id: "team-1") {
                        name
                        projects {
                            id
                        }
                    }
                }
            `,
        });

        expect(res.errors).toBeUndefined();
        expect(getTeamDetails).toHaveBeenCalledTimes(2);
    });
});
