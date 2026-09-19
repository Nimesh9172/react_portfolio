import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";

import { styles } from "../style";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  live_link,
  source_code_link,
}) => {
  const openLink = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.2, 0.75)}>
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        scale={1.02}
        transitionSpeed={450}
        className="bg-tertiary p-5 rounded-2xl w-full h-full card-hover-glow"
      >
        <div className="relative w-full h-[230px] group overflow-hidden rounded-2xl">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.35 }}
          />

          <div className="absolute inset-0 flex justify-end m-3 gap-2">
            {source_code_link ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => openLink(source_code_link)}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                aria-label={`View ${name} source`}
              >
                <FaGithub className="text-white" />
              </motion.button>
            ) : null}
            {live_link ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => openLink(live_link)}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                aria-label={`View ${name} live`}
              >
                <FaExternalLinkAlt className="text-white text-sm" />
              </motion.button>
            ) : null}
            {!live_link && !source_code_link ? (
              <div
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center"
                title="Confidential client project"
              >
                <FaLock className="text-secondary text-sm" />
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Production systems I have designed and shipped — from B2B eCommerce
          and field-service apps to CRM and e-learning. A few are live; others
          are confidential client products.
        </motion.p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
