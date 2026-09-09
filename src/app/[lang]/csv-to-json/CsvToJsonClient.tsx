'use client';

import { useMemo, useState } from 'react';
import ToolActions from '@/components/ToolActions';
import { downloadText } from '@/lib/download';
import { toolUi } from '@/lib/tool-ui';

interface Props {
  lang: string;
  dict: { placeholder: string; btn_format: string };
}

type DelimiterMode = 'auto' | ',' | ';' | '\t';
const SAMPLE = 'name,email,note\nAlice,alice@example.com,"Hello, world"\nBob,bob@example.com,"Line one\nLine two"';

function detectDelimiter(input: string): ',' | ';' | '\t' {
  const firstRecord = input.split(/\r?\n/, 1)[0] ?? '';
  const candidates: Array<',' | ';' | '\t'> = [',', ';', '\t'];
  return candidates
    .map((delimiter) => ({ delimiter, count: firstRecord.split(delimiter).length - 1 }))
    .sort((a, b) => b.count - a.count)[0]?.delimiter ?? ',';
}

function parseCsv(input: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        field += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === delimiter && !quoted) {
      row.push(field);
      field = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(field);
      field = '';
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
      continue;
    }

    field += char;
  }

  if (quoted) throw new Error('Unclosed quoted field.');
  row.push(field);
  if (row.some((cell) => cell.length > 0)) rows.push(row);
  return rows;
}

export default function CsvToJsonClient({ lang, dict }: Props) {
  const labels = toolUi(lang);
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [delimiterMode, setDelimiterMode] = useState<DelimiterMode>('auto');
  const [copied, setCopied] = useState(false);
  const detected = useMemo(() => detectDelimiter(input), [input]);

  const convert = () => {
    setCopied(false);
    if (!input.trim()) {
      setOutput('');
      setError(labels.empty);
      return;
    }
    try {
      const delimiter = delimiterMode === 'auto' ? detected : delimiterMode;
      const rows = parseCsv(input, delimiter);
      if (rows.length < 2) throw new Error('CSV needs a header row and at least one data row.');
      const headers = rows[0].map((header) => header.trim());
      if (headers.some((header) => !header)) throw new Error('CSV header contains an empty column name.');
      if (new Set(headers).size !== headers.length) throw new Error('CSV header contains duplicate column names.');

      const data = rows.slice(1).map((values, rowIndex) => {
        if (values.length !== headers.length) throw new Error(`Row ${rowIndex + 2} has ${values.length} columns; expected ${headers.length}.`);
        return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
      });
      setOutput(JSON.stringify(data, null, 2));
      setError('');
    } catch (err) {
      setOutput('');
      setError(err instanceof Error ? err.message : 'Unable to convert CSV.');
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
          <label className="text-sm font-semibold text-slate-700">{labels.input} CSV</label>
          <ToolActions labels={labels} onSample={() => { setInput(SAMPLE); setOutput(''); setError(''); }} onClear={() => { setInput(''); setOutput(''); setError(''); }} />
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={dict.placeholder} spellCheck={false} className="h-80 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <button type="button" onClick={convert} className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95">{dict.btn_format}</button>
          <select value={delimiterMode} onChange={(e) => setDelimiterMode(e.target.value as DelimiterMode)} className="rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700">
            <option value="auto">Auto ({detected === '\t' ? 'Tab' : detected})</option>
            <option value=",">Comma</option>
            <option value=";">Semicolon</option>
            <option value={'\t'}>Tab</option>
          </select>
        </div>
      </section>

      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-semibold text-slate-700">JSON</label>
          <ToolActions labels={labels} onSample={() => { setInput(SAMPLE); setOutput(''); setError(''); }} onClear={() => { setOutput(''); setError(''); }} onCopy={handleCopy} onDownload={() => downloadText('converted.json', output, 'application/json;charset=utf-8')} copied={copied} hasOutput={Boolean(output)} />
        </div>
        <pre className={`min-h-80 overflow-auto whitespace-pre-wrap break-words rounded-2xl border p-4 font-mono text-sm shadow-inner ${error ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>{error || output || labels.output}</pre>
      </section>
    </div>
  );
}
