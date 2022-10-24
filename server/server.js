const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');
const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');

const cors = require('cors')
const {json} = require('body-parser')

const PORT = process.env.PORT || 3001;

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
};

const server = new ApolloServer({
  cors: {
    origin: ["*"],
    preflightContinue: true,
    allowedHeaders: true
  },
  typeDefs,
  resolvers,
  context: authMiddleware,
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // server.applyMiddleware({
  //   cors: corsOptions,
  // });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
  // Call the async function to start the server
  startApolloServer(typeDefs, resolvers);


