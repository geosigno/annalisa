module.exports = {
  query: `
      self: UsersPermissionsUser
  `,
  mutation: `
    addFinishedCours(cours_finished: ID): UsersPermissionsUser!
  `,
  resolver: {
      Query: {
          self: {
              resolver: 'plugins::users-permissions.user.me'
          },
      },
      Mutation: {
        addFinishedCours: {
            description: 'Add a cours finished to User Profile',
            resolverOf: 'plugins::users-permissions.user.updateme',
            resolver: async (obj, options, { context }) => {
                const { id } = context.state.user;
                const data = context.request.body;
                console.log(data)
                return await strapi.plugins['users-permissions'].services.user.edit({id}, data);
              }
            }
      }
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
