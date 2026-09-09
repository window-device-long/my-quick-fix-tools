'use client';

import { useState } from 'react';
import ToolActions from '@/components/ToolActions';
import { downloadText } from '@/lib/download';
import { toolUi } from '@/lib/tool-ui';

interface Props {
  lang: string;
  dict: { placeholder: string; btn_format: string };
}

const SAMPLE = '{"name":"Alice","skills":["JavaScript","TypeScript"],"active":true}';

export default function JsonValidatorClient({ lang, dict }: Props) {
  const labels = toolUi(lang);
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'beautify' | 'minify'>('beautify');
  const [copied, setCopied] = useState(false);

  const process = () => {
    setCopied(false);
    if (!input.trim()) {
      setOutput('');
      setError(labels.empty);
      return;
    }
    try {
      const parsed: unknown = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, mode === 'beautify' ? 2 : 0));
      setError('');
    } catch (err) {
      setOutput('');
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-semibold text-slate-700">{labels.input} JSON</label>
          <ToolActions labels={labels} onSample={() => { setInput(SAMPLE); setOutput(''); setError(''); }} onClear={() => { setInput(''); setOutput(''); setError(''); }} />
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={dict.placeholder} spellCheck={false} className="h-80 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <button type="button" onClick={process} className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95">{dict.btn_format}</button>
          <select value={mode} onChange={(e) => setMode(e.target.value as 'beautify' | 'minify')} className="rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700">
            <option value="beautify">Beautify</option>
            <option value="minify">Minify</option>
          </select>
        </div>
      </section>

      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-semibold text-slate-700">{labels.output}</label>
          <ToolActions labels={labels} onSample={() => { setInput(SAMPLE); setOutput(''); setError(''); }} onClear={() => { setOutput(''); setError(''); }} onCopy={handleCopy} onDownload={() => downloadText('result.json', output, 'application/json;charset=utf-8')} copied={copied} hasOutput={Boolean(output)} />
        </div>
        <pre className={`min-h-80 overflow-auto whitespace-pre-wrap break-words rounded-2xl border p-4 font-mono text-sm shadow-inner ${error ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
          {error || output || labels.output}
        </pre>
      </section>
    </div>
  );
}
