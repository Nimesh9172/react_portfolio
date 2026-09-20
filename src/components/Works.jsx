import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";

import { styles } from "../style";
import { projects } from "../constants";

const ProjectCard = ({
  index,
  name,
  badge,
  description,
  tags,
  image,
  live_link,
  source_code_link,
  active,
}) => {
  const openLink = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      className={`project-panel group relative flex h-full w-[85vw] max-w-[820px] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#110d2a] sm:w-[70vw] lg:w-[58vw] ${
        active ? "project-panel-active" : "opacity-70"
      }`}
    >
      <div className="relative h-[42%] min-h-[180px] overflow-hidden sm:h-[48%]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#110d2a] via-[#110d2a]/20 to-transparent" />
        <span className="absolute left-5 top-5 font-black text-white/20 text-5xl sm:text-7xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        {badge ? (
          <span className="absolute bottom-4 left-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            {badge}
          </span>
        ) : null}
        <div className="absolute right-4 top-4 flex gap-2">
          {source_code_link ? (
            <button
              type="button"
              onClick={() => openLink(source_code_link)}
              className="black-gradient flex h-10 w-10 items-center justify-center rounded-full"
              aria-label={`View ${name} source`}
            >
              <FaGithub className="text-white" />
            </button>
          ) : null}
          {live_link ? (
            <button
              type="button"
              onClick={() => openLink(live_link)}
              className="black-gradient flex h-10 w-10 items-center justify-center rounded-full"
              aria-label={`View ${name} live`}
            >
              <FaExternalLinkAlt className="text-white text-sm" />
            </button>
          ) : null}
          {!live_link && !source_code_link ? (
            <div
              className="black-gradient flex h-10 w-10 items-center justify-center rounded-full"
              title="Confidential client project"
            >
              <FaLock className="text-secondary text-sm" />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="cursor-invert text-white text-[26px] font-bold leading-tight sm:text-[34px]">
          {name}
        </h3>
        <p className="mt-3 max-w-2xl flex-1 text-[14px] leading-relaxed text-secondary sm:text-[16px] sm:leading-7">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {tags.map((tag) => (
              <span key={`${name}-${tag.name}`} className={`text-[13px] sm:text-[14px] ${tag.color}`}>
                #{tag.name}
              </span>
            ))}
          </div>
          {live_link ? (
            <button
              type="button"
              onClick={() => openLink(live_link)}
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#c4b5fd] transition-colors hover:text-white"
            >
              Open live
              <FaArrowRight className="text-[11px]" />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
};

const Works = () => {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const travel = useMotionValue(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform([scrollYProgress, travel], ([progress, distance]) => -progress * distance);
  const smoothX = useSpring(x, { stiffness: 70, damping: 28, mass: 0.35 });
  const barWidth = useTransform(scrollYProgress, [0, 1], ["6%", "100%"]);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      travel.set(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };

    measure();
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [travel]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (value) => {
      const next = Math.round(value * (projects.length - 1));
      setActive(Math.min(projects.length - 1, Math.max(0, next)));
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${Math.max(projects.length, 2) * 100}vh` }}
    >
      <span className="hash-span" id="projects">
        &nbsp;
      </span>

      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-primary">
        <div className={`mx-auto flex w-full max-w-7xl items-end justify-between gap-6 pt-24 ${styles.paddingX}`}>
          <div>
            <p className={styles.sectionSubText}>My work</p>
            <h2 className={`${styles.sectionHeadText} cursor-invert`}>Projects.</h2>
          </div>
          <div className="hidden items-center gap-3 pb-3 text-secondary sm:flex">
            <span className="text-white text-3xl font-black">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="text-white/30">/</span>
            <span>{String(projects.length).padStart(2, "0")}</span>
            <FaArrowRight className="ml-2 text-[#915EFF]" />
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative mt-8 flex flex-1 items-center overflow-hidden"
        >
          <p className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[11px] tracking-[0.35em] text-white/25 md:block">
            FEATURED WORK
          </p>
          <motion.div
            ref={trackRef}
            style={{ x: smoothX }}
            className="flex h-[min(520px,62vh)] items-stretch gap-6 px-6 sm:gap-8 sm:px-16"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.name}
                index={index}
                active={index === active}
                {...project}
              />
            ))}
          </motion.div>
        </div>

        <div className={`mx-auto mb-8 mt-6 w-full max-w-7xl ${styles.paddingX}`}>
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              style={{ width: barWidth }}
              className="h-full rounded-full bg-gradient-to-r from-[#c4b5fd] to-[#915EFF]"
            />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-secondary">
            Scroll to move through projects
          </p>
        </div>
      </div>
    </section>
  );
};

export default Works;
