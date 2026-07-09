'use client';

import { useState } from 'react';

interface Props {
  dict: { placeholder: string; btn_format: string };
}

function md5(message: string) {
  const rotateLeft = (value: number, amount: number) => (value << amount) | (value >>> (32 - amount));
  const addUnsigned = (a: number, b: number) => {
    const low = (a & 0xffff) + (b & 0xffff);
    const carry = (low >>> 16) + (a >>> 16) + (b >>> 16);
    return (carry << 16) | (low & 0xffff);
  };

  const utf8 = unescape(encodeURIComponent(message));
  const bytes = new Uint8Array(utf8.length);
  for (let i = 0; i < utf8.length; i += 1) {
    bytes[i] = utf8.charCodeAt(i);
  }

  const bitLength = bytes.length * 8;
  const padding: number[] = [];
  for (let i = 0; i < bytes.length; i += 1) {
    padding.push(bytes[i]);
  }
  padding.push(0x80);
  while ((padding.length * 8) % 512 !== 448) {
    padding.push(0x00);
  }

  const lengthBytes = new Array(8).fill(0);
  for (let i = 0; i < 8; i += 1) {
    lengthBytes[i] = (bitLength >>> (i * 8)) & 0xff;
  }
  padding.push(...lengthBytes);

  const words = new Array(padding.length / 4);
  for (let i = 0; i < words.length; i += 1) {
    const offset = i * 4;
    words[i] = (padding[offset] | (padding[offset + 1] << 8) | (padding[offset + 2] << 16) | (padding[offset + 3] << 24)) >>> 0;
  }

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  for (let i = 0; i < words.length; i += 16) {
    const oldA = a;
    const oldB = b;
    const oldC = c;
    const oldD = d;

    a = addUnsigned(a, ((b & c) | (~b & d)) + words[i + 0] + 0xd76aa478);
    a = rotateLeft(a, 7);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & b) | (~a & c)) + words[i + 1] + 0xe8c7b756);
    d = rotateLeft(d, 12);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & a) | (~d & b)) + words[i + 2] + 0x242070db);
    c = rotateLeft(c, 17);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & d) | (~c & a)) + words[i + 3] + 0xc1bdceee);
    b = rotateLeft(b, 22);
    b = addUnsigned(b, c);

    a = addUnsigned(a, ((b & c) | (~b & d)) + words[i + 4] + 0xf57c0faf);
    a = rotateLeft(a, 7);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & b) | (~a & c)) + words[i + 5] + 0x4787c62a);
    d = rotateLeft(d, 12);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & a) | (~d & b)) + words[i + 6] + 0xa8304613);
    c = rotateLeft(c, 17);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & d) | (~c & a)) + words[i + 7] + 0xfd469501);
    b = rotateLeft(b, 22);
    b = addUnsigned(b, c);

    a = addUnsigned(a, ((b & c) | (~b & d)) + words[i + 8] + 0x698098d8);
    a = rotateLeft(a, 7);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & b) | (~a & c)) + words[i + 9] + 0x8b44f7af);
    d = rotateLeft(d, 12);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & a) | (~d & b)) + words[i + 10] + 0xffff5bb1);
    c = rotateLeft(c, 17);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & d) | (~c & a)) + words[i + 11] + 0x895cd7be);
    b = rotateLeft(b, 22);
    b = addUnsigned(b, c);

    a = addUnsigned(a, ((b & c) | (~b & d)) + words[i + 12] + 0x6b901122);
    a = rotateLeft(a, 7);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & b) | (~a & c)) + words[i + 13] + 0xfd987193);
    d = rotateLeft(d, 12);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & a) | (~d & b)) + words[i + 14] + 0xa679438e);
    c = rotateLeft(c, 17);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & d) | (~c & a)) + words[i + 15] + 0x49b40821);
    b = rotateLeft(b, 22);
    b = addUnsigned(b, c);

    a = addUnsigned(a, ((b & d) | (c & ~d)) + words[i + 1] + 0xf61e2562);
    a = rotateLeft(a, 5);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & c) | (b & ~c)) + words[i + 6] + 0xc040b340);
    d = rotateLeft(d, 9);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & b) | (a & ~b)) + words[i + 11] + 0x265e5a51);
    c = rotateLeft(c, 14);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & a) | (d & ~a)) + words[i + 0] + 0xe9b6c7aa);
    b = rotateLeft(b, 20);
    b = addUnsigned(b, c);

    a = addUnsigned(a, ((b & d) | (c & ~d)) + words[i + 5] + 0xd62f105d);
    a = rotateLeft(a, 5);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & c) | (b & ~c)) + words[i + 10] + 0x02441453);
    d = rotateLeft(d, 9);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & b) | (a & ~b)) + words[i + 15] + 0xd8a1e681);
    c = rotateLeft(c, 14);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & a) | (d & ~a)) + words[i + 4] + 0xe7d3fbc8);
    b = rotateLeft(b, 20);
    b = addUnsigned(b, c);

    a = addUnsigned(a, ((b & d) | (c & ~d)) + words[i + 9] + 0x21e1cde6);
    a = rotateLeft(a, 5);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & c) | (b & ~c)) + words[i + 14] + 0xc33707d6);
    d = rotateLeft(d, 9);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & b) | (a & ~b)) + words[i + 3] + 0xf4d50d87);
    c = rotateLeft(c, 17);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & a) | (d & ~a)) + words[i + 8] + 0x455a14ed);
    b = rotateLeft(b, 20);
    b = addUnsigned(b, c);

    a = addUnsigned(a, ((b & d) | (c & ~d)) + words[i + 13] + 0xa9e3e905);
    a = rotateLeft(a, 5);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & c) | (b & ~c)) + words[i + 2] + 0xfcefa3f8);
    d = rotateLeft(d, 9);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & b) | (a & ~b)) + words[i + 7] + 0x676f02d9);
    c = rotateLeft(c, 14);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & a) | (d & ~a)) + words[i + 12] + 0x8d2a4c8a);
    b = rotateLeft(b, 20);
    b = addUnsigned(b, c);

    a = addUnsigned(a, ((b & d) | (c & ~d)) + words[i + 15] + 0xfffa3942);
    a = rotateLeft(a, 5);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & c) | (b & ~c)) + words[i + 4] + 0x8771f681);
    d = rotateLeft(d, 9);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & b) | (a & ~b)) + words[i + 9] + 0x6d9d6122);
    c = rotateLeft(c, 14);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & a) | (d & ~a)) + words[i + 14] + 0xfde5380c);
    b = rotateLeft(b, 20);
    b = addUnsigned(b, c);

    a = addUnsigned(a, ((b & d) | (c & ~d)) + words[i + 3] + 0xa4beea44);
    a = rotateLeft(a, 5);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & c) | (b & ~c)) + words[i + 8] + 0x4bdecfa9);
    d = rotateLeft(d, 9);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & b) | (a & ~b)) + words[i + 13] + 0xf6bb4b60);
    c = rotateLeft(c, 14);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & a) | (d & ~a)) + words[i + 2] + 0xbebfbc70);
    b = rotateLeft(b, 20);
    b = addUnsigned(b, c);

    a = addUnsigned(a, ((b & d) | (c & ~d)) + words[i + 7] + 0x289b7ec6);
    a = rotateLeft(a, 5);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & c) | (b & ~c)) + words[i + 12] + 0xeaa127fa);
    d = rotateLeft(d, 9);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & b) | (a & ~b)) + words[i + 1] + 0xd4ef3085);
    c = rotateLeft(c, 14);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & a) | (d & ~a)) + words[i + 6] + 0x04881d05);
    b = rotateLeft(b, 20);
    b = addUnsigned(b, c);

    a = addUnsigned(a, ((b & d) | (c & ~d)) + words[i + 11] + 0xd9d4d039);
    a = rotateLeft(a, 5);
    a = addUnsigned(a, b);

    d = addUnsigned(d, ((a & c) | (b & ~c)) + words[i + 0] + 0xe6db99e5);
    d = rotateLeft(d, 9);
    d = addUnsigned(d, a);

    c = addUnsigned(c, ((d & b) | (a & ~b)) + words[i + 5] + 0x1fa27cf8);
    c = rotateLeft(c, 14);
    c = addUnsigned(c, d);

    b = addUnsigned(b, ((c & a) | (d & ~a)) + words[i + 10] + 0xc4ac5665);
    b = rotateLeft(b, 20);
    b = addUnsigned(b, c);

    a = addUnsigned(a, oldA);
    b = addUnsigned(b, oldB);
    c = addUnsigned(c, oldC);
    d = addUnsigned(d, oldD);
  }

  return [a, b, c, d]
    .map((value) => value >>> 0)
    .map((value) => value.toString(16).padStart(8, '0'))
    .join('');
}

export default function HashGeneratorClient({ dict }: Props) {
  const [input, setInput] = useState('Hello World');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    if (algorithm === 'MD5') {
      setOutput(md5(input));
      return;
    }

    const encoder = new TextEncoder();
    const buffer = await crypto.subtle.digest(algorithm, encoder.encode(input));
    const hash = Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
    setOutput(hash);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">Input Text</label>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Secure hash</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={dict.placeholder}
          className="h-56 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="MD5">MD5</option>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-512">SHA-512</option>
        </select>
        <button
          onClick={handleGenerate}
          className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
        >
          {dict.btn_format}
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-900 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-200">Hash Result</label>
          {output && (
            <button
              onClick={handleCopy}
              className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-blue-400 hover:text-blue-300"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
        <div className="min-h-56 rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-slate-100 shadow-inner">
          {output || 'Your generated hash will appear here.'}
        </div>
      </div>
    </div>
  );
}
