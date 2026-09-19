import { motion } from "framer-motion";
import { FaAward } from "react-icons/fa";

import { styles } from "../style";
import { awards } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const Awards = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Recognition</p>
        <h2 className={styles.sectionHeadText}>Awards.</h2>
      </motion.div>

      <div className="mt-16 flex flex-col gap-6">
        {awards.map((award, index) => (
          <motion.div
            key={award.title}
            variants={fadeIn("up", "spring", index * 0.2, 0.75)}
            className="bg-tertiary rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 w-full card-hover-glow"
          >
            <div className="w-14 h-14 rounded-full bg-[#915EFF]/20 flex items-center justify-center text-[#915EFF] text-2xl shrink-0">
              <FaAward />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-white text-[20px] sm:text-[24px] font-bold">
                  {award.title}
                </h3>
                <span className="text-[#915EFF] text-sm font-semibold">
                  {award.year}
                </span>
              </div>
              <p className="text-secondary text-[16px] font-semibold mt-1">
                {award.company}
              </p>
              <p className="text-white-100 text-[14px] mt-3 leading-relaxed">
                {award.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Awards, "awards");
