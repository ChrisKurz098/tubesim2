const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');

const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');
const cors = require('cors')

const PORT = process.env.PORT || 3001;

const app = express();

// const corsOption = {
//   origin: '*',
//   credentials: true
// };

const server = new ApolloServer({

  typeDefs,
  resolvers,
  context: authMiddleware,
});
// cors: {
//   origin: '*',			// <- allow request from all domains with *
//   credentials: true},

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



 // Serve up static assets uncomment to run full app
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // server.applyMiddleware({ app, cors: false }); //needed to apply corsOption
  // app.use(cors(corsOption));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
  // Call the async function to start the server
  startApolloServer(typeDefs, resolvers);


