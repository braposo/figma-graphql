import "reflect-metadata";
import { createTestClient, ApolloServerTestClient } from "apollo-server-testing";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { FigmaAPI } from "../../figma-datasource";
import resolvers from "../index";

jest.mock("../../figma-datasource");

describe("files resolver", () => {
    let query: ApolloServerTestClient["query"];
    const figmaAPI = new FigmaAPI();
    const { getFileDetails } = figmaAPI;

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
                    file(id: "file-1") {
                        name
                        lastModified
                        version
                        thumbnailUrl
                        id
                    }
                }
            `,
        });

        expect(res.errors).toBeUndefined();
        expect(res.data?.file).toMatchInlineSnapshot(`
            Object {
              "id": "file-1",
              "lastModified": "2019-05-06T18:02:49.000Z",
              "name": "File 1",
              "thumbnailUrl": "url_1",
              "version": "version 1",
            }
        `);
    });

    it("resolves simple fields without calling data source", async () => {
        const res = await query({
            query: gql`
                {
                    file(id: "file-1") {
                        id
                    }
                }
            `,
        });

        expect(res.errors).toBeUndefined();
        expect(getFileDetails).toHaveBeenCalledTimes(0);
    });

    it("resolves complex fields with a data source call each time", async () => {
        const res = await query({
            query: gql`
                {
                    file(id: "file-1") {
                        name
                        lastModified
                        version
                        thumbnailUrl
                    }
                }
            `,
        });

        expect(res.errors).toBeUndefined();
        expect(getFileDetails).toHaveBeenCalledTimes(4);
    });
});
