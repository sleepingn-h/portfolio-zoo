import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 프로젝트 페이지는 https://<user>.github.io/<repo>/ 로 서빙된다.
// 그래서 빌드 결과물의 asset 경로 앞에 저장소 이름이 붙어야 한다.
//  - CI: 워크플로우에서 BASE_PATH=/<repo>/ 를 주입한다 (저장소 이름 자동 반영)
//  - 로컬 build/preview: 아래 기본값 사용
//  - dev 서버: 항상 '/'
// user/organization 페이지(<user>.github.io 저장소)라면 base 를 '/' 로 두면 된다.
const FALLBACK_BASE = '/portfolio-zoo/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? process.env.BASE_PATH || FALLBACK_BASE : '/',
  plugins: [react()],
  build: {
    // 애니메이션/프레임워크 의존성은 앱 코드와 갱신 주기가 달라서 따로 떼어둔다.
    // 앱만 고쳐 배포해도 vendor 청크는 브라우저 캐시에 그대로 남는다.
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: 'vendor-react', test: /node_modules[\\/](react|react-dom|react-router)/ },
            { name: 'vendor-motion', test: /node_modules[\\/](motion|framer-motion)/ },
            { name: 'vendor-scroll', test: /node_modules[\\/](gsap|@gsap|lenis)/ },
          ],
        },
      },
    },
  },
}))
