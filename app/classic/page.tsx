import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Monitor } from 'lucide-react';
import { profileData } from '@/src/data/profile';
import { experienceData } from '@/src/data/experience';
import { projectsData } from '@/src/data/projects';
import { skillsData } from '@/src/data/skills';

import { AboutView } from '@/src/apps/about/AboutView';
import { ExperienceView } from '@/src/apps/experience/ExperienceView';
import { ProjectsView } from '@/src/apps/projects/ProjectsView';
import { SkillsView } from '@/src/apps/skills/SkillsView';
import { ContactView } from '@/src/apps/contact/ContactView';

export const metadata: Metadata = {
  title: 'Curriculum Vitae — Rado Nelson Dela Sadrak Situmorang',
  description: 'Complete CV and portfolio profile for Rado Situmorang. Frontend and Android Developer.',
};

export default function ClassicPage() {
  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white overflow-y-auto">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 h-14 px-6 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-wide">Rado Situmorang</span>
          <span className="text-xs text-neutral-400">/ Classic CV View</span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors"
        >
          <Monitor size={14} />
          <span>Launch RadoOS Experience</span>
        </Link>
      </header>

      {/* Main Single Page Document */}
      <main className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-12">
        {/* About View */}
        <section id="about">
          <AboutView profile={profileData} lang="en" />
        </section>

        {/* Experience View */}
        <section id="experience" className="pt-8 border-t border-neutral-800">
          <h2 className="text-xl font-bold mb-4">Work Experience & Leadership</h2>
          <div className="rounded-xl border border-neutral-800 overflow-hidden">
            <ExperienceView experiences={experienceData} lang="en" />
          </div>
        </section>

        {/* Projects View */}
        <section id="projects" className="pt-8 border-t border-neutral-800">
          <ProjectsView projects={projectsData} lang="en" />
        </section>

        {/* Skills View */}
        <section id="skills" className="pt-8 border-t border-neutral-800">
          <SkillsView skills={skillsData} />
        </section>

        {/* Contact View */}
        <section id="contact" className="pt-8 border-t border-neutral-800">
          <ContactView
            name=""
            email=""
            message=""
          />
        </section>
      </main>

      <footer className="py-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Rado Nelson Dela Sadrak Situmorang. Built with Next.js 16.
      </footer>
    </div>
  );
}

