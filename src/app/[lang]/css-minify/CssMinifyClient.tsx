'use client';

import { useState } from 'react';
import ToolActions from '@/components/ToolActions';
import { downloadText } from '@/lib/download';
import { toolUi } from '@/lib/tool-ui';

interface Props {
  lang: string;
  dict: { placeholder: string; btn_format: string };
}

const SAMPLE = `/* Card styles */
.card {
  color: #333;
  margin: 12px;
  padding: 8px 16px;
}
.card:hover { color: #111; }`;

function minifyCss(input: string) {
  let output = '';
  let quote: '"' | "'" | null = null;
  let comment = false;
  let pendingSpace = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];

    if (comment) {
      if (char === '*' && next === '/') {
        comment = false;
        i += 1;
      }
      continue;
    }

    if (!quote && char === '/' && next === '*') {
      comment = true;
      i += 1;
      continue;
    }

    if (quote) {
      output += char;
      if (char === '\\' && next) {
        output += next;
        i += 1;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      if (pendingSpace && output && !/[{}:;,>+~(]/.test(output.at(-1) ?? '')) output += ' ';
      pendingSpace = false;
      quote = char;
      output += char;
      continue;
    }

    if (/\s/.test(char)) {
      pendingSpace = true;
      continue;
    }

    if (/[{}:;,>+~]/.test(char)) {
      output = output.replace(/\s+$/, '');
      output += char;
      pendingSpace = false;
      continue;
    }

    if (pendingSpace && output && !/[{}:;,>+~(]/.test(output.at(-1) ?? '') && char !== ')') output += ' ';
    pendingSpace = false;
    output += char;
  }

  return output.replace(/;}/g, '}').trim();
}

export default function CssMinifyClient({ lang, dict }: Props) {
  const labels = toolUi(lang);
  const [input, setInput] = useState(SAMPLE);
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
    setOutput(minifyCss(input));
    setError('');
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
          <label className="text-sm font-semibold text-slate-700">{labels.input} CSS</label>
          <ToolActions labels={labels} onSample={() => { setInput(SAMPLE); setOutput(''); setError(''); }} onClear={() => { setInput(''); setOutput(''); setError(''); }} />
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={dict.placeholder} spellCheck={false} className="h-80 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        <button type="button" onClick={process} className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95">{dict.btn_format}</button>
      </section>

      <section className="space-y-3 rounded-3xl border border-slate-200 bg-slate-900 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-semibold text-slate-200">{labels.output}</label>
          <ToolActions labels={labels} onSample={() => { setInput(SAMPLE); setOutput(''); setError(''); }} onClear={() => { setOutput(''); setError(''); }} onCopy={handleCopy} onDownload={() => downloadText('styles.min.css', output, 'text/css;charset=utf-8')} copied={copied} hasOutput={Boolean(output)} />
        </div>
        <pre className={`min-h-80 overflow-auto whitespace-pre-wrap break-all rounded-2xl border p-4 font-mono text-sm shadow-inner ${error ? 'border-rose-800 bg-rose-950 text-rose-200' : 'border-slate-800 bg-slate-950 text-slate-100'}`}>{error || output || labels.output}</pre>
      </section>
    </div>
  );
}
