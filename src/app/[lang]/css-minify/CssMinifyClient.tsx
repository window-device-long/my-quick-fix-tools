'use client';

import { useState } from 'react';

interface Props {
  dict: { placeholder: string; btn_format: string };
}

function minifyCss(input: string) {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

export default function CssMinifyClient({ dict }: Props) {
  const [input, setInput] = useState('.card { color: #333; margin: 12px; }');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    setOutput(minifyCss(input));
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">CSS Input</label>
          <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-700">Optimize</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={dict.placeholder}
          className="h-80 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={handleMinify}
          className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
        >
          {dict.btn_format}
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-900 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-200">Minified CSS</label>
          {output && (
            <button
              onClick={handleCopy}
              className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-blue-400 hover:text-blue-300"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
        <div className="min-h-80 rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-slate-100 shadow-inner">
          {output || 'Your optimized CSS will appear here.'}
        </div>
      </div>
    </div>
  );
}
