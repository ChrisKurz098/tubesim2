const { AuthenticationError } = require('apollo-server-express');
const { User, Stats } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')

    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
    },
    stats: async (parent, { _id }) => {
      return Stats.findOne({ _id })
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      //add all the basic user data plus set stats to default values
      //stats as an empty object populates with default values
      const user = await User.create({...args, stats: {}});
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    updateUserStats: async (parent, { localStats }, context) => {
   //locatStats sent as JSON string to avoid type miss match
      const parsedStats = JSON.parse(localStats);
  
      if (context.user) {
        const username = context.user.username;
      //The idea is to save all stats in local storage and only load them back to the server when the page closes or a request is made to update (save)
      const data = await User.findOneAndUpdate(
        { username },
        {
          stats: parsedStats
        }
      ).select('-__v -password');
        console.log(`--------Local User Data For ${data.username} Saved-----------`);
      return data;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
