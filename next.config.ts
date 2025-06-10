import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'psljrpqmocdalbyaltwo.supabase.co',
      },
    ],
  },
};

export default nextConfig;
