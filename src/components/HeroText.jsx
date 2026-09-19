import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import { styles } from "../style";
import { letterVariant } from "../utils/motion";

const HeroText = ({ children, delay = 0 }) => {
  const controls = useAnimationControls();
  const [isPlaying, setIsPlaying] = useState(false);

  const rubberBand = () => {
    controls.start({
      transform: [
        "scale3d(1,1,1)",
        "scale3d(1.4,.55,1)",
        "scale3d(.75,1.25,1)",
        "scale3d(1.25,.85,1)",
        "scale3d(.8,1.05,1)",
        "scale3d(1,1,1)",
      ],
      transition: { duration: 0.6 },
    });
    setIsPlaying(true);
  };

  return (
    <motion.span
      className={`${styles.heroHeadText} flex`}
      variants={letterVariant(delay)}
      initial="hidden"
      animate="show"
    >
      <motion.span
        className="inline-block cursor-pointer select-none"
        animate={controls}
        onMouseOver={() => {
          if (!isPlaying) {
            rubberBand();
          }
        }}
        onAnimationComplete={() => setIsPlaying(false)}
      >
        {children === " " ? "\u00A0" : children}
      </motion.span>
    </motion.span>
  );
};

export default HeroText;
