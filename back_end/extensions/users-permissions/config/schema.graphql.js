module.exports = {
  query: `
      self: UsersPermissionsUser
  `,
  resolver: {
      Query: {
          self: {
              resolver: 'plugins::users-permissions.user.me'
          },
      },
  }
}


module.exports = {
  query: `
    updateUserMe(id: ID slug: String): UsersPermissionsUser
  `,
  resolver: {
    Query: {
      updateUserMe: {
        resolverOf: 'User.updateme',
        async resolver(_, { slug }) {
          const entity = await strapi.services.categories.findOne({ slug });
          return sanitizeEntity(entity, { model: strapi.models.categories });
        },
      },
    },
  },
};
