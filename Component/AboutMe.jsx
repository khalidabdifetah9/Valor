"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Bricolage_Grotesque } from "next/font/google";

import { Bebas_Neue, Inter } from "next/font/google";
import Link from "next/link";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const font = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });

const EMAIL = "khalidabdifeta9@gmail.com";

const INTRO =
  "I like websites that feel natural, thoughtful, and human not like they were assembled from the same “modern developer portfolio” template everyone else is using.";
const PITCH =
  "So, if you want a website with some personality, a little character, and a price that might only be enough to buy me lunch and a one way ticket to the moon... You found your guy.";

const INTRO_WORDS = INTRO.split(" ");
const PITCH_WORDS = PITCH.split(" ");
const TOTAL = INTRO_WORDS.length + PITCH_WORDS.length;

const rangeFor = (i) => {
  const start = (i / TOTAL) * 0.85;
  return [start, start + 0.15];
};

function Word({ children, progress, range, reduce }) {
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}

function Words({ words, offset, progress, reduce }) {
  return words.map((word, i) => (
    <Word
      key={`${offset}-${i}`}
      progress={progress}
      range={rangeFor(offset + i)}
      reduce={reduce}
    >
      {word}
    </Word>
  ));
}

export default function AboutMe() {
  const readRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: readRef,
    offset: ["start 0.85", "end 0.5"],
  });

  return (
    <section
      id="about"
      className={`bg-white px-[4vw] pt-24  text-[#0e0f12] md:pt-32 ${font.className}`}
    >
      <div className="mx-auto grid max-w-[1600px] gap-x-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="text-sm font-bold">{"<ABOUT ME/>"}</h2>

          <div ref={readRef} className="mt-20 md:mt-40">
            <p className={`text-[clamp(1.75rem,3.3vw,3.25rem)] ${bebas.className} font-medium  leading-[1.12] tracking-[-0.02em]`}>
              <Words
                words={INTRO_WORDS}
                offset={0}
                progress={scrollYProgress}
                reduce={reduce}
              />
            </p>

            <p className={`mt-10 max-w-[38ch] text-[clamp(1.25rem,1.9vw,1.75rem)] ${bebas.className} font-medium leading-[1.35] tracking-[-0.01em]`}>
              <Words
                words={PITCH_WORDS}
                offset={INTRO_WORDS.length}
                progress={scrollYProgress}
                reduce={reduce}
              />
            </p>
          </div>

          <div
            className={`group mt-16 inline-block ${bebas.className} rounded-sm text-[clamp(2.25rem,5.2vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em] outline-offset-8 focus-visible:outline-2 md:mt-20`}
          >
            <span className="block">Don&apos;t be shy.</span>
            <span className="relative block w-fit">
              Hit me up.
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[0.02em] h-[0.07em] origin-left bg-[#0e0f12] transition-transform duration-500 ease-out group-hover:origin-right group-hover:scale-x-0"
              />
            </span>
          </div>
        </div>

        <div className="mt-16 md:col-span-5 md:mt-0">
          <div className="relative aspect-[6/7] w-full overflow-hidden rounded-sm">
            <Image
              src="/developer_image.avif"
              alt="Portrait of the developer"
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
