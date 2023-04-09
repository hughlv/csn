/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploads-ssl.webflow.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ai-bot.cn',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
