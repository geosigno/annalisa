const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  query: `
    categoryBySlug(id: ID slug: String): Categories
  `,
  resolver: {
    Query: {
      categoryBySlug: {
        resolverOf: 'categories.findOne',
        async resolver(_, { slug }) {
          const entity = await strapi.services.categories.findOne({ slug });
          return sanitizeEntity(entity, { model: strapi.models.categories });
        },
      },
    },
  },
};
