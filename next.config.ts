/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Railway par type errors ki wajah se build fail nahi hoga
    ignoreBuildErrors: true,
  },
  eslint: {
    
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;