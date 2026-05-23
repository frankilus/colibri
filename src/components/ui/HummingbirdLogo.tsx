"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  size?: number;
  className?: string;
  animated?: boolean;
  variant?: "color" | "white" | "dark";
}

export default function HummingbirdLogo({
  size = 40,
  className = "",
  animated = true,
  variant = "color",
}: Props) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animated && !reducedMotion;

  const gradientId = `hb-grad-${size}`;
  const wingGradId = `hb-wing-${size}`;

  const bodyColor =
    variant === "white" ? "#ffffff" : variant === "dark" ? "#0F4C45" : "#1FA37A";
  const wingColor1 =
    variant === "white" ? "#ffffffcc" : variant === "dark" ? "#0F4C45" : "#36C5C0";
  const wingColor2 =
    variant === "white" ? "#ffffff88" : variant === "dark" ? "#1FA37A" : "#7C3AED";
  const beakColor =
    variant === "white" ? "#ffffff" : variant === "dark" ? "#1C2B2A" : "#F4B740";
  const eyeColor =
    variant === "white" ? "#0F4C45" : variant === "dark" ? "#FBF7EF" : "#1C2B2A";

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Colibri hummingbird mark"
      animate={shouldAnimate ? { y: [0, -4, 0] } : undefined}
      transition={
        shouldAnimate
          ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1FA37A" />
          <stop offset="50%" stopColor="#36C5C0" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id={wingGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={wingColor1} stopOpacity="0.9" />
          <stop offset="100%" stopColor={wingColor2} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Upper wing — swept back in mid-flight */}
      <motion.path
        d="M32 28 C20 18, 8 16, 6 22 C10 20, 24 26, 32 34"
        fill={variant === "color" ? `url(#${wingGradId})` : wingColor1}
        opacity={0.85}
        animate={shouldAnimate ? { scaleX: [1, 0.88, 1] } : undefined}
        transition={
          shouldAnimate
            ? { duration: 0.25, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        style={{ transformOrigin: "32px 28px" }}
      />

      {/* Lower wing */}
      <motion.path
        d="M32 34 C22 38, 10 42, 8 48 C12 44, 26 38, 32 36"
        fill={variant === "color" ? `url(#${wingGradId})` : wingColor2}
        opacity={0.65}
        animate={shouldAnimate ? { scaleX: [1, 0.9, 1] } : undefined}
        transition={
          shouldAnimate
            ? { duration: 0.25, repeat: Infinity, ease: "easeInOut", delay: 0.05 }
            : undefined
        }
        style={{ transformOrigin: "32px 35px" }}
      />

      {/* Body */}
      <ellipse
        cx="38"
        cy="33"
        rx="9"
        ry="5.5"
        fill={variant === "color" ? `url(#${gradientId})` : bodyColor}
        transform="rotate(-15 38 33)"
      />

      {/* Head */}
      <circle
        cx="45"
        cy="26"
        r="5.5"
        fill={variant === "color" ? `url(#${gradientId})` : bodyColor}
      />

      {/* Tail feathers */}
      <path
        d="M30 36 C25 40, 22 46, 20 52 C24 46, 28 42, 32 38"
        fill={variant === "color" ? "#1FA37A" : bodyColor}
        opacity={0.7}
      />
      <path
        d="M29 37 C23 42, 19 50, 18 56 C22 50, 27 44, 31 39"
        fill={variant === "color" ? "#36C5C0" : bodyColor}
        opacity={0.5}
      />

      {/* Beak */}
      <line
        x1="50"
        y1="24"
        x2="62"
        y2="20"
        stroke={beakColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Eye */}
      <circle cx="47" cy="24" r="1.5" fill={eyeColor} />
      <circle cx="47.4" cy="23.6" r="0.5" fill="#ffffff" opacity={0.7} />

      {/* Throat patch — iridescent magenta spot */}
      {variant === "color" && (
        <ellipse
          cx="42"
          cy="30"
          rx="3.5"
          ry="2"
          fill="#B5388A"
          opacity={0.6}
          transform="rotate(-15 42 30)"
        />
      )}
    </motion.svg>
  );
}
