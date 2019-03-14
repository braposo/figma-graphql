const { PubSub } = require("apollo-server-express");
const { loadFigma, getChildren } = require("../utils");

const pubsub = new PubSub();

exports.type = `
    # Information about a file
    type File {
        # name of the file
        name: String!
        # date the file was last modified
        lastModified: DateTime
        # the url to a thumbnail of the file
        thumbnailUrl: String
        # list of components in this file
        components: [String]
        # list of pages in this file
        pages(name: String): [Page!]
    }

    extend type Query {
        # get a file information
        file(id: String!): File
    }
    
    extend type Subscription {
        lastModified: DateTime
    }
`;

const FILE_MODIFIED = "FILE_MODIFIED";
let poller;

async function handlePoller(id, prevModified) {
    const data = await loadFigma(id);
    const { lastModified } = data;
    if (prevModified !== lastModified) {
        console.log("Trigger update!");
        console.log(lastModified);
        pubsub.publish(FILE_MODIFIED, { lastModified });
    }
}

exports.resolvers = {
    Query: {
        file: async (root, { id }) => {
            // Trigger the polling
            const data = await loadFigma(id);
            const currentModified = data.lastModified;
            if (poller) {
                clearInterval(poller);
            }
            poller = setInterval(() => handlePoller(id, currentModified), 5000);
            return data;
        },
    },
    File: {
        pages: (root, { name }) => {
            if (name) {
                return getChildren(root, "document.children", { name });
            }

            return getChildren(root, "document.children");
        },
    },
    Subscription: {
        lastModified: {
            subscribe: () => pubsub.asyncIterator([FILE_MODIFIED]),
        },
    },
};
