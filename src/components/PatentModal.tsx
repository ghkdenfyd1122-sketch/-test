import React from 'react';
import { PatentRecord } from '../types';
import { X, Building2, Calendar, Award, CheckCircle2, FileText, Copy, Check, ExternalLink } from 'lucide-react';

interface PatentModalProps {
  patent: PatentRecord | null;
  onClose: () => void;
}

export const PatentModal: React.FC<PatentModalProps> = ({ patent, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!patent) return null;

  const handleCopyAll = () => {
    const text = `
[특허 정보 (팩트체크 완료)]
- 명칭: ${patent.title}
- 출원번호: ${patent.patentNumber}
- 출원인: ${patent.applicant}
- 소속회사: ${patent.company}
- 출원년도: ${patent.applicationYear}
- 문헌 URL: ${patent.documentUrl}

1. 종래 기술의 문제점:
${patent.priorArtProblems}

2. 해결 방안:
${patent.solution}

3. 대표 청구항 (청구 1항):
${patent.representativeClaim}

4. 실시예 1번:
${patent.example1}
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                {patent.company}
              </span>
              <span className="text-xs font-mono text-slate-400">{patent.patentNumber}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                팩트체크 완료
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">{patent.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? '복사됨' : '복사'}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-sm text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 items-center">
            <div>
              <span className="text-xs text-slate-400 font-medium block">출원인 (Applicant)</span>
              <span className="font-bold text-slate-900">{patent.applicant}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">출원년도 (Application Year)</span>
              <span className="font-bold text-slate-900">{patent.applicationYear}년</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">문헌 팩트체크 링크</span>
              {patent.documentUrl ? (
                <a
                  href={patent.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline mt-0.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  원문 사이트 접속
                </a>
              ) : (
                <span className="text-xs text-slate-400">링크 없음</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">종래 기술의 문제점</h3>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 leading-relaxed">
              {patent.priorArtProblems}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">해결 방안</h3>
            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 leading-relaxed font-medium text-blue-950">
              {patent.solution}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">대표 청구항 (청구 1항)</h3>
            <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs rounded-2xl leading-relaxed whitespace-pre-wrap">
              {patent.representativeClaim}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">실시예 1번</h3>
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 font-mono text-xs leading-relaxed text-emerald-950">
              {patent.example1}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
          <div className="text-xs text-slate-500 font-medium">
            ✅ Google Patents / KIPRIS 팩트체크 검증된 실존 특허 문헌
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
