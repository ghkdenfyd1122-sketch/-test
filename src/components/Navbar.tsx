import React from 'react';
import { FileSpreadsheet, Search, ShieldCheck, Sparkles, Database } from 'lucide-react';

interface NavbarProps {
  totalCount: number;
  searchMode: 'broad' | 'narrow';
  onModeChange: (mode: 'broad' | 'narrow') => void;
  onExportExcel: () => void;
  onAiSearch: () => void;
  isAiLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalCount,
  searchMode,
  onModeChange,
  onExportExcel,
  onAiSearch,
  isAiLoading
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              MLCC 업무 특허 검색 시스템
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Excel 자동 분류
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              MLCC 바인더(아크릴 및 PVB 혼용) 특허 조사 및 정밀 분석 대장
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Mode Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              onClick={() => onModeChange('broad')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                searchMode === 'broad'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              넓은 탐색 (50+ 건)
            </button>
            <button
              onClick={() => onModeChange('narrow')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                searchMode === 'narrow'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              좁은 탐색 (70% 적합성)
            </button>
          </div>

          <button
            onClick={onAiSearch}
            disabled={isAiLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isAiLoading ? 'AI 탐색 중...' : 'AI 특허 심층 확장'}
          </button>

          <button
            onClick={onExportExcel}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            엑셀(.xlsx) 다운로드 ({totalCount}건)
          </button>
        </div>
      </div>
    </header>
  );
};
