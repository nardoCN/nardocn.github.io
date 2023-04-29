const path = require('path')

console.log([path.join(__dirname, 'styles')])

const nextConfig = {
    output: 'export',
    trailingSlash: true,
    distDir: 'out',
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}

module.exports = nextConfig