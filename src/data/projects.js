export const PROJECT_TYPES = [
  { key: 'public', label: 'Public' },
  { key: 'university', label: 'University' },
  { key: 'education', label: 'Education' },
  { key: 'company', label: 'Company' },
  { key: 'personal', label: 'Personal' },
];

export const typeLabel = (key) => PROJECT_TYPES.find((t) => t.key === key)?.label ?? key;

export const projects = [

  {
    slug: 'task-manager',
    title: '데이터 중심 할 일 관리 서비스',
    year: 2025,
    period: '2025',
    type: 'personal',
    tags: ['반응형', '접근성'],
    role: '설계 · 개발 · 배포 단독 수행',
    stack: ['React', 'TypeScript', 'React Query', 'React Hook Form', 'Zod', 'GSAP'],
    featured: true,
    tagline: '서버 없이 시작해 배포까지 혼자 만든 React 서비스',
    study: {
      context: [
        '7년간 웹 표준 기반으로 화면을 만들어 왔지만, 실무에서 SPA 를 다룰 기회는 없었다. 학습용 예제가 아니라 실제로 쓸 수 있는 크기의 서비스를 처음부터 끝까지 혼자 만들어 보기로 했다.',
        '기획 · 설계 · 개발 · 배포를 모두 단독으로 진행했고, 백엔드는 준비되지 않은 상태에서 시작했다.',
      ],
      problem: [
        '서버가 없는 상태에서 프론트엔드 개발을 시작해야 했다. 목업을 코드 곳곳에 흩어 두면 실제 API 가 붙을 때 그 자리를 전부 찾아 고쳐야 한다.',
        '할 일 관리는 목록과 상세, 여러 화면이 같은 데이터를 본다. 한 곳에서 수정한 값이 다른 화면에 반영되지 않으면 사용자는 자기가 무엇을 저장했는지 믿을 수 없게 된다.',
      ],
      approach: [
        {
          title: '데이터 계층을 화면에서 떼어냈다',
          text: '컴포넌트가 fetch 를 직접 부르지 않고 쿼리 훅만 부르게 했다. 목업이든 실제 API 든 그 훅 아래에서 갈리므로, 서버가 붙을 때 화면 코드는 건드리지 않는다.',
        },
        {
          title: '캐시를 상태의 단일 출처로 삼았다',
          text: '수정 결과를 각 화면이 따로 들고 있으면 동기화 지점이 화면 수만큼 늘어난다. React Query 의 캐시 하나만 갱신하고 나머지는 거기서 읽게 해서, 새로고침 없이도 모든 화면이 같은 값을 보게 했다.',
        },
        {
          title: '검증 규칙을 한 벌만 두었다',
          text: 'Zod 스키마 하나를 폼 검증과 타입 추론에 함께 썼다. 규칙과 타입이 갈라지지 않으므로, 스키마를 고치면 타입 오류가 고칠 자리를 알려준다.',
        },
      ],
      implementation: [
        {
          title: '환경으로 갈아 끼우는 목업 레이어',
          text: '환경 변수에 따라 같은 인터페이스의 목업 구현과 실제 API 구현 중 하나를 주입한다. 서버가 없어도 로컬에서 모든 기능을 끝까지 테스트할 수 있다.',
        },
        {
          title: '낙관적 갱신',
          text: '수정 요청을 보내는 즉시 캐시를 먼저 바꾸고, 실패하면 이전 값으로 되돌린다. 네트워크를 기다리는 동안 화면이 멈춰 있지 않다.',
        },
        {
          title: '입력 시점 검증',
          text: 'React Hook Form + Zod 로 사용자가 입력하는 동안 유효성을 확인해, 잘못된 데이터가 전송되는 경로 자체를 막았다.',
        },
        {
          title: 'GSAP ScrollTrigger 인터랙션',
          text: '스크롤 진입 시점에 맞춰 요소가 순차적으로 나타나도록 트리거 기반 애니메이션을 구현했다.',
        },
      ],
      screens: [
        {
          title: '할 일 목록 및 상세 화면',
          text: '필터와 정렬을 건 목록 화면. 캐시 한 곳에서 읽으므로 다른 화면에서 고친 값이 그대로 보인다. 수정 요청을 보내는 즉시 화면이 먼저 바뀌고, 실패하면 이전 값으로 되돌아간다.',
          src: '/images/projects/todo.jpg',
        },
        {
          title: '작성 · 수정 폼',
          text: '입력하는 동안 스키마로 검증해, 잘못된 값이 전송되는 경로 자체를 막았다.',
          src: '/images/projects/todo-screen.jpg',
        },
      ],
      learned: [
        {
          icon: 'layers',
          title: '경계를 먼저 그으면 나중이 편해진다',
          text: '데이터 계층을 화면에서 떼어 두니 서버가 붙는 시점에 화면 코드를 열 일이 없었다. 처음에 한 겹 더 나누는 비용이 나중의 수정 범위를 대신 줄여 준다.',
        },
        {
          icon: 'idea',
          title: '상태의 출처는 하나여야 한다',
          text: '같은 데이터를 화면마다 따로 들고 있으면 맞춰야 할 지점이 화면 수만큼 늘어난다. 기능을 붙이기 전에 어디를 단일 출처로 삼을지 정하는 편이 빨랐다.',
        },
        {
          icon: 'user',
          title: '끝까지 혼자 만들어 본 경험',
          text: '기획부터 배포까지 직접 정해 보니, 실무에서 넘겨받던 결정들이 어떤 제약 위에서 내려진 것인지 보이기 시작했다.',
        },
      ],
    },
    thumb: '/images/projects/todo.jpg',
    cover: '/images/projects/todo-cover.jpg',
  },

  {
    slug: 'kosin',
    title: '고신대학교 진학정보 홈페이지',
    year: 2026,
    period: '2026.07',
    type: 'university',
    site: 'https://www.kosin.ac.kr/myw/',
    thumb: '/images/projects/kosin.jpg',
  },

  {
    slug: 'upa-safe',
    title: '울산항만공사 재난안전 홈페이지',
    year: 2024,
    period: '2023.12 — 2024.01',
    type: 'public',
    site: '  https://www.upa.or.kr/safe/main.do',
    thumb: '/images/projects/upa.jpg',
  },

  {
    slug: 'ulsan-edu-office',
    title: '울산시교육청 CMS 구축',
    year: 2023,
    period: '2023.05 — 2023.10',
    type: 'education',
    tags: ['반응형', '접근성'],
    role: '프론트엔드 개발',
    stack: ['HTML', 'CSS', 'JavaScript', 'Java', '전자정부 프레임워크', 'Git'],
    featured: true,
    tagline: '47개 사이트의 동시 개편을 리드하며 공통 기준과 접근성을 맞춘 프로젝트',
    study: {
      context: [
        '교육청 본청과 산하 기관 47개 사이트를 같은 오픈 일정에 맞춰 동시에 개편하는 프로젝트였다.',
        '팀 리드를 맡아 작업자별 사이트 배분, 일정 확인과 재배분, 공통 구조 작업, 결과물 검수와 코드 리뷰를 진행했다.',
        '프론트엔드 관련 이슈에서는 백엔드·디자인·기획 담당자와의 커뮤니케이션 창구 역할을 맡았으며, 사이트별 요구사항에 따라 프로그램 화면도 직접 구현했다.',
        '대표 사이트의 웹 접근성 인증을 대응하고, 나머지 사이트에도 동일한 기준을 적용해 전체 사이트의 접근성 수준을 맞췄다.',
      ],
      problem: [
        '47개 사이트가 같은 일정으로 진행되어 한 작업의 지연이나 기준 차이가 다른 사이트의 일정과 결과물에도 영향을 줄 수 있었다.',
        '수업용 알림판은 범용 웹에디터만큼 많은 기능이 필요하지 않았고, 기존 에디터를 그대로 사용하면 불필요한 기능과 디자인 수정 범위가 커지는 문제가 있었다.',
        '예약 화면은 백엔드에서 전달되는 상태값만 그대로 출력해서는 사용자가 현재 선택할 수 있는 행동과 화면 상태를 표현하기 어려웠다.',
        '웹 접근성을 완성 후 한꺼번에 수정하면 같은 문제를 여러 사이트에서 반복해서 수정해야 하기 때문에 구현 단계부터 동일한 기준을 적용할 필요가 있었다.',
      ],

      approach: [
        {
          title: '사이트보다 먼저 공통 기준을 맞췄다',
          text: '47개 사이트를 병렬로 진행하기 위해 공통으로 사용할 구조와 구현 기준을 먼저 잡고 사이트를 작업자별로 배분했다. 진행 상황을 확인하면서 지연되는 작업은 다시 배분하고 결과물을 검수했다.',
        },

        {
          title: '필요한 기능의 범위를 먼저 줄였다',
          text: '수업용 알림판이라는 사용 목적에 맞춰 범용 에디터를 그대로 적용하지 않고 글자 크기·글자색·배경색 등 실제 수업에 필요한 편집 기능을 중심으로 직접 구현했다.',
        },

        {
          title: '서로 다른 기능의 책임을 분리했다',
          text: '에디터, 벨·알림음, 타이머, 스톱워치, 점수판, 발표자 랜덤 추첨처럼 역할이 다른 기능은 각각 분리해 구현했다.',
        },

        {
          title: '서버 상태를 사용자 화면의 상태로 해석했다',
          text: '예약 화면에서는 백엔드에서 전달되는 값을 그대로 노출하지 않고 상태에 따라 사용자가 선택할 수 있는 버튼과 화면 표현이 달라지도록 프론트엔드에서 분기했다.',
        },

        {
          title: '접근성을 구현 단계의 기준으로 두었다',
          text: '인증 단계에서 사후 보완하기보다 신규 UI를 구현할 때부터 키보드 이동과 포커스 흐름을 함께 검토하고, 대표 사이트의 인증 대응 과정에서 확인된 기준을 다른 사이트에도 적용했다.',
        },
      ],
      implementation: [
        {
          title: '수업 도우미 기능',
          text: '알림판용 커스텀 에디터와 벨·알림음, 타이머, 스톱워치, 점수판, 발표자 랜덤 추첨 등 수업 진행을 돕는 기능을 구현했다.',
        },

        {
          title: '필요한 기능만 가진 커스텀 에디터',
          text: '수업용 알림판에 필요한 글자 크기, 글자색, 배경색 등의 편집 기능을 직접 구현했다. 운영 중 서로 다른 글자 크기의 텍스트를 함께 선택해 색상을 변경하면 크기가 하나로 합쳐지는 문제를 확인하고 기존 스타일 구조가 유지되도록 수정했다.',
        },

        {
          title: '접근성을 고려한 포커스 처리',
          text: '팝업이나 모달을 닫았을 때 포커스가 사라지지 않고 해당 UI를 열었던 버튼으로 돌아가도록 기존 스크립트의 동작을 보완했다. 자체 검수를 진행하고 인증 기관의 검수 결과를 기준으로 팀의 수정 과정을 조율했다.',
        },

        {
          title: '예약 프로그램 상태 분기',
          text: '예약 기능이 필요한 사이트에서 HTML/CSS 화면과 JavaScript 인터랙션을 구현하고, 서버에서 전달되는 상태값을 해석해 사용 가능한 버튼과 화면 상태가 달라지도록 분기했다.',
        },

        {
          title: '채용 화면 비동기 갱신',
          text: '채용 공고 검색에서는 백엔드가 처리한 필터링 결과를 Ajax로 받아 전체 페이지를 새로고침하지 않고 결과 영역만 갱신되도록 구현했다.',
        },
      ],
      screens: [
        {
          title: '대표 사이트 메인',
          text: '47개 사이트 개편에서 공통 기준을 적용해 구현한 대표 화면.',
          src: '/images/projects/use.jpg',
        },
        {
          title: '수업 도우미',
          text: '알림판 · 타이머 · 스톱워치 · 점수판 등 수업 진행에 필요한 기능을 구성한 화면.',
          src: '/images/projects/use-screen1.jpg',
        },
        {
          title: '커스텀 에디터',
          text: '글자 크기 · 글자색 · 배경색처럼 수업용 알림판에 실제로 필요한 기능만 남긴 편집 도구.',
          src: '/images/projects/use-screen2.jpg',
        },
        {
          title: '예약 프로그램',
          text: '서버 상태값을 해석해 사용자가 선택할 수 있는 버튼과 화면 상태를 구분한 예약 화면.',
          src: '/images/projects/use-screen3.jpg',
        },
      ],
      beforeAfter: [
        {
          label: '알림판 에디터',
          before:
            '범용 웹에디터는 수업용 알림판에 필요하지 않은 기능이 많고 디자인 커스터마이징 범위도 큼',
          after: '글자 크기·글자색·배경색 등 실제 필요한 기능 중심의 커스텀 에디터 구현',
        },

        {
          label: '에디터 스타일 처리',
          before:
            '서로 다른 글자 크기의 텍스트를 함께 선택해 색상을 변경하면 기존 글자 크기가 하나로 합쳐짐',
          after: '기존 텍스트의 스타일 구조를 유지하면서 선택 영역에 새로운 스타일을 적용',
        },

        {
          label: '예약 상태',
          before:
            '서버에서 전달되는 값을 그대로 사용하면 사용자가 현재 가능한 행동을 화면에서 구분하기 어려움',
          after: '서버 상태를 사용자가 이해할 수 있는 버튼과 UI 상태로 해석해 분기',
        },

        {
          label: '접근성 대응',
          before:
            '완성 후 인증 단계에서 수정하면 여러 사이트에서 반복 작업과 누락이 발생할 가능성이 있음',
          after: '신규 UI 구현 단계부터 동일한 접근성 기준을 적용하고 대표 사이트 인증까지 대응',
        },
      ],
      learned: [
        {
          icon: 'priority',
          title: '개별 작업보다 전체 진행을 먼저 본다',
          text: '47개 사이트를 같은 일정에 맞추려면 모든 화면을 직접 처리하기보다 진행 상태를 확인하고 필요한 시점에 작업을 배분하거나 재배분하는 판단이 중요했다.',
        },

        {
          icon: 'access',
          title: '접근성은 구현 단계부터 적용한다',
          text: '완성 후 같은 문제를 여러 사이트에서 반복해서 수정하기보다 신규 화면을 만들 때부터 동일한 기준으로 구현하는 편이 누락과 재작업을 줄일 수 있었다.',
        },

        {
          icon: 'idea',
          title: '필요한 범위를 먼저 정한다',
          text: '범용 도구를 그대로 사용하는 것보다 실제 사용 목적을 기준으로 필요한 기능을 먼저 정하면 구현 범위와 이후 유지보수 범위도 함께 줄일 수 있었다.',
        },
      ],
    },
    thumb: '/images/projects/use.jpg',
    cover: '/images/projects/use-cover.jpg',
  },

  {
    slug: 'pms-migration',
    title: '자사 프로젝트 관리 시스템(PMS) 고도화',
    year: 2023,
    period: '2023',
    type: 'company',
    tags: ['반응형', '접근성'],
    role: '프론트엔드 개발',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Java', 'Spring'],
    featured: true,
    tagline: 'PHP → Java 마이그레이션, 프론트엔드를 다시 세운 작업',
    study: {
      context: [
        '사내에서 쓰던 프로젝트 관리 시스템은 PHP 로 만들어져 있었다. 이를 Java(Spring) 기반으로 옮기는 마이그레이션에서 프론트엔드 로직 전반을 담당했다.',
        '고객 · PM · PL · 개발자가 같은 시스템을 쓰지만 보는 화면과 할 수 있는 일이 각각 달랐다.',
      ],
      problem: [
        '기존 PMS는 실제 사내 업무에 사용되고 있어 주요 기능을 빠뜨리지 않고 Java 기반 환경으로 다시 구현해야 했다.',
        '백엔드도 Java로 전환하는 작업을 동시에 진행하고 있어, 프론트와 백엔드가 완성된 상태에서 순차적으로 작업할 수 없었다.',
        '기존 사용자가 이미 익숙하게 사용하던 기능과 동작은 유지해야 했기 때문에 새 디자인을 적용하더라도 화면 흐름을 임의로 바꾸기 어려웠다.',
      ],
      approach: [
        {
          title: '기존 기능을 기준으로 누락을 확인했다',
          text: '기획서와 화면 목록을 기준으로 기존 PMS의 기능을 확인하면서 Java 버전에서 빠지는 화면이나 기능이 없도록 작업 범위를 맞췄다.',
        },
        {
          title: '화면을 먼저 만들고 데이터는 순차적으로 연결했다',
          text: '백엔드의 Java 전환과 프론트엔드 작업이 동시에 진행됐기 때문에 HTML/CSS와 JavaScript 인터랙션을 먼저 구현하고, 준비되는 데이터부터 순차적으로 연결했다.',
        },
        {
          title: '새 디자인에서도 익숙한 사용 흐름은 유지했다',
          text: '화면 디자인은 새로 적용하되 기존 사용자가 익숙하게 사용하던 업무일지 작성 방식과 프로젝트 이동 흐름은 유지했다.',
        },
        {
          title: '백엔드와 동작을 맞추며 화면을 완성했다',
          text: 'Java에서 전달되는 데이터를 화면에 맞게 처리하고, 구현 과정에서 필요한 데이터와 동작은 백엔드 개발자와 확인하며 기능을 연결했다.',
        },
      ],
      implementation: [
        {
          title: '프로젝트별 업무 화면',
          text: '하나의 프로젝트 안에서 참여자, 일정, 상태와 작업 내용을 확인하고 관리할 수 있도록 프로젝트 관련 화면을 구현했다.',
        },

        {
          title: '사용자에 따른 화면 분기',
          text: '직원은 프로젝트에 등록된 전체 내용을 확인할 수 있지만, 초대된 고객은 고객용 카테고리에 해당하는 내용만 확인할 수 있도록 화면을 구분했다.',
        },

        {
          title: 'Java 기반 화면 재구현',
          text: '기존 PHP 화면을 새 디자인에 맞춰 HTML/CSS로 다시 구현하고 JavaScript 인터랙션과 Ajax 통신을 연결했다. 백엔드에서 전달되는 데이터는 각 화면에 필요한 형태로 가공해 사용했다.',
        },
      ],

      beforeAfter: [
        {
          label: '기술 환경',
          before: 'PHP 기반으로 운영되던 기존 PMS',
          after: '주요 기능을 유지한 Java 기반 PMS로 전환',
        },

        {
          label: '사용자 화면',
          before: '기존 PMS 디자인과 화면 구성',
          after: '기존 업무 흐름은 유지하면서 사용자 화면을 전면 리디자인',
        },
      ],

      learned: [
        {
          icon: 'user',
          title: '익숙한 흐름을 지키는 것도 요구사항',
          text: '화면은 새로 만들되 사용자가 몸으로 기억하는 순서는 유지해야 했다. 새 디자인이 곧 새 사용법이 되면 개선이 아니라 불편이 된다.',
        },
        {
          icon: 'layers',
          title: '완성된 데이터를 기다리지 않는 법',
          text: '백엔드 전환과 동시에 진행하느라 화면을 먼저 세우고 준비되는 데이터부터 연결했다. 순서를 나누면 서로를 기다리지 않고 갈 수 있다.',
        },
        {
          icon: 'priority',
          title: '기능 목록이 곧 안전망',
          text: '실제 사내 업무에 쓰이는 시스템이라 누락이 그대로 사고가 된다. 기존 화면과 기능을 목록으로 놓고 대조하는 단순한 방법이 가장 확실했다.',
        },
      ],
    },
  },

  {
    slug: 'seoul-edu-office',
    title: '서울시교육청 통합 홈페이지 개편',
    year: 2022,
    period: '2022.12 — 2023.02',
    type: 'education',
    tags: ['반응형', '접근성'],
    role: '프론트엔드 개발 · 팀 리드',
    stack: ['HTML', 'CSS', 'JavaScript', 'Java', '전자정부 프레임워크', 'Git'],
    featured: true,
    tagline: '기존 CMS의 제약 안에서 템플릿 분기와 공통 UI 기준을 구현한 프로젝트',
    study: {
      context: [
        '교육청 본청과 직속기관 12개 사이트를 한 번에 개편하는 프로젝트였다.',
        '이미 구축된 CMS 위에서 작업했지만 기존 CMS의 관리자 매뉴얼이 없었고 기존 개발 구조를 정확히 설명해줄 전담 개발자도 남아 있지 않았다.',
        '기존 JSP 화면과 실제 동작, 로그를 확인하며 CMS에서 전달되는 데이터와 메뉴 구조를 파악한 뒤 결정된 디자인과 프로그램 요구사항을 화면으로 구현했다.',
        '여러 사이트와 프로그램 화면을 동시에 작업해야 했기 때문에 반복되는 UI와 레이아웃은 공통 기준을 먼저 구성해 다른 작업자도 활용할 수 있도록 했다.',
      ],
      problem: [
        '사이트에 다른 디자인을 적용하려면 화면 파일을 직접 변경해야 했고 준비된 여러 디자인 중 하나를 설정값에 따라 선택해 적용할 수 있는 구조가 필요했다.',
        'CMS에서 관리되는 메뉴 정보를 화면에 직접 작성하면 관리자가 메뉴를 변경할 때마다 프론트 코드도 함께 수정해야 했다.',
        '사용자 페이지는 별도의 디자인이 완성된 상태였기 때문에 Bootstrap 스타일을 다시 덮어쓰는 방식이 오히려 화면 구현을 복잡하게 만들었다.',
        '여러 작업자가 비슷한 프로그램 화면을 나눠 구현하는 만큼 반복되는 UI와 레이아웃의 기준을 먼저 맞출 필요가 있었다.',
      ],
      approach: [
        {
          title: '기존 구현부터 확인했다',
          text: '상세한 CMS 매뉴얼이나 데이터 명세가 충분하지 않았기 때문에 JSP·FTL 화면과 기존 구현, 로그를 확인하며 데이터가 어떤 방식으로 사용되는지 먼저 파악했다.',
        },

        {
          title: '확인이 필요한 내용은 모아서 조율했다',
          text: '화면 코드만으로 확인하기 어려운 부분은 질문을 정리해 백엔드 개발자에게 전달하고, 서로의 작업에 지장이 적은 시점에 함께 확인하며 구현 범위를 맞췄다.',
        },

        {
          title: '설정값으로 템플릿을 분기했다',
          text: '별도의 완성된 선택 UI가 없는 환경에서 CMS에서 사용할 수 있는 값을 기준으로 대응하는 디자인 화면을 분기해, 화면 파일을 매번 직접 변경하지 않아도 준비된 템플릿을 적용할 수 있도록 했다.',
        },

        {
          title: '메뉴 데이터를 화면과 연결했다',
          text: 'CMS에서 전달되는 메뉴 정보와 부모·자식 관계를 기준으로 내비게이션과 화면 depth를 구성해 메뉴 구조를 화면 코드에 고정하지 않도록 했다.',
        },

        {
          title: '사용자 화면에서는 Bootstrap 의존성을 줄였다',
          text: '관리자 화면은 기존 Bootstrap 구조를 유지하되 별도 디자인이 적용되는 사용자 화면에서는 Bootstrap에 의존하지 않고 프로젝트에 필요한 스타일과 인터랙션을 직접 구현했다.',
        },

        {
          title: '반복되는 화면의 공통 기준을 먼저 만들었다',
          text: '탭·폼·리스트·레이아웃 등 프로그램 화면에서 반복되는 구조와 동작을 공통으로 구성하고, 기본 컨테이너를 유지하면서 각 화면의 콘텐츠와 디자인을 추가할 수 있도록 했다.',
        },
      ],
      implementation: [
        {
          title: '선택형 화면 템플릿',
          text: 'CMS에서 사용할 수 있는 구분값과 대응하는 화면을 연결해 하나의 사이트에서 준비된 디자인 중 필요한 템플릿을 적용할 수 있도록 분기 로직을 구현했다.',
        },

        {
          title: 'CMS 데이터 기반 내비게이션',
          text: '메뉴 이름과 경로, 부모·자식 관계 등 CMS에서 전달되는 데이터를 이용해 내비게이션과 화면 depth를 구성했다.',
        },

        {
          title: '프로젝트 전용 사용자 UI',
          text: '사용자 페이지에서는 Bootstrap에 의존하지 않고 프로젝트 디자인에 필요한 스타일과 인터랙션을 직접 구현했으며 관리자 화면은 기존 구조를 유지해 불필요한 수정 범위를 만들지 않았다.',
        },

        {
          title: '공통 UI와 레이아웃',
          text: '반복되는 프로그램 화면의 기본 마크업과 UI 동작을 먼저 구성해 공통 컨테이너를 유지하면서 내부 콘텐츠가 달라져도 동일한 기준으로 화면을 구현할 수 있도록 했다.',
        },
      ],
      beforeAfter: [
        {
          label: '템플릿 적용',
          before: '디자인 변경 시 대응하는 화면 파일을 직접 변경',
          after: '설정값에 따라 준비된 디자인 화면을 분기해 적용',
        },

        {
          label: '메뉴 구성',
          before: '화면 코드에서 메뉴 구조를 직접 관리',
          after: 'CMS에서 전달되는 메뉴 데이터와 구조를 기준으로 화면을 구성',
        },

        {
          label: '사용자 UI',
          before: '별도 디자인 위에 Bootstrap 스타일을 다시 수정하며 적용',
          after:
            '사용자 화면에서는 Bootstrap을 제거하고 프로젝트에 필요한 UI와 인터랙션을 직접 구현',
        },

        {
          label: '공통 화면',
          before: '작업자가 화면마다 필요한 UI와 레이아웃을 개별적으로 구현',
          after: '공통 구조와 스타일 가이드를 기준으로 반복 UI를 재사용',
        },
      ],

      result: [

        {
          value: 'CMS',
          icon: 'settings',
          label: '설정 기반 메뉴 · 화면 연동',
        },

        {
          value: '공통화',
          icon: 'refresh',
          label: '스타일 가이드 기반 UI 재사용',
        },
      ],
      learned: [
        {
          icon: 'idea',
          title: '먼저 기존 구조를 이해한다',
          text: '문서가 충분하지 않은 환경에서는 새로운 구조를 바로 만들기보다 기존 화면과 데이터가 어떤 방식으로 동작하는지 파악하는 과정이 먼저 필요했다.',
        },

        {
          icon: 'priority',
          title: '기존 시스템 안에서도 해결 방법은 있다',
          text: '필요한 기능이 처음부터 준비되어 있지 않더라도 기존 설정값과 메뉴 구조를 활용하면 시스템 전체를 크게 변경하지 않고 필요한 화면을 구현할 수 있었다.',
        },

        {
          icon: 'team',
          title: '공통 기준이 협업의 기준이 된다',
          text: '여러 작업자가 비슷한 화면을 나눠 구현할 때 기본 구조와 UI 기준을 먼저 맞추면 결과물을 검수하고 조율하는 과정도 단순해졌다.',
        },
      ],
    },
    thumb: '/images/projects/sen.jpg',
    cover: '/images/projects/sen-cover.jpg',
  },
  {
    slug: 'kyungbok-univ',
    title: '경복대학교 홈페이지',
    year: 2022,
    period: '2022.05 — 2022.09',
    type: 'university',
    site: 'https://www.kbu.ac.kr/kor/Main.do',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/kbu.jpg',
  },
  {
    slug: 'busan-convention-bureau',
    title: '부산컨벤션뷰로 홈페이지 콘텐츠 · 디자인 개선',
    year: 2022,
    period: '2022.02 — 2022.04',
    type: 'public',
    site: 'https://bto.or.kr/cvb/Main.do',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/bto.jpg',
  },

  {
    slug: 'arpina',
    title: '아르피나 홈페이지',
    year: 2021,
    period: '2021.11 — 2021.12',
    type: 'public',
    site: 'https://www.arpina.co.kr/kor/Main.do',
    tags: ['반응형', '접근성'],
  },
  {
    slug: 'kyungdong-univ',
    title: '경동대학교 홈페이지 재구축',
    year: 2021,
    period: '2021.05 — 2021.10',
    type: 'university',
    site: 'https://kduniv.ac.kr/kor/Main.do',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/kduniv.jpg',
  },
  {
    slug: 'dongui-tech',
    title: '동의과학대학교 홈페이지 전면 개편',
    year: 2021,
    period: '2021.04 — 2021.07',
    type: 'university',
    site: 'https://www.dit.ac.kr/kr',
    tags: ['반응형', '접근성'],
  },

  {
    slug: 'kbtus',
    title: '한국침례신학대학교 홈페이지 리뉴얼',
    year: 2020,
    period: '2020.11 — 2021.04',
    type: 'university',
    site: 'https://www.kbtus.ac.kr/kor/Main.do',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/kbtus.jpg',
  },
  {
    slug: 'dongwon-tech',
    title: '동원과학기술대학교 홈페이지',
    year: 2020,
    period: '2020.07 — 2020.11',
    type: 'university',
    site: 'https://www.dist.ac.kr/kor/Main.do',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/dist.jpg',
  },

  {
    slug: 'jinju-nue',
    title: '진주교육대학교 홈페이지 통합 구축',
    year: 2019,
    period: '2019.11 — 2020.02',
    type: 'university',
    site: 'https://www.cue.ac.kr/kor/Main.do',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/cue.jpg',
  },
  {
    slug: 'dongseoul-lifelong',
    title: '동서울대학교 평생교육원 홈페이지 구축',
    year: 2019,
    period: '2019.11 — 2020.02',
    type: 'university',
    tags: ['반응형', '접근성'],
  },
  {
    slug: 'busan-eurasia-platform',
    title: '부산유라시아플랫폼 홈페이지 구축',
    year: 2019,
    period: '2019.08 — 2019.12',
    type: 'public',
    site: 'https://beplatform.or.kr/beplatform/',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/beplatform.jpg',
  },
  {
    slug: 'hyundai-global-service',
    title: '현대글로벌서비스 홈페이지 리뉴얼',
    year: 2019,
    period: '2019.08 — 2019.12',
    type: 'company',
    tags: ['반응형', '접근성'],
  },
  {
    slug: 'silla-univ-admission',
    title: '신라대학교 입학 홈페이지 메인 개편',
    year: 2019,
    period: '2019.07 — 2019.08',
    type: 'university',
    site: 'https://ipsi.silla.ac.kr/ipsi/',
    tags: ['반응형', '접근성'],
  },
  {
    slug: 'deonajim',
    title: '더나아짐 홈페이지 제작',
    year: 2019,
    period: '2019.07 — 2019.09',
    type: 'company',
    tags: ['반응형', '접근성'],
  },
  {
    slug: 'dongseo-webzine-builder',
    title: '동서대학교 웹진빌더시스템 구축',
    year: 2019,
    period: '2019.07 — 2019.08',
    type: 'university',
    site: 'http://blog.dongseo.ac.kr/dsublog/webzine',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/blog-dongseo.jpg',
  },
  {
    slug: 'ginue-portal',
    title: '경인교육대학교 통합 홈페이지 개편',
    year: 2019,
    period: '2019.05 — 2019.10',
    type: 'university',
    site: 'https://www.ginue.ac.kr/kor/Main.do',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/ginue.jpg',
  },
  {
    slug: 'kcj-childrens-art',
    title: '2019 한중일 아동우호그림전 홈페이지 구축',
    year: 2019,
    period: '2019.04 — 2019.05',
    type: 'public',
    tags: ['반응형', '접근성'],
  },
  {
    slug: 'bmt-integrated',
    title: '비엠티 사업부 통합 홈페이지 구축',
    year: 2019,
    period: '2019.04 — 2019.08',
    type: 'company',
    site: 'https://www.superlok.com/kr',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/bmt.jpg',
  },

  {
    slug: 'lavals-hotel',
    title: '라발스호텔 홈페이지 제작',
    year: 2018,
    period: '2018.11 — 2019.02',
    type: 'company',
    tags: ['반응형', '접근성'],
  },
  {
    slug: 'korea-shoes-center',
    title: '한국신발관 홈페이지 구축',
    year: 2018,
    period: '2018.10 — 2018.12',
    type: 'public',
    site: 'https://www.k-shoes.kr/main',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/k-shoes.jpg',
  },
  {
    slug: 'kaems',
    title: 'KAEMS 홈페이지 구축',
    year: 2018,
    period: '2018.09 — 2018.12',
    type: 'company',
    site: 'https://www.kaems.com/kor',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/kaems.jpg',
  },
  {
    slug: 'hotel-nongshim',
    title: '호텔농심 반응형 홈페이지 구축',
    year: 2018,
    period: '2018.07 — 2018.10',
    type: 'company',
    site: 'https://www.hotelnongshim.com/kr/',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/nongshim.jpg',
  },
  {
    slug: 'hwaseung-networks',
    title: '㈜화승네트웍스 홈페이지 개편',
    year: 2018,
    period: '2018.07',
    type: 'company',
    site: 'https://www.hsnetw.co.kr/kr/',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/hwaseung.jpg',
  },
  {
    slug: 'interges',
    title: '인터지스 홈페이지 구축',
    year: 2018,
    period: '2018.07',
    type: 'company',
    site: 'https://www.intergis.co.kr/kor/Main.do',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/intergis.jpg',
  },
  {
    slug: 'dongseo-rweset',
    title: '동서대학교 R-WeSET 홈페이지 제작',
    year: 2018,
    period: '2018.07',
    type: 'university',
    site: 'https://uni.dongseo.ac.kr/wiset/',
    tags: ['반응형', '접근성'],
  },
  {
    slug: 'dongseoul-dept-sites',
    title: '동서울대학교 학과 홈페이지 개편',
    year: 2018,
    period: '2018.07 — 2018.10',
    type: 'university',
    site: 'https://www.du.ac.kr/submenu.do?menuord=4&submenuord=0&',
    tags: ['반응형', '접근성'],
    thumb: '/images/projects/du.jpg',
  },

  {
    slug: 'her-closet',
    title: '‘그녀의 옷장’ 웹 · 앱 디자인 및 퍼블리싱',
    year: 2015,
    period: '2015.03 — 2017.04',
    type: 'company',
    tags: ['반응형', '접근성'],
  },
];

export const caseStudies = projects.filter((p) => p.featured).sort((a, b) => b.year - a.year);

export const getProject = (slug) => projects.find((p) => p.slug === slug);

const numbers = new Map(projects.map((p, i) => [p.slug, String(i + 1).padStart(2, '0')]));
export const archiveNo = (slug) => numbers.get(slug) ?? '';

export const filterByType = (type) =>
  type === 'all' ? projects : projects.filter((p) => p.type === type);

export const archiveMeta = {
  from: Math.min(...projects.map((p) => p.year)),
  to: Math.max(...projects.map((p) => p.year)),
  count: projects.length,
};
