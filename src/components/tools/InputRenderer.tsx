"use client";

export default function InputRenderer({ field, value, onChange }: any) {
  
  // 1. Slider (Range input)
  if (field.type === "slider") {
    return (
      <div className="space-y-2">
        <label className="text-sm font-semibold">{field.label}</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={field.min || 0}
            max={field.max || 100}
            value={value || field.min || 0}
            onChange={(e) => onChange(field.name, Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="font-bold text-blue-600 w-12 text-right">{value}</span>
        </div>
      </div>
    );
  }

  // 2. Select (Dropdown)
  if (field.type === "select") {
    return (
      <div className="space-y-2">
        <label className="text-sm font-semibold">{field.label}</label>
        <select
          value={value || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
          className="w-full border rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {field.options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  // 3. Radio
  if (field.type === "radio") {
    return (
      <div className="space-y-2">
        <label className="text-sm font-semibold">{field.label}</label>
        <div className="flex gap-4">
          {field.options.map((opt: any) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={field.name}
                value={opt.value}
                checked={value === opt.value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    );
  }

  // 4. Default: Number/Text input
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">{field.label}</label>
      <input
        type={field.type || "number"}
        value={value || ""}
        onChange={(e) => onChange(field.name, field.type === "number" ? Number(e.target.value) : e.target.value)}
        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}