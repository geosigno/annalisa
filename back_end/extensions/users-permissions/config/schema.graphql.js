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


// module.exports = {
//   mutation: `
//     updateUserMe(username: String): UsersPermissionsUser
//   `,
//   resolver: {
//     Mutation: {
//       updateUserMe: {
//         resolverOf: 'plugins::users-permissions.user.update',
//         async resolver(_, { username }) {
//           const entity = await strapi.services.users.findOne({ username });
//           return sanitizeEntity(entity, { model: strapi.models.users });
//         },
//       },
//     },
//   },
// }

// updateUser: {
//   description: 'Update an existing user',
//   resolverOf: 'plugins::users-permissions.user.update',
//   resolver: async (obj, options, { context }) => {
//     context.params = _.toPlainObject(options.input.where);
//     context.request.body = _.toPlainObject(options.input.data);

//     await strapi.plugins['users-permissions'].controllers.user.update(context);

//     return {
//       user: context.body.toJSON ? context.body.toJSON() : context.body,
//     };
//   },
// },
