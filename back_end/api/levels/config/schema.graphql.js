const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  query: `
    levelBySlug(id: ID slug: String): Levels
  `,
  resolver: {
    Query: {
      levelBySlug: {
        resolverOf: 'levels.findOne',
        async resolver(_, { slug }) {
          const entity = await strapi.services.levels.findOne({ slug });
          return sanitizeEntity(entity, { model: strapi.models.levels });
        },
      },
    },
  },
};
