export const EXPERTISE = [
  {
    no: '01',
    key: 'Accessibility',
    title: '누구나 사용할 수 있는 화면',
    meta: 'Web Standards · Accessibility',
    desc: [
      '키보드와 스크린리더에서도 같은 정보와 기능에 도달할 수 있도록 구현합니다.',
      '화면의 상태와 포커스 흐름까지 함께 확인하며 실제 사용 과정에서 발생하는 접근성 문제를 개선합니다.',
    ],
    spec: [
      {
        label: 'Approach',
        items: ['사용 흐름 확인', '상태와 포커스 검수'],
      },
      {
        label: 'Tools',
        items: ['WAI-ARIA', '스크린리더', '키보드'],
      },
      {
        label: 'Scope',
        items: ['시맨틱 마크업', '포커스 관리', '접근성 검수'],
      },
    ],
  },

  {
    no: '02',
    key: 'Responsive UI',
    title: '환경에 맞게 다시 구성하는 화면',
    meta: 'Responsive · Cross Browser',
    desc: [
      'PC와 모바일 시안을 그대로 나누기보다 화면 크기와 콘텐츠의 중요도를 함께 봅니다.',
      '필요한 경우 콘텐츠 순서를 조정하고 하나의 구조 안에서 자연스럽게 재배치되도록 구현합니다.',
    ],
    spec: [
      {
        label: 'Approach',
        items: ['콘텐츠 우선순위', '디바이스별 사용 흐름'],
      },
      {
        label: 'Tools',
        items: ['Flexbox', 'CSS Grid', 'Media Query'],
      },
      {
        label: 'Scope',
        items: ['반응형 레이아웃', '콘텐츠 재배치', '크로스브라우징'],
      },
    ],
  },

  {
    no: '03',
    key: 'Interaction',
    title: '상태와 흐름을 연결하는 인터랙션',
    meta: 'JavaScript · React · GSAP',
    desc: [
      '사용자 입력에 따라 상태가 달라지는 프로그램 UI부터 스크롤과 화면 전환에 반응하는 인터랙션까지 구현합니다.',
      '움직임을 추가하는 것보다 화면의 상태와 사용 흐름이 자연스럽게 이어지는지를 먼저 확인합니다.',
    ],
    spec: [
      {
        label: 'Approach',
        items: ['상태 변화', '사용 흐름'],
      },
      {
        label: 'Tools',
        items: ['JavaScript', 'React', 'GSAP'],
      },
      {
        label: 'Scope',
        items: ['프로그램 UI', '스크롤 인터랙션', '화면 전환'],
      },
    ],
  },

  {
    no: '04',
    key: 'Performance',
    title: '측정하고 개선하는 화면',
    meta: 'Performance · Resource Loading',
    desc: [
      '성능 문제가 발생하면 체감만으로 판단하지 않고 리소스의 크기와 로딩 순서, 실행 시점을 확인합니다.',
      '수정 후 다시 측정하면서 프론트엔드에서 개선할 수 있는 부분을 하나씩 줄여갑니다.',
    ],
    spec: [
      {
        label: 'Approach',
        items: ['측정 후 개선', '영향 범위 확인'],
      },
      {
        label: 'Tools',
        items: ['Lighthouse', 'Chrome DevTools'],
      },
      {
        label: 'Scope',
        items: ['이미지 로딩', '스크립트 분리', '웹폰트 최적화'],
      },
    ],
  },
];

export const STACK = [
  {
    label: 'Core Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'],
  },
  {
    label: 'State / Data / Form',
    items: ['TanStack Query', 'Redux', 'React Hook Form', 'Zod', 'AJAX'],
  },
  {
    label: 'UI / Accessibility / Interaction',
    items: ['Tailwind CSS', 'GSAP', 'ScrollTrigger', 'Lenis', 'Responsive Web', 'WAI-ARIA'],
  },
  {
    label: 'Runtime / Environment',
    items: ['Node.js', 'PHP', 'JSP / FTL', 'Apache', '전자정부 프레임워크'],
  },
  {
    label: 'Quality / Tools',
    items: ['Lighthouse', 'Chrome DevTools', 'Jest', 'Git'],
  },
];
