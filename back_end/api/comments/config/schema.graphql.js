const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    query: `
        getCommentsByCour(courSlug: String!): Comments
    `,
    resolver: {
        Query: {
            getCommentsByCour: {
                resolverOf: 'comments.find',
                //resolverOf: 'comments.find', // Will apply the same policy on the custom resolver as the controller's action `findByCategories`.
                resolver: async (obj, options, { context }) => {
                    const { id } = context.state.user;
                    const { _courSlug } = context.params;
                    return await strapi.services.comments.find().map(comment => sanitizeEntity(comment, { model: strapi.models.comment }));
                    console.log('comments', comments)
                    return comments.map(comment => sanitizeEntity(comment, { model: strapi.models.comment }));

                    const filteredComments = comments.filter(comment => 
                        comment.cour.slug === _courSlug && (
                            comment.user.id === id ||
                            comment.user.role === 3
                        )
                    )
                }
            },
        },
    }
  }