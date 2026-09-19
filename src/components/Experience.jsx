import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";

import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { styles } from "../style";

const Experience = () => {
  const timelineRef = useRef(null);
  const yearRefs = useRef([]);
  const gutterRefs = useRef([]);
  const [stops, setStops] = useState({ centers: [24], lineX: 16 });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.55", "end 0.45"],
  });

  const rawY = useMotionValue(24);
  const orbY = useSpring(rawY, { stiffness: 90, damping: 24, restDelta: 0.001 });

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

      let lineX = 16;
      if (firstGutter) {
        const gutterRect = firstGutter.getBoundingClientRect();
        lineX = gutterRect.left - parentRect.left + gutterRect.width / 2;
      }

      if (centers.length) {
        setStops({ centers, lineX });
        const current = scrollYProgress.get();
        const index =
          centers.length === 1
            ? 0
            : Math.min(
                centers.length - 1,
                Math.max(0, Math.round(current * (centers.length - 1)))
              );
        rawY.set(centers[index]);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [rawY, scrollYProgress]);

  useEffect(() => {
    const { centers } = stops;
    if (!centers.length) return undefined;

    const unsub = scrollYProgress.on("change", (value) => {
      if (centers.length === 1) {
        rawY.set(centers[0]);
        return;
      }
      const t = Math.min(Math.max(value, 0), 1);
      const index = Math.round(t * (centers.length - 1));
      rawY.set(centers[index]);
    });

    return unsub;
  }, [stops, scrollYProgress, rawY]);

  return (
    <div className="relative">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div ref={timelineRef} className="relative mt-16 md:mt-24">
        <div
          className="absolute top-0 bottom-0 w-px bg-white/10"
          style={{ left: stops.lineX }}
        />
        <motion.div
          className="absolute top-0 w-px bg-gradient-to-b from-[#f3e8ff] via-[#c4b5fd] to-[#7c3aed]"
          style={{ left: stops.lineX, height: orbY }}
        />
        <motion.div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 timeline-glow-orb"
          style={{ left: stops.lineX, top: orbY }}
        />

        <div className="flex flex-col gap-16 md:gap-28">
          {experiences.map((experience, index) => (
            <article
              key={`${experience.title}-${experience.date}`}
              className="grid grid-cols-[32px_1fr] md:grid-cols-[minmax(0,1.1fr)_160px_40px_minmax(0,1.2fr)] gap-x-3 md:gap-x-6 items-start"
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
                className="col-start-1 row-start-1 md:col-start-3 md:row-start-auto h-full min-h-[48px]"
              />

              <div className="col-start-2 md:col-start-4 pt-2 md:pt-3">
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
