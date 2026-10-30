import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Layers, CheckCircle2, Video } from 'lucide-react';
import { projectsData } from '@/src/data/projects';
import { ProjectReadmeViewer } from '@/src/apps/projects/ProjectReadmeViewer';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Rado Situmorang`,
    description: project.summary.en,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white overflow-y-auto">
      <header className="sticky top-0 z-50 h-14 px-6 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between">
        <Link
          href="/classic#projects"
          className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to All Projects</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase bg-blue-600/20 text-blue-400 border border-blue-500/30">
              {project.category}
            </span>
            {project.role && (
              <span className="text-xs text-neutral-400">{project.role.en}</span>
            )}
          </div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="text-sm text-neutral-300 leading-relaxed">{project.description.en}</p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors"
            >
              <ExternalLink size={14} />
              <span>Visit Live Website</span>
            </a>
          )}
          {project.links.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white border border-neutral-700 transition-colors"
            >
              <Github size={14} />
              <span>View Source Code</span>
            </a>
          )}
          {project.links.video && (
            <a
              href={project.links.video}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 text-xs font-semibold text-purple-200 border border-purple-700/50 transition-colors"
            >
              <Video size={14} />
              <span>Watch Demo Video</span>
            </a>
          )}
        </div>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col gap-3">
            <h2 className="text-sm font-semibold flex items-center gap-2 text-sky-400">
              <CheckCircle2 size={16} />
              <span>Key Capabilities & Architecture</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                  <span>{feat.en}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screenshots Showcase */}
        {project.images.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-neutral-300">Application Screenshots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900"
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="w-full h-48 object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technology Stack */}
        <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col gap-4">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-blue-400">
            <Layers size={16} />
            <span>Technology Stack</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-neutral-800 text-neutral-200 border border-neutral-700"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* README Documentation */}
        {project.readme && (
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-neutral-200">README.md Specification</h2>
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <ProjectReadmeViewer content={project.readme.en} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
