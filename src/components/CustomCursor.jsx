import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTOR =
  "a, button, [role='button'], label, .tech-card, .about-card, .card-hover-glow, .award-stage, .project-panel, .cursor-grab, .cursor-pointer";
const INVERT_SELECTOR = "h1, h2, h3, nav a, nav p, nav span, .cursor-invert";
const TEXT_SELECTOR = "input, textarea, select, [contenteditable='true']";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [invert, setInvert] = useState(false);
  const [invertLarge, setInvertLarge] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 160, damping: 20, mass: 0.35 });
  const ringY = useSpring(dotY, { stiffness: 160, damping: 20, mass: 0.35 });
  const stateRef = useRef({ hovered: false, invert: false, invertLarge: false });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncEnabled = () => {
      setEnabled(finePointer.matches && !reduceMotion.matches);
    };

    syncEnabled();
    finePointer.addEventListener("change", syncEnabled);
    reduceMotion.addEventListener("change", syncEnabled);
    return () => {
      finePointer.removeEventListener("change", syncEnabled);
      reduceMotion.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return undefined;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const move = (event) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      setVisible(true);

      const path = event.composedPath ? event.composedPath() : [];
      const overText = path.some(
        (node) => node instanceof Element && node.matches(TEXT_SELECTOR)
      );
      const overInvert = path.some(
        (node) => node instanceof Element && node.matches(INVERT_SELECTOR)
      );
      const overLarge = path.some(
        (node) => node instanceof Element && node.classList.contains("cursor-invert-lg")
      );
      const overHover = path.some(
        (node) => node instanceof Element && node.matches(HOVER_SELECTOR)
      );

      const next = {
        hovered: overHover && !overText && !overInvert,
        invert: overInvert && !overText,
        invertLarge: overLarge && !overText,
      };

      if (next.hovered !== stateRef.current.hovered) setHovered(next.hovered);
      if (next.invert !== stateRef.current.invert) setInvert(next.invert);
      if (next.invertLarge !== stateRef.current.invertLarge) {
        setInvertLarge(next.invertLarge);
      }
      stateRef.current = next;
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [enabled, dotX, dotY]);

  if (!enabled) return null;

  const ringScale = pressed
    ? 0.7
    : invert
      ? invertLarge
        ? 2.15
        : 1.45
      : hovered
        ? 1.85
        : 1;

  return (
    <div
      className={`custom-cursor ${visible ? "opacity-100" : "opacity-0"} ${
        invert ? "is-invert" : ""
      }`}
      aria-hidden="true"
    >
      <motion.div
        className={`custom-cursor-ring ${invert ? "is-invert" : ""}`}
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: ringScale,
          opacity: invert ? 1 : hovered ? 0.95 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
      >
        {!invert ? <span className="custom-cursor-orbit" /> : null}
      </motion.div>
      <motion.div
        className="custom-cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: invert ? 0 : pressed ? 0.55 : hovered ? 0.35 : 1,
          opacity: invert ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      />
    </div>
  );
};

export default CustomCursor;
