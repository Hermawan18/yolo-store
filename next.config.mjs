/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'im.uniqlo.com',
        port: '',
        pathname: '/global-cms/**',
      },
      {
        protocol: 'https',
        hostname: 'image.uniqlo.com',
        port: '',
        pathname: '/UQ/**',
      },
    ],
  },
};

export default nextConfig;
