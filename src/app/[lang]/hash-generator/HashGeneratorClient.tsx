'use client';

import { useState } from 'react';
import ToolActions from '@/components/ToolActions';
import { downloadText } from '@/lib/download';
import { toolUi } from '@/lib/tool-ui';

interface Props {
  lang: string;
  dict: { placeholder: string; btn_format: string };
}

function md5(message: string) {
  const bytes = new TextEncoder().encode(message);
  const bitLength = bytes.length * 8;
  const totalLength = Math.ceil((bytes.length + 9) / 64) * 64;
  const padded = new Uint8Array(totalLength);
  padded.set(bytes);
  padded[bytes.length] = 0x80;

  const view = new DataView(padded.buffer);
  const low = bitLength >>> 0;
  const high = Math.floor(bitLength / 0x100000000) >>> 0;
  view.setUint32(totalLength - 8, low, true);
  view.setUint32(totalLength - 4, high, true);

  const shifts = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];
  const constants = Array.from({ length: 64 }, (_, i) =>
    Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000) >>> 0,
  );
  const rotateLeft = (value: number, amount: number) =>
    ((value << amount) | (value >>> (32 - amount))) >>> 0;

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let offset = 0; offset < totalLength; offset += 64) {
    const words = Array.from({ length: 16 }, (_, i) => view.getUint32(offset + i * 4, true));
    let a = a0;
    let b = b0;
    let c = c0;
    let d = d0;

    for (let i = 0; i < 64; i += 1) {
      let f: number;
      let g: number;
      if (i < 16) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (i < 32) {
        f = (d & b) | (~d & c);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) % 16;
      }

      const nextD = c;
      const nextC = b;
      const sum = (a + f + constants[i] + words[g]) >>> 0;
      const nextB = (b + rotateLeft(sum, shifts[i])) >>> 0;
      a = d;
      d = nextD;
      c = nextC;
      b = nextB;
    }

    a0 = (a0 + a) >>> 0;
    b0 = (b0 + b) >>> 0;
    c0 = (c0 + c) >>> 0;
    d0 = (d0 + d) >>> 0;
  }

  return [a0, b0, c0, d0]
    .flatMap((word) => [word & 0xff, (word >>> 8) & 0xff, (word >>> 16) & 0xff, (word >>> 24) & 0xff])
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export default function HashGeneratorClient({ lang, dict }: Props) {
  const labels = toolUi(lang);
  const sample = 'Hello World';
  const [input, setInput] = useState(sample);
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setCopied(false);
    if (!input.trim()) {
      setOutput('');
      setError(labels.empty);
      return;
    }

    try {
      if (algorithm === 'MD5') {
        setOutput(md5(input));
      } else {
        const encoder = new TextEncoder();
        const buffer = await crypto.subtle.digest(algorithm, encoder.encode(input));
        setOutput(Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, '0')).join(''));
      }
      setError('');
    } catch (err) {
      setOutput('');
      setError(err instanceof Error ? err.message : 'Unable to generate hash.');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-semibold text-slate-700">{labels.input}</label>
          <ToolActions labels={labels} onSample={() => { setInput(sample); setOutput(''); setError(''); }} onClear={() => { setInput(''); setOutput(''); setError(''); }} />
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={dict.placeholder} spellCheck={false} className="h-56 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <button type="button" onClick={handleGenerate} className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95">{dict.btn_format}</button>
          <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700">
            <option value="MD5">MD5</option>
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>
      </section>

      <section className="space-y-3 rounded-3xl border border-slate-200 bg-slate-900 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-semibold text-slate-200">{labels.output}</label>
          <ToolActions labels={labels} onSample={() => { setInput(sample); setOutput(''); setError(''); }} onClear={() => { setOutput(''); setError(''); }} onCopy={handleCopy} onDownload={() => downloadText(`${algorithm.toLowerCase()}-hash.txt`, output)} copied={copied} hasOutput={Boolean(output)} />
        </div>
        <pre className={`min-h-56 overflow-auto whitespace-pre-wrap break-all rounded-2xl border p-4 font-mono text-sm shadow-inner ${error ? 'border-rose-800 bg-rose-950 text-rose-200' : 'border-slate-800 bg-slate-950 text-slate-100'}`}>{error || output || labels.output}</pre>
      </section>
    </div>
  );
}
