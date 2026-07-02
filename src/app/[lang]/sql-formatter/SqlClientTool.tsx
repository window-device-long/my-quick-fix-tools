'use client';

import React, { useState } from 'react';
import { format } from 'sql-formatter';

interface Props {
  dict: { placeholder: string; btn_format: string; btn_minify: string };
}

export default function SqlClientTool({ dict }: Props) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      setOutput(format(input, { language: 'sql', tabWidth: 2, keywordCase: 'upper' }));
    } catch {
      setOutput('-- [Error] Cú pháp SQL không hợp lệ.');
    }
  };

  const handleMinify = () => {
    setOutput(input.replace(/\s+/g, ' ').replace(/\s*([,()=<>!+-/*])\s*/g, '$1').trim());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <textarea
          className="w-full h-80 p-4 font-mono text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder={dict.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex space-x-3">
          <button onClick={handleFormat} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">{dict.btn_format}</button>
          <button onClick={handleMinify} className="flex-1 bg-slate-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-900">{dict.btn_minify}</button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-medium">
          <span>Output</span>
          {output && <button onClick={handleCopy} className="text-xs bg-slate-200 px-2 py-1 rounded">{copied ? '✓ Copied' : 'Copy'}</button>}
        </div>
        <textarea readOnly className="w-full h-80 p-4 font-mono text-sm bg-slate-900 text-slate-100 rounded-xl focus:outline-none" value={output} />
      </div>
    </div>
  );
}