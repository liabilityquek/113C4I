/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/server/:path*',
                destination: 'http://localhost:4000/api/server/:path*',
            }
        ];
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '/localhost:5001/**',
              port: '',
            },
          ],
    },
};

module.exports = nextConfig;
