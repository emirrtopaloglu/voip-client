/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["sequelize", "sequelize-typescript"],
  },
};

module.exports = nextConfig;
