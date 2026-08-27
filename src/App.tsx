import React, { useState, useEffect } from 'react';
import { PatentRecord } from './types';
import { INITIAL_PATENTS } from './data/mockPatents';
import { Navbar } from './components/Navbar';
import { SearchControls } from './components/SearchControls';
import { PatentTable } from './components/PatentTable';
import { PatentModal } from './components/PatentModal';
import { CompanyStats } from './components/CompanyStats';
import { Sparkles, FileSpreadsheet, ShieldAlert } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function App() {
  const [patents, setPatents] = useState<PatentRecord[]>(INITIAL_PATENTS);
  const [searchMode, setSearchMode] = useState<'broad' | 'narrow'>('broad');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('전체');
  const [selectedPatent, setSelectedPatent] = useState<PatentRecord | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Fetch or filter patents based on mode
  useEffect(() => {
    let filtered = INITIAL_PATENTS;
    if (searchMode === 'narrow') {
      filtered = INITIAL_PATENTS.filter(p => p.searchType === 'narrow' || p.relevanceScore >= 88);
    } else {
      filtered = INITIAL_PATENTS;
    }
    setPatents(filtered);
  }, [searchMode]);

  // Unique list of unified companies
  const companies = Array.from(new Set(INITIAL_PATENTS.map(p => p.company)));

  // Filtered patents by query and company
  const filteredPatents = patents.filter(patent => {
    const matchesSearch = 
      patent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.priorArtProblems.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.patentNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompany = selectedCompany === '전체' || patent.company === selectedCompany;

    return matchesSearch && matchesCompany;
  });

  // Handle Excel Export using SheetJS (xlsx)
  const handleExportExcel = () => {
    // Format data according to user request columns
    const excelData = filteredPatents.map((p, index) => ({
      "연번": index + 1,
      "출원인": p.applicant,
      "소속 회사": p.company,
      "출원년도": p.applicationYear,
      "특허 번호": p.patentNumber,
      "특허 명칭": p.title,
      "종래 기술의 문제점": p.priorArtProblems,
      "해결 방안": p.solution,
      "대표 청구항 (청구 1항)": p.representativeClaim,
      "실시예 1번": p.example1,
      "문헌 URL (출처)": p.documentUrl || "",
      "적합도(%)": p.relevanceScore,
      "탐색법": p.searchType === 'broad' ? '넓은 탐색' : '좁은 탐색'
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Set column widths for better readability
    const colWidths = [
      { wch: 6 },  // 연번
      { wch: 22 }, // 출원인
      { wch: 15 }, // 소속 회사
      { wch: 10 }, // 출원년도
      { wch: 20 }, // 특허 번호
      { wch: 35 }, // 특허 명칭
      { wch: 40 }, // 종래 기술의 문제점
      { wch: 40 }, // 해결 방안
      { wch: 45 }, // 대표 청구항
      { wch: 45 }, // 실시예 1번
      { wch: 30 }, // 문헌 URL
      { wch: 10 }, // 적합도
      { wch: 12 }, // 탐색법
    ];
    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MLCC 바인더 특허 검색");

    const modeLabel = searchMode === 'broad' ? '넓은탐색' : '좁은탐색';
    const fileName = `MLCC_바인더_특허_검색대장_${modeLabel}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    
    XLSX.writeFile(workbook, fileName);
  };

  // Handle AI Patent Search Extension
  const handleAiSearch = async () => {
    setIsAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch('/api/patents/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchMode,
          topic: "MLCC용 바인더로서 아크릴 바인더 사용 (PVB 혼용 포함) 관련 최신 특허 검색"
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'AI 검색에 실패했습니다.');
      }
      if (data.patents && Array.isArray(data.patents)) {
        setPatents(prev => [...data.patents, ...prev]);
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'AI API 연결 오류가 발생했습니다. 설정에서 GEMINI_API_KEY를 확인해주세요.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar
        totalCount={filteredPatents.length}
        searchMode={searchMode}
        onModeChange={setSearchMode}
        onExportExcel={handleExportExcel}
        onAiSearch={handleAiSearch}
        isAiLoading={isAiLoading}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Error Alert */}
        {aiError && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-amber-900 text-xs">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{aiError}</span>
            </div>
            <button 
              onClick={() => setAiError(null)}
              className="font-bold text-amber-700 hover:text-amber-900 ml-4"
            >
              닫기
            </button>
          </div>
        )}

        {/* Company Summary Stats & Categorization */}
        <CompanyStats
          patents={patents}
          onSelectCompany={setSelectedCompany}
          selectedCompany={selectedCompany}
        />

        {/* Search Controls */}
        <SearchControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCompany={selectedCompany}
          onCompanyChange={setSelectedCompany}
          companies={companies}
          totalResults={filteredPatents.length}
          onReset={() => {
            setSearchQuery('');
            setSelectedCompany('전체');
          }}
        />

        {/* Patent Table */}
        <PatentTable
          patents={filteredPatents}
          onSelectPatent={setSelectedPatent}
        />
      </main>

      {/* Patent Detail Modal */}
      <PatentModal
        patent={selectedPatent}
        onClose={() => setSelectedPatent(null)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <p>MLCC 바인더 특허 검색 시스템 &copy; {new Date().getFullYear()} — 출원인 명칭 통일 및 엑셀 자동화 분석 대장</p>
      </footer>
    </div>
  );
}
