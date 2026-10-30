'use client';

import React from 'react';
import {
  Folder as FolderIcon,
  Code,
  ExternalLink,
  Download,
  Github,
  ArrowLeft,
} from 'lucide-react';
import { Project } from '../../data/types';
import { ProjectInspectorReadme } from './ProjectInspectorReadme';

export interface VirtualFile {
  name: string;
  kind: 'md' | 'dir' | 'json' | 'url' | 'apk';
}

interface ProjectInspectorProps {
  project: Project;
  activeFile: VirtualFile;
  activeFileIndex: number;
  totalFiles: number;
  lang: 'en' | 'id';
  onBack: () => void;
  onLaunchLink: (url: string, title: string) => void;
}

export const ProjectInspector: React.FC<ProjectInspectorProps> = ({
  project,
  activeFile,
  activeFileIndex,
  totalFiles,
  lang,
  onBack,
  onLaunchLink,
}) => {
  return (
    <aside className="border-t md:border-t-0 md:border-l border-white/[0.08] p-4 sm:p-5 overflow-y-auto bg-[#1a1c22]/95 flex flex-col justify-between h-full select-text">
      <div className="flex flex-col gap-4">
        {activeFile.kind === 'md' && (
          <ProjectInspectorReadme project={project} lang={lang} onLaunchLink={onLaunchLink} />
        )}

        {activeFile.kind === 'dir' && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2">
              <FolderIcon size={16} className="text-amber-400" />
              <h3 className="text-sm font-bold text-white m-0">screenshots/</h3>
              <span className="text-xs text-white/40 ml-auto">{project.images.length} images</span>
            </div>
            <div className="flex flex-col gap-2.5 max-h-[420px] overflow-y-auto pr-1">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden border border-white/10 bg-black/60 group relative cursor-pointer"
                  onClick={() => window.open(img, '_blank')}
                  title="Click to view full image"
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-32 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-2 text-[10px] bg-black/75 px-1.5 py-0.5 rounded text-white/80">
                    #{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeFile.kind === 'json' && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2">
              <Code size={16} className="text-emerald-400" />
              <h3 className="text-sm font-bold text-white m-0">stack.json</h3>
            </div>
            <pre className="p-3 rounded-lg bg-[#14161c] border border-white/10 font-mono text-[11px] leading-relaxed text-[#7CFFB2] overflow-x-auto m-0 shadow-inner">
              {JSON.stringify(
                {
                  project: project.title.split('—')[0].trim(),
                  slug: project.slug,
                  category: project.category,
                  role: project.role ? project.role[lang] || project.role.en : undefined,
                  stack: project.stack,
                  repository: project.links.source || null,
                  featuresCount: project.features?.length || 0,
                },
                null,
                2
              )}
            </pre>
          </div>
        )}

        {(activeFile.kind === 'url' || activeFile.kind === 'apk') && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2">
              {activeFile.kind === 'url' ? (
                <ExternalLink size={16} className="text-sky-400" />
              ) : (
                <Download size={16} className="text-emerald-400" />
              )}
              <h3 className="text-sm font-bold text-white m-0">{activeFile.name}</h3>
            </div>
            <p className="text-xs text-white/70 leading-relaxed m-0">
              {activeFile.kind === 'url'
                ? 'Open the deployed web application directly in a new browser tab.'
                : 'Explore the source code or preview the application in Android Studio.'}
            </p>
            <div className="flex flex-col gap-2 pt-2">
              {project.links.live && (
                <button
                  onClick={() => onLaunchLink(project.links.live!, project.title)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 font-semibold text-xs text-white shadow-sm transition-colors cursor-pointer"
                >
                  <ExternalLink size={14} />
                  <span>Launch Live Demo</span>
                </button>
              )}
              {project.links.source && (
                <button
                  onClick={() => onLaunchLink(project.links.source!, 'GitHub Source')}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 font-semibold text-xs text-white transition-colors cursor-pointer"
                >
                  <Github size={14} />
                  <span>View GitHub Repository</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between mt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={13} />
          <span>Back to all folders</span>
        </button>
        <span className="text-[10px] text-white/40 font-mono">
          {activeFileIndex + 1} of {totalFiles} files
        </span>
      </div>
    </aside>
  );
};
