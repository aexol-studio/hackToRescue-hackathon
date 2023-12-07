/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost",
        "hack-to-rescue-hackathon.vercel.app",
        "api.hacktotherescue.aexol.work",
      ],
    },
  },
};

module.exports = nextConfig;
