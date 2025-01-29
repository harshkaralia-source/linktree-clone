/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "assets.production.linktr.ee",
                pathname: '/auth/**'
            },
        ]
    }
};

export default nextConfig;
