'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  lang: string;
  tools: { path: string; title: string; category: string }[];
}

export default function Header({ lang, tools }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // 1. DANH SÁCH NGÔN NGỮ ĐƯỢC TẬP TRUNG TẠI ĐÂY (Sau này thêm tiếng Pháp, Đức, Nhật... chỉ cần khai báo thêm vào mảng này)
  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ];

  // Lấy ra thông tin ngôn ngữ hiện tại đang được chọn
  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  // Phân loại công cụ cho menu công cụ
  const categories = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

const handleLangChange = (newLang: string) => {
  const supportedLocales = languages.map((l) => l.code);

  const segments = pathname
    .split("/")
    .filter(Boolean);

  // bỏ locale hiện tại
  if (supportedLocales.includes(segments[0])) {
    segments.shift();
  }

  const nextPath =
    segments.length > 0
      ? `/${newLang}/${segments.join("/")}`
      : `/${newLang}`;

  router.push(nextPath);

  setIsLangOpen(false);
};

  // Đóng dropdown ngôn ngữ nếu người dùng click ra ngoài màn hình
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* LOGO */}
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
            <img src="/favicon-32x32.png" alt="QuickFix Studio logo" className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold tracking-tight text-slate-900">QuickFix Studio</div>
            <div className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:block">Online utilities</div>
          </div>
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          
          <nav className="hidden items-center gap-4 md:flex">
            <Link href={`/${lang}/tools`} className="text-sm font-semibold text-slate-600 transition hover:text-blue-600">{lang === 'vi' ? 'Công cụ' : 'Tools'}</Link>
            <Link href={`/${lang}/guides`} className="text-sm font-semibold text-slate-600 transition hover:text-blue-600">{lang === 'vi' ? 'Hướng dẫn' : 'Guides'}</Link>
            <Link href={`/${lang}/faq`} className="text-sm font-semibold text-slate-600 transition hover:text-blue-600">FAQ</Link>
            <Link href={`/${lang}/blog`} className="text-sm font-semibold text-slate-600 transition hover:text-blue-600">Blog</Link>
          </nav>

          {/* 2. MEGAMENU DANH SÁCH CÔNG CỤ (Giữ nguyên) */}
          <div 
            className="relative"
            onMouseEnter={() => setIsToolsOpen(true)}
            onMouseLeave={() => setIsToolsOpen(false)}
          >
            <button className="flex items-center space-x-1 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition">
              <span>{lang === 'vi' ? '🛠️ Công cụ' : '🛠️ Tools'}</span>
              <svg className={`h-4 w-4 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isToolsOpen && (
              <div className="absolute right-0 mt-0 w-[520px] origin-top-right rounded-2xl border border-slate-200 bg-white p-5 shadow-xl ring-1 ring-black/5 grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
                  <Link href={`/${lang}/tools`} className="text-sm font-semibold text-blue-700 hover:text-blue-800" onClick={() => setIsToolsOpen(false)}>
                    {lang === 'vi' ? '🧭 Xem toàn bộ hệ thống công cụ SEO' : '🧭 View the full SEO tools hub'}
                  </Link>
                </div>
                {Object.entries(categories).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">{category}</h4>
                    <div className="space-y-1">
                      {items.map((item) => (
                        <Link
                          key={item.path}
                          href={`/${lang}/${item.path}`}
                          className="block rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition font-medium"
                          onClick={() => setIsToolsOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. DROPDOWN NGÔN NGỮ THÔNG MINH (Giải pháp cho tương lai rộng mở) */}
          <div className="relative" ref={langRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition active:scale-95"
            >
              <span>{currentLang.flag}</span>
              <span className="hidden md:inline">{currentLang.label}</span>
              <span className="md:hidden uppercase">{currentLang.code}</span>
              <svg className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'vi' ? 'Chọn ngôn ngữ' : 'Select Language'}
                </div>
                <div className="mt-1 space-y-0.5 max-h-60 overflow-y-auto custom-scrollbar">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => handleLangChange(item.code)}
                      className={`flex w-full items-center space-x-3 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition ${
                        item.code === lang 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="text-base">{item.flag}</span>
                      <span className="flex-grow">{item.label}</span>
                      {item.code === lang && (
                        <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}