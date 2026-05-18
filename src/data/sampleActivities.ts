import { Activity } from '../types/activity';

export const sampleActivities: Activity[] = [
  {
    id: "1",
    title: "구글 프론트엔드 인턴십",
    category: "internship",
    status: "preparing",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // D-5
    link: "https://careers.google.com",
    documents: [
      { id: "d1", title: "영문 이력서(Resume)", checked: true },
      { id: "d2", title: "포트폴리오", checked: false },
      { id: "d3", title: "성적증명서", checked: false }
    ],
    questions: [
      { id: "q1", title: "지원 동기", answer: "글로벌 프로덕트를 개발하고 싶습니다." },
      { id: "q2", title: "가장 도전적이었던 프로젝트" }
    ],
    memo: "추천인 제도 확인해볼 것",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "네이버 신입 공채",
    category: "activity",
    status: "submitted",
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // D+2
    link: "https://recruit.navercorp.com",
    documents: [
      { id: "d4", title: "이력서", checked: true },
      { id: "d5", title: "포트폴리오", checked: true }
    ],
    questions: [
      { id: "q3", title: "네이버 서비스 개선 아이디어", answer: "네이버 지도 UI/UX 개선" }
    ],
    memo: "결과 발표는 다음달 15일 예정",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "정보처리기사 실기 접수",
    category: "certificate",
    status: "interested",
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // D-1
    link: "https://www.q-net.or.kr",
    documents: [],
    questions: [],
    memo: "아침 10시 땡하면 바로 접속할 것!",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "카카오 해커톤 2026",
    category: "hackathon",
    status: "document_passed",
    deadline: new Date().toISOString().split('T')[0], // D-Day
    link: "https://hackathon.kakao.com",
    documents: [
      { id: "d6", title: "참가신청서", checked: true },
      { id: "d7", title: "아이디어 기획서", checked: true }
    ],
    questions: [],
    memo: "본선 진출 확정! 팀원들과 오프라인 모임 일정 잡기",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
