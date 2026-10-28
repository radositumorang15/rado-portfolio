import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RadoOS — Portfolio',
    short_name: 'RadoOS',
    description: 'Operating system styled portfolio of Rado Nelson Dela Sadrak Situmorang',
    start_url: '/',
    display: 'standalone',
    background_color: '#131314',
    theme_color: '#0B57D0',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
