'use client';

import { useState } from 'react';

interface Props {
  dict: { placeholder: string; btn_format: string };
}

export default function UrlEncoderDecoderClient({ dict }: Props) {
  const [input, setInput] = useState('https://example.com?q=hello world');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    try {
      const result = mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
      setOutput(result);
      setError('');
    } catch (err) {
      setOutput('');
      setError(err instanceof Error ? err.message : 'Unable to process URL input.');
    }
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
          <label className="text-sm font-semibold text-slate-700">Input URL</label>
          <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-700">Encoding</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={dict.placeholder}
          className="h-80 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as 'encode' | 'decode')}
          className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
        <button
          onClick={handleProcess}
          className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
        >
          {dict.btn_format}
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">Result</label>
          {output && (
            <button
              onClick={handleCopy}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
        <div className={`min-h-80 rounded-2xl border p-4 font-mono text-sm shadow-inner ${error ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
          {error ? error : output || 'Your encoded or decoded result will appear here.'}
        </div>
      </div>
    </div>
  );
}
