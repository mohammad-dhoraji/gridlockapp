function RecentRaces({ predictions }) {
  const formatPoints = (points) => {
    if (points == null) return "-";
    if (points > 0) return `+${points}`;
    return `${points}`;
  };

  const formatPodium = (drivers = {}) =>
    [drivers.p1, drivers.p2, drivers.p3].filter(Boolean).join(" / ") || "-";

  const hasOfficialResult = (drivers = {}) =>
    Boolean(drivers.p1 || drivers.p2 || drivers.p3 || drivers.dotd);

  if (!predictions || predictions.length === 0) {
    return (
      <section className="max-w-5xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold mb-4">
            No Predictions Yet
          </h2>
          <p className="text-zinc-400">
            Make your first prediction on Slipstream Live and start climbing the leaderboard.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">
          Recent Races
        </h2>

        <div className="space-y-4">
          {predictions.map((race) => (
            <div
              key={race.raceId}
              className="flex justify-between items-center border-b border-zinc-800 pb-3"
            >
              <div>
                <p className="font-semibold">
                  {race.raceName}
                </p>
                <p className="text-sm text-zinc-400">
                  Predicted: {formatPodium(race.predicted)}
                  {race.predicted?.dotd ? ` / DOTD: ${race.predicted.dotd}` : ""}
                </p>
                <p className="text-sm text-zinc-500">
                  {hasOfficialResult(race.actual)
                    ? `Official: ${formatPodium(race.actual)}${race.actual?.dotd ? ` / DOTD: ${race.actual.dotd}` : ""}`
                    : "Official results pending"}
                </p>
              </div>
              <span className="font-bold">
                {formatPoints(race.points)} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentRaces;
