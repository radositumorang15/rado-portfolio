'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, Wifi, CheckCircle2 } from 'lucide-react';

interface ProcessItem {
  name: string;
  type: string;
  cpu: number;
  memory: number;
  status: string;
}

const PROCESSES: ProcessItem[] = [
  { name: 'React DOM 19', type: 'Core Renderer', cpu: 3.8, memory: 74.2, status: 'Running' },
  { name: 'Next.js 16 App Router', type: 'Server Engine', cpu: 2.9, memory: 88.5, status: 'Running' },
  { name: 'Tailwind CSS 4', type: 'JIT Compiler', cpu: 0.6, memory: 42.1, status: 'Running' },
  { name: 'Web Audio API Synth', type: 'Sound Engine', cpu: 0.3, memory: 18.4, status: 'Running' },
  { name: 'Framer Motion Engine', type: 'Physics Core', cpu: 1.2, memory: 31.8, status: 'Running' },
  { name: 'Rado Notch Island', type: 'Dynamic UI Host', cpu: 0.4, memory: 14.2, status: 'Running' },
];

export const TaskManagerApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'processes' | 'performance'>('processes');
  const [cpuHistory, setCpuHistory] = useState<number[]>([12, 14, 11, 16, 13, 15, 12, 18, 14, 13]);
  const [currentCpu, setCurrentCpu] = useState<number>(14);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = Math.floor(10 + Math.random() * 12);
      setCurrentCpu(next);
      setCpuHistory((prev) => [...prev.slice(1), next]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#202020] text-neutral-200 text-xs font-sans select-none">
      {/* Top Command / Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#1c1c1c]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('processes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] transition-colors ${
              activeTab === 'processes' ? 'bg-white/10 text-white font-medium' : 'text-neutral-400 hover:bg-white/5'
            }`}
          >
            <Activity size={14} className="text-blue-400" />
            <span>Processes</span>
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] transition-colors ${
              activeTab === 'performance' ? 'bg-white/10 text-white font-medium' : 'text-neutral-400 hover:bg-white/5'
            }`}
          >
            <Cpu size={14} className="text-emerald-400" />
            <span>Performance</span>
          </button>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-neutral-400">
          <span>Overall CPU: <strong className="text-blue-400">{currentCpu}%</strong></span>
          <span>•</span>
          <span>RAM: <strong className="text-emerald-400">269 MB</strong> / 16 GB</span>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'processes' ? (
        <div className="flex-1 overflow-auto p-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] text-neutral-400">
                <th className="pb-2 font-medium pl-3">Name</th>
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium text-right pr-4">CPU</th>
                <th className="pb-2 font-medium text-right pr-4">Memory</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {PROCESSES.map((proc) => (
                <tr key={proc.name} className="hover:bg-white/[0.04] transition-colors group">
                  <td className="py-2.5 pl-3 font-medium text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{proc.name}</span>
                  </td>
                  <td className="py-2.5 text-neutral-400">{proc.type}</td>
                  <td className="py-2.5 text-right pr-4 font-mono text-neutral-300">
                    {(proc.cpu + (Math.random() * 0.4 - 0.2)).toFixed(1)}%
                  </td>
                  <td className="py-2.5 text-right pr-4 font-mono text-neutral-300">
                    {proc.memory.toFixed(1)} MB
                  </td>
                  <td className="py-2.5 text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>{proc.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex-1 p-4 flex flex-col gap-4 overflow-auto">
          {/* CPU Metric Card */}
          <div className="p-3.5 rounded-lg bg-[#262626] border border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-blue-400" />
                <span className="font-semibold text-white">CPU Utilization</span>
              </div>
              <span className="text-lg font-bold text-blue-400 font-mono">{currentCpu}%</span>
            </div>
            {/* Realtime SVG Chart */}
            <div className="h-20 w-full bg-[#181818] rounded border border-white/5 relative overflow-hidden flex items-end px-1 pt-2">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <polyline
                  fill="rgba(59, 130, 246, 0.15)"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  points={cpuHistory
                    .map((val, idx) => `${(idx / (cpuHistory.length - 1)) * 100},${40 - (val / 30) * 40}`)
                    .join(' ')}
                />
              </svg>
            </div>
            <div className="flex justify-between text-[11px] text-neutral-400">
              <span>Speed: 3.20 GHz</span>
              <span>Processes: 6</span>
              <span>Uptime: 0:14:22</span>
            </div>
          </div>

          {/* Quick Hardware Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#262626] border border-white/10 flex items-center gap-3">
              <HardDrive size={20} className="text-amber-400" />
              <div>
                <p className="text-neutral-400 text-[10px]">Disk Activity</p>
                <p className="font-semibold text-white">0.1 MB/s (Optimal)</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[#262626] border border-white/10 flex items-center gap-3">
              <Wifi size={20} className="text-emerald-400" />
              <div>
                <p className="text-neutral-400 text-[10px]">Network Throughput</p>
                <p className="font-semibold text-white">1.4 Mbps (Broadband)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="px-4 py-2 bg-[#1c1c1c] border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
        <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Ctrl + Shift + Esc</kbd> anytime to open</span>
        <span>RadoOS Task Manager 11.2</span>
      </div>
    </div>
  );
};
