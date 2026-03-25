import React, { useEffect, useMemo, useState } from "react";
import { GridLockIcon } from "./branding";

const SYSTEM_MESSAGES = ["INITIALIZING SYSTEM...", "SYNCING RACE DATA..."];

const SIZE_CONFIG = {
  small: {
    icon: 18,
    gap: "gap-2",
    rail: "w-16",
    text: "text-[10px] tracking-[0.2em]",
  },
  medium: {
    icon: 48,
    gap: "gap-4",
    rail: "w-40",
    text: "text-[11px] tracking-[0.25em]",
  },
  large: {
    icon: 56,
    gap: "gap-5",
    rail: "w-48",
    text: "text-xs tracking-[0.28em]",
  },
};

function Loader({
  fullScreen = false,
  size = "medium",
  showProgress,
  showText,
  text,
  iconMode = "dark",
  className = "",
  as: Root = "div",
}) {
  const resolvedSize = SIZE_CONFIG[size] ? size : "medium";
  const config = SIZE_CONFIG[resolvedSize];

  const shouldShowProgress = showProgress ?? resolvedSize !== "small";
  const shouldShowText = showText ?? (fullScreen || resolvedSize !== "small");

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (text || !shouldShowText) return undefined;

    const intervalId = window.setInterval(() => {
      setMessageIndex((previous) => (previous + 1) % SYSTEM_MESSAGES.length);
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, [text, shouldShowText]);

  const systemText = useMemo(
    () => text || SYSTEM_MESSAGES[messageIndex],
    [text, messageIndex],
  );

  const rootClasses = fullScreen
    ? "fixed inset-0 z-50 bg-[#0A0B0F] px-6"
    : resolvedSize === "small"
      ? "w-auto"
      : "w-full";

  const content = (
    <div className={`flex flex-col items-center ${config.gap} animate-gridlockFadeIn`}>
      <GridLockIcon
        size={config.icon}
        mode={iconMode}
        className="animate-gridlockPulse will-change-transform"
      />

      {shouldShowProgress && (
        <div className={`relative ${config.rail} h-[2px] overflow-hidden rounded-full bg-white/15`}>
          <span className="absolute inset-y-0 left-0 w-1/3 bg-[#E10600] shadow-[0_0_10px_rgba(225,6,0,0.8)] animate-gridlockScan" />
        </div>
      )}

      {shouldShowText && (
        <p className={`font-mono uppercase text-white/35 ${config.text}`}>
          {systemText}
        </p>
      )}
    </div>
  );

  const baseProps = {
    role: "status",
    "aria-live": "polite",
    "aria-busy": "true",
    className: `${rootClasses} flex items-center justify-center ${className}`,
  };

  if (Root === "span") {
    return <span {...baseProps}>{content}</span>;
  }

  return <div {...baseProps}>{content}</div>;
}

export default Loader;
