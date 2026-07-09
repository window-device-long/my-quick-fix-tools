'use client';

import { useState } from 'react';

interface Props {
  dict: { placeholder: string; btn_format: string };
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
}

export default function CsvToJsonClient({ dict }: Props) {
  const [input, setInput] = useState('name,email\nAlice,alice@example.com\nBob,bob@example.com');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    const rows = input
      .split(/\r?\n/)
      .map((row) => row.trimEnd())
      .filter((row) => row.length > 0);

    if (rows.length === 0) {
      setError('Please enter CSV data.');
      setOutput('');
      return;
    }

    try {
      const headers = parseCsvLine(rows[0]).map((header) => header.trim());
      const data = rows.slice(1).map((row) => {
        const values = parseCsvLine(row);
        if (values.length !== headers.length) {
          throw new Error('The number of columns is inconsistent.');
        }

        return headers.reduce<Record<string, string>>((acc, header, index) => {
          acc[header] = values[index] ?? '';
          return acc;
        }, {});
      });

      setOutput(JSON.stringify(data, null, 2));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to convert CSV.');
      setOutput('');
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
          <label className="text-sm font-semibold text-slate-700">CSV Input</label>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-700">Table data</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={dict.placeholder}
          className="h-80 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={handleConvert}
          className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
        >
          {dict.btn_format}
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">JSON Output</label>
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
          {error ? error : output || 'Your JSON array will appear here.'}
        </div>
      </div>
    </div>
  );
}
