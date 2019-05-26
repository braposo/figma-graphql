const Figma = require("figma-js");
const { processNodes, groupNodes } = require("./nodes");

const client = Figma.Client({
    personalAccessToken: process.env.FIGMA_TOKEN,
});

const { file, fileImages, comments, postComment, teamProjects, projectFiles } = client;

function getFigma(label, fn, id, params) {
    return new Promise((resolve, reject) => {
        const withParams = params ? { ...params } : null;

        // eslint-disable-next-line no-console
        console.log("fetching", label, id);
        fn(id, withParams)
            .then(({ data }) => {
                if (label === "file") {
                    const { name, lastModified, thumbnailUrl, version, document, styles } = data;

                    const [processedNodes, processedShortcuts] = processNodes(document, styles, id);

                    const result = {
                        fileId: id,
                        name,
                        lastModified,
                        thumbnailUrl,
                        version,
                        children: processedNodes,
                        shortcuts: groupNodes(processedShortcuts),
                    };

                    resolve(result);
                } else {
                    resolve(data);
                }
            })
            .catch(reject);
    });
}

exports.loadFile = id => getFigma("file", file, id, null);

exports.loadComments = id => getFigma("comments", comments, id, null);

exports.loadImages = (id, params) => getFigma("images", fileImages, id, params);

exports.loadTeamProjects = id => getFigma("projects", teamProjects, id);

exports.loadProjectFiles = id => getFigma("projectFiles", projectFiles, id);

exports.createComment = (id, params) => getFigma("postComment", postComment, id, params);
