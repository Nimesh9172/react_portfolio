import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { socialLinks } from "../constants";
import { styles } from "../style";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-7xl mx-auto ${styles.paddingX} pb-10`}
    >
      <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-secondary text-sm text-center sm:text-left">
          © {new Date().getFullYear()} {socialLinks.name}. Software Developer based in{" "}
          {socialLinks.location}.
        </p>
        <div className="flex items-center gap-5 text-xl text-secondary">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={`mailto:${socialLinks.email}`}
            className="hover:text-white"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
