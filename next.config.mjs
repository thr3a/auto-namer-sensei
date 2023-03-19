/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // basePath: process.env.GITHUB_ACTIONS && 'nextjs-template',
  trailingSlash: true, 
  images: {
    unoptimized: true
  }
};

export default nextConfig;
