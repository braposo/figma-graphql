/* eslint-env jest */
import { generateResolversForShortcuts, generateQueriesForShortcuts } from "../shortcuts";

describe("Shortcuts", () => {
    test("can generateResolversForShortcuts", () => {
        const resolvers = generateResolversForShortcuts();

        expect(resolvers).toMatchSnapshot();
    });

    test("can generateQueriesForShortcuts", () => {
        const queries = generateQueriesForShortcuts();

        expect(queries).toMatchSnapshot();
    });
});
