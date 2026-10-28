'use client';

import dynamic from 'next/dynamic';

const OSRootDynamic = dynamic(
  () => import('@/src/os/OSRoot').then((mod) => mod.OSRoot),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-neutral-950 flex flex-col items-center justify-center text-white select-none">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-2xl font-bold shadow-lg">
          RN
        </div>
        <div className="mt-5 text-xs text-neutral-400 font-medium">Loading RadoOS...</div>
      </div>
    ),
  }
);

export default function HomePage() {
  return <OSRootDynamic />;
}
