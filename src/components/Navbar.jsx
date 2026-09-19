import { motion, useAnimationControls } from "framer-motion";
import { navLinks, socialLinks } from "../constants/index";
import { logo, menu, close } from "../assets";
import { useEffect, useRef, useState } from "react";
import { styles } from "../style";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoControls = useAnimationControls();
  const logoSpinning = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const spinLogo = async () => {
    if (logoSpinning.current) return;
    logoSpinning.current = true;
    await logoControls.start({
      rotate: "+=360",
      transition: { duration: 0.65, ease: "easeInOut" },
    });
    logoSpinning.current = false;
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled ? "bg-primary/90 backdrop-blur-md shadow-lg shadow-black/20" : "bg-primary"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <motion.div
            className="nav-logo-wrap"
            animate={logoControls}
            onHoverStart={spinLogo}
            whileTap={{ scale: 0.9 }}
          >
            <div className="nav-logo-idle">
              <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
            </div>
          </motion.div>
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Nimesh&nbsp;
            <span className="md:block hidden"> | Software Developer</span>
          </p>
        </Link>
        <ul className="list-none hidden md:flex flex-row gap-6 lg:gap-8 items-center">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          <li className="flex items-center gap-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white text-xl"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white text-xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </li>
        </ul>
        <div className="md:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle((prev) => !prev)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
              <li className="flex gap-4 pt-2">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-white text-xl" />
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-white text-xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
