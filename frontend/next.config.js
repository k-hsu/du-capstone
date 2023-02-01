/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    apiUrl: "http://localhost:4000/graphql",
  },
};

module.exports = nextConfig;
