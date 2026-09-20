import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiDjango,
  SiFlask,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiGithub,
  SiBitbucket,
  SiJenkins,
  SiRabbitmq,
  SiCelery,
  SiLinux,
  SiPostman,
} from "react-icons/si";
import { FaAws, FaDatabase } from "react-icons/fa";
import { DiRedis } from "react-icons/di";
import { VscAzure } from "react-icons/vsc";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../style";
import techVideo from "../assets/video.webm";

const allTechs = [
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", Icon: SiCss, color: "#1572B6" },
  { name: "SQL", Icon: FaDatabase, color: "#f97316" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "Django", Icon: SiDjango, color: "#44B78B" },
  { name: "Flask", Icon: SiFlask, color: "#ffffff" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "React Native", Icon: SiReact, color: "#61DAFB" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "AWS", Icon: FaAws, color: "#FF9900" },
  { name: "Azure", Icon: VscAzure, color: "#0078D4" },
  { name: "Redis", Icon: DiRedis, color: "#DC382D" },
  { name: "RabbitMQ", Icon: SiRabbitmq, color: "#FF6600" },
  { name: "Celery", Icon: SiCelery, color: "#37814A" },
  { name: "Jenkins", Icon: SiJenkins, color: "#D33833" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
  { name: "Bitbucket", Icon: SiBitbucket, color: "#2684FF" },
  { name: "Linux", Icon: SiLinux, color: "#FCC624" },
  { name: "REST API", Icon: FaDatabase, color: "#a78bfa" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
];

const pyramidRows = [
  allTechs.slice(0, 8),
  allTechs.slice(8, 15),
  allTechs.slice(15, 21),
  allTechs.slice(21, 24),
  allTechs.slice(24, 26),
  allTechs.slice(26),
];

const TechCard = ({ name, Icon, color, delay, className = "" }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeIn("up", "spring", delay, 0.38)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5, scale: 1.05 }}
      className={`tech-card rounded-[14px] flex flex-col items-center justify-center gap-1.5 cursor-default select-none ${className}`}
      style={{
        borderColor: hovered ? `${color}bb` : undefined,
        boxShadow: hovered
          ? `0 0 18px ${color}44, inset 0 0 20px ${color}18`
          : undefined,
      }}
    >
      <Icon
        style={{ color: hovered ? color : "#ffffffb0", transition: "color 0.2s" }}
        className="text-[22px] sm:text-[24px] md:text-[26px]"
      />
      <p
        style={{ color: hovered ? "#fff" : undefined, transition: "color 0.2s" }}
        className="text-white/55 text-[10px] sm:text-[10px] md:text-[11px] text-center px-1 leading-tight font-medium line-clamp-2"
      >
        {name}
      </p>
    </motion.div>
  );
};

const Tech = () => {
  let globalIndex = 0;

  return (
    <section id="tech" className="relative w-full overflow-x-hidden py-16 sm:py-28">
      <span className="hash-span" id="tech-anchor">
        &nbsp;
      </span>

      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={techVideo} type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-[#12002a]/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(140,70,255,0.28),transparent_70%)]" />

      <div className={`relative z-10 mx-auto max-w-7xl ${styles.paddingX}`}>
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <p className={styles.sectionSubText}>What I work with</p>
          <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
        </motion.div>

        {/* Phones + tablets: centered wrapping grid that actually fits */}
        <div className="flex w-full flex-wrap justify-center gap-2.5 sm:gap-3 lg:hidden">
          {allTechs.map((tech, index) => (
            <TechCard
              key={`m-${tech.name}`}
              name={tech.name}
              Icon={tech.Icon}
              color={tech.color}
              delay={index * 0.03}
              className="h-[86px] w-[calc((100%-20px)/3)] xs:h-[90px] sm:h-[92px] sm:w-[calc((100%-48px)/5)] md:w-[calc((100%-60px)/6)]"
            />
          ))}
        </div>

        {/* Desktop: 8 → 7 → 6 → 3 → 2 → 1 pyramid */}
        <div className="hidden w-full flex-col items-center gap-3 lg:flex">
          {pyramidRows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex w-full flex-nowrap justify-center gap-3"
            >
              {row.map((tech) => {
                const delay = globalIndex++ * 0.035;
                return (
                  <TechCard
                    key={`d-${tech.name}`}
                    name={tech.name}
                    Icon={tech.Icon}
                    color={tech.color}
                    delay={delay}
                    className="h-[96px] w-[88px] shrink-0"
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tech;
