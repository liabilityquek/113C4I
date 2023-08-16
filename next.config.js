/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/server/:path*',
                destination: 'http://localhost:4000/api/server/:path*',
            }
        ]
    }
};

module.exports = nextConfig;
