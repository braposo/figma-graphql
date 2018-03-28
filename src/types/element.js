const { getChildren } = require("../utils");

exports.type = `
  type Element {
    id: String!
    name: String!
    type: String!
    blendMode: String!
    characters: String
    fill: Color
  }
`;


exports.resolvers = {
    Element: {
        fill: (root, args) => {
            return getChildren(root, "fills[0].color");
        },
    },
};
