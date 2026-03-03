import React, {
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  CheckCircle2,
  XCircle,
  Info,
  X,
} from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  type = "success", // success | error | info
  title = "",
  message = "",
  confirmLabel,
  onConfirm,
}) => {
  const [visible, setVisible] = useState(isOpen);
  const modalRef = useRef(null);
  const previouslyFocused = useRef(null);
  const isMounted = useRef(true);

  const handleConfirm = onConfirm ?? onClose;

  /* =============================
     CLOSE WITH ANIMATION
  ============================= */
  const closeWithAnimation = useCallback(() => {
    if (!isMounted.current) return;

    setVisible(false);

    setTimeout(() => {
      if (isMounted.current) {
        onClose();
      }
    }, 180);
  }, [onClose]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  /* =============================
     ESC KEY
  ============================= */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") closeWithAnimation();

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusable =
          modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [closeWithAnimation]
  );

  /* =============================
     OPEN EFFECTS
  ============================= */
  useEffect(() => {
    if (!isOpen) return;

    setVisible(true);

    previouslyFocused.current = document.activeElement;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    setTimeout(() => {
      modalRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  /* =============================
     TYPE STYLING
  ============================= */
  const styles = {
    success: {
      icon: CheckCircle2,
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      ring: "ring-emerald-500/30",
      button:
        "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25",
    },
    error: {
      icon: XCircle,
      text: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      ring: "ring-red-500/30",
      button:
        "bg-red-500/15 border-red-500/30 text-red-400 hover:bg-red-500/25",
    },
    info: {
      icon: Info,
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      ring: "ring-blue-500/30",
      button:
        "bg-blue-500/15 border-blue-500/30 text-blue-400 hover:bg-blue-500/25",
    },
  };

  const theme = styles[type] ?? styles.success;
  const Icon = theme.icon;

  /* =============================
     PORTAL RENDER
  ============================= */
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={closeWithAnimation}
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full max-w-md transition-all duration-200 ${
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2"
        }`}
      >
        <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 text-white">

          {/* Close */}
          <button
            onClick={closeWithAnimation}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition"
          >
            <X size={18} />
          </button>

          {/* Icon + Title */}
          <div className="flex flex-col items-center text-center gap-4 mb-6">
            <div
              className={`p-3 rounded-full border ring-1 ${theme.bg} ${theme.border} ${theme.ring}`}
            >
              <Icon size={28} className={theme.text} />
            </div>

            <h2 id="modal-title" className="text-xl font-bold">
              {title}
            </h2>
          </div>

          {/* Message */}
          <p className="text-zinc-400 text-sm text-center mb-8 leading-relaxed">
            {message}
          </p>

          {/* Confirm */}
          <button
            onClick={() => {
              handleConfirm();
              closeWithAnimation();
            }}
            className={`w-full py-3 rounded-xl text-sm font-semibold uppercase tracking-wider border transition active:scale-[0.98] ${theme.button}`}
          >
            {confirmLabel ?? "Okay"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;