const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  query: `
    courBySlug(id: ID slug: String): Cours
  `,
  resolver: {
    Query: {
      courBySlug: {
        resolverOf: 'cours.findOne',
        async resolver(_, { slug }) {
          const entity = await strapi.services.cours.findOne({ slug });
          return sanitizeEntity(entity, { model: strapi.models.cours });
        },
      },
    },
  },
};
