export const EXPERTISE = [
  {
    no: '01',
    key: 'Accessibility',
    title: '웹 접근성과 기존 서비스 개선',
    meta: '공공기관 · 대학 · 웹 접근성 인증',
    desc: [
      '새로 만드는 화면뿐 아니라 기존 시스템까지 검수하며 접근성 문제를 개선합니다.',
      '키보드 포커스처럼 스크립트에서 발생한 문제는 기존 코드를 추적해 원인이 되는 부분을 수정하여',
      '웹 접근성 인증을 획득했습니다.',
    ],
    spec: [
      {
        label: 'Approach',
        items: ['문제 범위 특정', '기존 코드 분석'],
      },
      {
        label: 'Tools',
        items: ['WAI-ARIA', '스크린 리더', '키보드 검수'],
      },
      {
        label: 'Scope of work',
        items: ['포커스 관리', '시맨틱 마크업', '접근성 검수'],
      },
    ],
  },

  {
    no: '02',
    key: 'CMS / Legacy',
    title: 'CMS · 레거시 환경 대응',
    meta: 'PHP · Java · CMS 구축 및 전환',
    desc: [
      '명세가 충분하지 않은 환경에서는 로그와 기존 구현을 먼저 읽어 데이터와 동작 규칙을 파악합니다.',
      '서버에서 전달되는 값을 해석해 화면에 필요한 구조와 상태로 구현합니다.',
      '확인하기 어려운 부분은 백엔드 개발자와 조율하고, 파악한 내용은 이후 작업에서도 사용할 수 있게 정리합니다.',
    ],
    spec: [
      {
        label: 'Approach',
        items: ['기존 코드 분석', '백엔드 협업'],
      },
      {
        label: 'Tools',
        items: ['Java', 'PHP', '전자정부 프레임워크'],
      },
      {
        label: 'Scope of work',
        items: ['CMS 구조 파악', '데이터 해석', '레거시 전환'],
      },
    ],
  },

  {
    no: '03',
    key: 'UI System',
    title: '공통 UI와 화면 구조 설계',
    meta: '스타일 가이드 · 프로그램 UI · 템플릿',
    desc: [
      '프로젝트마다 탭·리스트·폼·공통 레이아웃을 먼저 정의하고 스타일 가이드로 정리합니다.',
      '새로운 디자인 요구는 공통 규칙에 반영해 다른 작업자도 같은 구조를 재사용할 수 있도록 합니다.',
    ],
    spec: [
      {
        label: 'Approach',
        items: ['공통 구조 우선', '재사용 기준 정의'],
      },
      {
        label: 'Tools',
        items: ['HTML', 'CSS', 'JavaScript'],
      },
      {
        label: 'Scope of work',
        items: ['공통 레이아웃', '스타일 가이드'],
      },
    ],
  },

  {
    no: '04',
    key: 'Performance',
    title: '측정 기반 프론트엔드 성능 개선',
    meta: 'Lighthouse · Network 기반 개선',
    desc: [
      '성능 문제가 발생하면 Lighthouse와 Network를 기준으로 현재 상태와 리소스 로딩 흐름부터 확인합니다.',
      '이미지는 지연 로딩하고, 스크립트는 실제 필요한 페이지에서만 로드하도록 범위를 줄입니다.',
      '수정할 때마다 다시 측정하며 리소스 우선순위와 초기 로딩 상태를 비교해 개선합니다.',
    ],
    spec: [
      {
        label: 'Approach',
        items: ['측정 후 개선', '초기 로딩 최소화'],
      },
      {
        label: 'Tools',
        items: ['Lighthouse', 'Chrome DevTools', 'Lazy Loading'],
      },
      {
        label: 'Scope of work',
        items: ['리소스 우선순위', '페이지별 스크립트 로딩', '파일 경량화'],
      },
    ],
  },
];

export const STACK = [
  'HTML5',
  'CSS3',
  'Sass',
  'PostCSS',
  'Tailwind CSS',
  '웹표준',
  '웹접근성',
  '반응형웹',
  'JavaScript',
  'TypeScript',
  'Web API',
  'Ajax',
  'jQuery',
  'jQuery UI',
  'React',
  'Next.js',
  'React Query',
  'React Router',
  'Redux',
  'Node.js',
  'Apache',
  'JSP',
  'FreeMarker',
  'PHP',
  'Git',
  'Figma',
];
