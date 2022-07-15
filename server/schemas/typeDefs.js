const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
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
    randomPont: Boolean
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
    stats(_id: ID!): Stats
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String! ): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
    updateUserStats(localStats: String!): Stats
  }
`;

module.exports = typeDefs;
