// const withSass = require("@zeit/next-sass");
// const withCSS = require('@zeit/next-css')


// module.exports = withSass();

// module.exports = withCSS({
//   cssLoaderOptions: {
//     url: false
//   }
// })


// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer({})

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });
  
    return config;
  },
  images: {
    domains: ['localhost'],
  },
};
  

