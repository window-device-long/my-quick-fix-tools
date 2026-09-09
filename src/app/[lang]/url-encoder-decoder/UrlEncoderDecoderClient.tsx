'use client';

import { useState } from 'react';
import ToolActions from '@/components/ToolActions';
import { downloadText } from '@/lib/download';
import { toolUi } from '@/lib/tool-ui';

interface Props {
  lang: string;
  dict: { placeholder: string; btn_format: string };
}

type Mode = 'encode-component' | 'decode-component' | 'encode-uri' | 'decode-uri';
const SAMPLE = 'https://example.com/search?q=hello world&lang=vi';

export default function UrlEncoderDecoderClient({ lang, dict }: Props) {
  const labels = toolUi(lang);
  const [input, setInput] = useState(SAMPLE);
  const [mode, setMode] = useState<Mode>('encode-uri');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const process = () => {
    setCopied(false);
    if (!input.trim()) {
      setOutput('');
      setError(labels.empty);
      return;
    }
    try {
      const actions: Record<Mode, (value: string) => string> = {
        'encode-component': encodeURIComponent,
        'decode-component': decodeURIComponent,
        'encode-uri': encodeURI,
        'decode-uri': decodeURI,
      };
      setOutput(actions[mode](input));
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
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-semibold text-slate-700">{labels.input}</label>
          <ToolActions labels={labels} onSample={() => { setInput(SAMPLE); setOutput(''); setError(''); }} onClear={() => { setInput(''); setOutput(''); setError(''); }} />
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={dict.placeholder} spellCheck={false} className="h-80 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <button type="button" onClick={process} className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95">{dict.btn_format}</button>
          <select value={mode} onChange={(e) => setMode(e.target.value as Mode)} className="rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700">
            <option value="encode-uri">Encode full URL</option>
            <option value="decode-uri">Decode full URL</option>
            <option value="encode-component">Encode component</option>
            <option value="decode-component">Decode component</option>
          </select>
        </div>
      </section>

      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-semibold text-slate-700">{labels.output}</label>
          <ToolActions labels={labels} onSample={() => { setInput(SAMPLE); setOutput(''); setError(''); }} onClear={() => { setOutput(''); setError(''); }} onCopy={handleCopy} onDownload={() => downloadText('url-result.txt', output)} copied={copied} hasOutput={Boolean(output)} />
        </div>
        <pre className={`min-h-80 overflow-auto whitespace-pre-wrap break-all rounded-2xl border p-4 font-mono text-sm shadow-inner ${error ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>{error || output || labels.output}</pre>
      </section>
    </div>
  );
}
