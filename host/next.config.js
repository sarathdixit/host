const NextFederationPlugin = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // TypeScript configuration
  },
  webpack(config, options) {
    const { isServer } = options;
    const remotes = (isServer) => {
      const location = isServer ? "ssr" : "chunks";
      return {
        // specify remotes
        manage: `manage@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
      };
    };

    const federatedConfig = {
      name: "host",
      filename: "static/chunks/remoteEntry.js",
      exposes: {},
      remotes: remotes(isServer),
      shared: {},
    };

    config.plugins.push(new NextFederationPlugin(federatedConfig));
    config.plugins.push(
      new FederatedTypesPlugin({
        federationConfig: {
          ...federatedConfig,
          remotes: {
            manage:
              "manage@http://localhost:3001/_next/static/chunks/remoteEntry.js",
          },
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
