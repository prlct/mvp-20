module.exports = {
  images: {
    disableStaticImages: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|woff|woff2)$/i,
      type: 'asset',
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  trailingSlash: true,
  pageExtensions: ['page.jsx', 'api.js'],
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
