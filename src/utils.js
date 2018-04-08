const Figma = require("figma-js");
const { get, matching, all, has } = require("shades");
const pickBy = require("lodash/pickBy");

const client = Figma.Client({
  personalAccessToken: process.env.FIGMA_TOKEN
});

const cache = {};

const clearCache = id => delete cache[id];

const loadFigma = id =>
  new Promise((resolve, reject) => {
    if (cache[id]) {
      console.log("hit from cache", id);
      resolve(cache[id]);
    } else {
      console.log("fetching", id);
      client
        .file(id)
        .then(({ data }) => {
          cache[id] = data;
          console.log("stored", id);
          resolve(data);
        })
        .catch(reject);
    }
  });

const getChildren = (data, path, match, ...rest) => {
  const matchString = match ? matching(has(match)) : all;
  const pathString = path ? path : "children";

  return get(pathString, matchString, ...rest)(data);
};

const getChildMatching = match => data =>
  get("children", matching(has(match)))(data);

const removeEmpty = obj => pickBy(obj);

module.exports = {
  loadFigma,
  clearCache,
  getChildren,
  getChildMatching,
  removeEmpty
};
