/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    autoPrerender: false,      // facultatif
  },
  experimental: {
    appDir: true,              // si tu utilises app router
  },
}

module.exports = nextConfig;
