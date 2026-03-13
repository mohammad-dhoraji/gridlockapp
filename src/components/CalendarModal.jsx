import React, { useEffect } from "react";

const optionClassName = `
  block w-full rounded-xl border border-[#c1a362]/40 bg-zinc-900 px-5 py-4 text-center
  text-sm font-semibold tracking-wider uppercase text-[#c1a362]
  transition-all duration-300 ease-out
  hover:bg-[#c1a362] hover:text-black hover:shadow-[0_0_20px_rgba(193,163,98,0.25)]
  active:scale-[0.98]
`;

export default function CalendarModal({
  isOpen,
  onClose,
  googleUrl,
  appleUrl,
  icsUrl,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close calendar options"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-950 p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white text-center">
          Add Prediction Deadlines to Calendar
        </h2>
        <p className="mt-2 mb-6 text-center text-zinc-400">
          Never miss a race prediction.
        </p>

        <div className="space-y-3">
          <a
            href={googleUrl}
            target="_blank"
            rel="noreferrer"
            className={optionClassName}
            onClick={onClose}
          >
            Add to Google Calendar
          </a>

          <a href={appleUrl} className={optionClassName} onClick={onClose}>
            Add to Apple Calendar
          </a>

          <a
            href={icsUrl}
            target="_blank"
            rel="noreferrer"
            className={optionClassName}
            onClick={onClose}
          >
            Other Calendars (.ICS)
          </a>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-3 text-sm font-semibold tracking-wide text-zinc-300 transition-colors hover:bg-zinc-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}
