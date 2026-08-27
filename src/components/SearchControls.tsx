import React from 'react';
import { Search, Filter, Building2, Calendar, RefreshCw } from 'lucide-react';

interface SearchControlsProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCompany: string;
  onCompanyChange: (c: string) => void;
  companies: string[];
  totalResults: number;
  onReset: () => void;
}

export const SearchControls: React.FC<SearchControlsProps> = ({
  searchQuery,
  onSearchChange,
  selectedCompany,
  onCompanyChange,
  companies,
  totalResults,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Input */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="특허 명칭, 출원인, 문제점, 해결방안 키워드 검색..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Company Filter (Unified Name Categorization) */}
        <div className="md:col-span-4 relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <select
            value={selectedCompany}
            onChange={(e) => onCompanyChange(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 appearance-none cursor-pointer"
          >
            <option value="전체">소속 회사별 분류 (전체 회사)</option>
            {companies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count & Reset */}
        <div className="md:col-span-2 flex items-center justify-end space-x-3">
          <span className="text-xs font-medium text-slate-500">
            검색 결과: <strong className="text-slate-900 font-bold">{totalResults}건</strong>
          </span>
          <button
            onClick={onReset}
            title="초기화"
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
