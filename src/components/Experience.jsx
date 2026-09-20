import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../style";

const yFromProgress = (progress, centers) => {
  if (!centers.length) return 24;
  if (centers.length === 1) return centers[0];
  const t = Math.min(Math.max(progress, 0), 1);
  const scaled = t * (centers.length - 1);
  const index = Math.min(Math.floor(scaled), centers.length - 2);
  const local = scaled - index;
  return centers[index] + (centers[index + 1] - centers[index]) * local;
};

const Experience = () => {
  const timelineRef = useRef(null);
  const yearRefs = useRef([]);
  const gutterRefs = useRef([]);
  const centersRef = useRef([24]);
  const [lineX, setLineX] = useState(16);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.25"],
  });

  const rawY = useTransform(scrollYProgress, (value) =>
    yFromProgress(value, centersRef.current)
  );
  const orbY = useSpring(rawY, { stiffness: 180, damping: 32, restDelta: 0.001 });

  useLayoutEffect(() => {
    const measure = () => {
      const parent = timelineRef.current;
      const firstGutter = gutterRefs.current[0];
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const centers = yearRefs.current
        .filter(Boolean)
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top - parentRect.top + rect.height / 2;
        });

      if (centers.length) {
        centersRef.current = centers;
        rawY.set(yFromProgress(scrollYProgress.get(), centers));
      }

      if (firstGutter) {
        const gutterRect = firstGutter.getBoundingClientRect();
        setLineX(gutterRect.left - parentRect.left + gutterRect.width / 2);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [rawY, scrollYProgress]);

  return (
    <div className="relative">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={`${styles.sectionHeadText} cursor-invert`}>Work Experience.</h2>
      </motion.div>

      <div ref={timelineRef} className="relative mt-16 md:mt-24">
        <div
          className="absolute top-0 bottom-0 w-px bg-white/10"
          style={{ left: lineX }}
        />
        <motion.div
          className="absolute top-0 w-px bg-gradient-to-b from-[#f3e8ff] via-[#c4b5fd] to-[#7c3aed]"
          style={{ left: lineX, height: orbY }}
        />
        <motion.div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 timeline-glow-orb"
          style={{ left: lineX, top: orbY }}
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {experiences.map((experience, index) => (
            <article
              key={`${experience.title}-${experience.date}`}
              className="grid grid-cols-[48px_1fr] md:grid-cols-[minmax(0,1.1fr)_160px_56px_minmax(0,1.2fr)] gap-x-3 md:gap-x-6 items-start"
            >
              <div className="hidden md:block text-right">
                <h3 className="text-white text-[26px] lg:text-[34px] font-semibold leading-tight">
                  {experience.title}
                </h3>
                <p className="text-[#c4b5fd] mt-3 text-[16px] lg:text-[18px]">
                  {experience.company_name}
                </p>
                <p className="text-secondary text-sm mt-1">{experience.date}</p>
              </div>

              <div
                ref={(el) => {
                  yearRefs.current[index] = el;
                }}
                className="col-start-2 md:col-start-2 md:text-right"
              >
                <p className="text-white text-[28px] md:text-[40px] lg:text-[46px] font-bold tracking-wide leading-none">
                  {experience.year}
                </p>
              </div>

              <div
                ref={(el) => {
                  gutterRefs.current[index] = el;
                }}
                className="relative z-20 col-start-1 row-start-1 md:col-start-3 md:row-start-auto flex justify-center pt-1"
              >
                <div
                  className="timeline-logo h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white"
                  style={{ backgroundColor: experience.iconBg }}
                >
                  <img
                    src={experience.icon}
                    alt={experience.company_name}
                    className="h-full w-full object-contain p-[5px]"
                  />
                </div>
              </div>

              <motion.div
                variants={fadeIn("left", "spring", 0.12, 0.55)}
                className="col-start-2 md:col-start-4 pt-1 md:pt-2"
              >
                <div className="md:hidden mb-3">
                  <h3 className="text-white text-[22px] font-semibold leading-tight">
                    {experience.title}
                  </h3>
                  <p className="text-[#c4b5fd] mt-1">{experience.company_name}</p>
                  <p className="text-secondary text-sm mt-1">{experience.date}</p>
                </div>
                <p className="text-[#cfc9e6] text-[15px] md:text-[16px] leading-7 max-w-xl">
                  {experience.summary}
                </p>
                <ul className="mt-5 max-w-xl space-y-2.5">
                  {experience.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-[14px] leading-relaxed text-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#915EFF] shadow-[0_0_8px_#915EFF]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
