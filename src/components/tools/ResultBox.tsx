"use client";

import { useState } from "react";

export default function ResultBox({ result }: { result: any }) {
    const [copied, setCopied] = useState(false);

    if (!result) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(result));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Calculation Result</h3>
                    <p className="text-sm text-slate-500">Estimated value based on your input</p>
                </div>
                <button 
                    onClick={handleCopy}
                    className="text-xs font-semibold bg-white border border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    {copied ? "Copied!" : "Copy JSON"}
                </button>
            </div>

            {/* Hiển thị kết quả chính */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-inner">
                <div className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-1">
                    Total Volume
                </div>
                <div className="text-4xl font-extrabold text-blue-600">
                    {result.result ?? "0"} 
                    <span className="text-xl text-slate-400 ml-2 font-medium">units</span>
                </div>
            </div>

            {/* Thông tin bổ sung (nếu có) */}
            {result.message && (
                <p className="mt-4 text-sm text-slate-600 italic">
                    Note: {result.message}
                </p>
            )}
        </div>
    );
}