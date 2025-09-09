/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
        esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"] // <-- and this
  },
 webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },

  
   images: {
    domains: ['res.cloudinary.com'], // اضافه کردن دامنه Cloudinary
  },
}

module.exports = nextConfig
