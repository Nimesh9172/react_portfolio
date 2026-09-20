import { motion } from "framer-motion";
import { FaAward, FaCertificate } from "react-icons/fa";

import { styles } from "../style";
import { awards } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const highlights = [
  { value: "04+", label: "Years in production" },
  { value: "05", label: "Live products" },
  { value: "02", label: "Clouds in prod" },
];

const AwardCard = ({ award, index }) => {
  const isCertificate = award.variant === "certificate";
  const Icon = isCertificate ? FaCertificate : FaAward;

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.18 + index * 0.12, 0.75)}
      className={`award-stage relative overflow-hidden rounded-[28px] p-7 sm:p-8 ${
        isCertificate ? "award-stage-certificate" : ""
      }`}
    >
      <p className="pointer-events-none absolute right-5 top-3 select-none text-[64px] font-black leading-none text-white/5 sm:text-[88px]">
        {award.year}
      </p>

      <div className="relative z-10 flex items-start gap-5">
        <div
          className={`award-medal flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-[26px] sm:h-20 sm:w-20 sm:text-[32px] ${
            isCertificate ? "award-medal-certificate text-[#2e1065]" : "text-[#3b1d09]"
          }`}
        >
          <Icon />
        </div>
        <div className="min-w-0">
          <p
            className={`text-[11px] uppercase tracking-[0.24em] ${
              isCertificate ? "text-[#c4b5fd]" : "text-amber-200/80"
            }`}
          >
            {award.kind} · {award.date}
          </p>
          <h3 className="mt-2 text-[22px] font-black leading-tight text-white sm:text-[26px]">
            {award.title}
          </h3>
          <p className="mt-1 text-[14px] font-semibold text-[#c4b5fd]">
            {award.company}
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-[#ddd6fe] sm:text-[15px]">
            {award.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Awards = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Recognition</p>
        <h2 className={`${styles.sectionHeadText} cursor-invert`}>Awards.</h2>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {awards.map((award, index) => (
          <AwardCard key={award.title} award={award} index={index} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {highlights.map((item, index) => (
          <motion.div
            key={item.label}
            variants={fadeIn("up", "spring", 0.28 + index * 0.08, 0.55)}
            className="rounded-2xl border border-white/10 bg-tertiary/80 px-6 py-5"
          >
            <p className="text-[28px] font-black text-white">{item.value}</p>
            <p className="mt-1 text-sm text-secondary">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Awards, "awards");
