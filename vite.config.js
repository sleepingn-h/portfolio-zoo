import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 는 SPA 폴백이 없다. /projects 로 직접 들어오면 그 이름의 파일을 찾다가
// 없으니 404.html 을 돌려준다. 그 404.html 을 index.html 사본으로 만들어 두면
// 어떤 경로로 들어와도 앱이 뜨고, 이후는 라우터가 주소를 보고 화면을 고른다.
// (응답 상태 코드는 404 로 남는다 — 사용자에게는 정상 화면이지만 크롤러에는 404 다)
const spaFallback = () => {
  let outDir
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// GitHub Pages 프로젝트 페이지는 https://<user>.github.io/<repo>/ 로 서빙된다.
// 그래서 빌드 결과물의 asset 경로 앞에 저장소 이름이 붙어야 한다.
//  - CI: 워크플로우에서 BASE_PATH=/<repo>/ 를 주입한다 (저장소 이름 자동 반영)
//  - 로컬 build/preview: 아래 기본값 사용
//  - dev 서버: 항상 '/'
// user/organization 페이지(<user>.github.io 저장소)라면 base 를 '/' 로 두면 된다.
const FALLBACK_BASE = '/portfolio-zoo/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? process.env.BASE_PATH || FALLBACK_BASE : '/',
  plugins: [react(), spaFallback()],
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
