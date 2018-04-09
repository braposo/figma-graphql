const { loadFigmaComments, createComment } = require("../utils");

exports.type = `
    type User {
        # user login
        handle: String
        # user avatar
        img_url: String
    }

    type Meta {
        # id of the node
        node_id: String
        # node offset in x and Y
        node_offset: Position
    }

   input ComentParams {
        # X position you want to place the comment
        x: Float
        # Y position you want to place the comment
        y: Float
    }

    # a single comment
    type Comment {
        # id of the comment
        id: ID!
        # file id containing the comment
        file_key: String
        # parent comment id
        parent_id: String
        # who posted the comment
        user: User!
        # when it was posted
        created_at: String
        # when it was resolved
        resolved_at: String
        # the actual message
        message: String!
        # some meta
        client_meta: Meta
        order_id: String

    }

    extend type Query {
        # Get Comments on a File
        comments(id: String!): [Comment]
    }

    extend type Mutation {
        # add a comment (id and message are required)
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
