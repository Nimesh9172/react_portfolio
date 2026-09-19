import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTOR =
  "a, button, [role='button'], label, .tech-card, .card-hover-glow, .cursor-grab, .cursor-pointer";
const TEXT_SELECTOR = "input, textarea, select, [contenteditable='true']";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 160, damping: 20, mass: 0.35 });
  const ringY = useSpring(dotY, { stiffness: 160, damping: 20, mass: 0.35 });
  const hoveredRef = useRef(false);

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
      const overHover = path.some(
        (node) => node instanceof Element && node.matches(HOVER_SELECTOR)
      );
      const nextHovered = overHover && !overText;
      if (nextHovered !== hoveredRef.current) {
        hoveredRef.current = nextHovered;
        setHovered(nextHovered);
      }
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

  return (
    <div
      className={`custom-cursor ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      <motion.div
        className="custom-cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: pressed ? 0.7 : hovered ? 1.85 : 1,
          opacity: hovered ? 0.95 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <span className="custom-cursor-orbit" />
      </motion.div>
      <motion.div
        className="custom-cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: pressed ? 0.55 : hovered ? 0.35 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      />
    </div>
  );
};

export default CustomCursor;
