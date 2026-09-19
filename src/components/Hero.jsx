import { motion } from "framer-motion";

import { styles } from "../style";
import { ComputersCanvas } from "./canvas";
import HeroText from "./HeroText";
import { fadeIn } from "../utils/motion";
import { socialLinks } from "../constants";

const sentence1 = "Hi,".split("");
const sentence2 = "I'm".split("");
const sentence3 = "Nimesh,".split("");
const sentence4 = "Software".split("");
const sentence5 = "Developer".split("");

const Hero = () => {
  let letterIndex = 0;

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <div className="absolute inset-0 z-0 hidden h-full w-full overflow-hidden md:block cursor-grab active:cursor-grabbing">
        <ComputersCanvas />
      </div>

      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF] hero-glow" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="pointer-events-auto">
          <div className="flex flex-col">
            <span className="flex text-white">
              {sentence1.map((letter, index) => (
                <HeroText key={`s1-${letter}${index}`} delay={letterIndex++ * 0.04}>
                  {letter}
                </HeroText>
              ))}
            </span>
            <span className="flex gap-x-4 flex-wrap">
              <span className="flex text-white">
                {sentence2.map((letter, index) => (
                  <HeroText key={`s2-${letter}${index}`} delay={letterIndex++ * 0.04}>
                    {letter}
                  </HeroText>
                ))}
              </span>
              <span className="flex text-[#915EFF]">
                {sentence3.map((letter, index) => (
                  <HeroText key={`s3-${letter}${index}`} delay={letterIndex++ * 0.04}>
                    {letter}
                  </HeroText>
                ))}
              </span>
            </span>
            <span className="flex gap-x-4 flex-wrap">
              <span className="flex">
                {sentence4.map((letter, index) => (
                  <HeroText key={`s4-${letter}${index}`} delay={letterIndex++ * 0.04}>
                    {letter}
                  </HeroText>
                ))}
              </span>
              <span className="flex">
                {sentence5.map((letter, index) => (
                  <HeroText key={`s5-${letter}${index}`} delay={letterIndex++ * 0.04}>
                    {letter}
                  </HeroText>
                ))}
              </span>
            </span>
          </div>
          <motion.p
            variants={fadeIn("up", "spring", 0.8, 0.8)}
            initial="hidden"
            animate="show"
            className={`${styles.heroSubText} mt-5 text-white-100 max-w-2xl cursor-invert`}
          >
            4+ years building scalable web apps with Python, Django, React,
            AWS & Azure.
          </motion.p>
          <motion.div
            variants={fadeIn("up", "spring", 1, 0.8)}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="bg-[#915EFF] py-3 px-6 rounded-xl text-white font-semibold shadow-lg shadow-[#915EFF]/30"
              >
                View my work
              </motion.button>
            </a>
            <a href={socialLinks.resume} download>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="border border-[#915EFF] py-3 px-6 rounded-xl text-white font-semibold bg-transparent hover:bg-[#915EFF]/10"
              >
                Download resume
              </motion.button>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 right-6 sm:right-12 z-10 pointer-events-none">
        <a href="#about" className="flex flex-col items-center gap-2 pointer-events-auto">
          <span className="text-secondary text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
