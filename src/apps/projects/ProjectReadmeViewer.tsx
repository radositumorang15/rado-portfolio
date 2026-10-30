import React from 'react';

interface ProjectReadmeViewerProps {
  content: string;
  className?: string;
}

/**
 * Parses inline formatting like **bold** and `code` safely into React nodes.
 */
function parseInline(text: string): React.ReactNode {
  // Pattern matches **bold** or `code`
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-white/95">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-white/10 font-mono text-[10px] text-sky-300 border border-white/10"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export const ProjectReadmeViewer: React.FC<ProjectReadmeViewerProps> = ({ content, className = '' }) => {
  const lines = content.split('\n');

  return (
    <div className={`flex flex-col gap-1 text-[11px] text-white/80 font-sans ${className}`}>
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();
        if (!line) return <div key={idx} className="h-1" />;

        // Header level 2 (## Title)
        if (line.startsWith('## ')) {
          return (
            <h3
              key={idx}
              className="text-xs font-bold text-[#60CDFF] mt-2 mb-1 pb-1 border-b border-white/10 flex items-center gap-1.5"
            >
              <span className="w-1 h-3 rounded-full bg-[#60CDFF]" />
              {parseInline(line.slice(3))}
            </h3>
          );
        }

        // Header level 3 (### Subtitle)
        if (line.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-[11px] font-bold text-white/90 mt-2 mb-0.5 uppercase tracking-wider">
              {parseInline(line.slice(4))}
            </h4>
          );
        }

        // Unordered list item (- item or * item)
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 leading-relaxed">
              <span className="text-[#60CDFF] font-bold text-[10px] select-none shrink-0 mt-0.5">•</span>
              <span className="flex-1">{parseInline(line.slice(2))}</span>
            </div>
          );
        }

        // Ordered list item (1. item)
        const orderedMatch = line.match(/^(\d+)\.\s+(.*)$/);
        if (orderedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 leading-relaxed">
              <span className="font-mono text-[10px] text-sky-400 font-bold shrink-0 mt-0.5">
                {orderedMatch[1]}.
              </span>
              <span className="flex-1">{parseInline(orderedMatch[2])}</span>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={idx} className="leading-relaxed text-white/70 m-0">
            {parseInline(line)}
          </p>
        );
      })}
    </div>
  );
};
