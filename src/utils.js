const Figma = require("figma-js");
const { get, matching, all, has } = require("shades");
const pickBy = require("lodash/pickBy");

const client = Figma.Client({
    personalAccessToken: process.env.FIGMA_TOKEN,
});

const { file, fileImages, comments, postComment, teamProjects } = client;

const cache = {};

const clearCache = id => delete cache[id];

const getFigma = (fn, id, params) =>
    new Promise((resolve, reject) => {
        const isParams = params ? { ...params } : null
        if (cache[id]) {
            console.log("hit from cache", id);
            resolve(cache[id]);
        } else {
            console.log("fetching", id);
            fn(id, isParams)
                .then(({ data }) => {
                    cache[id] = data;
                    console.log("stored", id);
                    resolve(data);
                })
                .catch(reject);
        }
    });

const loadFigma = id => getFigma(file, id)

const loadFigmaComments = id => getFigma(comments, id)

const loadFigmaImages = (id, params) => getFigma(fileImages, id, params)

const loadTeamprojects = id => getFigma(teamProjects, id)

const createComment = (id, params) => getFigma(postComment, id, params)

const getChildren = (data, path, match, ...rest) => {
    const matchString = match ? matching(has(match)) : all;
    const pathString = path ? path : "children";

    return get(pathString, matchString, ...rest)(data);
};

const getChildMatching = match => data => get("children", matching(has(match)))(data);

const removeEmpty = obj => pickBy(obj);

module.exports = {
    loadFigma,
    clearCache,
    getChildren,
    getChildMatching,
    removeEmpty,
    loadFigmaImages,
    loadFigmaComments,
    createComment,
    loadTeamprojects
};
