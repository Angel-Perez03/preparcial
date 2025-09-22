/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/_bk/:path*", destination: "http://127.0.0.1:8080/:path*" },
    ];
  },
};
export default nextConfig;
