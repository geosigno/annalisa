'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // GET /hello
  index: async ctx  => {
    console.log(ctx);
    // ctx.redirect('http://localhost:3000');
    return;
  },
};
