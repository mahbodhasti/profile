/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
<<<<<<< HEAD
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
=======
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"]
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "source.unsplash.com",
      "images.unsplash.com"
    ], // هر دامنه یک رشته جداگانه
  },
}

module.exports = nextConfig;
>>>>>>> fcb3719 (Add current project files)
