'use client';

import { useState } from 'react';
import { format } from 'sql-formatter';
import ToolActions from '@/components/ToolActions';
import { downloadText } from '@/lib/download';
import { toolUi } from '@/lib/tool-ui';

interface Props {
  lang: string;
  dict: { placeholder: string; btn_format: string; btn_minify: string };
}

const SAMPLE = `SELECT u.id, u.name, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.active = 1
GROUP BY u.id, u.name
ORDER BY orders DESC;`;

export default function SqlClientTool({ lang, dict }: Props) {
  const labels = toolUi(lang);
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const resetStatus = () => {
    setError('');
    setCopied(false);
  };

  const handleFormat = () => {
    resetStatus();
    if (!input.trim()) {
      setOutput('');
      setError(labels.empty);
      return;
    }
    try {
      setOutput(format(input, { language: 'sql', tabWidth: 2, keywordCase: 'upper' }));
    } catch (err) {
      setOutput('');
      setError(err instanceof Error ? err.message : 'Invalid SQL');
    }
  };

  const handleMinify = () => {
    resetStatus();
    if (!input.trim()) {
      setOutput('');
      setError(labels.empty);
      return;
    }
    setOutput(input.replace(/\s+/g, ' ').replace(/\s*([,()=<>!+*/-])\s*/g, '$1').trim());
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <label className="text-sm font-semibold text-slate-700">{labels.input}</label>
          <ToolActions
            labels={labels}
            onSample={() => { setInput(SAMPLE); setOutput(''); resetStatus(); }}
            onClear={() => { setInput(''); setOutput(''); resetStatus(); }}
          />
        </div>
        <textarea
          className="h-80 w-full rounded-xl border border-slate-300 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder={dict.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={handleFormat} className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">{dict.btn_format}</button>
          <button type="button" onClick={handleMinify} className="rounded-xl bg-slate-800 py-3 text-sm font-semibold text-white hover:bg-slate-900">{dict.btn_minify}</button>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <label className="text-sm font-semibold text-slate-700">{labels.output}</label>
          <ToolActions
            labels={labels}
            onSample={() => { setInput(SAMPLE); setOutput(''); resetStatus(); }}
            onClear={() => { setOutput(''); setError(''); }}
            onCopy={handleCopy}
            onDownload={() => downloadText('formatted.sql', output, 'text/sql;charset=utf-8')}
            copied={copied}
            hasOutput={Boolean(output)}
          />
        </div>
        {error ? (
          <div className="min-h-80 rounded-xl border border-rose-200 bg-rose-50 p-4 font-mono text-sm text-rose-700">{error}</div>
        ) : (
          <textarea readOnly className="h-80 w-full rounded-xl bg-slate-900 p-4 font-mono text-sm text-slate-100 focus:outline-none" value={output} placeholder={labels.output} />
        )}
      </section>
    </div>
  );
}
