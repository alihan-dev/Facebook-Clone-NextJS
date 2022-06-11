/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['platform-lookaside.fbsbx.com', 'links.papareact.com', 'firebasestorage.googleapis.com'],
  },
  experimental: {
    images: {
        layoutRaw: true
    }
},

}

module.exports = nextConfig
