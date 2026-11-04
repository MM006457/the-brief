// All of the site's animation lives here.
//
// How to use it in any page:
//   data-split        on a heading  → its words rise in one at a time
//   data-reveal       on any block  → fades up when scrolled into view
//   data-stagger      on a container → its direct children reveal one after another
//   data-rule         on a heading  → its top border draws across as it scrolls in
//   data-progress     on a bar      → fills as you read the page
//
// Everything is skipped for visitors who have "reduce motion" switched on.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function show() {
  root.classList.remove("motion");
}

if (reduce) {
  show();
} else {
  // Smooth scrolling, kept in step with ScrollTrigger
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // In-page links (#ask, #signup) scroll smoothly too
  document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const url = new URL(a.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
      history.replaceState(null, "", url.hash);
    });
  });

  document.fonts.ready.then(() => {
    // Headlines: words rise in
    document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
      const split = SplitText.create(el, { type: "words", mask: "words" });
      gsap.from(split.words, {
        yPercent: 110,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.045,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    // Blocks: fade up on scroll
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 28, autoAlpha: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    // Groups: children one after another
    gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
      gsap.from(el.children, {
        y: 24, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // Section rules draw across
    gsap.utils.toArray<HTMLElement>("[data-rule] h2, h2[data-rule]").forEach((h) => {
      gsap.fromTo(h, { "--rule": 0 }, {
        "--rule": 1, duration: 1, ease: "power2.inOut",
        scrollTrigger: { trigger: h, start: "top 90%", once: true },
      });
    });

    // Reading progress bar
    document.querySelectorAll<HTMLElement>("[data-progress]").forEach((bar) => {
      gsap.fromTo(bar, { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });
    });

    show();
    ScrollTrigger.refresh();
  });
}

// Safety net: never leave content hidden if something goes wrong
setTimeout(show, 2500);
