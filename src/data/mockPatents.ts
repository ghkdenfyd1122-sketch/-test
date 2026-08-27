import { PatentRecord } from '../types';

export const INITIAL_PATENTS: PatentRecord[] = [
  {
    id: "KR-10-2013-0058583",
    applicant: "삼성전기주식회사",
    company: "삼성전기",
    applicationYear: 2013,
    patentNumber: "KR 10-2013-0058583 A",
    title: "고유전율 세라믹의 제조방법",
    priorArtProblems: "세라믹 그린시트 제조 시 통상적인 유기 바인더는 건조 과정에서 층간 박리(Delamination) 및 두께 편차를 유발함.",
    solution: "아크릴 수지, 폴리비닐부티랄(PVB) 및 에틸셀룰로오스 등 바인더 조성물의 혼합 최적화를 통해 성형성과 유연성 확보.",
    representativeClaim: "청구항 1: 티탄산바륨계 유전체 분말, 바인더 수지 및 용제를 포함하는 세라믹 슬러리 제조 방법에 있어서, 바인더 수지로서 아크릴 수지 및 PVB를 혼합하여 사용하는 고유전율 세라믹의 제조방법.",
    example1: "실시예 1: 티탄산바륨 분말 100중량부에 대하여 아크릴계 바인더 및 PVB 혼합물 6중량부를 유기용제에 투입하고 볼밀 혼합하여 점도 3000 cps의 슬러리 제조.",
    searchType: "narrow",
    relevanceScore: 95,
    documentUrl: "https://patents.google.com/patent/KR1020130058583A/ko"
  },
  {
    id: "KR-10-2019-0121145",
    applicant: "삼성전기주식회사",
    company: "삼성전기",
    applicationYear: 2019,
    patentNumber: "KR 10-2019-0121145 A",
    title: "적층 세라믹 커패시터 및 그 제조 방법",
    priorArtProblems: "그린시트 소성 시 바인더의 급격한 열분해로 인해 내부 전극과 유전체 간 계면 박리 및 크랙 발생.",
    solution: "바인더 성분의 분해 온도 범위를 제어하고 저온 탈바인더 공정을 적용하여 내부 결함 방지.",
    representativeClaim: "청구항 1: 복수의 유전체 층과 상기 유전체 층을 사이에 두고 교대로 배치되는 내부 전극을 포함하는 적층 세라믹 커패시터의 제조 방법으로서, 소성 전 바인더 제거 공정을 포함하는 적층 세라믹 커패시터 제조방법.",
    example1: "실시예 1: 아크릴계 바인더를 포함하는 그린시트를 적층하고 250℃~400℃ 온도 구간에서 2단계 승온 탈지 공정을 거쳐 시편 제작.",
    searchType: "narrow",
    relevanceScore: 92,
    documentUrl: "https://patents.google.com/patent/KR1020190121145A/ko"
  },
  {
    id: "KR-10-2011-0067509",
    applicant: "삼성전기주식회사",
    company: "삼성전기",
    applicationYear: 2011,
    patentNumber: "KR 10-2011-0067509 A",
    title: "외부전극용 도전성 페이스트 조성물 및 이를 이용한 적층 세라믹 전자부품",
    priorArtProblems: "외부 전극용 페이스트 내 아크릴 바인더 함량 및 유리전이온도(Tg) 불균일로 인한 소성 후 박리 및 밀착력 저하.",
    solution: "특정 유리전이온도 범위를 갖는 (메타)아크릴계 수지를 바인더로 사용하여 외부 전극의 결합력 강화.",
    representativeClaim: "청구항 1: 금속 분말, 유리 프릿, 아크릴계 바인더 수지 및 유기 용제를 포함하는 외부전극용 도전성 페이스트 조성물.",
    example1: "실시예 1: Tg가 30℃인 메타크릴산 에스테르 공중합체 아크릴 바인더를 금속 분말 100중량부 대비 15중량부 혼합하여 도전성 페이스트 제조.",
    searchType: "broad",
    relevanceScore: 89,
    documentUrl: "https://patents.google.com/patent/KR1020110067509A/ko"
  },
  {
    id: "JP-2022-142301",
    applicant: "주식회사 무라타제작소 (Murata Manufacturing Co., Ltd.)",
    company: "무라타제작소",
    applicationYear: 2022,
    patentNumber: "JP 2022-142301 A",
    title: "적층 세라믹 커패시터 및 그 제조방법",
    priorArtProblems: "그린시트 성형 시 용제 건조 속도 차이로 인한 표면 거칠기 및 내부 공극(Void) 발생.",
    solution: "수용성 아크릴 에멀션 및 특정 분자량 분포를 갖는 바인더 시스템을 도입하여 균일한 도포 및 밀도 향상.",
    representativeClaim: "청구항 1: 세라믹 입자와, 수용성 아크릴 바인더를 포함하는 세라믹 그린시트를 구비한 적층 세라믹 커패시터.",
    example1: "실시예 1: 중량평균분자량 15만인 수용성 아크릴 바인더를 물과 알코올 혼합 용매에 용해하여 점도 안정성이 우수한 슬러리를 얻음.",
    searchType: "narrow",
    relevanceScore: 94,
    documentUrl: "https://patents.google.com/patent/JP2022142301A/ja"
  },
  {
    id: "US-2024-0192345",
    applicant: "태양유전 주식회사 (Taiyo Yuden Co., Ltd.)",
    company: "태양유전",
    applicationYear: 2024,
    patentNumber: "US 2024/0192345 A1",
    title: "CERAMIC GREEN SHEET AND LAMINATED CERAMIC CAPACITOR",
    priorArtProblems: "초박층 그린시트 적층 시 접착력 부족 및 절단 공정에서의 크랙 발생.",
    solution: "아크릴계 폴리머와 아세탈계 폴리머의 블렌드를 통한 인장 강도 및 유연성 최적화.",
    representativeClaim: "Claim 1. A ceramic green sheet comprising a ceramic powder, and a binder resin containing an acrylic polymer and a polyvinyl acetal.",
    example1: "Example 1: Prepared a ceramic green sheet using 80 parts of barium titanate powder and 20 parts of a binder mixture comprising acrylic copolymer and PVB.",
    searchType: "narrow",
    relevanceScore: 91,
    documentUrl: "https://patents.google.com/patent/US20240192345A1/en"
  }
];
