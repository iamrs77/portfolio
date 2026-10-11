"use client";

import { m } from "motion/react";

/*
 * Scroll-triggered reveals. Only opacity and transform are animated, so nothing shifts layout.
 * MotionConfig (see MotionProvider) drops the movement for people who prefer reduced motion.
 */

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay },
  }),
};

const tags = { div: m.div, ul: m.ul, ol: m.ol, li: m.li };

export function Reveal({ children, className, as = "div", delay = 0 }) {
  const Component = tags[as];
  return (
    <Component
      className={className}
      data-reveal=""
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </Component>
  );
}

/** Reveals its `RevealItem` children one after another. */
export function RevealGroup({ children, className, as = "div", stagger = 0.08 }) {
  const Component = tags[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }) {
  const Component = tags[as];
  return (
    <Component className={className} data-reveal="" variants={fadeUp}>
      {children}
    </Component>
  );
}
