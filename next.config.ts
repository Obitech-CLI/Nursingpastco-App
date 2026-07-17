import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pgzyjfqpybimqydwondp.supabase.co",
        pathname: "/storage/v1/object/public/nursingpastco_images/**"
      }
    ]
  }
};

export default nextConfig;
