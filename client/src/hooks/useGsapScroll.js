import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useGsapScroll = (ref, animations = [], deps = []) => {
  useEffect(() => {
    if (!ref?.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      animations.forEach((a) => {
        const targets = a.targets;
        if (!targets) return;
        const vars = { immediateRender: false, ...a.vars };
        const defaultTrigger = {
          trigger: a.trigger || ref.current,
          start: 'top 90%',
          end: 'bottom 10%',
          once: true,
          toggleActions: 'play none none none',
        };
        if (a.scrollTrigger !== false) {
          vars.scrollTrigger = { ...defaultTrigger, ...(a.scrollTrigger || {}) };
        }
        gsap.from(targets, vars);
      });
    }, ref);
    return () => ctx.revert();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};
