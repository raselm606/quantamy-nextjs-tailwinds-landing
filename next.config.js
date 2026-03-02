/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16: Turbopack is now stable and the default bundler.
  // No --turbopack flag needed in npm scripts anymore.

  // Next.js 16: images.minimumCacheTTL default changed from 60s to 4 hours
  images: {
    minimumCacheTTL: 14400,
  },

  // React Compiler is stable in Next.js 16 (disabled by default for build perf)
  // Uncomment to enable automatic memoization:
  // reactCompiler: true,
}

module.exports = nextConfig
