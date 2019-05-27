/* eslint-env jest */
const { generateResolversForShortcuts, generateQueriesForShortcuts } = require("../shortcuts");

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
