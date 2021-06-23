const config = require('./config/meta');

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    author: config.schema.author,
    mapboxToken: `pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ`
  },
  plugins: [
    //   plugin for document head & adding attributes to components
    `gatsby-plugin-react-helmet`,
    // plugin for style components
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: process.env.NODE_ENV !== `production`,
        fileName: false,
      },
    }
  ],
}