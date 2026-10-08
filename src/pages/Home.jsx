import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useLenis } from '../providers/SmoothScrollProvider';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import PageTransition from '../components/PageTransition';
import HeroWordmark from '../components/HeroWordmark';
import { claimActiveRoute } from '../lib/activeRoute';
import useMediaQuery from '../lib/useMediaQuery';
import { STACK, EXPERTISE } from '../data/data';
import Reveal from '../components/Reveal';

const STACKED_QUERY = '(max-width: 720px), (max-height: 700px)';

const intro = [
  '웹 표준과 접근성을 기준으로',
  '다양한 환경에서 안정적으로 사용할 수 있는 화면을 만들어왔습니다.',
  '콘텐츠의 우선순위와 사용 흐름을 살피고,',
  '필요한 인터랙션과 구조를 더해 화면을 개선합니다.',
  '지금은 React·TypeScript를 기반으로',
  '기존 UI 개발 경험을 더 다양한 방식으로 확장하고 있습니다.',
];

const timeline = [
  {
    year: '2023.11 - 2026.08',
    place: '기술 재정비 및 React 기반 실무 역량 전환',
    role: 'React·TypeScript·React Query 기반 개인 프로젝트를 설계부터 배포까지 단독으로 수행하며, 웹 표준 중심의 실무 경험을 최신 프론트엔드 스택으로 전환했습니다.',
  },
  {
    year: '~ 2023.11 (7년)',
    place: 'SI · 웹 에이전시',
    role: '대학·공공기관 CMS 구축과 유지보수 프로젝트 30여 건을 수행했습니다. 47개 사이트 개편 프로젝트의 팀 리드를 맡아 웹 접근성 인증을 획득했고, 자사 PMS 의 PHP → Java 마이그레이션에서 프론트엔드 로직 전반을 담당했습니다.',
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  const stacked = useMediaQuery(STACKED_QUERY);

  const lenis = useLenis();
  const lenisRef = useRef(null);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const heroTl = useRef(null);
  const heroGate = useRef({ loaded: false, entered: false });

  const playHero = useCallback(() => {
    const { loaded, entered } = heroGate.current;
    if (loaded && entered && heroTl.current?.paused()) heroTl.current.play();
  }, []);

  const handleEntered = useCallback(() => {
    heroGate.current.entered = true;
    playHero();
  }, [playHero]);

  useGSAP(
    () => {
      const letters = gsap.utils.toArray('.hero__word path', heroRef.current);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const draws = letters.length > 0 && !reduced;

      if (draws) {
        gsap.set(letters, {
          opacity: 0,
          strokeDasharray: (i, path) => path.getTotalLength(),
          strokeDashoffset: (i, path) => path.getTotalLength(),
        });
      }

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

      if (draws) {
        tl.to(letters, {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power2.inOut',
        });
      }

      tl.from('.hero__sub, .hero__cta', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5');

      heroTl.current = tl;

      const markLoaded = () => {
        heroGate.current.loaded = true;
        playHero();
      };

      if (document.readyState === 'complete') {
        markLoaded();
        return;
      }

      window.addEventListener('load', markLoaded);
      return () => window.removeEventListener('load', markLoaded);
    },
    { scope: heroRef },
  );

  useGSAP(
    () => {
      gsap.to('.hero__glow', {
        yPercent: 35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: heroRef },
  );

  useGSAP(
    () => {
      const words = gsap.utils.toArray('.about__word', introRef.current);
      if (!words.length) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          duration: 3,
          stagger: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: true,
          },
        },
      );
    },
    { scope: introRef },
  );

  useGSAP(
    () => {
      if (stacked) return;

      const track = trackRef.current;
      const viewport = pinRef.current;
      const panels = gsap.utils.toArray('.service', track);
      const getDistance = () => Math.max(0, (panels.length - 1) * viewport.clientHeight);
      if (getDistance() <= 0) return;

      const isCurrentRoute = claimActiveRoute();

      const steps = EXPERTISE.length - 1;

      const SNAP_DURATION = 0.6;
      const CHANGE_LOCK = 0.5;
      let anchor = 0;
      let snapping = false;
      let held = false;
      let settleTimer;
      let lockTimer;

      const stepEls = gsap.utils.toArray('.pin__step', viewport);

      const showPanel = (index) => {
        viewport.dataset.panel = String(index);
        panels.forEach((el, i) => el.classList.toggle('is-active', i === index));
        stepEls.forEach((el, i) => {
          el.classList.toggle('is-active', i === index);
          el.classList.toggle('is-done', i < index);
        });
      };

      const setAnchor = (index) => {
        anchor = index;
        showPanel(index);
      };

      const release = (lenis) => {
        clearTimeout(lockTimer);
        lockTimer = undefined;
        if (lenis) lenis.isLocked = false;
        snapping = false;
      };

      const holdOnEnter = (self) => {
        const lenis = lenisRef.current;
        if (held || snapping || !lenis?.isScrolling) return;
        const y = self.scroll();
        if (y <= self.start || y >= self.end) return;
        held = true;
        setAnchor(self.progress > 0.5 ? steps : 0);
        snapping = true;
        clearTimeout(settleTimer);
        clearTimeout(lockTimer);

        lenis.scrollTo(lenis.animatedScroll, { immediate: true, force: true });
        lenis.isLocked = true;
        lockTimer = setTimeout(() => release(lenis), CHANGE_LOCK * 1000);
      };

      const goTo = (index, self) => {
        const lenis = lenisRef.current;

        if (!lenis || !isCurrentRoute()) return;
        const changed = index !== anchor;
        snapping = true;
        clearTimeout(lockTimer);
        showPanel(index);
        lenis.scrollTo(self.start + (index / steps) * (self.end - self.start), {
          duration: SNAP_DURATION,
          lock: true,

          force: true,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          onComplete: () => {
            setAnchor(index);

            const rest = changed ? CHANGE_LOCK * 1000 : 0;
            if (rest <= 0) {
              release(lenis);
              return;
            }

            lenis.isLocked = true;
            lockTimer = setTimeout(() => release(lenis), rest);
          },
        });
      };

      showPanel(0);
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!isCurrentRoute()) return;
          holdOnEnter(self);
          if (snapping || !lenisRef.current) return;
          const raw = self.progress * steps;
          const delta = raw - anchor;

          if (Math.abs(delta) >= 0.3) {
            const next = Math.min(steps, Math.max(0, anchor + Math.sign(delta)));
            if (next !== anchor) {
              clearTimeout(settleTimer);
              goTo(next, self);
              return;
            }
          }

          clearTimeout(settleTimer);
          settleTimer = setTimeout(() => {
            if (snapping) return;
            if (Math.abs(self.progress * steps - anchor) > 0.002) goTo(anchor, self);
          }, 140);
        },

        onLeave: () => {
          clearTimeout(settleTimer);
          setAnchor(steps);
          held = false;
        },
        onLeaveBack: () => {
          clearTimeout(settleTimer);
          setAnchor(0);
          held = false;
        },
      });

      return () => {
        clearTimeout(settleTimer);
        release(lenisRef.current);
      };
    },
    { scope: pinRef, dependencies: [stacked], revertOnUpdate: true },
  );

  return (
    <PageTransition className='home' onEntered={handleEntered}>
      <section className='hero' ref={heroRef}>
        <div className='hero__glow' aria-hidden='true' />
        <h1 className='hero__title' lang='en'>
          <HeroWordmark label='Frontend' />
          <HeroWordmark label='Developer' colorFrom={8} />
        </h1>
        <div className='hero__lead'>
          <div className='hero__cta'>
            <Link to='/projects' className='btn btn--primary'>
              Projects 바로가기
            </Link>
          </div>
        </div>
      </section>

      <section className='about'>
        <h2 className='sr-only'>About</h2>
        <div className='about__intro' ref={introRef}>
          <p>
            {intro.map((sentence) => (
              <span key={sentence}>
                {sentence.split(' ').map((word, i) => (
                  <span className='about__word' key={`${word}-${i}`}>
                    {word}{' '}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className='toolbox'>
        <Reveal as='h2' className='toolbox__heading'>
          Toolbox
        </Reveal>
        <Reveal
          as='div'
          className='toolbox__groups'
          selector='.toolbox__group'
          y={24}
          stagger={0.08}
        >
          {STACK.map((group, i) => (
            <div className='toolbox__group' key={group.label}>
              <span className='toolbox__no' aria-hidden='true'>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className='toolbox__label'>{group.label}</h3>
              <ul className='toolbox__list'>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </section>

      <section
        className='pin'
        ref={pinRef}
        data-panel='0'
        data-stacked={stacked ? 'true' : undefined}
        style={{ '--panel-count': EXPERTISE.length }}
      >
        <Reveal as='h2' className='pin__label'>
          EXPERTISE
        </Reveal>
        <div className='pin__track' ref={trackRef}>
          {EXPERTISE.map((s) => (
            <article className='service' key={s.no}>
              <header className='service__head'>
                <p className='service__key'>
                  <span className='service__no'>{s.no}</span>
                  <span className='service__key-text'>{s.key}</span>
                </p>
                <p className='service__meta'>{s.meta}</p>
              </header>

              <div className='service__lead'>
                <h3 className='service__title'>{s.title}</h3>

                <div className='service__desc'>
                  {s.desc.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <dl className='service__spec'>
                {s.spec.map((col) => (
                  <div className='service__spec-row' key={col.label}>
                    <dt>{col.label}</dt>
                    {col.items.map((item) => (
                      <dd key={item}>{item}</dd>
                    ))}
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <ol className='pin__steps' aria-hidden='true'>
          {EXPERTISE.map((s) => (
            <li className='pin__step' key={s.no}>
              <span className='pin__step-no'>{s.no}</span>
              <span className='pin__step-key'>{s.key}</span>
            </li>
          ))}
        </ol>
      </section>
    </PageTransition>
  );
}
