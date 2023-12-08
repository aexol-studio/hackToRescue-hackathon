/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost",
        "hack-to-rescue-hackathon.vercel.app",
        "api.hacktotherescue.aexol.work",
        "api-hacktotherescue.deliverky.com",
      ],
    },
  },
};

module.exports = nextConfig;
