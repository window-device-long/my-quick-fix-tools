"use client";

import { useState, useCallback, useEffect } from "react";
import InputRenderer from "./InputRenderer";
import ResultBox from "./ResultBox";
import { calculate } from "@/tools/construction/concrete-calculator/calculator"; 

export default function CalculatorRenderer({ config, schema }: { config: any; schema: any }) {
    const [values, setValues] = useState<Record<string, any>>({});
    const [result, setResult] = useState<any>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [mounted, setMounted] = useState(false);


    // Tránh lỗi Hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    const update = useCallback((name: string, value: any) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleCalculate = () => {
        console.log("Giá trị các ô input hiện tại là:", values); // LOG ĐỂ KIỂM TRA
        if (!values || Object.keys(values).length === 0) return; // Không tính nếu form trống
        setIsCalculating(true);
        setTimeout(() => {
            try {
                const output = calculate(values);
                setResult(output);
            } catch (err) {
                console.error("Calculation error:", err);
            } finally {
                setIsCalculating(false);
            }
        }, 500); // Thêm chút độ trễ để tạo cảm giác chuyên nghiệp
    };

    if (!mounted) return null; // Tránh lỗi Hydration

    return (
        // max-w-3xl giúp form không quá rộng, mx-auto để căn giữa
        <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-10">
            
            {/* Header chuyên nghiệp, căn giữa */}
            <header className="text-center space-y-2 border-b border-slate-100 pb-8">
                <h1 className="text-4xl font-extrabold text-slate-950 tracking-tighter">
                    {config.title.en}
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                    {config.description.en || "Estimate concrete volume with precision."}
                </p>
            </header>

            {/* Container chính bao gồm Input và Result */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 space-y-10">
                
                {/* Grid nhập liệu tự động responsive (1 cột trên mobile, 2 cột trên desktop) */}
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    {schema.fields.map((field: any) => (
                        <div key={field.name} className="w-full">
                            <InputRenderer
                                field={field}
                                value={values[field.name]}
                                onChange={update}
                            />
                        </div>
                    ))}
                </div>

                {/* Nút Call-to-action được tối ưu hóa */}
                <div className="pt-4">
                    <button
                        onClick={handleCalculate}
                        disabled={isCalculating}
                        className={`
                            w-full flex items-center justify-center gap-3 py-4 px-8 
                            rounded-xl font-bold text-lg text-white transition-all duration-150
                            ${isCalculating ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-md shadow-blue-600/10"}
                        `}
                    >
                        {isCalculating ? (
                            <>
                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                Calculating...
                            </>
                        ) : (
                            <>Calculate Volume</>
                        )}
                    </button>
                </div>
                
                {/* ResultBox xuất hiện mượt mà hơn */}
                {result && (
                    <div className="border-t border-slate-100 pt-10">
                    
                        <ResultBox result={result} />
                    </div>
                )}
            </div>
            
            {/* Footer nhỏ gọn */}
            <footer className="text-center text-sm text-slate-400 pt-8">
                This tool is an estimate. Please consult with a professional engineer.
            </footer>
        </div>
    );
}