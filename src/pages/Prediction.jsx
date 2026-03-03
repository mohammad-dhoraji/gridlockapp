import React, { useState, useEffect, useCallback } from "react";
import Button from "../components/Button";
import DriverSelect from "../components/DriverSelect";
import Modal from "../components/Modal";
import { apiRequest, apiPost } from "../lib/api";

const PRESET_DRIVERS = [
  "Max Verstappen",
  "Charles Leclerc",
  "Lewis Hamilton",
  "Lando Norris",
  "Carlos Sainz",
  "George Russell",
  "Oscar Piastri",
  "Fernando Alonso",
];


const CLOSED_MODAL = {
  isOpen: false,
  type: "success",
  title: "",
  message: "",
};

const Prediction = () => {
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [prediction, setPrediction] = useState({
    p1: "",
    p2: "",
    p3: "",
    dotd: "",
  });
  const [modal, setModal] = useState(CLOSED_MODAL);

  const openModal = useCallback((type, title, message) => {
    setModal({ isOpen: true, type, title, message });
  }, []);

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const getFriendlyError = (err) => {
    if (!navigator.onLine || err?.name === "TypeError") {
      return "Unable to connect to the server. Please check your internet connection.";
    }
    if (err?.status === 409) {
      openModal(
        "info",
        "Prediction Already Submitted",
        "You have already submitted your prediction for this race. You can edit it until the race is locked.",
      );
      return null;
    }
    if (err?.status === 400) {
      return "Invalid prediction. Please review your selections.";
    }
    return "Something went wrong. Please try again.";
  };

  useEffect(() => {
    const fetchNextRace = async () => {
      try {
        const data = await apiRequest("/api/races/next");
        setRace(data);
      } catch (err) {
        console.error("Failed to fetch next race:", err);
        openModal(
          "error",
          "Race Unavailable",
          "Could not load the upcoming race. Please refresh the page.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNextRace();
  }, [openModal]);

  const handleChange = (position, value) => {
    setPrediction((prev) => ({
      ...prev,
      [position]: value,
    }));
  };

  const validate = () => {
    const { p1, p2, p3, dotd } = prediction;

    if (!p1 || !p2 || !p3 || !dotd) {
      return "All fields must be selected before submitting.";
    }

    const podium = [p1, p2, p3];
    if (new Set(podium).size !== podium.length) {
      return "Podium drivers must all be different. Please adjust your selections.";
    }

    return null;
  };

  const handleSubmit = async () => {
    if (submitting || !race) return;

    const validationError = validate();
    if (validationError) {
      openModal("error", "Invalid Prediction", validationError);
      return;
    }

    setSubmitting(true);

    try {
      await apiPost("/api/predictions", {
        race_id: race.id,
        ...prediction,
      });

      openModal(
        "success",
        "Prediction Submitted",
        "Your prediction has been successfully recorded for this race. You can edit it until the race is locked.",
      );
    } catch (err) {
      console.error("Prediction submission failed:", err);
      const friendly = getFriendlyError(err);
      if (!friendly) {
        return;
      }
      openModal("error", "Submission Failed", friendly);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-800 via-neutral-950 to-black flex items-center justify-center">
        <p className="text-zinc-400 text-sm tracking-widest uppercase animate-pulse">
          Loading upcoming race...
        </p>
      </div>
    );
  }

  if (!race) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-800 via-neutral-950 to-black flex items-center justify-center">
        <p className="text-zinc-400 text-sm">No upcoming races found.</p>
      </div>
    );
  }

  const isLocked = race.status !== "upcoming";

  const raceDate = new Date(race.race_date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const statusColor =
    race.status === "upcoming"
      ? "bg-green-600/20 text-green-400 border border-green-500/30"
      : race.status === "locked"
        ? "bg-yellow-600/20 text-yellow-400 border border-yellow-500/30"
        : "bg-red-600/20 text-red-400 border border-red-500/30";

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      <div className="min-h-screen bg-gradient-to-b from-neutral-800 via-neutral-950 to-black text-white px-6 py-12 w-full">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                {race.name}
              </h1>

              <span
                className={`px-4 py-1.5 text-xs tracking-widest rounded-full font-bold uppercase ${statusColor}`}
              >
                {race.status}
              </span>
            </div>

            <p className="text-zinc-500 text-sm uppercase tracking-wide">
              {raceDate}
            </p>

            <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-[#c1a362] via-zinc-700 to-transparent rounded-full" />
          </div>

          {/* Card */}
          <div className="relative bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 shadow-2xl shadow-black/40">
            <div className="absolute -top-[2px] left-0 w-full h-[3px] bg-gradient-to-r from-[#c1a362] via-red-500/60 to-[#c1a362] rounded-t-3xl" />

            <h2 className="text-2xl font-semibold mb-10 tracking-wide">
              Select Your Podium
            </h2>

            {/* Podium Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <DriverSelect
                label="1st Place"
                value={prediction.p1}
                onChange={(val) => handleChange("p1", val)}
                drivers={PRESET_DRIVERS}
                disabled={isLocked || submitting}
                highlight="ring-yellow-500/40"
              />

              <DriverSelect
                label="2nd Place"
                value={prediction.p2}
                onChange={(val) => handleChange("p2", val)}
                drivers={PRESET_DRIVERS}
                disabled={isLocked || submitting}
                highlight="ring-zinc-400/30"
              />

              <DriverSelect
                label="3rd Place"
                value={prediction.p3}
                onChange={(val) => handleChange("p3", val)}
                drivers={PRESET_DRIVERS}
                disabled={isLocked || submitting}
                highlight="ring-amber-700/40"
              />
            </div>

            {/* Driver of the Day */}
            <div className="mb-10">
              <DriverSelect
                label="Driver of the Day"
                value={prediction.dotd}
                onChange={(val) => handleChange("dotd", val)}
                drivers={PRESET_DRIVERS}
                disabled={isLocked || submitting}
                highlight="ring-[#c1a362]/50"
              />
            </div>

            {/* Submit / Locked */}
            {!isLocked ? (
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                loading={submitting}
                className="w-full md:w-auto mx-auto block"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Prediction"
                )}
              </Button>
            ) : (
              <div className="text-red-400 font-medium text-center">
                Predictions are locked. Race has started.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Prediction;
