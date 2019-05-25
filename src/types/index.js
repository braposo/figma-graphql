const merge = require("lodash/merge");

/* eslint-disable global-require */
const typePaths = [
    require("./file"),
    require("./page"),
    require("./css"),
    require("./frame"),
    require("./node"),
    require("./vector"),
    require("./image"),
    require("./comments"),
    require("./projects"),
    require("./project-files"),
    require("./misc"),
    require("./helpers/style"),
    require("./helpers/constraint"),
    require("./helpers/effect"),
    require("./helpers/grid"),
    require("./helpers/text"),
];
/* eslint-enable */

/**
 * Since we would like to modularize our schema, we need a convenient way to combine
 * the types and their resolvers. This function will take each type file and merge
 * it's types and resolvers into an object that can be passed to makeExecutableSchema.
 *
 * The only requirement is that our type files expose named exports:
 * type, resolvers
 */
module.exports = ({ typeDefs: t, resolvers: r }) =>
    typePaths.reduce(
        ({ typeDefs, resolvers }, { type, resolvers: typeResolvers }) => ({
            typeDefs: [...typeDefs, type],
            resolvers: merge(resolvers, typeResolvers),
        }),
        {
            typeDefs: t,
            resolvers: r,
        }
    );
