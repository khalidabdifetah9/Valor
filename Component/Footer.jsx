"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bebas_Neue, Inter } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

const BRAND = "valor";
const HEADLINE = [
  "Need a website?",
  "Unfortunately for",
  "your competitors,",
  "I’m available.",
];
const MARQUEE_TEXT = "Available for new projects";
const STATUS_TEXT =
  "Open to new projects, from quick site updates to full builds.";
const CODE_PLATFORMS = ["GitHub: khalidabdifetah9"];

const EASE = [0.22, 1, 0.36, 1];
const view = { once: true, amount: 0.3 };

const Label = ({ children }) => (
  <p className="mb-8 border-l-2 border-[#c22a2a] pl-4 text-xs uppercase tracking-[0.2em] text-white/70 sm:text-sm">
    {children}
  </p>
);

function FooterItem({ children }) {
  return (
    <div className="group flex w-fit items-center py-1">
      <span
        aria-hidden="true"
        className="h-[2px] w-0 bg-[#c22a2a] transition-all duration-300 group-hover:mr-4 group-hover:w-8 motion-reduce:transition-none"
      />
      <span
        className={`${bebas.className} text-4xl uppercase leading-none text-white/70 transition-colors duration-300 group-hover:text-white lg:text-5xl`}
      >
        {children}
      </span>
    </div>
  );
}

const UpIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-6 w-6"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

/* ---------- Footer ---------- */
const Footer = () => {
  const reduce = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  // With reduced motion the variants are empty, so everything renders in place
  const none = { hidden: {}, show: {} };
  const stagger = (s) =>
    reduce ? none : { hidden: {}, show: { transition: { staggerChildren: s } } };
  const rise = reduce
    ? none
    : {
        hidden: { y: "105%" },
        show: { y: 0, transition: { duration: 1, ease: EASE } },
      };
  const fade = reduce
    ? none
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
      };

  return (
    <footer
      className={`relative w-full overflow-hidden bg-black text-white selection:bg-[#c22a2a] selection:text-white ${inter.className}`}
    >
      {/* ---------- Marquee band ---------- */}
      <div aria-hidden="true" className="overflow-hidden bg-[#c22a2a] py-3">
        <motion.div
          className="flex w-max"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className={`${bebas.className} flex shrink-0 items-center gap-6 pr-6 text-3xl uppercase md:text-5xl`}
                >
                  {MARQUEE_TEXT}
                  <span className="h-3 w-3 bg-black md:h-4 md:w-4" />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="px-5 sm:px-10 lg:px-[4vw]">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={view}
          className="grid gap-10 pb-16 pt-16 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-24 lg:pt-28"
        >
          <h2
            className={`${bebas.className} text-[clamp(2.75rem,7.2vw,7.5rem)] uppercase leading-[0.92]`}
          >
            {HEADLINE.map((line, i) => (
              <span
                key={line}
                className="-my-[0.08em] block overflow-y-clip py-[0.08em]"
              >
                <motion.span
                  variants={rise}
                  className={`block ${
                    i === HEADLINE.length - 1 ? "text-[#c22a2a]" : ""
                  }`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.div
            variants={fade}
            className="group relative flex min-h-44 w-full flex-col justify-between overflow-hidden bg-[#c22a2a] p-6 text-white lg:min-h-56 lg:w-96"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-500 ease-out group-hover:scale-y-100 motion-reduce:transition-none"
            />
            <span className="relative z-10 flex items-start justify-between transition-colors duration-500 group-hover:text-black">
              <span className="text-xs uppercase tracking-[0.2em]">
                Start a project
              </span>
            </span>
            <span
              className={`${bebas.className} relative z-10 text-2xl uppercase leading-tight transition-colors duration-500 group-hover:text-black lg:text-3xl`}
            >
              "A good website is like a good joke you never have to explain it"
            </span>
          </motion.div>
        </motion.div>

        {/* ---------- Link grid (shares the divider-line style) ---------- */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={view}
          className="grid grid-cols-1 gap-px border border-gray-600/40 bg-gray-600/40 md:grid-cols-3"
        >
          <motion.div variants={fade} className="bg-black p-6 sm:p-8 lg:p-10">
            <Label>Code Platform</Label>
            <div className="flex flex-col gap-1">
              {CODE_PLATFORMS.map((platform) => (
                <FooterItem key={platform}>{platform}</FooterItem>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fade} className="bg-black p-6 sm:p-8 lg:p-10">
            <Label>Status</Label>
            <div className="flex items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c22a2a] opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#c22a2a]" />
              </span>
              <span
                className={`${bebas.className} text-4xl uppercase leading-none lg:text-5xl`}
              >
                Available
              </span>
            </div>
            <p className="mt-6 max-w-[30ch] text-base leading-relaxed text-white/70">
              {STATUS_TEXT}
            </p>
          </motion.div>
        </motion.div>

        {/* ---------- Giant brand: letters rise, each turns red on hover ---------- */}
        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="select-none pt-10 lg:pt-16"
        >
          <p className="sr-only">{BRAND}</p>
          <div
            aria-hidden="true"
            className={`${bebas.className} flex cursor-default justify-between text-[38vw] uppercase leading-[0.78] text-[#e5e5e5]`}
          >
            {BRAND.split("").map((letter, i) => (
              <span key={i} className="block overflow-y-clip pt-[0.06em]">
                <motion.span
                  variants={rise}
                  className="block transition-colors duration-300 hover:text-[#c22a2a]"
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* ---------- Bottom bar ---------- */}
        <div className="flex items-center justify-between gap-6 border-t border-gray-600/40 py-6 text-xs uppercase tracking-[0.2em] text-white/70 sm:text-sm">
          <p>
            {new Date().getFullYear()} {BRAND}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-4 uppercase tracking-[0.2em] outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c22a2a]"
          >
            <span className="transition-colors group-hover:text-white">
              Back to top
            </span>
            <span className="flex h-12 w-12 items-center justify-center bg-[#c22a2a] text-white transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none">
              <UpIcon />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;