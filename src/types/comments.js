const { loadFigmaComments, getChildren, createComment } = require('../utils');

exports.type = `
    type User {
        handle: String,
        img_url: String
    }

    type Meta {
        node_id: String,
        node_offset: Position
    }

   input ComentParams {
        x: Float,
        y: Float
    }

    type Comment {
        id: ID,
        file_key: String,
        parent_id: String,
        user: User,
        created_at: String,
        resolved_at: String,
        message: String,
        client_meta: Meta,
        order_id: String

    }

    extend type Query {
        # Get Comments on a File
        comments(id: String!): [Comment]
    }

    extend type Mutation {
        addComment(id: String!, message: String!, params: ComentParams): Comment
    }
`;

exports.resolvers = {
  Query: {
    comments: (root, { id }) => loadFigmaComments(id).then(data => data.comments),
  },
  Mutation: {
    addComment: (root, { id, message, params }) =>
      createComment(id, { client_meta: { ...params }, message }).then(data => data),
  },
};
