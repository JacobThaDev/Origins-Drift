/** @type {import('next').NextConfig} */
const nextConfig =  {
    /*async headers() {
        return [{
            source: "/api/vote/callback",
            headers: [
                {
                    key: "Access-Control-Allow-Origin",
                    value: "*", // Set your origin
                },
                {
                    key: "Access-Control-Allow-Methods",
                    value: "GET, POST, PUT, DELETE, OPTIONS",
                },
                {
                    key: "Access-Control-Allow-Headers",
                    value: "Content-Type, Authorization",
                },
            ],
        }];
    },*/
    webpack: config => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
    serverExternalPackages: ['sequelize', 'bullmq'],
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'robohash.org',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;

