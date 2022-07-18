const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    stats: [Stats]
  }

  type Stats {
    _id: ID
    lastCh: Int
  currentCh: Int
  volume: Int
  horShift: Int
  vertShift: Int
  horSize: Float
  vertSize: Float
  watched: [[Int]]
  channels: [Channels]
  }

  type Channels {
    _id: ID
    name: String
    list: [String]
    episodes: Int
    randomPoint: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    stats(_id: ID!): Stats
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String! ): Auth
    updateUserStats(localStats: String!): Stats
  }
`;

module.exports = typeDefs;
