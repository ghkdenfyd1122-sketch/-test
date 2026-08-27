export interface PatentRecord {
  id: string;
  applicant: string;
  company: string; // Unified company name for Excel categorization
  applicationYear: number;
  patentNumber: string;
  title: string;
  priorArtProblems: string;
  solution: string;
  representativeClaim: string;
  example1: string;
  searchType: 'broad' | 'narrow';
  relevanceScore: number; // 0 to 100
  documentUrl: string; // Verified patent URL (Google Patents / KIPRIS)
}

export interface SearchFilterState {
  searchMode: 'broad' | 'narrow';
  keyword: string;
  companyFilter: string;
  yearFilter: string;
  minRelevance: number;
}
