const Figma = require("figma-js");
const { get, matching, all, has } = require("shades");
const pickBy = require("lodash/pickBy");

const client = Figma.Client({
    personalAccessToken: process.env.FIGMA_TOKEN,
});

const { file, fileImages, comments, postComment, teamProjects, projectFiles } = client;

const getFigma = (fn, id, params) =>
    new Promise((resolve, reject) => {
        const isParams = params ? { ...params } : null;
        console.log("fetching", id, isParams);
        fn(id, isParams)
            .then(({ data }) => {
                resolve(data);
            })
            .catch(reject);
    });

const loadFigma = id => getFigma(file, id);

const loadFigmaComments = id => getFigma(comments, id);

const loadFigmaImages = (id, params) => getFigma(fileImages, id, params);

const loadTeamProjects = id => getFigma(teamProjects, id);

const loadProjectFiles = id => getFigma(projectFiles, id);

const createComment = (id, params) => getFigma(postComment, id, params);

const getChildren = (data, path, match, ...rest) => {
    const matchString = match ? matching(has(match)) : all;
    const pathString = path || "children";

    return get(pathString, matchString, ...rest)(data);
};

const getChildMatching = match => data => get("children", matching(has(match)))(data);

const removeEmpty = obj => pickBy(obj);

const getPosition = root => ({
    x: getChildren(root, "absoluteBoundingBox.x"),
    y: getChildren(root, "absoluteBoundingBox.y"),
});

const getSize = root => ({
    width: getChildren(root, "absoluteBoundingBox.width"),
    height: getChildren(root, "absoluteBoundingBox.height"),
});

const getFill = root => getChildren(root, "fills[0].color");

module.exports = {
    loadFigma,
    getChildren,
    getChildMatching,
    removeEmpty,
    loadFigmaImages,
    loadFigmaComments,
    createComment,
    loadTeamProjects,
    loadProjectFiles,
    getPosition,
    getSize,
    getFill,
};
