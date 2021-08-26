const {Users} = require('./data')

const resolvers = {
  users: async (_) =&gt;; {
    return Users;
  },
  user: async ({ id }, context) =&gt;; {
    return Users.find((user) =&gt;; user.id == id)
  }
};

module.exports = resolvers;
