'use client';

import React from 'react';
import {
  FileText,
  ExternalLink,
  Github,
  CheckCircle2,
  Smartphone,
  Video,
} from 'lucide-react';
import { Project } from '../../data/types';
import { ProjectReadmeViewer } from './ProjectReadmeViewer';
import { useWindowsStore } from '../../store/windows';

interface ProjectInspectorReadmeProps {
  project: Project;
  lang: 'en' | 'id';
  onLaunchLink: (url: string, title: string) => void;
}

export const ProjectInspectorReadme: React.FC<ProjectInspectorReadmeProps> = ({
  project,
  lang,
  onLaunchLink,
}) => {
  const openWindow = useWindowsStore((s) => s.openWindow);
  const readmeText = project.readme
    ? project.readme[lang] || project.readme.en
    : project.description[lang];

  return (
    <div className="flex flex-col gap-3 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-2">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-blue-400" />
          <h3 className="text-sm font-bold text-white m-0 truncate">{project.title}</h3>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-blue-600/30 text-blue-300 border border-blue-500/30">
          {project.category}
        </span>
      </div>

      {/* Quick Actions (GitHub + Live + Android Studio) */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.links.source && (
          <button
            onClick={() => onLaunchLink(project.links.source!, 'GitHub Repository')}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 border border-white/10 text-[11px] font-medium text-white transition-colors cursor-pointer"
          >
            <Github size={12} />
            <span>GitHub</span>
          </button>
        )}
        {project.links.live && (
          <button
            onClick={() => onLaunchLink(project.links.live!, project.title)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-[11px] font-medium text-white shadow-xs transition-colors cursor-pointer"
          >
            <ExternalLink size={12} />
            <span>Live Demo</span>
          </button>
        )}
        {project.links.video && (
          <button
            onClick={() => onLaunchLink(project.links.video!, 'Demo Video')}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-[11px] font-medium text-purple-200 transition-colors cursor-pointer"
          >
            <Video size={12} />
            <span>Demo Video</span>
          </button>
        )}
        {project.category === 'mobile' && (
          <button
            onClick={() => openWindow('androidstudio', project.slug)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-[11px] font-medium text-emerald-200 transition-colors cursor-pointer"
            title="Open in Android Studio"
          >
            <Smartphone size={12} />
            <span>Android Studio</span>
          </button>
        )}
      </div>

      {/* Key Features Checklist */}
      {project.features && project.features.length > 0 && (
        <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] flex flex-col gap-1.5 mt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
            Key Capabilities
          </span>
          {project.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-white/90 leading-tight">
              <CheckCircle2 size={13} className="text-[#60CDFF] shrink-0 mt-0.5" />
              <span>{feat[lang] || feat.en}</span>
            </div>
          ))}
        </div>
      )}

      {/* Markdown README Body */}
      <div className="mt-1 p-3 rounded-lg bg-[#14161c] border border-white/[0.08] shadow-inner max-h-[280px] overflow-y-auto">
        <ProjectReadmeViewer content={readmeText} />
      </div>

      {/* Tech Stack Pills */}
      <div className="mt-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
          Tech Stack
        </span>
        <div className="flex flex-wrap gap-1">
          {project.stack.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 border border-white/10 text-white/90"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

