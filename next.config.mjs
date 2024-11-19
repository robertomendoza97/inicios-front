/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "s3-inicios-images.s3.us-east-1.amazonaws.com",
        protocol: "https"
      },
      {
        hostname: "system-managment.iniciosmyr.com",
        protocol: "https"
      }
    ]
  }
};

export default nextConfig;
