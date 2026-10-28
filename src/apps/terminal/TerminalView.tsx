import React from 'react';

export interface TerminalEntry {
  command?: string;
  output: string | React.ReactNode;
}

interface TerminalViewProps {
  history: TerminalEntry[];
  input: string;
  onInputChange?: (v: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  history,
  input,
  onInputChange,
  onSubmit,
  onKeyDown,
}) => {
  return (
    <div className="p-4 h-full flex flex-col font-mono text-xs text-emerald-400 bg-neutral-950/95 overflow-y-auto select-text">
      <div className="flex flex-col gap-2 pb-2">
        <div className="text-neutral-500">
          RadoOS [Version 1.0.0] - PowerShell / Bash Interactive Shell
        </div>
        <div className="text-neutral-400">
          Type <span className="text-emerald-400 font-bold">&apos;help&apos;</span> to inspect available system commands.
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {history.map((entry, idx) => (
          <div key={idx} className="flex flex-col gap-0.5">
            {entry.command && (
              <div className="flex items-center gap-2 text-neutral-300">
                <span className="text-blue-400">guest@rado-os:~$</span>
                <span className="font-semibold text-white">{entry.command}</span>
              </div>
            )}
            <div className="text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {entry.output}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 pt-2 mt-auto">
        <span className="text-blue-400 shrink-0">guest@rado-os:~$</span>
        <input
          type="text"
          autoFocus
          value={input}
          onChange={(e) => onInputChange?.(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs caret-emerald-400"
          placeholder=""
        />
      </form>
    </div>
  );
};
