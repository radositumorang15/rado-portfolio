'use client';

import React from 'react';
import { ProjectData, ProjectState } from './types';
import { ExternalLink } from 'lucide-react';

interface CodeEditorProps {
  curProject: ProjectData;
  curState: ProjectState;
  onSelectTab: (tabKey: string) => void;
  onCloseTab: (tabKey: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  curProject,
  curState,
  onSelectTab,
  onCloseTab,
}) => {
  const currentFileData = curProject.f[curState.cur] || Object.values(curProject.f)[0];

  const renderCodeWithHighlight = (code: string) => {
    const lines = code.split('\n');

    return (
      <pre className="font-mono text-[12px] leading-[1.65] m-0 p-0 text-[var(--as-tx)]">
        {lines.map((line, lIdx) => {
          let highlighted = line;

          // Strings
          highlighted = highlighted.replace(
            /(".*?"|'.*?'|`.*?`)/g,
            '<span class="str text-[#6AAB73]">$1</span>'
          );

          // Comments
          if (highlighted.trim().startsWith('//') || highlighted.trim().startsWith('#')) {
            highlighted = `<span class="cmt text-[#7A7E85] italic">${highlighted}</span>`;
          } else {
            // Kotlin & Dart Keywords
            const kwRegex = /\b(package|import|class|interface|override|fun|val|var|private|lateinit|super|return|suspend|Composable|by|plugins|dependencies|implementation|void|async|await|extends|final|const|Widget|StatelessWidget|StatefulWidget|ConsumerWidget|Future)\b/g;
            highlighted = highlighted.replace(
              kwRegex,
              '<span class="kw text-[#CF8E6D] font-medium">$1</span>'
            );

            // Annotations / Decorators
            highlighted = highlighted.replace(
              /(@\w+)/g,
              '<span class="ann text-[#BBB529] font-medium">$1</span>'
            );
          }

          return (
            <div key={lIdx} className="flex hover:bg-white/[0.03]">
              <span className="w-9 select-none text-right pr-3 text-[#565a61] text-[11px] shrink-0 font-mono">
                {lIdx + 1}
              </span>
              <span
                className="flex-1 whitespace-pre pl-1"
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            </div>
          );
        })}
      </pre>
    );
  };

  return (
    <div className="as-ed flex flex-col flex-1 h-full min-w-0 bg-[var(--as-ed)]">
      {/* Editor Tabs Strip */}
      <div className="as-et flex items-center justify-between bg-[var(--as-bg)] border-b border-[var(--as-line)] shrink-0 overflow-x-auto scrollbar-none">
        <div className="flex items-center">
          {curState.tabs.map((tabKey) => {
            const fileData = curProject.f[tabKey];
            if (!fileData) return null;
            const isTabActive = curState.cur === tabKey;

            return (
              <button
                key={tabKey}
                onClick={() => onSelectTab(tabKey)}
                className={`as-tab flex items-center gap-1.5 px-3 py-1.5 text-xs border-r border-[var(--as-line)] transition-colors ${
                  isTabActive
                    ? 'bg-[var(--as-ed)] text-white font-medium border-t-2 border-t-[var(--as-acc)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{fileData[0]}</span>
                {curState.tabs.length > 1 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tabKey);
                    }}
                    className="ml-1 opacity-60 hover:opacity-100 hover:text-red-400 text-xs px-0.5 rounded"
                  >
                    ×
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* GitHub Source Link Badge */}
        {curProject.repoUrl && (
          <a
            href={curProject.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 text-[11px] text-neutral-400 hover:text-blue-400 shrink-0 transition-colors mr-2"
            title={`View ${curProject.name} repository on GitHub`}
          >
            <span>GitHub Repository</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      {/* Code Editor Body */}
      <div className="as-cd flex-1 overflow-auto p-2 scrollbar-thin">
        {currentFileData ? (
          renderCodeWithHighlight(currentFileData[1])
        ) : (
          <div className="p-4 text-xs text-neutral-500">No file selected.</div>
        )}
      </div>
    </div>
  );
};

