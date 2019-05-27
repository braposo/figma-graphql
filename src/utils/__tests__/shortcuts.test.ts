/* eslint-env jest */
import { generateResolversForShortcuts, generateQueriesForShortcuts } from "../shortcuts";

describe("Shortcuts", () => {
    test("can generateResolversForShortcuts", async () => {
        const resolvers = generateResolversForShortcuts();

        expect(resolvers).toMatchSnapshot();
    });

    test("can generateQueriesForShortcuts", async () => {
        const queries = generateQueriesForShortcuts();

        expect(queries).toMatchSnapshot();
    });
});
