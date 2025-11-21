/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'claireapi.onrender.com',
        pathname: '/images/**'
      }
    ],
    unoptimized: true, // Allow external images without optimization
  },
};

module.exports = nextConfig;
