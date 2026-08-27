import React from 'react';
import { PatentRecord } from '../types';
import { ExternalLink, Eye, CheckCircle2, Award, Link as LinkIcon } from 'lucide-react';

interface PatentTableProps {
  patents: PatentRecord[];
  onSelectPatent: (patent: PatentRecord) => void;
}

export const PatentTable: React.FC<PatentTableProps> = ({ patents, onSelectPatent }) => {
  if (patents.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
        <p className="text-slate-500 text-sm font-medium">검색 조건에 일치하는 특허가 없습니다.</p>
        <p className="text-slate-400 text-xs mt-1">검색어를 변경하거나 AI 특허 심층 확장을 시도해보세요.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold tracking-wider uppercase text-[11px]">
              <th className="py-3 px-4 w-12 text-center">No</th>
              <th className="py-3 px-4 w-32">출원인 / 소속회사</th>
              <th className="py-3 px-4 w-20 text-center">출원년도</th>
              <th className="py-3 px-4 w-56">종래 기술의 문제점</th>
              <th className="py-3 px-4 w-56">해결 방안</th>
              <th className="py-3 px-4 w-64">대표 청구항 (청구 1항)</th>
              <th className="py-3 px-4 w-64">실시예 1번</th>
              <th className="py-3 px-4 w-28 text-center">문헌 URL (출처)</th>
              <th className="py-3 px-4 w-20 text-center">상세</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {patents.map((patent, index) => (
              <tr 
                key={patent.id}
                className="hover:bg-blue-50/40 transition-colors group"
              >
                {/* No */}
                <td className="py-3.5 px-4 text-center font-medium text-slate-400">
                  {index + 1}
                </td>

                {/* 출원인 및 소속 회사 (Excel 분류 최적화) */}
                <td className="py-3.5 px-4 align-top">
                  <div className="font-bold text-slate-900">{patent.applicant}</div>
                  <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    {patent.company}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">{patent.patentNumber}</div>
                </td>

                {/* 출원년도 */}
                <td className="py-3.5 px-4 align-top text-center font-medium text-slate-700">
                  <span className="px-2 py-1 bg-slate-100 rounded-md font-mono text-xs">
                    {patent.applicationYear}
                  </span>
                </td>

                {/* 종래 기술의 문제점 */}
                <td className="py-3.5 px-4 align-top text-slate-600 leading-relaxed">
                  <p className="line-clamp-3 group-hover:line-clamp-none transition-all">
                    {patent.priorArtProblems}
                  </p>
                </td>

                {/* 해결 방안 */}
                <td className="py-3.5 px-4 align-top text-slate-600 leading-relaxed">
                  <p className="line-clamp-3 group-hover:line-clamp-none transition-all font-medium text-slate-800">
                    {patent.solution}
                  </p>
                </td>

                {/* 대표 청구항 (청구 1항) */}
                <td className="py-3.5 px-4 align-top text-slate-600 font-mono text-[11px] leading-relaxed">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 max-h-32 overflow-y-auto">
                    {patent.representativeClaim}
                  </div>
                </td>

                {/* 실시예 1번 */}
                <td className="py-3.5 px-4 align-top text-slate-600 font-mono text-[11px] leading-relaxed">
                  <div className="p-2 bg-emerald-50/50 rounded-lg border border-emerald-100 max-h-32 overflow-y-auto text-emerald-900">
                    {patent.example1}
                  </div>
                </td>

                {/* 문헌 URL (출처) */}
                <td className="py-3.5 px-4 align-top text-center">
                  {patent.documentUrl ? (
                    <a
                      href={patent.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg font-semibold text-[11px] transition-all border border-blue-200"
                      title="특허 원문 링크 확인"
                    >
                      <ExternalLink className="w-3 h-3" />
                      원문확인
                    </a>
                  ) : (
                    <span className="text-slate-400 text-[10px]">링크 없음</span>
                  )}
                </td>

                {/* 상세보기 */}
                <td className="py-3.5 px-4 align-top text-center">
                  <button
                    onClick={() => onSelectPatent(patent)}
                    className="p-2 bg-white border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-xl text-slate-600 transition-all shadow-xs"
                    title="전체 내용 보기"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
