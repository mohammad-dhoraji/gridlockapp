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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setHighlightIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.children[highlightIndex];
    if (item) {
      item.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

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
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
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
      <label className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground/50 mb-3">
        {label}
      </label>

      <button
        disabled={disabled}
        onClick={toggleDropdown}
        className={`w-full flex justify-between items-center bg-secondary border border-border rounded-lg px-4 py-2 transition-all duration-200 focus-visible:ring-1 focus-visible:ring-ring hover:border-primary/50 ${
          open ? `ring-2 ${highlight}` : ""
        }`}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || "Select Driver"}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 text-muted-foreground ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          ref={listRef}
          className="absolute z-50 mt-2 w-full bg-secondary border border-border shadow-xl rounded-xl max-h-60 overflow-y-auto"
        >
          {drivers.map((driver, index) => (
            <div
              key={driver}
              onClick={() => selectDriver(driver)}
              className={`px-4 py-2 cursor-pointer transition-all duration-150 ${
                index === highlightIndex
                  ? "bg-primary/20 text-primary"
                  : value === driver
                  ? "bg-accent/50 text-accent-foreground"
                  : "hover:bg-accent"
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
