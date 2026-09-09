'use client';

type Props = {
  labels: { clear: string; sample: string; copy: string; copied: string; download: string };
  onClear: () => void;
  onSample: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  copied?: boolean;
  hasOutput?: boolean;
};

export default function ToolActions({ labels, onClear, onSample, onCopy, onDownload, copied = false, hasOutput = false }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={onSample} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">{labels.sample}</button>
      <button type="button" onClick={onClear} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">{labels.clear}</button>
      {hasOutput && onCopy && <button type="button" onClick={onCopy} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100">{copied ? `✓ ${labels.copied}` : labels.copy}</button>}
      {hasOutput && onDownload && <button type="button" onClick={onDownload} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">{labels.download}</button>}
    </div>
  );
}
