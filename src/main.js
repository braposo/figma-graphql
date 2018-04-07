require('dotenv').config();

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { loadFigma, clearCache } = require('./utils');

const { schema, context } = require('./schema');

const PORT = 3001;

const getColours = data => get('children', all, 'fills[0].color')(data);

// Get figma API response (just for testing)
app.get('/figma/:id', (req, res) => {
  const { id } = req.params;
  loadFigma(id)
    .then(data => {
      res.json(data);
    })
    .catch(e => console.log(e));
});

// Clears cache for specific figma file
app.get('/clear/:id', (req, res) => {
  const { id } = req.params;
  clearCache(id);

  res.status(200).send('Cache cleared');
});

// GraphQL endpoint
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    // GraphQL’s data schema
    schema,
    // Pretty Print the JSON response
    pretty: true,
    // Enable GraphiQL dev tool
    graphiql: false,
    context: context(req)
  }))
);

// Show GraphiQL for everything else!
app.get(
  '*',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
