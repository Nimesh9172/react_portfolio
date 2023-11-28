import { motion } from "framer-motion";

import { styles } from "../style";
import { ComputersCanvas } from "./canvas";
import HeroText from "./HeroText";

const sentence1 = "Hi,".split("");
const sentence2 = "I'm".split("");
const sentence3 = "Nimesh,".split("");
const sentence4 = "Web".split("");
const sentence5 = "Developer".split("");

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <div className="flex flex-col">
            <span className="flex text-white">
              {sentence1.map((letter, index) => (
                <HeroText key={`${letter}${index}`}>{letter}</HeroText>
              ))}
            </span>
            <span className="flex gap-x-4 flex-wrap">
              <span className="flex text-white">
                {sentence2.map((letter, index) => (
                  <HeroText key={`${letter}${index}`}>{letter}</HeroText>
                ))}
              </span>
              <span className="flex text-[#915EFF]">
                {sentence3.map((letter, index) => (
                  <HeroText key={`${letter}${index}`}>{letter}</HeroText>
                ))}
              </span>
            </span>
            <span className="flex gap-x-4 flex-wrap">
              <span className="flex">
                {sentence4.map((letter, index) => (
                  <HeroText key={`${letter}${index}`}>{letter}</HeroText>
                ))}
              </span>

              <span className="flex">
                {sentence5.map((letter, index) => (
                  <HeroText key={`${letter}${index}`}>{letter}</HeroText>
                ))}
              </span>
            </span>
          </div>
          {/* <h1 className={`${styles.heroHeadText} text-white`}></h1> */}
          <p className={`${styles.heroSubText} mt-5 text-white-100`}>
            From Pixels to Algorithms
            <br /> Full Stack Developer Mastering Frontend and Backend
          </p>
        </div>
      </div>

      {/* <span className="hidden md:contents">
        <ComputersCanvas />
      </span> */}

      <div className="absolute bottom-20 md:bottom-10 w-full flex  z-10  right-12  justify-end items-center">
        <a href="#about">
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
