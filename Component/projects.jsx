"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Inter } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ProjectsHeader from "./Projects_Header";

const inter = Inter({ subsets: ["latin"] });
const projects = [
  {
    slug: "valmora",
    title: "Valmora",
    description:
      "an impeccably crafted digital storefront and brand showcase for an ultra luxury, independent fragrance house. Built around the philosophy of quiet luxury",
    image: "/projects/valmora.avif",
    href: "https://parfumsvelmora.vercel.app/",
  },
  {
    slug: "arch",
    title: "Arch",
    description:
      "A refined architecture focused website built around large visuals, minimal layouts, and a strong sense of space and typography.",
    image: "/projects/arch.avif",
    href: "https://arch-two-gilt.vercel.app/",
  },
  {
    slug: "crave",
    title: "Crave & Co.",
    description:
      "A restaurant website designed around an expressive visual identity, clear menu presentation, and an inviting experience across desktop and mobile.",
    image: "/projects/crave.avif",
    href: "https://crave-jade.vercel.app/",
  },
  {
    slug: "solemates",
    title: "Solemates",
    description:
      "A modern footwear concept with a bold visual direction, focused on clean product presentation, strong typography, and a smooth browsing experience.",
    image: "/projects/solemates.avif",
    href: "https://solemates.vercel.app/",
  },
  {
    slug: "every-biomedicals",
    title: "Every Biomedicals",
    description:
      "A professional biomedical website designed to present products and services through a clean, structured interface built around clarity and trust.",
    image: "/projects/ever_biomedical.avif",
    href: "https://everybiomedicalsolutionplc.com",
  },
  {
    slug: "home-gym",
    title: "Home Gym",
    description:
      "a full featured commercial and digital platform built for a local Ethiopian fitness brand that manufactures and supplies heavy duty, multifunctional home workout equipment.",
    image: "/projects/Home_gym.avif",
    href: "https://wendawend-homegym.com/",
  },
];

const COUNT = projects.length;
const FULL = "inset(0% 0% 0% 0%)";
const HIDDEN = "inset(100% 0% 0% 0%)";
const at = (index, offset) => (index + offset) / (COUNT - 1);

function Slide({ project, index, active, progress }) {
  const clipPath = useTransform(
    progress,
    [at(index, -0.8), at(index, -0.2)],
    [HIDDEN, FULL],
  );
  const scale = useTransform(
    progress,
    [at(index, -0.8), at(index, -0.2)],
    [1.25, 1],
  );
  const y = useTransform(
    progress,
    [at(index, 0.2), at(index, 0.8)],
    ["0%", "-8%"],
  );
  const shade = useTransform(
    progress,
    [at(index, 0.2), at(index, 0.8)],
    [0, 0.6],
  );

  return (
    <motion.div
      aria-hidden={index !== active}
      className="absolute inset-0"
      style={{ clipPath, zIndex: index }}
    >
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{ top: "-10%", bottom: "-10%", scale, y }}
      >
        <Image
          src={project.image}
          alt={`${project.title} project`}
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: shade }}
      />
    </motion.div>
  );
}

function Copy({ project, index, active, progress }) {
  const range = [
    at(index, -0.45),
    at(index, -0.2),
    at(index, 0.2),
    at(index, 0.45),
  ];
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [40, 0, 0, -40]);

  return (
    <motion.div
      aria-hidden={index !== active}
      className="col-start-1 row-start-1"
      style={{ opacity, y }}
    >
      <h3 className="text-[clamp(3rem,6vw,7rem)] font-normal uppercase leading-none tracking-[-0.01em]">
        {project.title}
      </h3>
      <p className="mt-6 max-w-md text-base font-poppins capitalize leading-relaxed text-white/80 md:text-lg">
        {project.description}
      </p>
    </motion.div>
  );
}

export default function Projects() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.6,
    restDelta: 0.0005,
  });
  const progress = reduceMotion ? scrollYProgress : smooth;

  useMotionValueEvent(progress, "change", (v) => {
    setActive(Math.min(COUNT - 1, Math.max(0, Math.round(v * (COUNT - 1)))));
  });

  const current = projects[active];

  return (
    <section
      aria-label="Selected projects"
      className={`${bebas.className} w-full bg-white mt-80`}
    >
      <ProjectsHeader />

      <div
        ref={trackRef}
        className="relative bg-black text-white"
        style={{ height: `${COUNT * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {projects.map((project, i) => (
            <Slide
              key={project.slug}
              project={project}
              index={i}
              active={active}
              progress={progress}
            />
          ))}

          <div className="pointer-events-none absolute inset-0 z-10 bg-black/25" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-black/60 via-black/10 to-transparent" />

          <div className="pointer-events-none absolute left-[4vw] right-[6vw] top-1/2 z-20 grid -translate-y-1/2 md:right-auto">
            {projects.map((project, i) => (
              <Copy
                key={project.slug}
                project={project}
                index={i}
                active={active}
                progress={progress}
              />
            ))}
          </div>

          <Link
            href={current.href}
            className="group absolute tracking-wider bottom-[2vw] right-[2vw] z-20 flex w-[calc(100%-4vw)] items-center justify-between rounded-sm bg-black px-6 py-5 text-lg text-white outline-offset-4 focus-visible:outline-2 focus-visible:outline-white sm:w-88.25"
          >
            <span>
              View project
              <span className="sr-only">: {current.title}</span>
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-6 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M12 4v16M4 12h16" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
