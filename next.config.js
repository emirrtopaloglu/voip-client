/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
