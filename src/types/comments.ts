import { gql } from "apollo-server-express";
import { loadComments, createComment } from "../utils/figma";

export const type = gql`
    type User {
        # user login
        handle: String
        # user avatar
        img_url: String
    }

    type FrameOffset {
        # Unique id specifying the frame.
        node_id: ID!

        # 2d vector offset within the frame.
        node_offset: Position
    }

    input CommentParams {
        # X position you want to place the comment
        x: Float
        # Y position you want to place the comment
        y: Float
    }

    # union Meta = Position | FrameOffset

    # a single comment
    type Comment {
        # id of the comment
        id: ID!

        # The position of the comment. Either the absolute coordinates on the canvas or a relative offset within a frame
        client_meta: FrameOffset

        # The file in which the comment lives
        file_key: String

        # If present, the id of the comment to which this is the reply
        parent_id: String

        # The user who left the comment
        user: User!

        # The UTC ISO 8601 time at which the comment was left
        created_at: DateTime

        # If set, the UTC ISO 8601 time the comment was resolved
        resolved_at: DateTime

        # Only set for top level comments. The number displayed with the comment in the UI
        order_id: Int

        # the actual message
        message: String!
    }

    extend type Query {
        # Get Comments on a File
        comments(id: ID!): [Comment]
    }

    extend type Mutation {
        # add a comment (id and message are required)
        addComment(id: ID!, message: String!, params: CommentParams): Comment
    }
`;

export const resolvers = {
    Query: {
        comments: (root, { id }) => loadComments(id).then(({ comments }) => comments),
    },
    Mutation: {
        addComment: (root, { id, message, params }) =>
            createComment(id, { client_meta: { ...params }, message }).then(data => data),
    },
};
