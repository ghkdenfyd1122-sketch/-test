import React from 'react';
import { PatentRecord } from '../types';
import { Building2, Layers, CheckCircle2 } from 'lucide-react';

interface CompanyStatsProps {
  patents: PatentRecord[];
  onSelectCompany: (company: string) => void;
  selectedCompany: string;
}

export const CompanyStats: React.FC<CompanyStatsProps> = ({ patents, onSelectCompany, selectedCompany }) => {
  // Calculate patent counts per unified company
  const companyCounts: Record<string, number> = {};
  patents.forEach(p => {
    companyCounts[p.company] = (companyCounts[p.company] || 0) + 1;
  });

  const sortedCompanies = Object.entries(companyCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          소속 회사별 특허 분류 현황 (명칭 통일 엑셀 연동)
        </h3>
        <span className="text-xs text-slate-400">총 {patents.length}건 분석됨</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <button
          onClick={() => onSelectCompany('전체')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedCompany === '전체'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
          }`}
        >
          <div className="text-xs font-medium opacity-80">전체 회사</div>
          <div className="text-lg font-bold mt-1">{patents.length}건</div>
        </button>

        {sortedCompanies.map(([comp, count]) => (
          <button
            key={comp}
            onClick={() => onSelectCompany(comp)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedCompany === comp
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="text-xs font-medium truncate" title={comp}>{comp}</div>
            <div className="text-lg font-bold mt-1">{count}건</div>
          </button>
        ))}
      </div>
    </div>
  );
};
