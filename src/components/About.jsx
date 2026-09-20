import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { styles } from "../style";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const stats = [
  { value: "04+", label: "Years shipping" },
  { value: "1M+", label: "Users reached" },
  { value: "05", label: "Live products" },
  { value: "02", label: "Clouds in prod" },
];

const moveSpotlight = (event) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  card.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

const ServiceCard = ({
  index,
  title,
  icon,
  description,
  tags,
  accent,
  featured,
  points = [],
}) => (
  <Tilt
    tiltMaxAngleX={featured ? 5 : 9}
    tiltMaxAngleY={featured ? 5 : 9}
    scale={1.02}
    transitionSpeed={450}
    glareEnable
    glareMaxOpacity={0.1}
    glareColor={accent}
    glarePosition="all"
    className={`h-full w-full ${featured ? "lg:col-span-2 lg:row-span-3" : ""}`}
  >
    <motion.div
      variants={fadeIn(featured ? "right" : "up", "spring", index * 0.12, 0.65)}
      onMouseMove={moveSpotlight}
      className="about-card group h-full rounded-[24px] p-px"
      style={{ "--accent": accent }}
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-[23px] bg-[#0c091f]/92 ${
          featured ? "min-h-[340px] p-8 sm:p-10" : "min-h-[210px] p-6"
        }`}
      >
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className={`about-icon-wrap ${featured ? "h-20 w-20" : "h-14 w-14"}`}>
            <motion.img
              src={icon}
              alt=""
              className={`object-contain ${featured ? "h-12 w-12" : "h-9 w-9"}`}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.25 }}
            />
          </div>
          <span className="text-4xl font-black leading-none text-white/15">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="relative z-10 mt-6 flex flex-1 flex-col">
          {featured ? (
            <p className="mb-3 text-[12px] uppercase tracking-[0.22em] text-[#c4b5fd]">
              Primary focus
            </p>
          ) : null}
          <h3
            className={`font-bold text-white ${
              featured ? "text-[28px] sm:text-[32px]" : "text-[20px]"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-3 leading-relaxed text-secondary ${
              featured ? "max-w-xl text-[16px]" : "text-[13px]"
            }`}
          >
            {description}
          </p>

          {featured && points.length ? (
            <ul className="mt-6 flex flex-1 flex-col justify-center space-y-2.5">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] leading-snug text-[#ddd6fe]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#915EFF] shadow-[0_0_10px_#915EFF]" />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {tags.map((tag) => (
              <span key={tag} className="about-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-[#915EFF]/20 blur-[90px]" />
      <div className="pointer-events-none absolute right-8 top-48 h-72 w-72 rounded-full bg-[#38bdf8]/10 blur-[110px]" />

      <div className="relative grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.72fr)]">
        <div>
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={`${styles.sectionHeadText} cursor-invert`}>Overview.</h2>
          </motion.div>

          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-5 max-w-2xl text-[17px] leading-[30px] text-secondary"
          >
            Full-stack engineer with a backend core. I take products from schema
            to ship — APIs, interfaces, and the cloud path in between — and I
            still care about the details that make them feel fast. Comfortable
            solo or in a team, and still hungry to grow with the next build.
          </motion.p>
        </div>

        <motion.aside
          variants={fadeIn("left", "spring", 0.22, 0.7)}
          className="about-snapshot relative overflow-hidden rounded-[24px] p-6 sm:p-7"
        >
          <p className="text-[12px] uppercase tracking-[0.24em] text-[#c4b5fd]">
            Right now
          </p>
          <h3 className="mt-3 text-[22px] font-bold leading-tight text-white">
            Senior Software Engineer
          </h3>
          <p className="mt-1 text-[#c4b5fd]">Vishleshan AI Solutions</p>
          <p className="mt-1 text-sm text-secondary">Mumbai, India</p>

          <div className="mt-7 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-[26px] font-black leading-none text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] leading-snug text-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 lg:min-h-[540px]">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
