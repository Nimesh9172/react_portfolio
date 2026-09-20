import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";

import { styles } from "../style";
import { projects } from "../constants";

const formatImpact = (value, decimals = 0) =>
  decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));

const ImpactStat = ({ to, decimals = 0, suffix, label, active }) => {
  const [display, setDisplay] = useState(() => formatImpact(to, decimals));

  useEffect(() => {
    if (!active) {
      setDisplay(formatImpact(to, decimals));
      return undefined;
    }

    const controls = animate(0, to, {
      duration: 1.15,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(formatImpact(latest, decimals)),
    });

    return () => controls.stop();
  }, [active, to, decimals]);

  return (
    <div className="project-impact pointer-events-none absolute bottom-4 right-4 rounded-2xl px-3 py-2 text-right sm:px-4 sm:py-3">
      <p className="text-[22px] font-black leading-none text-white sm:text-[30px]">
        {display}
        {suffix}
      </p>
      <p className="mt-1 max-w-[9.5rem] text-[10px] uppercase tracking-[0.16em] text-[#c4b5fd] sm:text-[11px]">
        {label}
      </p>
    </div>
  );
};

const ProjectCard = ({
  index,
  name,
  badge,
  description,
  tags,
  image,
  live_link,
  source_code_link,
  impact,
  active,
}) => {
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
        {impact ? <ImpactStat active={active} {...impact} /> : null}
        <div className="absolute right-4 top-4 z-20 flex gap-2">
          {source_code_link ? (
            <a
              href={source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="black-gradient flex h-10 w-10 items-center justify-center rounded-full"
              aria-label={`View ${name} source`}
            >
              <FaGithub className="text-white" />
            </a>
          ) : null}
          {live_link ? (
            <a
              href={live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="black-gradient flex h-10 w-10 items-center justify-center rounded-full"
              aria-label={`View ${name} live`}
            >
              <FaExternalLinkAlt className="text-white text-sm" />
            </a>
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
            <a
              href={live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#c4b5fd] transition-colors hover:text-white"
            >
              Open live
              <FaArrowRight className="text-[11px]" />
            </a>
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
          <div className="hidden items-end gap-6 pb-3 sm:flex">
            {projects[active]?.impact ? (
              <div className="text-right">
                <p className="text-white text-2xl font-black leading-none lg:text-3xl">
                  {projects[active].impact.display}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#c4b5fd]">
                  {projects[active].impact.label}
                </p>
              </div>
            ) : null}
            <div className="flex items-center gap-3 text-secondary">
              <span className="text-white text-3xl font-black">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="text-white/30">/</span>
              <span>{String(projects.length).padStart(2, "0")}</span>
              <FaArrowRight className="ml-2 text-[#915EFF]" />
            </div>
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
