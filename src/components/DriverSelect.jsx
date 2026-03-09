import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const DriverSelect = ({
  label,
  value,
  onChange,
  drivers,
  disabled,
  highlight,
}) => {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [search, setSearch] = useState("");

  const ref = useRef(null);
  const listRef = useRef(null);
  const timeoutRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setHighlightIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted driver into view
  useEffect(() => {
    if (!listRef.current) return;

    const item = listRef.current.children[highlightIndex];

    if (item) {
      item.scrollIntoView({
        block: "nearest",
      });
    }
  }, [highlightIndex]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open || disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev < drivers.length - 1 ? prev + 1 : 0
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev > 0 ? prev - 1 : drivers.length - 1
          );
          break;

        case "Enter":
          e.preventDefault();
          if (highlightIndex >= 0) {
            onChange(drivers[highlightIndex]);
            setOpen(false);
          }
          break;

        case "Escape":
          setOpen(false);
          break;

        default:
          // Typeahead search
          if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
            const newSearch = (search + e.key).toLowerCase();
            setSearch(newSearch);

            const index = drivers.findIndex((driver) =>
              driver.toLowerCase().startsWith(newSearch)
            );

            if (index !== -1) {
              setHighlightIndex(index);
            }

            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setSearch("");
            }, 500);
          }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [open, drivers, highlightIndex, search, disabled, onChange]);

  const toggleDropdown = () => {
    if (disabled) return;

    setOpen(!open);

    if (!open) {
      const currentIndex = drivers.indexOf(value);
      setHighlightIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  };

  const selectDriver = (driver) => {
    onChange(driver);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs text-zinc-400 mb-3 uppercase tracking-widest">
        {label}
      </label>

      <button
        disabled={disabled}
        onClick={toggleDropdown}
        className={`w-full flex justify-between items-center bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 transition-all duration-200 ${
          open ? `ring-2 ${highlight}` : ""
        } hover:border-[#c1a362]/40`}
      >
        <span className={value ? "text-white" : "text-zinc-500"}>
          {value || "Select Driver"}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          ref={listRef}
          className="absolute z-50 mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-h-60 overflow-y-auto"
        >
          {drivers.map((driver, index) => (
            <div
              key={driver}
              onClick={() => selectDriver(driver)}
              className={`px-4 py-2 cursor-pointer transition-all duration-150
              ${
                index === highlightIndex
                  ? "bg-[#c1a362]/30 text-[#c1a362]"
                  : value === driver
                  ? "bg-[#c1a362]/20 text-[#c1a362]"
                  : "hover:bg-zinc-800"
              }`}
            >
              {driver}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverSelect;