const {User, Thought} = require('../models');

const resolvers = {
    Query: {
        // all thoughts
        thoughts: async (parent, {username}) => {
            const params = username ? {username} : {};
            return Thought.find(params).sort({createdAt: -1});
        },

        // thought by id
        thought: async(parent, {_id}) => {
            return Thought.findOne({_id});
        },

        // all users
        users: async () => {
            return User.find()
             .select('-__v -password')
             .populate('friends')
             .populate('thoughts');
        },

        // user by username
        user: async (parent, {username}) => {
            return User.findOne({username})
             .select('-__v -password')
             .populate('friends')
             .populate('thoughts');
        }
    }
};

module.exports = resolvers;